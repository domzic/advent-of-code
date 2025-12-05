export default async function (input: string) {
    const [rangesBlcok] = input.split('\n\n');
    const ranges = rangesBlcok
        .split('\n')
        .map((r) => r.split('-'))
        .map((range) => [BigInt(range[0]), BigInt(range[1])])
        .sort((a, b) => (a[0] < b[0] ? -1 : 1));

    const mergedRanges: [bigint, bigint][] = [];
    let [currentStart, currentEnd] = ranges[0];

    for (let i = 1; i < ranges.length; i++) {
        const [newStart, newEnd] = ranges[i];
        if (currentEnd >= newStart) {
            currentEnd = currentEnd > newEnd ? currentEnd : newEnd;
        } else {
            mergedRanges.push([currentStart, currentEnd]);
            [currentStart, currentEnd] = [newStart, newEnd];
        }
    }
    mergedRanges.push([currentStart, currentEnd]);

    let result = 0n;
    for (const [min, max] of mergedRanges) {
        result += max - min + 1n;
    }

    console.log({ result });
}
