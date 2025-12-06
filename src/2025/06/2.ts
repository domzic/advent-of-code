export default async function (input: string) {
    const lines = input.trimEnd().split('\n');
    const height = lines.length;
    const width = Math.max(...lines.map((l) => l.length));
    const grid = lines.map((l) => l.padEnd(width, ' '));
    console.log({ grid });
    let result = 0;
    let col = 0;

    while (col < width) {
        const isBlank = lines.every((line) => line[col] === ' ');
        if (isBlank) {
            col++;
            continue;
        }

        const start = col;
        while (col < width && lines.some((line) => line[col] !== ' ')) {
            col++;
        }
        const end = col;

        const block = grid.map((row) => row.slice(start, end));
        const op = block[height - 1].trim();

        const innerWidth = end - start;
        const digitRows = block.slice(0, height - 1);
        const nums: number[] = [];
        for (let x = 0; x < innerWidth; x++) {
            const digits = digitRows
                .map((row) => row[x])
                .filter((ch) => ch !== ' ');
            nums.push(Number(digits.join('')));
        }
        result +=
            op === '+'
                ? nums.reduce((a, b) => a + b, 0)
                : nums.reduce((a, b) => a * b, 1);
    }

    console.log({ result });
}
