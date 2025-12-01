const CIRCLE_SIZE = 100;

export default async function (input: string) {
    const lines = input.split(/\n/);
    let result = 0;
    let position = 50;
    lines.forEach((line) => {
        const direction = line[0];
        const distance = Number(line.substring(1));

        // TODO: inefficient - can be optimized by calculating full cycles beforehand and then using the remainder
        for (let i = 0; i < distance; i++) {
            if (direction === 'R') {
                position = (position + 1) % CIRCLE_SIZE;
            } else {
                position = (position - 1 + CIRCLE_SIZE) % CIRCLE_SIZE;
            }

            if (position === 0) {
                result++;
            }
        }
    });

    console.log({ result });
}
