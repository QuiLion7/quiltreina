export const USER_PROGRAMS = [
  {
    id: 1,
    first_name: "Aroudo",
    profilePic: "https://randomuser.me/api/portraits/men/74.jpg",
    fitness_goal: "Perda de Peso",
    height: "165 cm",
    weight: "79 kg",
    age: 34,
    workout_days: 4,
    injuries: "Dor Lombar",
    fitness_level: "Novato",
    equipment_access: "Treino em casa",
    dietary_restrictions: "Intolerante à lactose",
    workout_plan: {
      title: "Programa de perda de peso para iniciantes",
      weekly_schedule: [
        { day: "Segunda", focus: "Cardio corpo inteiro", duration: "30 min" },
        {
          day: "Quarta",
          focus: "Abdomen e parte inferior do corpo",
          duration: "30 min",
        },
        { day: "Sexta", focus: "Treinamento HIIT", duration: "25 min" },
        { day: "Sábado", focus: "Recuperação Ativa", duration: "40 min" },
      ],
      description:
        "Este programa se concentra em desenvolver um hábito consistente de exercícios com movimentos que não agridem as articulações e protegem a região lombar. A combinação de exercícios cardiovasculares e de força auxilia na perda de peso, preservando a massa muscular.",
    },
    diet_plan: {
      title: "Plano de Nutrição Balanceada (Sem Lactose)",
      daily_calories: "1,600 calorias",
      macros: { protein: "30%", carbs: "40%", fats: "30%" },
      meal_examples: [
        {
          meal: "Café da manhã",
          example:
            "Aveia com leite de amêndoa, frutas vermelhas e sementes de chia",
        },
        {
          meal: "Almoço",
          example: "Salada de frango grelhado com molho de azeite",
        },
        {
          meal: "Jantar",
          example: "Salmão assado com quinoa e legumes assados",
        },
        {
          meal: "Lanches",
          example:
            "Maçã com manteiga de amêndoa, iogurte sem laticínios com nozes",
        },
      ],
      description:
        "Este plano alimentar evita laticínios e oferece nutrição balanceada para auxiliar nos objetivos de perda de peso. O foco está em alimentos integrais com proteína adequada para preservar a massa muscular durante a perda de peso.",
    },
  },
  {
    id: 2,
    first_name: "Murilo",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    fitness_goal: "Ganho Muscular",
    height: "170 cm",
    weight: "91 kg",
    age: 28,
    workout_days: 5,
    injuries: "Nenhum",
    fitness_level: "Intermediário",
    equipment_access: "Academia completa",
    dietary_restrictions: "Nenhum",
    workout_plan: {
      title: "Construção muscular focada na hipertrofia",
      weekly_schedule: [
        { day: "Segunda", focus: "Peito e Tríceps", duration: "45 min" },
        { day: "Terça", focus: "Costas e Bíceps", duration: "45 min" },
        { day: "Quarta", focus: "Recuperação/Cardio", duration: "30 min" },
        { day: "Quinta", focus: "Ombros e abdominais", duration: "45 min" },
        { day: "Sexta", focus: "Pernas", duration: "50 min" },
      ],
      description:
        "Este programa implementa uma divisão tradicional por partes do corpo, com ênfase na sobrecarga progressiva. Cada grupo muscular é treinado com volume moderado e recuperação adequada para maximizar o crescimento muscular.",
    },
    diet_plan: {
      title: "Plano de nutrição para construção muscular",
      daily_calories: "2,800 calorias",
      macros: { protein: "30%", carbs: "50%", fats: "20%" },
      meal_examples: [
        {
          meal: "Café da manhã",
          example: "Mingau de aveia proteico com banana e whey protein",
        },
        {
          meal: "Almoço",
          example: "Frango, arroz e vegetais com azeite",
        },
        {
          meal: "Jantar",
          example: "Bife com batata-doce e vegetais verdes",
        },
        {
          meal: "Lanches",
          example: "Shake de proteína com frutas, iogurte grego com mel",
        },
      ],
      description:
        "Esta dieta rica em proteínas e com excesso de calorias promove o crescimento muscular, minimizando o ganho de gordura. Os carboidratos são distribuídos entre os treinos para desempenho e recuperação ideais.",
    },
  },
  {
    id: 3,
    first_name: "Luiz",
    profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
    fitness_goal: "Aptidão Geral",
    height: "175cm",
    weight: "80 kg",
    age: 45,
    workout_days: 3,
    injuries: "Dor no joelho",
    fitness_level: "Intermediário",
    equipment_access: "Somente peso corporal",
    dietary_restrictions: "Vegetariano",
    workout_plan: {
      title: "Programa de condicionamento físico funcional",
      weekly_schedule: [
        { day: "Segunda", focus: "Força do peso corporal", duration: "40 min" },
        { day: "Quarta", focus: "Mobilidade e Equilíbrio", duration: "35 min" },
        { day: "Sábado", focus: "Cardio e Corrida", duration: "40 min" },
      ],
      description:
        "Este programa se concentra em padrões de movimento funcionais que melhoram o desempenho diário, sem prejudicar os joelhos. A ênfase está na força do core, mobilidade e saúde cardiovascular.",
    },
    diet_plan: {
      title: "Nutrição Vegetariana Equilibrada",
      daily_calories: "1,800 calorias",
      macros: { protein: "25%", carbs: "50%", fats: "25%" },
      meal_examples: [
        {
          meal: "Café da manhã",
          example: "Tofu mexido com legumes e torrada integral",
        },
        { meal: "Almoço", example: "Sopa de lentilha com salada verde mista" },
        {
          meal: "Jantar",
          example: "Caril de grão-de-bico com arroz integral e legumes",
        },
        {
          meal: "Lanches",
          example: "Nozes mistas, homus com legumes, smoothie proteico",
        },
      ],
      description:
        "Este plano alimentar vegetariano garante uma ingestão adequada de proteínas de origem vegetal. Concentra-se em alimentos integrais e apoia seu estilo de vida ativo, ao mesmo tempo em que trata problemas nos joelhos com opções alimentares anti-inflamatórias.",
    },
  },
];
