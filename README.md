# Embedding and Transformer Workspace

## Overview

This project is a Next.js application built with the App Router. It combines three main capabilities in one workspace:

- User registration and login with Prisma and Neon PostgreSQL
- JWT-based protected sessions stored in HTTP-only cookies
- Text analysis with a transformer model plus embedding vector inspection

The application opens on a landing page, guides users through authentication, and protects the dashboard from anonymous access.

## Core functionality

### Landing page

The root route `/` is a public landing page. It introduces the product, explains the flow, and links to the authentication screens.

### Authentication

The authentication flow includes:

- `POST /api/auth/register` to create a new account
- `POST /api/auth/login` to verify credentials and create a JWT session cookie
- `POST /api/auth/logout` to clear the session cookie

Passwords are hashed with `bcrypt` before they are stored. Email uniqueness is enforced in Prisma and checked before inserting a new user.

### Protected dashboard

The `/dashboard` route is only available to authenticated users. It lets the user:

- Submit text through a focused input area
- Inspect the transformer classification output
- Inspect the embedding vector generated from the same text

Access is enforced in two layers:

- `proxy.ts` performs an early redirect for invalid or missing sessions
- Server-side session checks inside the page and API routes provide a second layer of protection

### Transformer processing

The dashboard calls `POST /api/process`. That route:

1. Validates the active session
2. Validates the request body with Zod
3. Runs a text classification pipeline
4. Runs a feature extraction pipeline
5. Returns both the transformer summary and the numeric vector

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma
- Neon PostgreSQL
- Zod
- `jose` for JWT handling
- `@xenova/transformers` for model inference

## Project structure

```text
.
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── home/
│   │   └── ui/
│   └── lib/
│       ├── ai/
│       ├── auth/
│       ├── db/
│       └── validations/
├── proxy.ts
├── package.json
└── README.md
```

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file with the following values:

```env
DATABASE_URL="your_neon_connection_string"
JWT_SECRET="a_long_random_secret"
GEMINI_API_KEY=xxxxxxxxx
```

`JWT_SECRET` should be a long random string. In production it should never use a placeholder value.

### 3. Sync the database schema

```bash
npx prisma db push
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## How the application works

### Authentication flow

1. A user submits the register or login form.
2. Zod validates the payload on the client before the request is sent.
3. The API route validates the same payload on the server.
4. On login success, the server signs a JWT and stores it in an HTTP-only cookie.
5. `proxy.ts` and server-side helpers check the cookie before allowing access to the dashboard.

### Dashboard flow

1. The authenticated user opens `/dashboard`.
2. The dashboard sends the text input to `/api/process`.
3. The process route verifies the session and validates the text length.
4. The transformer helper runs classification and embedding pipelines.
5. The UI renders the textual result and the vector output in separate panels.

## Useful scripts

```bash
npm run dev
npm run build
npm run start
npx prisma validate
npx prisma db push
```

## Notes

- The first transformer request can be slower because the model pipeline must be initialized.
- The dashboard is intentionally protected at more than one layer so route access remains predictable.
- The codebase contains inline comments in English to explain the purpose of each file and important logic branches.
