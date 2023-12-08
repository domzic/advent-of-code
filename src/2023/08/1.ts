const START = 'AAA';
const FINISH = 'ZZZ';

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
    let currentNode = nodes[START];
    let steps = 0;
    while (!finished) {
        if (currentNode.n === FINISH) {
            finished = true;
            break;
        }

        steps++;
        currentNode = nodes[currentNode[instructions[i]]];
        i = i === instructions.length - 1 ? 0 : i + 1;
    }
    console.log(steps);
}
