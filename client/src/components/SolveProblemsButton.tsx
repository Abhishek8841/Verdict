"use client";

import { useRouter } from "next/navigation";

export default function ProblemButton({ slug }: { slug: string }) {
    const router = useRouter();

    return (
<button
    onClick={() => router.push(`/problem/${slug}`)}
    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
               text-white rounded-lg shadow-md hover:shadow-lg 
               hover:scale-105 transition"
>
    Solve
</button>    );
}