import { calcPriority, findCommonChar } from './util';

export default function (input: string) {
    const GROUP_SIZE = 3;
    const rucksacks = input.split('\n');

    let total = 0;
    for (let i = 0; i < rucksacks.length; i += GROUP_SIZE) {
        const common = findCommonChar(
            Array.from(Array(GROUP_SIZE)).map((_, j) => rucksacks[i + j])
        );
        total += calcPriority(common);
    }

    console.log('Total: ', total);
}
