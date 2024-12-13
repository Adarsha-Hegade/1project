import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenvConfig();

// Validate environment variables
const envSchema = z.object({
  POSTGRES_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  PORT: z.string().default('3001'),
});

// Parse and validate environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.toString());
  process.exit(1);
}

export const config = {
  database: {
    url: env.data.POSTGRES_URL,
  },
  jwt: {
    secret: env.data.JWT_SECRET,
  },
  server: {
    port: parseInt(env.data.PORT, 10),
  },
};