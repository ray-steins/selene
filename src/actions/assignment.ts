'use server'

import { prisma } from "@/lib/prisma"

export async function markCompleteAssignmentForUser(userId: string, slug: string) {
  try {
    await prisma.user.update({ where: { id: userId },
      data: {
        completedAssignments: {
          connect: { slug }
        }
      }
    });
  } catch (error) {
    throw new Error('Error occured.', { cause: error })
  }
}

export async function unmarkCompleteAssignmentForUser(userId: string, slug: string) {
  try {
    await prisma.user.update({ where: { id: userId },
      data: {
        completedAssignments: {
          disconnect: { slug }
        }
      }
    })
  } catch (error) {
    throw new Error('Error occured.', { cause: error })
  }
}