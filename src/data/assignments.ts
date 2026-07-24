import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type AssignmentComplete = Awaited<ReturnType<typeof getAssignmentBySlug>>

const defaultAssignmentSelect = {
  title: true,
  description: true,
  classes: true,
  status: true,
  submissionDate: true,
  slug: true,
} satisfies Prisma.AssignmentSelect

export type AssignmentType = Prisma.AssignmentGetPayload<{ select: typeof defaultAssignmentSelect }>;

export async function getAssignments<T extends Prisma.AssignmentSelect>(select?: T) {
  return await prisma.assignment.findMany({
    select: select ?? defaultAssignmentSelect
  });
}

export async function getAssignmentBySlug(slug: string) {
  return await prisma.assignment.findUnique({ where: { slug },
    include: {
      classes: true
    }
  });
}