export default async function (input: string) {
    const lines = input.split('\n');
    const numbers: number[] = [];
    lines.forEach((line) => {
        const numbersFound = [...line].filter(isNumber);
        numbers.push(
            +(numbersFound[0] + numbersFound[numbersFound.length - 1])
        );
    });
    const sum = numbers.reduce((num, sum) => sum + num);
    console.log({ numbers, sum });
}

function isNumber(char: string) {
    return char.length === 1 && char.match(/[0-9]/);
}
