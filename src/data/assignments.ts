import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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