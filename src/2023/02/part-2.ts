export default async function (input: string) {
    let sum = 0;
    try {
        input.split('\n').forEach((line) => {
            const [, setsPart] = line.split(':');
            let minRequired: Record<string, number> = {
                red: 0,
                green: 0,
                blue: 0,
            };
            for (const cubes of setsPart.match(/(\d+) (\w+)[^,;]/gi)!) {
                const [count, color] = cubes.split(' ');
                if (minRequired[color] < +count) {
                    minRequired[color] = +count;
                }
            }
            sum += Object.values(minRequired).reduce((acc, num) => acc * num);
        });
    } catch (e) {
        console.error('Invalid input. ', e);
    }
    console.log({ sum });
}
