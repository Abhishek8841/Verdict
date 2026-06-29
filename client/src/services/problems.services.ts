import { api } from "../lib/api";
import { AllProblemsType, problemType } from "../types/problem.types";

export async function getAllProblems(): Promise<AllProblemsType> {
    const result = await api.get("/problem/all");
    return result.data.problems;
}

export async function getProblem(slug: string): Promise<problemType> {
    const result = await api.get(`/problem/${slug}`);
    return result.data.problem;
}