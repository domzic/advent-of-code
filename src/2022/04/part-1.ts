export default function (input: string) {
    const sections = input.split('\n').map((line) =>
        line.split(',').map((elf) => {
            const [start, end] = elf.split('-');
            return [parseInt(start), parseInt(end)];
        })
    );

    const overlaps = sections.reduce<number>((accumulated, pairs) => {
        const flat = pairs.flat();
        const [min, max] = [Math.min(...flat), Math.max(...flat)];
        if (pairs.find((pair) => pair.includes(min) && pair.includes(max))) {
            console.log(pairs);
            accumulated++;
        }
        return accumulated;
    }, 0);

    console.log(overlaps);
}
