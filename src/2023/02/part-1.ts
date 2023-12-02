const MAX_COUNTS = {
    red: 12,
    green: 13,
    blue: 14,
};

export default async function (input: string) {
    let sum = 0;
    try {
        input.split('\n').forEach((line) => {
            const [idPart, setsPart] = line.split(':');
            let valid = true;
            for (const cubes of setsPart.match(/(\d+) (\w+)[^,;]/gi)!) {
                const [count, color] = cubes.split(' ');
                if (+count > MAX_COUNTS[color as 'red' | 'green' | 'blue']) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                sum += +idPart.match(/(\d+)/)![1];
            }
        });
    } catch (e) {
        console.error('Invalid input. ', e);
    }
    console.log({ sum });
}
