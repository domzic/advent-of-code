export default async function (input: string) {
    const banks = input.trim().split('\n');
    let result = 0;

    for (const bank of banks) {
        const digits = bank.trim().split('').map(Number);

        const stack: number[] = [];
        let dropsLeft = digits.length - 12;

        for (const d of digits) {
            while (dropsLeft > 0 && stack[stack.length - 1] < d) {
                stack.pop();
                dropsLeft--;
            }
            stack.push(d);
        }

        result += Number(stack.slice(0, 12).join(''));
    }

    console.log({ result });
}
