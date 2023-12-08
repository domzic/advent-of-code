export default function (input: string) {
    const [instructionsPart, nodesPart] = input.split(/\n\n/);
    const instructions = [...instructionsPart.toLowerCase()] as ('l' | 'r')[];
    const nodes = nodesPart.split(/\n/).reduce((acc, line) => {
        const [n, l, r] = [...line.match(/\w+/g)!];
        acc[n] = { l, r, n };
        return acc;
    }, {} as Record<string, { l: string; r: string; n: string }>);

    let finished = false;
    let i = 0;
    let currentNodes = Object.keys(nodes)
        .filter((n) => n.endsWith('A'))
        .map((key) => nodes[key]);
    const nodesLength = currentNodes.length;
    let steps = 0;
    const nodeToFinishSteps: Record<string, number> = {};

    while (!finished) {
        currentNodes
            .filter((currentNode) => currentNode.n.endsWith('Z'))
            .forEach((node) => {
                if (node.n.endsWith('Z')) {
                    nodeToFinishSteps[node.n] = steps;
                    delete currentNodes[node.n as any];
                }
            });

        if (Object.keys(nodeToFinishSteps).length === nodesLength) {
            finished = true;
            break;
        }

        steps++;
        currentNodes = currentNodes.map((node) => nodes[node[instructions[i]]]);
        i = i === instructions.length - 1 ? 0 : i + 1;
    }
    console.log(lcm(Object.values(nodeToFinishSteps)));
}

function lcm(numbers: number[]): number {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);
    return numbers.reduce(lcm);
}
