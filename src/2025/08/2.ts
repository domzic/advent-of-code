export default async function (input: string) {
    const points = input.split(/\n/).map((l) => l.split(',').map(Number));
    const n = points.length;

    let circuits: Set<number>[] = Array.from(
        { length: n },
        (_, i) => new Set([i])
    );

    const calcDistance = (i: number, j: number) => {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const dz = points[i][2] - points[j][2];
        return dx * dx + dy * dy + dz * dz;
    };

    const pairs: [number, number, number][] = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            pairs.push([calcDistance(i, j), i, j]);
        }
    }

    pairs.sort((a, b) => a[0] - b[0]);

    let lastPair: [number, number] | null = null;

    for (const [, a, b] of pairs) {
        let setA: Set<number> | undefined, setB: Set<number> | undefined;

        for (const circuit of circuits) {
            if (circuit.has(a)) setA = circuit;
            if (circuit.has(b)) setB = circuit;
            if (setA && setB) break;
        }

        if (setA !== setB && setA && setB) {
            for (const x of setB) {
                setA.add(x);
            }
            circuits = circuits.filter((c) => c !== setB);
            lastPair = [a, b];
        }
    }

    const x1 = points[lastPair![0]][0];
    const x2 = points[lastPair![1]][0];
    const result = x1 * x2;
    console.log({ result });
}
