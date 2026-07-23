'use server';

import { getClasses } from "@/data/class";
import { prisma } from "@/lib/prisma"
import { neutralizeString } from "@/lib/stringUtils";
import { revalidatePath } from "next/cache";

export async function createClass(name?: string, userId?: string) {
  const classes = await getClasses();

  const className = name ?? `New Class ${classes.length}`;
  const slug = neutralizeString(className);

  try {
    const newClass = await prisma.class.create({
      data: { name: className, slug }
    });
    if (userId) addUserToClass(userId, newClass.slug);
    revalidatePath('/');

    return newClass;
  } catch (error) {
    console.error(error);
    throw new Error('Error occured.', { cause: error })
  }
}

export async function deleteClass(slug: string) {
  try {
    await prisma.class.delete({
      where: { slug }
    })
  } catch (error) {
    console.error(error);
    throw new Error('Error occured', { cause: error })
  }
}

export async function updateClassName(slug: string, name: string) {
  const newSlug = neutralizeString(name)
  try {
    await prisma.class.update({
      where: { slug },
      data: { name, slug: newSlug }
    });
    revalidatePath('/')
  } catch (error) {
    console.error(error);
    throw new Error('Error occured', { cause: error })
  }
}

export async function addUserToClass(userId: string, slug: string) {
  try {
    await prisma.class.update({ where: { slug },
      data: {
        users: {
          connect: { id: userId }
        }
      }
    });
    revalidatePath('/')
  } catch (error) {
    throw new Error('Error occured.', { cause: error })
  }
}