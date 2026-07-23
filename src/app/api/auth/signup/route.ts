import { SignupSchema } from "@/lib/schemas/auth/SignupSchema";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = await SignupSchema.safeParseAsync(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  try {
    const { email, password } = parsed.data;

    await auth.api.signUpEmail({
      body: {
        name: '',
        email,
        password,
      },
      asResponse: true
    });

    return NextResponse.json(
      { message: 'Account creation success.' }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal server error occured.' },
      { status: 500 }
    )
  };
}