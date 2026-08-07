import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { verifyAssignmentStatus } from "./assignments";

export async function getClasses<T extends Prisma.ClassSelect>(select?: T) {
  return await prisma.class.findMany({
    select: select ?? {
      name: true,
      slug: true
    }
  });
}

export async function getClassBySlug(slug: string, userId?: string) {
  const result = await prisma.class.findUnique({ 
    where: { slug }, 
    include: { 
      assignments: {
        include: {
          classes: true
        }
      },
      users: true,
    } 
  });

  if (!result) {
    return null;
  }

  if (userId) {
    const updatedAssignment = await Promise.all((result.assignments ?? []).map(async (v) => verifyAssignmentStatus(v, userId)));

    return { ...result, assignments: updatedAssignment };
  }

  return result;
}