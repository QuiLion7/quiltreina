import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Interfaces para os planos

interface Routine {
  name: string;
  sets: number;
  reps: number;
}

interface Exercise {
  day: string;
  routines: Routine[];
}

interface WorkoutPlan {
  schedule: string[];
  exercises: Exercise[];
}

interface FoodEntry {
  weight: number;
  name: string;
  calories: number;
  alternative: string;
}

interface Meal {
  name: string;
  foods: FoodEntry[];
}

interface DietPlan {
  dailyCalories: number;
  meals: Meal[];
}

// Tipo para o payload da requisição
type GenerateProgramPayload = {
  user_id: string;
  age: number;
  height: number;
  weight: number;
  injuries: string;
  workout_days: string[];
  fitness_goal: string;
  fitness_level: string;
  dietary_restrictions: string;
};

const http = httpRouter();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Variável de ambiente CLERK_WEBHOOK_SECRET ausente");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Nenhum cabeçalho svix encontrado", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Erro ao verificar o webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } =
        evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Erro ao criar usuário:", error);
        return new Response("Erro ao criar usuário", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Erro ao atualizar o usuário:", error);
        return new Response("Erro ao atualizar o usuário", { status: 500 });
      }
    }

    return new Response("Webhooks processados ​​com sucesso", { status: 200 });
  }),
});

// Validar e corrigir o treino para garantir que ele tenha tipos numéricos adequados
function validateWorkoutPlan(plan: WorkoutPlan): WorkoutPlan {
  const validatedPlan = {
    schedule: plan.schedule,
    exercises: plan.exercises.map((exercise) => ({
      day: exercise.day,
      routines: exercise.routines.map((routine) => ({
        name: routine.name,
        sets:
          typeof routine.sets === "number"
            ? routine.sets
            : parseInt(routine.sets) || 1,
        reps:
          typeof routine.reps === "number"
            ? routine.reps
            : parseInt(routine.reps) || 10,
      })),
    })),
  };
  return validatedPlan;
}

// Validar a dieta para garantir que ela siga estritamente o esquema
function validateDietPlan(plan: DietPlan): DietPlan {
  // Manter apenas os campos que queremos
  const validatedPlan = {
    dailyCalories: plan.dailyCalories,
    meals: plan.meals.map((meal) => ({
      name: meal.name,
      foods: meal.foods.map((food) => ({
        weight: Number(food.weight) || 100, // Conversão explícita
        name: food.name,
        calories: Number(food.calories) || 0, // Conversão explícita
        alternative: food.alternative,
      })),
    })),
  };
  return validatedPlan;
}

