export default function (input: string) {
    const [seedsInput, ...mapsInput] = input.split('\n\n');
    const seeds =
        seedsInput
            .split(':')[1]
            .match(/\d+/g)
            ?.map((d) => +d) || [];

    const maps = mapsInput.map((map) => {
        const [, ...rangesInput] = map.split('\n');
        return rangesInput.map((i) => i.split(' ').map((i) => +i));
    });

    const locations: number[] = [];
    seeds.forEach((seed) => {
        let location = seed;
        maps.forEach((map) => {
            for (let range of map) {
                const [to, from, length] = range;
                if (location <= from + length - 1 && location >= from) {
                    location = to + (location - from);
                    break;
                }
            }
        });
        locations.push(location);
    });

    console.log(Math.min(...locations));
}
