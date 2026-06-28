export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type AllProblemsType = {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    createdAt: Date;
}[]
