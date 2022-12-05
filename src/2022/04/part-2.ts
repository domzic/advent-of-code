import { parseSections } from './util';

export default function (input: string) {
    const sections = parseSections(input);

    const overlaps = sections.reduce<number>((accumulated, pairs) => {
        const flat = pairs.flat();
        const [min, max] = [Math.min(...flat), Math.max(...flat)];
        const lowerPair = pairs.find((pair) => pair.includes(min))!;
        const higherPair = pairs.find((pair) => pair.includes(max))!;
        if (lowerPair[1] >= higherPair[0]) {
            accumulated++;
        }

        return accumulated;
    }, 0);

    console.log(overlaps);
}
