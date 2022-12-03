export default async function (input: string) {
    const sum = (array: number[]): number =>
        array.reduce((acc, current) => acc + current, 0);

    const totals = input
        .split('\n\n')
        .map((elf: string) => sum(elf.split('\n').map((n) => parseInt(n))))
        .sort((a, b) => b - a);

    console.log('Totals: ', totals[0]);
    console.log('Top 3: ', sum(totals.slice(0, 3)));
}
