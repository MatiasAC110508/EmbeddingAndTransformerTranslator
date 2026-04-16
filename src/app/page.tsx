"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.text);
  };
  return (
    <div className="felx flex-col gap-4">
        <h1 className="text-2xl font-bold">AI Chat</h1>

        <textarea
         className="p-3 rounded bg-zinc-900"
         value={prompt}
         onChange={(e) => setPrompt(e.target.value)}
         placeholder="Ask something..."
         />

        <button
         onClick={handleSend}
         className="bg-blue-600 p-2 rounded"
        >
         send  
        </button>

        {response && (
          <div className="bg-zinc-800 p-4 rounded">
            {response}
          </div>
        )}
    </div>
  );
}

