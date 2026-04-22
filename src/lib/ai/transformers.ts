const HF_API = "https://api-inference.huggingface.co/models";
const HF_TOKEN = process.env.HUGGINGFACE_TOKEN; // opcional pero evita rate limits

async function hfPost(model: string, inputs: string) {
  const res = await fetch(`${HF_API}/${model}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(HF_TOKEN && { Authorization: `Bearer ${HF_TOKEN}` }),
    },
    body: JSON.stringify({ inputs }),
  });
  if (!res.ok) throw new Error(`HF error: ${res.status}`);
  return res.json();
}

export async function runTransformerAnalysis(text: string) {
  const [classification, embedding] = await Promise.all([
    hfPost(
      "distilbert-base-uncased-finetuned-sst-2-english",
      text
    ),
    hfPost(
      "sentence-transformers/all-MiniLM-L6-v2",
      text
    ),
  ]);

  const topResult = classification[0]?.[0] ?? classification[0];
  const vector = (embedding[0] ?? embedding).map((v: number) =>
    Number(v.toFixed(6))
  );

  return {
    transformer: topResult
      ? `${topResult.label} (${(topResult.score * 100).toFixed(2)}%)`
      : "No transformer output available",
    vector,
  };
}
