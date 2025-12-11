export default async function (input: string) {
    const machines = input.trim().split('\n');

    let result = 0;
    let i = 0;

    for (const machine of machines) {
        const target = machine
            .match(/\{(.*?)\}/)![1]
            .split(',')
            .map(Number);

        const numCounters = target.length;

        // Parse button definitions
        const buttons = [...machine.matchAll(/\((.*?)\)/g)].map((match) => {
            const arr = Array(numCounters).fill(0);
            match[1]
                .split(',')
                .map(Number)
                .forEach((idx) => (arr[idx] = 1));
            return arr;
        });

        const answer = solveDP(buttons, target);

        i++;
        console.log('Finished:', { machineIndex: i, answer });

        result += answer;
    }

    console.log({ result });
}

/**
 * Solve by DP — NOT BFS.
 * dp[stateKey] = minimum presses to reach that state.
 */
function solveDP(buttons: number[][], target: number[]): number {
    const tKey = keyOf(target);
    const dp = new Map<string, number>();

    const start = Array(target.length).fill(0);
    dp.set(keyOf(start), 0);

    const stack: number[][] = [start];

    while (stack.length > 0) {
        const state = stack.pop()!;
        const presses = dp.get(keyOf(state))!;

        if (keyOf(state) === tKey) return presses;

        for (const btn of buttons) {
            const next = applyButton(state, btn);

            // Prune impossible paths
            if (!valid(next, target)) continue;

            const k = keyOf(next);

            if (!dp.has(k) || dp.get(k)! > presses + 1) {
                dp.set(k, presses + 1);
                stack.push(next);
            }
        }
    }

    return Infinity;
}

function applyButton(cur: number[], btn: number[]): number[] {
    const out = [...cur];
    for (let i = 0; i < cur.length; i++) {
        if (btn[i] === 1) out[i] = cur[i] + 1;
    }
    return out;
}

function valid(arr: number[], target: number[]): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > target[i]) return false;
    }
    return true;
}

function keyOf(arr: number[]): string {
    return arr.join(',');
}
