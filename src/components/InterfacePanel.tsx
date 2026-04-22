"use client";

import { useState } from "react";
import ResultCard from "@/src/components/dashboard/ResultCard";
import AppButton from "@/src/components/ui/AppButton";
import Alert from "@/src/components/ui/Alert";

type Props = {
  userEmail: string;
};

type ProcessResult = {
  transformer: string;
  vector: number[];
};

function normalizeVectorPayload(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item));
  }

  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;

    if (Array.isArray(objectValue.data)) {
      return objectValue.data
        .map((item) => Number(item))
        .filter((item) => Number.isFinite(item));
    }

    return Object.values(objectValue)
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item));
  }

  return [];
}

function getTransformerPreview(value?: string) {
  if (!value) {
    return {
      headline: "Waiting",
      detail: "No result yet",
    };
  }

  const normalized = value.trim();
  const sentimentMatch = normalized.match(/^(positive|negative|neutral)/i);
  const scoreMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*%/);

  return {
    headline: sentimentMatch
      ? `${sentimentMatch[1][0].toUpperCase()}${sentimentMatch[1]
          .slice(1)
          .toLowerCase()}`
      : normalized,
    detail: scoreMatch ? `${scoreMatch[1]}% confidence` : "Result ready",
  };
}

// The main dashboard panel keeps controls on the left and scrollable outputs on the right.
export default function InterfacePanel({ userEmail }: Props) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [activeOutput, setActiveOutput] = useState<"transformer" | "vector">(
    "transformer"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleProcess() {
    if (!text.trim()) {
      setError("Please enter some text before running the model.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(null);
        setError(data.error ?? "Could not process the text.");
        return;
      }

      const normalizedVector = normalizeVectorPayload(data.vector);

      setResult({
        transformer: data.transformer,
        vector: normalizedVector,
      });
    } catch (processingError) {
      console.error(processingError);
      setResult(null);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      window.location.href = "/";
    } catch (logoutError) {
      console.error(logoutError);
      setLoggingOut(false);
    }
  }

  const transformerText = result?.transformer ?? "Waiting for transformer output.";
  const vectorValues = result?.vector ?? [];
  const vectorCount = vectorValues.length;
  const vectorText = vectorCount
    ? JSON.stringify(vectorValues, null, 2)
    : "Waiting for vector output.";
  const transformerPreview = getTransformerPreview(result?.transformer);

  return (
    <section className="grid h-full min-h-0 gap-4 overflow-hidden xl:grid-cols-[minmax(20rem,0.8fr)_minmax(28rem,1.2fr)]">
      <div className="surface-panel-strong flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[2rem] p-5 sm:p-6 animate-fade-up">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="section-label text-xs">Control</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Model input</h2>
            <p className="mt-2 truncate text-sm text-slate-400">
              Signed in as {userEmail}
            </p>
          </div>

          <AppButton
            disabled={loggingOut}
            variant="ghost"
            className="whitespace-nowrap"
            onClick={handleLogout}
          >
            {loggingOut ? "Signing out..." : "Sign out"}
          </AppButton>
        </div>

        <div className="mt-4 grid min-h-0 flex-1 gap-4 grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="min-w-0 rounded-[1.35rem] border border-emerald-300/14 bg-emerald-300/7 px-4 py-3">
              <p className="min-w-0 break-all text-[11px] uppercase leading-4 tracking-[0.18em] text-emerald-200">
                Session
              </p>
              <p className="mt-2 text-sm font-medium text-white">Protected</p>
            </div>

            <div className="min-w-0 rounded-[1.35rem] border border-sky-300/14 bg-sky-300/7 px-4 py-3">
              <p className="min-w-0 break-all text-[11px] uppercase leading-4 tracking-[0.18em] text-sky-200">
                Vector size
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {vectorCount} values
              </p>
            </div>

            <div className="min-w-0 rounded-[1.35rem] border border-amber-300/14 bg-amber-300/7 px-4 py-3">
              <p className="min-w-0 break-all text-[11px] uppercase leading-4 tracking-[0.18em] text-amber-200">
                Transformer
              </p>
              <p
                className="mt-2 truncate text-sm font-semibold text-white"
                title={transformerPreview.headline}
              >
                {transformerPreview.headline}
              </p>
              <p
                className="mt-1 truncate text-xs text-amber-50/80"
                title={transformerPreview.detail}
              >
                {transformerPreview.detail}
              </p>
            </div>
          </div>

          <label className="flex min-h-0 min-w-0 flex-col gap-3 overflow-hidden rounded-[1.7rem] border border-sky-300/14 bg-sky-300/6 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-white">Text input</span>
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-slate-300">
                1000 max
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Paste or write the text you want to process.
            </p>

            <textarea
              className="h-full min-h-[12rem] w-full flex-1 resize-none rounded-[1.4rem] border border-white/10 bg-slate-950/78 px-5 py-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-sky-300/60 lg:min-h-0"
              placeholder="Write text here"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>

          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
              <AppButton disabled={loading} onClick={handleProcess}>
                {loading ? "Processing..." : "Run analysis"}
              </AppButton>

              <AppButton
                disabled={loading || !text}
                variant="secondary"
                onClick={() => {
                  setText("");
                  setError("");
                  setResult(null);
                }}
              >
                Clear
              </AppButton>
            </div>

            {error ? (
              <Alert variant="error">{error}</Alert>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid min-h-0 min-w-0 gap-4 overflow-hidden animate-fade-up-delay">
        <div className="grid min-h-0 gap-3 xl:hidden">
          <div className="grid grid-cols-2 gap-2 rounded-[1.25rem] border border-white/10 bg-white/5 p-2">
            <button
              type="button"
              onClick={() => setActiveOutput("transformer")}
              className={`rounded-[1rem] px-4 py-2 text-sm font-medium ${
                activeOutput === "transformer"
                  ? "bg-amber-300/16 text-amber-100"
                  : "text-slate-300"
              }`}
            >
              Transformer
            </button>
            <button
              type="button"
              onClick={() => setActiveOutput("vector")}
              className={`rounded-[1rem] px-4 py-2 text-sm font-medium ${
                activeOutput === "vector"
                  ? "bg-sky-300/16 text-sky-100"
                  : "text-slate-300"
              }`}
            >
              Vector
            </button>
          </div>

          {activeOutput === "transformer" ? (
            <ResultCard
              accent="amber"
              title="Transformer output"
              description="Model result"
            >
              <div className="output-shell h-[17rem] min-h-[12rem]">
                <div className="output-body scroll-widget overflow-x-hidden whitespace-pre-wrap break-words text-base font-medium leading-8 text-white">
                  {transformerText}
                </div>
              </div>
            </ResultCard>
          ) : (
            <ResultCard accent="sky" title="Vector output" description="Embedding values">
              <div className="output-shell h-[19rem] min-h-[14rem]">
                <pre className="output-body scroll-widget m-0 whitespace-pre-wrap break-words text-xs leading-6 text-sky-100">
                  {vectorText}
                </pre>
              </div>
            </ResultCard>
          )}
        </div>

        <div className="hidden min-h-0 min-w-0 gap-4 overflow-hidden xl:flex xl:flex-col">
          <div className="min-h-[16.5rem] min-w-0 flex-[0.92_1_0%] overflow-hidden">
            <ResultCard
              accent="amber"
              title="Transformer output"
              description="Model result"
            >
              <div className="output-shell h-full min-h-[12rem]">
                <div className="output-body scroll-widget overflow-x-hidden whitespace-pre-wrap break-words text-base font-medium leading-8 text-white">
                  {transformerText}
                </div>
              </div>
            </ResultCard>
          </div>

          <div className="min-h-[21rem] min-w-0 flex-[1.08_1_0%] overflow-hidden">
            <ResultCard
              accent="sky"
              title="Vector output"
              description="Embedding values"
            >
              <div className="output-shell h-full min-h-[16rem]">
                <pre className="output-body scroll-widget m-0 whitespace-pre-wrap break-words text-xs leading-6 text-sky-100">
                  {vectorText}
                </pre>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </section>
  );
}
