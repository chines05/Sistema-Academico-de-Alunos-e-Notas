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

## 📚 Principais Rotas da API

### Rotas Públicas:

- `POST /login` – Autenticação e geração de token
- `POST /generate-new-password` – Geração e envio de nova senha por e-mail

### Rotas Protegidas (auth:sanctum):

- `POST /logout` – Revogação do token
- `GET /user` – Dados do usuário autenticado
- `PUT /change-password` – Altera senha do usuário
- `PUT /change-name` – Atualiza nome do usuário
- `GET /alunos/{aluno}/disciplinas` – Lista disciplinas do aluno
- `GET /alunos/{aluno}/disciplinas/{disciplina}/notas` – Exibe notas (N1, N2, N3)
- `GET /alunos/{aluno}/disciplinas/{disciplina}/media` – Retorna média final e status

## 📦 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/chines05/Sistema-Academico-de-Notas-IFNMG.git
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

- `DB_CONNECTION`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_MAILER`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_ENCRYPTION`
- `MAIL_FROM_ADDRESS`
- `MAIL_FROM_NAME`

Em seguida:

```bash
php artisan migrate --seed
php artisan serve --host=0.0.0.0
```

Backend disponível em: `http://SEU_IP_LOCAL:8000/api`

### 3. Frontend (Expo)

```bash
cd frontend
npm install
npx expo start
```

Abra com o aplicativo Expo Go no celular ou em emulador. Edite a variável `baseURL` no arquivo `utils/api.ts` para apontar para o IP local do backend (exemplo: `http://192.168.15.7:8000/api`)

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

## 📋 Análise de Requisitos e Decisões Técnicas

### Decisões de Arquitetura

**Backend (Laravel)**

- **Laravel Sanctum**: Escolhido para autenticação JWT por ser nativo, seguro e integrado ao Laravel
- **Eloquent ORM**: Utilizado para relacionamentos entre alunos, disciplinas, matrículas e notas
- **Middleware auth:sanctum**: Protege todas as rotas sensíveis da API
- **Seeders**: Criados para popular o banco com dados de teste consistentes

**Frontend (React Native + Expo)**

- **Expo**: Facilita o desenvolvimento e teste em dispositivos físicos
- **TypeScript**: Garante tipagem forte e reduz erros em runtime
- **React Navigation**: Stack Navigator para autenticação e Bottom Tabs para navegação principal
- **React Hook Form + Zod**: Validações client-side robustas com feedback visual
- **Axios**: Automatiza o envio do token JWT e tratamento de erros

### Implementação das Regras de Negócio

1. **Autenticação Segura**

   - Criptografia de senhas com Hash::make()
   - Tokens JWT com expiração automática

2. **Cálculo de Médias**

   - Implementado no backend para garantir consistência
   - Fórmula: (N1 + N2 + N3) / 3
   - Status automático: Aprovado (≥7.0) / Reprovado (<7.0)

3. **Relacionamentos de Dados**
   - Aluno → Matrículas → Disciplinas (Many-to-Many)
   - Notas vinculadas por aluno_id e disciplina_id
   - Validação de integridade referencial

### Segurança Implementada

- **Sanitização de inputs** em todas as requisições
- **Validação server-side** complementar à client-side
- **Rate limiting** via middleware do Laravel
- **CORS configurado** para aceitar apenas origens autorizadas
- **Logout seguro** com revogação de tokens

### Decisões de UX/UI

- **Design responsivo** adaptável a diferentes tamanhos de tela
- **Feedback visual** para todos os estados (loading, erro, sucesso)
- **Navegação intuitiva** com Bottom Tabs e Stack Navigation
- **Componentes reutilizáveis** para manter consistência visual

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
