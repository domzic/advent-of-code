import Procedure from './Procedure';

type Stacks = Record<number, string[]>;
export const parseStacks = (input: string): Stacks => {
    const array = input.split('\n');
    array.pop();
    const stacks: Stacks = {};
    array.forEach((line) => {
        let order = 1;
        for (let i = 1; i <= line.length; i += 4) {
            if (line[i] !== ' ') {
                if (stacks[order]) {
                    stacks[order].unshift(line[i]);
                } else {
                    stacks[order] = [line[i]];
                }
            }
            order++;
        }
    });

    return stacks;
};

export const parseProcedures = (input: string): Procedure[] => {
    const procedurePattern = /move (\d+) from (\d+) to (\d+)/;
    return input.split('\n').reduce<Procedure[]>((accumulated, current) => {
        try {
            const matches = current.match(procedurePattern)!;
            accumulated.push({
                count: parseInt(matches[1]),
                from: parseInt(matches[2]),
                to: parseInt(matches[3]),
            });
        } catch (error) {
            console.error('Error in procedures definition: ', error);
        }
        return accumulated;
    }, []);
};
