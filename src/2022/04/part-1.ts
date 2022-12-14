import { parseSections } from './util';

export default function (input: string) {
    const sections = parseSections(input);

    const overlaps = sections.reduce<number>((accumulated, pairs) => {
        const flat = pairs.flat();
        const [min, max] = [Math.min(...flat), Math.max(...flat)];
        if (pairs.some((pair) => pair.includes(min) && pair.includes(max))) {
            accumulated++;
        }
        return accumulated;
    }, 0);

    console.log(overlaps);
}
