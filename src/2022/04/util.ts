export const parseSections = (input: string) =>
    input.split('\n').map((line) =>
        line.split(',').map((elf) => {
            const [start, end] = elf.split('-');
            return [parseInt(start), parseInt(end)];
        })
    );
