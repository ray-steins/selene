import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { AssignmentWithClass } from "@/lib/assignments";
import { addDays } from "@/lib/utils/dateUtils";

export type AssignmentComplete = Awaited<ReturnType<typeof getAssignmentBySlug>>

export async function verifyAssignmentStatus<T extends AssignmentWithClass>(assignment: T, userId: string): Promise<T> {
  const submissionDate = assignment.submissionDate;

  const userCompletedAssignments = (await prisma.user.findUnique({ where: { id: userId } ,
    select: {
      completedAssignments: true
    }
  }))?.completedAssignments;

  if (userCompletedAssignments?.some(v => v.slug === assignment.slug)) {
    return { ...assignment, status: 'completed' };
  }
  if (addDays(submissionDate, 1) < new Date() && assignment.status !== 'completed') {
    return { ...assignment, status: 'pastdue' };
  }


  return assignment;
}

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

export async function getAssignmentBySlug(slug: string, userId?: string) {
  const assignment = await prisma.assignment.findUnique({ where: { slug },
    include: {
      classes: true
    }
  });

  if (!assignment) {
    return undefined;
  }

  if (userId) {
    return verifyAssignmentStatus(assignment, userId)
  }

  return assignment;
}