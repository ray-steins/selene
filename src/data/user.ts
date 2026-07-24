import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type UserClasses = Awaited<ReturnType<typeof getUserClasses>>

export async function getUserClasses(userId: string) {
  const classes = await prisma.user.findUnique({where: { id: userId },
    select: {
      classes: {
        include: {
          assignments: {
            include: {
              classes: true
            }
          }
        }
      }
    }
  })
  return classes?.classes;
}

export async function getCurrentUserFromServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}