import { parseStacks, parseProcedures } from './parser';

export default function (input: string) {
    const [stacksInput, proceduresInput] = input.split('\n\n');
    const [stacks, procedures] = [
        parseStacks(stacksInput),
        parseProcedures(proceduresInput),
    ];

    procedures.forEach(({ count, from, to }) => {
        Array.from(Array(count)).forEach(() => {
            const itemToMove = stacks[from].pop()!;
            stacks[to].push(itemToMove);
        });
    });

    console.log(
        Object.values(stacks).reduce(
            (str, arr) => str + arr[arr.length - 1],
            ''
        )
    );
}
