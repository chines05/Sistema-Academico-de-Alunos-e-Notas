# 🎓 Sistema Acadêmico IFNMG

Aplicativo mobile desenvolvido com React Native, destinado a alunos do Instituto Federal (IFNMG), com autenticação, listagem de disciplinas, visualização de notas e gerenciamento de perfil.

---

## 📱 Funcionalidades

- **Login seguro com validação de e-mail institucional**
- **Cadastro de alunos com validações de CPF, senha e domínio**
- **Autenticação via JWT**
- **Navegação com Tab Bar inferior (Home | Perfil)**
- **Listagem de disciplinas matriculadas com filtro por semestre**
- **Visualização de notas por disciplina (em progresso)**
- **Exibição e edição de dados do perfil**
- **Logout com destruição de sessão**

---

## 🚀 Tecnologias Utilizadas

### 🔹 Mobile (React Native + Expo)
- React Navigation (Stack & Bottom Tabs)
- Axios
- React Hook Form + Zod
- Toasts com `react-native-toast-message`
- Ícones com `Ionicons`
- Tipagem com TypeScript
- Componentes reaproveitáveis (ex: `Input.tsx`)

### 🔹 Backend (Node.js + Express)
- MySQL com `mysql2`
- Autenticação com JWT
- Criptografia de senha com bcrypt
- Verificação de domínio institucional nos e-mails
- Rotas de alunos, matrículas e notas

---

## 🔐 Validações

- Apenas emails institucionais permitidos:
  - `@aluno.ifnmg.edu.br`
  - `@ifnmg.edu.br`
- CPF: exatamente 11 dígitos numéricos
- Senha: mínimo de 6 caracteres
- Confirmação de senha no cadastro
- Toasts visuais para feedback ao usuário

---

## 🧭 Navegação

| Rota         | Descrição                          | Protegida |
|--------------|-------------------------------------|-----------|
| `/login`     | Tela de autenticação               | ❌        |
| `/register`  | Cadastro de novos alunos           | ❌        |
| `AppTabs`    | TabBar com “Home” e “Perfil”       | ✅        |
| `/disciplina`| Tela com detalhes das notas        | ✅        |

---

## 🏠 Home

- Saudação com nome e avatar
- Listagem de disciplinas com:
  - Nome
  - Semestre (ex: `2025/1º semestre`)
  - Botão “Ver notas”
- Filtro de semestre com Picker estilizado
- Integração com rota: `GET /matriculas/aluno/:id`

---

## 👤 Perfil

- Dados do aluno: nome, email, matrícula
- Edição de nome (UI pronta)
- Alteração de senha (UI pronta)
- Logout com reset da navegação
- Integração com rota: `POST /auth/logout`

---

## 📚 Tela Disciplina (em desenvolvimento)

- Exibição de notas (N1, N2, N3)
- Média e status (Aprovado/Reprovado)
- Rota de integração: `GET /medias/aluno/:alunoId/disciplina/:disciplinaId`

---

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Rodar app com Expo
npx expo start

# Rodar backend (em outro terminal)
npm run dev
```

## ✅ Testado e validado com

- Tokens persistentes
- Fluxo completo de autenticação
- Navegação protegida
- Feedback visual (erros e sucesso)
- UX acessível e responsiva
