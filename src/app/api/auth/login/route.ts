import prisma from "@/src/lib/db/prisma";
import { loginSchema } from "@/src/lib/validations/auth";
import { comparePassword } from "@/src/lib/validations/hash";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = loginSchema.safeParse(body);

        if (!parsed.success) {
            return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
        }

        const { email, password } = parsed.data;

        // 1. Search user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // 2. Compare passwords
        const isPasswordMatch = comparePassword(password, user.password);

        if (!isPasswordMatch) {
            return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // 3. Successful response (Here will be the JWT logic)
        return Response.json({ ok: true, user: { email: user.email } });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}