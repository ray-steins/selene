import { NextResponse } from "next/server";
import { SigninSchema } from "@/lib/schemas/auth/SigninSchema";
import { auth } from "@/lib/auth";
import z from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = await SigninSchema.safeParseAsync(body);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: z.treeifyError(parsed.error) },
      { status: 400 }
    )
  }

  try {
    const { email, password } = parsed.data;

    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: '/',
      },
      asResponse: true
    });
    
    return res;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal server error occured.' },
      { status: 500 }
    )
  }
}