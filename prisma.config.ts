// Prisma 7 config — required. Render provides DATABASE_URL natively.
try { require('dotenv/config') } catch { /* production: env vars from platform */ }
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
