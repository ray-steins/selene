import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default function GET() {
  return NextResponse.json(
    { message: 'lolol' },
    { status: 200 }
  )
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    console.log(body);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error occurded.' },
      { status: 500 }
    )
  }
}