http.route({
  path: "/vapi/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payload = (await request.json()) as GenerateProgramPayload;

      const {
        user_id,
        age,
        height,
        weight,
        injuries,
        workout_days,
        fitness_goal,
        fitness_level,
        dietary_restrictions,
      } = payload;

      console.log("A carga útil está aqui:", payload);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-001",
        generationConfig: {
          temperature: 0.4, // temperatura mais baixa para saídas mais previsíveis
          topP: 0.9,
          responseMimeType: "application/json",
        },
      });

      const workoutPrompt = `Você é um personal trainer experiente que cria um plano de treino personalizado com base em:
      Idade: ${age}
      Altura: ${height}
      Peso: ${weight}
      Lesões ou limitações: ${injuries}
      Dias disponíveis para treino: ${workout_days}
      Meta de condicionamento físico: ${fitness_goal}
      Nível de condicionamento físico: ${fitness_level}

      Como treinador profissional:
      - Considere a divisão dos grupos musculares para evitar o overtraining dos mesmos músculos em dias consecutivos
      - Crie exercícios que correspondam ao seu nível de condicionamento físico e levem em consideração quaisquer lesões
      - Estruture os treinos para atingir especificamente o objetivo de condicionamento físico do usuário

      INSTRUÇÕES DO ESQUEMA CRÍTICO:
      - Sua saída DEVE conter APENAS os campos especificados abaixo, SEM CAMPOS ADICIONAIS
      - "séries" e "repetições" DEVEM SEMPRE ser NÚMEROS, nunca strings
      - Por exemplo: "séries": 3, "repetições": 10
      - NÃO use texto como "repetições": "O máximo possível" ou "repetições": "Até a falha"
      - Em vez disso, use números específicos como "repetições": 12 ou "repetições": 15
      - Para cardio, use "séries": 1, "repetições": 1 ou outro número apropriado
      - NUNCA inclua strings para campos numéricos
      - NUNCA adicione campos extras não mostrados no exemplo abaixo
      

      Retorne um objeto JSON com esta estrutura EXATA:
      {
        "schedule": ["Segunda", "Quarta", "Sexta"],
        "exercises": [
          {
            "day": "Segunda",
            "routines": [
              {
                "name": "Nome do exercício",
                "sets": 3,
                "reps": 10
              }
            ]
          }
        ]
      }

      NÃO adicione campos que não estejam neste exemplo. Sua resposta deve ser um objeto JSON válido, sem texto adicional.`;

      const workoutResult = await model.generateContent(workoutPrompt);
      const workoutPlanText = workoutResult.response.text();

      // VALIDAR A ENTRADA VINDA DA IA
      let workoutPlan: WorkoutPlan = JSON.parse(workoutPlanText);
      workoutPlan = validateWorkoutPlan(workoutPlan);

      const dietPrompt = `Você é um nutricionista experiente que cria um plano de dieta personalizado com base em:
        Idade: ${age}
        Altura: ${height}
        Peso: ${weight}
        Meta de condicionamento físico: ${fitness_goal}
        Restrições alimentares: ${dietary_restrictions}

        Como nutricionista profissional:
        - Calcule a ingestão calórica diária adequada com base nas estatísticas e objetivos da pessoa
        - Crie um plano alimentar balanceado com distribuição adequada de macronutrientes
        - Inclua uma variedade de alimentos ricos em nutrientes, respeitando as restrições alimentares
        - Considere o horário das refeições em relação aos treinos para desempenho e recuperação ideais

        INSTRUÇÕES DO ESQUEMA CRÍTICO:
        - Sua saída DEVE conter APENAS os campos especificados abaixo, SEM CAMPOS ADICIONAIS
        - "dailyCalories" DEVE ser um NÚMERO, não uma string
        - NÃO adicione campos como "suplementos", "macros", "notas" ou QUALQUER outro
        - Inclua APENAS os campos EXATOS mostrados no exemplo abaixo
        - Cada refeição deve incluir APENAS um array "nome" e "alimentos"
        - Cada alimento DEVE ter: nome, peso em gramas, calorias e uma alternativa
        - "weight" e "calories" DEVEM ser NÚMEROS
        - "alternative" deve ser uma string com uma opção substituta

        Retorna um objeto JSON com esta estrutura EXATA e nenhum outro campo:
        {
          "dailyCalories": 2000,
          "meals": [
              {
              "name": "Café da manhã",
              "foods": [
                {
                  "weight": 50,
                  "name": "Aveia",
                  "calories": 194,
                  "alternative": "Quinoa flakes"
                }
                  {
                  "weight": 150,
                  "name": "Iogurte grego",
                  "calories": 130,
                  "alternative": "Skyr"
                }
              ]
            }
          ]
        }

        NÃO adicione campos que não estejam neste exemplo. Sua resposta deve ser um objeto JSON válido, sem texto adicional.`;

      const dietResult = await model.generateContent(dietPrompt);
      const dietPlanText = dietResult.response.text();

      // VALIDAR A ENTRADA VINDA DA IA
      let dietPlan: DietPlan = JSON.parse(dietPlanText) as DietPlan;
      dietPlan = validateDietPlan(dietPlan);

      // salvar no banco de dados convex
      const planId = await ctx.runMutation(api.plans.createPlan, {
        userId: user_id,
        dietPlan,
        isActive: true,
        workoutPlan,
        name: `${fitness_goal} Plano - ${new Date().toLocaleDateString()}`,
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            planId,
            workoutPlan,
            dietPlan,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
