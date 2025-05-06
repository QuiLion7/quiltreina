# QuilTreina

Uma plataforma inteligente que combina IA generativa, assistente por voz e dados em tempo real para criar treinos e dietas personalizados, com base no seu perfil físico e metas de saúde.

### 🌞 Preview do Projeto

![Preview do Projeto - Desktop](/public/image-app-1.png)

![Preview do Projeto - Tablet](/public/image-app-2.png)

## ✨ Funcionalidades

-🎙️ **Assistente de Voz com IA (Vapi)**: converse com a IA sobre seus objetivos, rotina e limitações

-🧠 **Integração com LLM (Gemini AI)**: gera planos personalizados de treino e dieta

-🏋️ **Planos de Treino Personalizados**: com base no seu nível, histórico de lesões e preferências

-🥗 **Recomendações Alimentares**: levando em conta alergias e restrições alimentares

-🔒 **Autenticação Segura com Clerk**: login via GitHub, Google ou e-mail/senha

-💾 **Gerenciamento de Programas**: mantenha vários planos e ative o mais recente

-🎯 **Design Moderno**: interface elegante

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React moderno com suporte a SSR e rotas inteligentes
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado de JavaScript
- **TailwindCSS + Shadcn UI** - Estilização rápida e elegante com componentes reutilizáveis
- **Clerk** - Autenticação e gerenciamento de usuários
- **Vapi.ai** - Plataforma de assistente por voz em tempo real
- **Gemini AI** - LLM para geração de conteúdo e recomendações
- **Convex** - Banco de dados reativo e em tempo real

## 📋 Pré-requisitos

- Node.js 18.17.0 ou superior
- npm, yarn, pnpm ou bun

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/QuiLion7/quiltreina.git
cd quiltreina
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. Configure as variáveis de ambiente no .env:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
NEXT_PUBLIC_VAPI_API_KEY=

# Convex Database
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🏗️ Estrutura do Projeto

```
quiltreina/
├── app/                  # Rotas e páginas da aplicação
├── components/           # Componentes reutilizáveis
├── lib/                  # Funções utilitárias e API
├── public/               # Arquivos estáticos
├── styles/               # Estilos globais
└── types/                # Definições de tipos TypeScript
```

## 📱 Recursos de Acessibilidade

- Design responsivo
- HTML semântico para melhor acessibilidade
- Feedback visual e textual para ações

## 🌐 Deployment

A aplicação pode ser facilmente implantada na [Vercel](https://vercel.com) ou qualquer outra plataforma que suporte Next.js.

```bash
npm run build
# ou
yarn build
# ou
pnpm build
# ou
bun build
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Quilion Oliveira**

- Github: [QuiLion7](https://github.com/QuiLion7)
- LinkedIn: [quilion7](https://www.linkedin.com/in/quilion7/)
