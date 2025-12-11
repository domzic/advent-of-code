export default async function (input: string) {
    const graph: Record<string, string[]> = {};

    // Parse lines: "aaa: you hhh"
    for (const line of input.trim().split('\n')) {
        const [from, rest] = line.split(':').map((s) => s.trim());
        const to = rest ? rest.split(/\s+/) : [];
        graph[from] = to;
    }

    const start = 'you';
    const target = 'out';

    let result = 0;

    function dfs(node: string) {
        if (node === target) {
            result++;
            return;
        }

        for (const next of graph[node]) {
            dfs(next);
        }
    }

    dfs(start);

    console.log({ result });
}
