import { pipeline } from "@xenova/transformers";

type ClassificationResult = {
  label: string;
  score: number;
};

let classifierPromise: Promise<(input: string) => Promise<ClassificationResult[]>> | null =
  null;
let embeddingPromise: Promise<
  (input: string, options?: { pooling?: string; normalize?: boolean }) => Promise<{
    data: Float32Array | number[];
  }>
> | null = null;

// Pipelines are created lazily so the server pays the model startup cost only when needed.
async function getClassifier() {
  if (!classifierPromise) {
    classifierPromise = pipeline(
      "text-classification",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    ) as Promise<(input: string) => Promise<ClassificationResult[]>>;
  }

  return classifierPromise;
}

async function getEmbedder() {
  if (!embeddingPromise) {
    embeddingPromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    ) as Promise<
      (input: string, options?: { pooling?: string; normalize?: boolean }) => Promise<{
        data: Float32Array | number[];
      }>
    >;
  }

  return embeddingPromise;
}

// The analysis helper returns a compact UI-friendly string and a normalized numeric vector.
export async function runTransformerAnalysis(text: string) {
  const classifier = await getClassifier();
  const embedder = await getEmbedder();

  const [classification, embedding] = await Promise.all([
    classifier(text),
    embedder(text, { pooling: "mean", normalize: true }),
  ]);

  const topResult = classification[0];
  const vector = Array.from(embedding.data).map((value) =>
    Number(value.toFixed(6))
  );

  return {
    transformer: topResult
      ? `${topResult.label} (${(topResult.score * 100).toFixed(2)}%)`
      : "No transformer output available",
    vector,
  };
}
