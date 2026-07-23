import { prisma } from "@/lib/prisma";

export async function getUserClasses(userId: string) {
  const classes = await prisma.user.findUnique({ where: { id: userId }, select: { classes: true } });
  return classes?.classes;
}