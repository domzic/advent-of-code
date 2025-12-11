export default async function (input: string) {
    const graph: Record<string, string[]> = {};

    for (const line of input.trim().split('\n')) {
        const [from, rest] = line.split(':').map((s) => s.trim());
        const to = rest ? rest.split(/\s+/) : [];
        graph[from] = to;
    }

    const start = 'svr';
    const target = 'out';

    const cache = new Map();
    function dfs(
        node: string,
        visitedDac: boolean,
        visitedFft: boolean
    ): number {
        if (node === 'dac') {
            visitedDac = true;
        }
        if (node === 'fft') {
            visitedFft = true;
        }

        if (node === target) {
            return visitedDac && visitedFft ? 1 : 0;
        }

        if (!cache.has(node)) {
            cache.set(node, new Map());
        }

        const cachedNode = cache.get(node)!;
        const cacheKey = `${visitedDac},${visitedFft}`;
        if (cachedNode.has(cacheKey)) {
            return cachedNode.get(cacheKey)!;
        }

        let total = 0;
        for (const next of graph[node]) {
            total += dfs(next, visitedDac, visitedFft);
        }

        cachedNode.set(cacheKey, total);

        return total;
    }

    const result = dfs(start, false, false);

    console.log({ result });
}
