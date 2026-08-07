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

export async function removeUserFromClass(id: string, classSlug: string) {
  try {
    await prisma.user.update({ where: { id },
      data: {
        classes: {
          disconnect: { slug: classSlug }
        }
      }
    })
  } catch (error) {
    throw new Error('Error occured.', { cause: error })
  }
}