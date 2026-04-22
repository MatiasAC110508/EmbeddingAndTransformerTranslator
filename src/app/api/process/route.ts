import { runTransformerAnalysis } from "@/src/lib/ai/transformers";
import { getSession } from "@/src/lib/auth/session";
import { processSchema } from "@/src/lib/validations/process";

// The processing route is the single backend entry point for dashboard analysis requests.
export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = processSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = await runTransformerAnalysis(parsed.data.text);

    return Response.json({
      ok: true,
      transformer: result.transformer,
      vector: result.vector,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to process text right now" },
      { status: 500 }
    );
  }
}
