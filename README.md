# 🎓 Sistema Acadêmico IFNMG

Aplicativo mobile desenvolvido com React Native, voltado para alunos do Instituto Federal do Norte de Minas Gerais (IFNMG), com funcionalidades de autenticação, visualização de disciplinas, notas e gerenciamento de perfil.

---

## 📱 Funcionalidades

- Login seguro com e-mail institucional
- Cadastro com validações de CPF, senha e domínio
- Autenticação via JWT
- Navegação por tab bar (Home e Perfil)
- Listagem de disciplinas com filtro por semestre
- Visualização de notas por disciplina (em progresso)
- Exibição e edição de dados do perfil
- Logout com destruição de sessão

---

## 🚀 Tecnologias Utilizadas

### 🔹 Mobile (React Native + Expo)
- React Navigation (Stack & Bottom Tabs)
- React Hook Form + Zod (validação)
- Axios (requisições HTTP)
- Toasts com `react-native-toast-message`
- Ícones com `Ionicons`
- Tipagem com TypeScript
- Componentes reutilizáveis (`Input.tsx`, etc.)

### 🔹 Backend (Node.js + Express)
- MySQL com `mysql2`
- Autenticação com JWT
- Hash de senha com bcrypt
- Verificação de domínio institucional nos e-mails
- Rotas para autenticação, alunos, matrículas e médias

---

## 🔐 Validações Aplicadas

- Apenas e-mails institucionais permitidos:
  - `@aluno.ifnmg.edu.br`
  - `@ifnmg.edu.br`
- CPF com exatamente 11 dígitos numéricos
- Senhas com no mínimo 6 caracteres
- Confirmação de senha no cadastro
- Feedback visual em caso de erros (via Toast)

---

## 🧭 Navegação e Rotas

| Rota         | Descrição                          | Protegida |
|--------------|-------------------------------------|-----------|
| `/login`     | Tela de autenticação               | ❌        |
| `/register`  | Cadastro de novos alunos           | ❌        |
| `AppTabs`    | Tab bar com telas de Home e Perfil | ✅        |
| `/disciplina`| Tela de detalhes da disciplina     | ✅        |

---

## 🏠 Home

- Saudação com o primeiro nome do aluno
- Lista de disciplinas com:
  - Nome
  - Semestre (ex: `2025/1º semestre`)
  - Botão “Ver notas”
- Filtro de semestre via `Picker`
- Integração com rota: `GET /matriculas/aluno/:id`

---

## 👤 Perfil

- Exibição dos dados do aluno: nome, email, matrícula
- Edição de nome e senha
- Integração com rotas: `PUT /auth/profile/:id/nome or senha`
- Botão “Sair da conta”
- Integração com rota: `POST /auth/logout`

---

## 📚 Tela de Disciplina

- Visualização de Notas: N1, N2, N3
- Cálculo e exibição da média final
- Indicação de status: Aprovado / Reprovado

---

## 📌 Análise de Requisitos e Decisões Técnicas

### 🎯 Objetivo

Oferecer uma interface moderna e funcional para que alunos do IFNMG tenham acesso facilitado às suas informações acadêmicas, com segurança e responsividade.

### ✅ Requisitos Atendidos

- Autenticação protegida com JWT
- Navegação segura e tipada
- Integração com banco de dados relacional
- Feedback visual durante todo o fluxo
- Design alinhado à identidade institucional do IFNMG

### 🧠 Decisões Técnicas

- **Expo + React Native**: agilidade e simplicidade no ciclo de desenvolvimento mobile
- **Zod + RHF**: validação reativa, declarativa e com boa escalabilidade
- **MySQL**: banco relacional robusto para o modelo acadêmico
- **JWT**: gerenciamento de sessão seguro e stateless
- **Verificação de domínio no backend e frontend**: garante exclusividade para alunos da instituição

## 📦 Execução do Projeto

```bash
# Clonando o repositório
git clone https://github.com/chines05/Sistema-Academico-de-Alunos-e-Notas.git
cd Sistema-Academico-de-Alunos-e-Notas

# Instalando e executando o app mobile (Expo)
cd frontend
npm install        # ou yarn
npx expo start     # inicia o app no modo de desenvolvimento

# Escaneie o QR Code com o Expo Go no celular ou use um emulador Android/iOS
# Certifique-se de que o backend está rodando antes de fazer login

# Instalando e executando o backend (Node + MySQL)
cd backend
npm install        # ou yarn
npm run dev        # ou yarn dev

# Verifique se o .env está corretamente configurado (porta, senha do MySQL, JWT_SECRET, etc.)
# O banco de dados deve estar criado com as tabelas necessárias
