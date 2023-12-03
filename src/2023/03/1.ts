export default function (input: string) {
    let sum = 0;
    const lines = input.split(/\n/);

    function hasAdjacentSymbol(row: number, col: number, length: number) {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + length; c++) {
                const char = lines[r]?.[c];
                if (char && !/\d/.test(char) && char !== '.') {
                    return true;
                }
            }
        }
        return false;
    }

    lines.forEach((line, row) => {
        Array.from(line.matchAll(/\d+/g), (numMatcher) => {
            const number = numMatcher[0];
            if (hasAdjacentSymbol(row, numMatcher.index!, number.length)) {
                sum += +number;
            }
        });
    });

    console.log(sum);
}
