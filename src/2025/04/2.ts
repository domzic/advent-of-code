const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export default async function (input: string) {
    const lines = input.trim().split(/\r?\n/);
    const rows = lines.length;
    const cols = Math.max(...lines.map((l) => l.length));
    const grid = Array.from({ length: rows }, (_, r) =>
        lines[r].padEnd(cols, '.').split('')
    );

    let result = 0;
    while (true) {
        const toRemove: [number, number][] = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] !== '@') {
                    continue;
                }

                let neighbors = 0;
                for (const [offsetR, offsetC] of offsets) {
                    const nr = r + offsetR;
                    const nc = c + offsetC;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                        continue;
                    }
                    if (grid[nr][nc] === '@') {
                        neighbors++;
                    }
                }
                if (neighbors < 4) {
                    toRemove.push([r, c]);
                }
            }
        }

        if (toRemove.length === 0) {
            break;
        }

        for (const [r, c] of toRemove) {
            grid[r][c] = '.';
        }

        result += toRemove.length;
    }

    console.log({ result });
}
