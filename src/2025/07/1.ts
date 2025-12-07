export default async function (input: string) {
    const lines = input.trim().split(/\n/);
    const rows = lines.length;
    const cols = Math.max(...lines.map((l) => l.length));
    const grid = Array.from({ length: rows }, (_, r) =>
        lines[r].padEnd(cols, '.').split('')
    );

    let splits = 0;
    let beamSet = new Set<number>();
    beamSet.add(lines[0].indexOf('S'));

    for (let r = 1; r < rows; r++) {
        const nextBeamSet = new Set<number>();
        for (const col of beamSet) {
            if (grid[r][col] === '^') {
                splits++;
                if (col - 1 >= 0) {
                    nextBeamSet.add(col - 1);
                }
                if (col + 1 < cols) {
                    nextBeamSet.add(col + 1);
                }
            } else {
                nextBeamSet.add(col);
            }
        }

        beamSet = nextBeamSet;
    }

    console.log({ splits });
}
