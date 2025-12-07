export default async function (input: string) {
    const lines = input.trim().split(/\n/);
    const rows = lines.length;
    const cols = Math.max(...lines.map((l) => l.length));
    const grid = Array.from({ length: rows }, (_, r) =>
        lines[r].padEnd(cols, '.').split('')
    );

    let beamMap = new Map<number, number>();
    beamMap.set(lines[0].indexOf('S'), 1);

    for (let r = 1; r < rows; r++) {
        const nextMap = new Map<number, number>();
        for (const [col, count] of beamMap.entries()) {
            const cell = grid[r][col];
            if (cell === '^') {
                if (col - 1 >= 0) {
                    nextMap.set(col - 1, (nextMap.get(col - 1) || 0) + count);
                }
                if (col + 1 < cols) {
                    nextMap.set(col + 1, (nextMap.get(col + 1) || 0) + count);
                }
            } else {
                nextMap.set(col, (nextMap.get(col) || 0) + count);
            }
        }

        beamMap = nextMap;
    }

    const timelines = [...beamMap.values()].reduce((a, b) => a + b, 0);
    console.log({ timelines });
}
