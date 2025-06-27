# 🎓 Sistema Acadêmico IFNMG

Aplicativo mobile desenvolvido com React Native e Laravel, voltado para alunos do Instituto Federal do Norte de Minas Gerais (IFNMG). Permite autenticação segura e visualização de notas por disciplina, em um ambiente funcional e responsivo.

## 📋 Objetivo

Construir um protótipo funcional para avaliação prática na vaga de desenvolvedor de software, que permita:

- Login com e-mail institucional
- Seleção de disciplina
- Exibição de nome, semestre, 3 notas (N1, N2, N3)
- Cálculo da média final (feito no backend)

## ✅ Funcionalidades

- Autenticação JWT segura via Laravel Sanctum
- Listagem de disciplinas por matrícula
- Visualização das notas N1, N2, N3 por disciplina
- Exibição de média final e status (Aprovado / Reprovado)
- Edição de nome e senha no perfil
- Logout com destruição do token

## 🧪 Modelo de Dados

Baseado no modelo sugerido:

- **alunos** (id, nome, cpf, email, senha)
- **disciplinas** (id, nome, semestre)
- **matriculas** (id, aluno_id, disciplina_id, semestre)
- **notas** (id, aluno_id, disciplina_id, nota1, nota2, nota3)

## 🚀 Tecnologias Utilizadas

### Backend – Laravel 10 (PHP 8.2):
- Laravel Sanctum (API Token Authentication)
- Eloquent ORM + Migrations + Seeders
- Middleware auth:sanctum para rotas protegidas
- Envio de email com senha temporária via Mailtrap
- API RESTful com respostas JSON padronizadas

### Frontend – React Native + Expo:
- React Navigation (Stack & Bottom Tabs)
- React Hook Form + Zod
- Axios com interceptor de token JWT
- Tipagem com TypeScript
- Toasts com react-native-toast-message
- Componentes reutilizáveis

## 🔐 Validações Implementadas

- E-mail institucional válido (@aluno.ifnmg.edu.br ou @ifnmg.edu.br)
- CPF com 11 dígitos e verificação de validade
- Senha com no mínimo 6 caracteres, uma letra maiúscula e um número
- Confirmação de senha no cadastro
- Feedback visual para todos os erros

## 📚 Principais Rotas da API

- `POST /login` – Autenticação e geração de token
- `POST /logout` – Revogação do token (requisição autenticada)
- `POST /forgot-password` – Geração e envio de nova senha por e-mail
- `PUT /auth/profile/{id}/nome` – Atualiza o nome do aluno
- `PUT /auth/profile/{id}/senha` – Altera senha com verificação da senha atual
- `GET /disciplinas/aluno/{alunoId}` – Lista disciplinas do aluno
- `GET /disciplinas/{alunoId}/nota/{disciplinaId}` – Exibe notas (N1, N2, N3)
- `GET /disciplinas/{alunoId}/media/{disciplinaId}` – Retorna a média final e status

## 📦 Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/chines05/Sistema-Academico-de-Alunos-e-Notas.git
cd Sistema-Academico-de-Alunos-e-Notas
```

### 2. Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure o arquivo `.env` com:
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAILTRAP_USER` e `MAILTRAP_PASS` (opcional)

Em seguida:
```bash
php artisan migrate:fresh --seed
php artisan serve 
```

Backend disponível em: `http://SEU_IP_LOCAL:8000/api`

### 3. Frontend (Expo)
```bash
cd frontend
npm install
npx expo start
```

Abra com o aplicativo Expo Go no celular ou em emulador. Edite a variável `baseURL` no arquivo `utils/api.ts` para apontar para o IP local do backend (exemplo: `http://192.168.0.105:8000/api`)

## 🧪 Usuário de Teste

- **Email:** chines@aluno.ifnmg.edu.br
- **Senha:** Chines05

Esse aluno possui diversas disciplinas e notas associadas.

## 🗂️ Estrutura do Projeto

### backend/
- `app/Http/Controllers` – Lógicas de autenticação, disciplinas, notas
- `database/seeders` – Dados pré-cadastrados
- `routes/api.php` – Rotas REST protegidas e públicas

### frontend/
- `pages` – Telas: Login, Home, Disciplina, Perfil
- `components` – Input, Header, CardDisciplina, Toast
- `schemas` – Validações com Zod
- `utils/api.ts` – Configuração global do Axios com JWT

## ✅ Requisitos Atendidos

- Backend em Laravel com autenticação e rotas protegidas ✔️
- Frontend em React Native com layout limpo ✔️
- Tela de login ✔️
- Seleção de disciplina + exibição das notas ✔️
- Média calculada no backend ✔️
- Indicação de status (aprovado / reprovado) ✔️
- API RESTful ✔️
- README e instruções completas ✔️
- Migrations + seeders ✔️
- Vídeo incluído ✔️
