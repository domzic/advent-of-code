export default async function (input: string) {
    const machines = input.trim().split('\n');
    let result = 0;

    for (const machine of machines) {
        const pattern = /\[(.*?)\]/.exec(machine)![1];
        const target = pattern.split('').map((c) => (c === '#' ? 1 : 0));

        const buttons = [...machine.matchAll(/\((.*?)\)/g)].map((match) => {
            const arr = Array(target.length).fill(0);
            match[1]
                .split(',')
                .map(Number)
                .forEach((i) => (arr[i] = 1));
            return arr;
        });

        const allCombos = getAllSubsets(buttons);
        let minPresses = 999999999999;

        for (const combo of allCombos) {
            let lights = Array(target.length).fill(0);
            for (const btn of combo) {
                lights = applyButton(lights, btn);
            }
            if (lights.every((v, i) => v === target[i])) {
                minPresses = Math.min(minPresses, combo.length);
            }
        }

        result += minPresses;
    }

    console.log({ result });
}

function applyButton(lights: number[], button: number[]): number[] {
    const newLights = [...lights];
    for (let i = 0; i < button.length; i++) {
        if (button[i] === 1) newLights[i] ^= 1;
    }
    return newLights;
}

function getAllSubsets(buttons: number[][]): number[][][] {
    const subsets: number[][][] = [[]];
    for (const btn of buttons) {
        const newSubsets: number[][][] = [];
        for (const subset of subsets) {
            newSubsets.push([...subset, btn]);
        }
        subsets.push(...newSubsets);
    }
    return subsets;
}
