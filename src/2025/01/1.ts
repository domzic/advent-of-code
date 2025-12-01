export default async function (input: string) {
    const lines = input.split(/\n/);
    let result = 0;
    let position = 50;
    lines.forEach((line) => {
        const direction = line[0];
        const distance = Number(line.substring(1));
        position =
            direction === 'R' ? position + distance : position - distance;
        position = position % 100;
        if (position < 0) {
            position += 100;
        }

        if (position === 0) {
            result++;
        }
    });

    console.log({ result });
}
