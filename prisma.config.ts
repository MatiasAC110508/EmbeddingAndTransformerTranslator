import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  datasource: {
    // Aquí es donde Prisma 7 busca la conexión
    url: process.env.DATABASE_URL,
  },
});