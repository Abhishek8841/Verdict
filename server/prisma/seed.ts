import { prisma } from "../shared/db/prisma.js";
import {
    Difficulty,
    SubmissionStatus,
    Language
} from "../shared/db/generated/prisma/enums";
import bcrypt from "bcrypt";

async function main() {
    const hashedPassword = await bcrypt.hash("hashed-password", 10);
    const user1 = await prisma.user.create({
        data: {
            username: "abhishek",
            passwordHash: hashedPassword
        }
    });

    const user2 = await prisma.user.create({
        data: {
            username: "demo",
            passwordHash: hashedPassword
        }
    });

    const problem1 = await prisma.problem.create({
        data: {
            title: "Two Sum",
            slug: "two-sum",
            description: "Return sum of two numbers",
            difficulty: Difficulty.EASY,

            testCases: {
                create: [
                    {
                        input: "1 2",
                        output: "3",
                        isHidden: false
                    },
                    {
                        input: "10 20",
                        output: "30",
                        isHidden: true
                    }
                ]
            }
        }
    });

    const problem2 = await prisma.problem.create({
        data: {
            title: "Maximum Number",
            slug: "maximum-number",
            description: "Find maximum of two numbers",
            difficulty: Difficulty.MEDIUM,

            testCases: {
                create: [
                    {
                        input: "5 8",
                        output: "8",
                        isHidden: false
                    },
                    {
                        input: "100 20",
                        output: "100",
                        isHidden: true
                    }
                ]
            }
        }
    });

    const problem3 = await prisma.problem.create({
        data: {
            title: "Factorial",
            slug: "factorial",
            description: "Calculate factorial",
            difficulty: Difficulty.HARD,

            testCases: {
                create: [
                    {
                        input: "5",
                        output: "120",
                        isHidden: false
                    },
                    {
                        input: "7",
                        output: "5040",
                        isHidden: true
                    }
                ]
            }
        }
    });

    await prisma.submission.create({
        data: {
            code: "cout << a+b;",
            language: Language.CPP,
            status: SubmissionStatus.PENDING,

            userId: user1.id,
            problemId: problem1.id
        }
    });

    console.log("Seed completed");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });