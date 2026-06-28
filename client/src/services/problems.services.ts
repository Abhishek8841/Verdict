import { api } from "../lib/api";
import { AllProblemsType } from "../types/problem.types";

export async function getAllProblems(): Promise<AllProblemsType> {
    const result = await api.get("/problem/all");
    return result.data.problems;
}