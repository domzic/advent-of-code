export default function (input: string) {
    let sum = 0;
    const lines = input.split(/\n/);

    function getGearNumbers(row: number, col: number) {
        let numbers: number[] = [];
        for (let r = row - 1; r <= row + 1; r++) {
            Array.from(lines[r].matchAll(/\d+/g), (numMatcher) => {
                const number = numMatcher[0];
                const matcherIndex = numMatcher.index!;
                if (
                    matcherIndex! === col ||
                    (matcherIndex < col &&
                        matcherIndex + number.length >= col) ||
                    col === matcherIndex - 1
                ) {
                    numbers.push(+number);
                }
            });
        }
        return numbers.length === 2 ? numbers : [];
    }

    lines.forEach((line, row) => {
        Array.from(line.matchAll(/[*]/g), (gearMatcher) => {
            const gearNumbers = getGearNumbers(row, gearMatcher.index!);
            if (gearNumbers.length) {
                sum += gearNumbers[0] * gearNumbers[1];
            }
        });
    });

    console.log(sum);
}
