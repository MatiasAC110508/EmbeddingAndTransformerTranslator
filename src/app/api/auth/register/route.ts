import { Prisma } from "@prisma/client";
import prisma from "@/src/lib/db/prisma";
import { registerSchema } from "@/src/lib/validations/auth";
import { hashPassword } from "@/src/lib/validations/hash";

// The register route validates incoming data and persists a new user when the email is unique.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // A pre-check prevents unnecessary hashing work when the user already exists.
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return Response.json({ ok: true, userId: user.id }, { status: 201 });
  } catch (error) {
    // The database unique constraint acts as a final guard against race conditions.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    console.error(error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
