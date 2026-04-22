import { NextResponse } from "next/server";
import prisma from "@/src/lib/db/prisma";
import {
  authCookieName,
  authCookieOptions,
  signAuthToken,
} from "@/src/lib/auth/jwt";
import { loginSchema } from "@/src/lib/validations/auth";
import { comparePassword } from "@/src/lib/validations/hash";

// The login route validates credentials, signs a JWT, and stores it in a secure cookie.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // The database lookup remains narrow so the API only fetches what it needs.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.json({
      ok: true,
      user: { email: user.email },
    });

    response.cookies.set(authCookieName, token, authCookieOptions);

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
