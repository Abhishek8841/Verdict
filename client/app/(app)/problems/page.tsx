import ProblemButton from "@/src/components/SolveProblemsButton";
import { getAllProblems } from "@/src/services/problems.services";

async function getProblems() {
    try {
        const result = await getAllProblems();
        return result;
    }
    catch (error) {
        console.log("error is", error);
        console.log("Couldn't load the problems")
        return [];
    }
}
// cant use the default cookie sender for server side pages -> gotta send them manually !!!
export default async function ProblemsPage() {
    const problems = await getProblems();
    return (<div>
        {problems.map((problem) => {
            return (<div key={problem.id}>
                <div>{problem.title}</div>
                <div>{problem.difficulty}</div>
                <ProblemButton slug={problem.slug}></ProblemButton>
            </div>)
        })}
    </div>)

} 