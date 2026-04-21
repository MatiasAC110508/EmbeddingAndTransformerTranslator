import prisma from "@/src/lib/db/prisma";
import { registerSchema } from "@/src/lib/validations/auth";
import { hashPassword } from "@/src/lib/validations/hash";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return Response.json(
                { error: parsed.error.issues[0].message},
                {status: 400}
            );
        }

        const { email, password } = parsed.data;

        // 1. Verify that the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return Response.json({ error: "User already exists" }, { status: 400 });
        }

        // 2. Hash the password
        const hashedPassword = await hashPassword(password);

        // 3. Save data in the DB
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        return Response.json({ ok: true, userId: user.id }, { status:201 });
        
        } catch (error: any) {
            console.error("DEBUG ERROR:", error);
            return Response.json({ 
                error: "Explotó el backend", 
                message: error.message,
                code: error.code // Los códigos PXXXX de Prisma son oro puro para debuguear
            }, { status: 500 });
        }
}