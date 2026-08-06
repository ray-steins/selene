import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function getClasses<T extends Prisma.ClassSelect>(select?: T) {
  return await prisma.class.findMany({
    select: select ?? {
      name: true,
      slug: true
    }
  });
}

export async function getClassBySlug(slug: string) {
  return await prisma.class.findUnique({ 
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
}