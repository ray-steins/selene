import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Prisma } from "@/generated/prisma/client";
import { verifyAssignmentStatus } from "./assignments";

export type UserClasses = Awaited<ReturnType<typeof getUserClasses>>

export async function getUserClasses(userId: string) {
  const args = {
    where: { id: userId },
    select: {
      classes: {
        include: {
          assignments: {
            orderBy: { submissionDate: 'asc' },
            include: { classes: true },
          },
        }
      },
    },
  } satisfies Prisma.UserFindUniqueArgs;

  const result = await prisma.user.findUnique({
    ...args,
  });

  return Promise.all(result!.classes.map(async (data) => ({
    ...data,
    assignments: await Promise.all(data.assignments.map((assignment) => verifyAssignmentStatus(assignment, userId)))
  })));
}

export async function getCurrentUserFromServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}