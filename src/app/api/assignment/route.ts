import { prisma } from "@/lib/prisma";
import { AssignmentSchema } from "@/lib/schemas/WorksShema";
import { neutralizeString } from "@/lib/stringUtils";
import { NextResponse } from "next/server";
import z from "zod";

type Payload = {
  main: {
    title: string,
    submissionDate: string,
    description: string,
    totalScore: string,
  },
  classes: {
    [x: string]: {
      classId: string
    }
  },  
}

export async function POST(req: Request) {
  const body: Payload = await req.json();

  const main = body.main

  const parsed = await AssignmentSchema.safeParseAsync(main);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  try {
    const data = parsed.data;
    const slug = neutralizeString(data.title);

    const existing = await prisma.assignment.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { message: 'An assignment with this exact title alraedy exists.' },
        { status: 400 }
      )
    }

    const submissionDate = new Date(data.submissionDate);
    const totalScore = data.totalScore !== undefined && data.totalScore !== null
      ? Number(data.totalScore)
      : null;

    const asgmnt = await prisma.assignment.create({
      data: {
        ...data,
        slug,
        submissionDate,
        totalScore,
        classes: {
          connect: Object.values(body.classes).map((c) => ({ id: c.classId }))
        }
      }
    });
    console.log(asgmnt);

    return NextResponse.json(
      { message: 'Sucessfuly added assignment.' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal server error occured.' },
      { status: 500 }
    )
  }
}