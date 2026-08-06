import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  baseURL: process.env.BETTER_AUTH_URL, 
  trustedOrigins: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [])
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    database: {
      generateId: 'uuid'
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 
    }
  }  
});