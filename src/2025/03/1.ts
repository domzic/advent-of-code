export default async function (input: string) {
    const banks = input.trim().split('\n');
    let result = 0;

    for (const bank of banks) {
        const digits = bank.trim().split('').map(Number);
        let max = 0;
        for (let i = 0; i < digits.length; i++) {
            for (let j = i + 1; j < digits.length; j++) {
                const val = digits[i] * 10 + digits[j];
                if (val > max) {
                    max = val;
                }
            }
        }
        result += max;
    }
    console.log({ result });
}
