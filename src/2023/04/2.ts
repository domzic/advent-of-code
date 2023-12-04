export default function (input: string) {
    const lines = input.split(/\n/);
    let copies = lines.map(() => 1);

    lines.forEach((line, i) => {
        const [winningNumbers, handNumbers] = line
            .substring(line.indexOf(':') + 1)
            .split('|')
            .map((part) => [...(part.match(/\d+/g)?.map((n) => +n) || [])]);
        let wonCardsCount = winningNumbers.filter((winningNumber) =>
            handNumbers.includes(winningNumber)
        ).length;

        if (!wonCardsCount) {
            return;
        }
        while (wonCardsCount) {
            copies[i + wonCardsCount--] += copies[i];
        }
    });
    console.log(copies.reduce((acc, num) => acc + num));
}
