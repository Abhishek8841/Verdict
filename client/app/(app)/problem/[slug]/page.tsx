"use client";

import { getProblem } from "@/src/services/problems.services";
import { problemType } from "@/src/types/problem.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Problem() {
    const { slug } = useParams<{ slug: string }>();
    const [problem, setProblem] = useState<problemType | null>(null);


    useEffect(() => {
        getProblem(slug).then(setProblem).catch(() => { });
    }, [])
    if (!problem) return <></>
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">

            {/* LEFT: Problem Section */}
            <div className="w-1/2 border p-4 rounded">
                <h1 className="text-2xl font-bold">{problem.title}</h1>

                <p className="text-gray-600 mt-2">
                    {problem.description}
                </p>

                <span className="mt-2 inline-block px-2 py-1 bg-green-200 rounded">
                    {problem.difficulty}
                </span>

                {/* Test Cases */}
                <div className="mt-4">
                    <h2 className="font-semibold">Examples</h2>

                    {problem.testCases.map((tc, idx) => (
                        <div key={tc.id} className="mt-2 p-2 border rounded">
                            <p><b>Input:</b> {tc.input}</p>
                            <p><b>Output:</b> {tc.output}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Editor Section */}
            <div className="w-1/2 border p-4 rounded">
                <h2 className="font-semibold mb-2">Code Editor</h2>

                {/* Monaco will go here later */}
                <div className="h-[500px] bg-gray-100 flex items-center justify-center">
                    Editor Coming Soon...
                </div>
            </div>

        </div>
    );
}
