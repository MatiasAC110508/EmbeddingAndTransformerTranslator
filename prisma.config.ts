import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Prisma reads the Neon connection string from the same environment file as the app.
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL, 
  },
});
