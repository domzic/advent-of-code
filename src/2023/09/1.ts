export default function (input: string) {
    const histories = input
        .split(/\n/)
        .map((line) => line.split(' ').map((n) => +n));
    let sum = 0;
    histories.forEach((history) => {
        let end = false;
        const sequences: number[][] = [history];
        while (!end) {
            const seq = calcDiffs(sequences[sequences.length - 1]);
            sequences.push(seq);
            if (seq.every(equalsZero)) {
                end = true;
            }
        }

        let extrapolated = 0;
        for (let i = sequences.length - 2; i >= 0; i--) {
            extrapolated =
                extrapolated + sequences[i][sequences[i].length - 1]!;
        }
        sum += extrapolated;
    });
    console.log(sum);
}

function calcDiffs(numbers: number[]) {
    const diffs: number[] = [];
    for (let i = 1; i < numbers.length; i++) {
        diffs.push(numbers[i] - numbers[i - 1]);
    }
    return diffs;
}

const equalsZero = (n: number) => n === 0;
