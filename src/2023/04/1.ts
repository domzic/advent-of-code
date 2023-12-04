export default function (input: string) {
    let sum = 0;
    const lines = input.split(/\n/);
    lines.forEach((line) => {
        const [winningNumbers, handNumbers] = line
            .substring(line.indexOf(':') + 1)
            .split('|')
            .map((part) => [...(part.match(/\d+/g)?.map((n) => +n) || [])]);
        const won = winningNumbers.filter((winningNumber) =>
            handNumbers.includes(winningNumber)
        );
        if (won.length) {
            sum += Math.pow(2, won.length - 1);
        }
    });
    console.log(sum);
}
