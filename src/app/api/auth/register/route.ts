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

        const hashedPassword = await hashPassword(password);

        console.log({
            email, 
            password: hashPassword,
        });

        return Response.json({ ok: true });
        
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}