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

        const nums = block
            .slice(0, height - 1)
            .map((row) => row.trim())
            .filter((row) => row.length > 0)
            .map(Number);
        result +=
            op === '+'
                ? nums.reduce((a, b) => a + b, 0)
                : nums.reduce((a, b) => a * b, 1);
    }

    console.log({ result });
}
