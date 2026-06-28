"use client";

import { useRouter } from "next/navigation";

export default function ProblemButton({ slug }: { slug: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() =>
                router.push(`/problem/${slug}`)
            }
        >
            Solve
        </button>
    );
}