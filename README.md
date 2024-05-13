# Node.js backend skeleton

This Node.js backend skeleton provides essential functionalities of a blog platform. It includes user authentication (register and login), CRUD operations for managing posts and comments, and a comprehensive Swagger documentation. Use this as a starting point to quickly kickstart your API development.

## Features

- User authentication
- Manage posts
- Manage comments
- Health endpoint
- Swagger documentation for easy API exploration

## Technologies

- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org)
- [Drizzle ORM](https://orm.drizzle.team/)
- [SQLite3](https://github.com/WiseLibs/better-sqlite3)
- [JSend](https://github.com/omniti-labs/jsend)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)

## Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Start the development server: 

```bash
pnpm run dev
```

Open the [Swagger documentation](http://127.0.0.1:8080/api/v1/documentation/) in your browser to see all available API endpoints.

## Scripts

| Script | Description |
| - | - |
| `pnpm run build` | Build the application for production |
| `pnpm run start` | Start the application |
| `pnpm run dev` | Start the development server |
| `pnpm run lint` | Find problems in the code |
| `pnpm run migrate:generate` | Generate database migrations |
| `pnpm run migrate:push` | Push schema changes to the database |
| `pnpm run test` | Run the tests |
| `pnpm run commitlint` | Check the commit message format |
