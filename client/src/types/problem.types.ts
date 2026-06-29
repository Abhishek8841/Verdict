export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type AllProblemsType = {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    createdAt: Date;
}[]


export type problemType = {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    testCases: {
        id: string;
        output: string;
        problemId: string;
        input: string;
        isHidden: boolean;
    }[];
}
