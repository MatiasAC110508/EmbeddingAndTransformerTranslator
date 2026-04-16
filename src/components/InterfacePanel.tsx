"use client";

import { useState } from "react";
import Input from "./Input";
import { stringify } from "querystring";
import { cat } from "@xenova/transformers";

export default function InterfacePanel() {
    const [text, setText] = useState("");
    const [transformerOutPut, setTransformerOutPut] = useState("");
    const [embeddingOutPut, setEmbeddingOutPut] = useState<string | number[]>([]);
    const [loading, setLoading] = useState(false);

    const handleProcess = async () => {
        if (!text) return;

        setLoading(true);

        try {
            const res = await fetch("/api/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = await res.json();

            setTransformerOutPut(data.transformer);
            setEmbeddingOutPut(data.embedding);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">

            {/* INPUT */}
            <div className="flex gap-2">
                <Input
                    placeholder="Write text to process..."
                    value={text}
                    onChange={setText}
                />

                <button
                    onClick={handleProcess}
                    className="bg-blue-600 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? "Processing..." : "Run"}
                </button>
            </div>

            {/* OUTPUTS */}
            <div className="grid grid-cols-2 gap-4">
                
                {/* Transformer Output*/}</div>
                <div className="bg-zinc900 p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2">
                        ransformer OutPut
                    </h2>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap">
                        {transformerOutPut || "No output yet"}
                    </p>
                </div>

                {/* Embedding Output*/}
                <div className="bg-zinc900 p-4 rounded">
                    <h2 className="text-lg font-semibold mb-2">
                        Embedding OutPut
                    </h2>
                    
                    <pre className="text-xs text-zinc-400">
                        {Array.isArray(embeddingOutPut) 
                            ? JSON.stringify(embeddingOutPut, null, 2) 
                            : embeddingOutPut}
                    </pre>
                </div>
        </div>
    );
}