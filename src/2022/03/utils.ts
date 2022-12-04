const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const calcPriority = (char: string): number =>
    char === char.toUpperCase()
        ? alphabet.indexOf(char.toLowerCase()) + alphabet.length + 1
        : alphabet.indexOf(char) + 1;

export const findCommonChar = (args: string[]): string => {
    console.log(args);
    const arrays = args.map((str) => [...new Set(str.split(''))]);
    if (!arrays.length) {
        throw new Error('Empty rucksack.');
    }

    const common = arrays
        .shift()!
        .find((char) => arrays.every((arr) => arr.indexOf(char) > -1));

    if (!common) {
        throw new Error('No common item found in rucksacks.');
    }

    return common;
};
