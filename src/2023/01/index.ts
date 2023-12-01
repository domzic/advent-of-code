export default async function (input: string) {
    const lines = input.split('\n');
    const sum = lines.reduce<number>(
        (sum, line) => sum + extractNumber(line),
        0
    );
    console.log({ sum });
}

function extractNumber(line: string): number {
    const digitsRegex =
        /(one|two|three|four|five|six|seven|eight|nine|zero|\d)/gi;

    // "twone" => "twoone" that both words would be matched by regex
    line = line.replaceAll(digitsRegex, (match) => {
        if (match.length > 1) {
            return match + match[match.length - 1];
        }
        return match;
    });

    const digits = (line.match(digitsRegex) || []).map((digit) =>
        isNaN(+digit) ? WordToNumber[digit.toLowerCase()] : +digit
    );

    if (digits.length > 0) {
        return digits[0] * 10 + digits[digits.length - 1];
    } else {
        return 0;
    }
}

const WordToNumber: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
