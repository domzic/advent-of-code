import { findCommonChar, calcPriority } from './util';

export default function (input: string) {
    const rucksacks = input.split('\n');
    const total = rucksacks.reduce((accumulated, current) => {
        const first = current.slice(0, current.length / 2);
        const second = current.slice(current.length / 2, current.length);
        const common = findCommonChar([first, second]);
        return (accumulated += calcPriority(common));
    }, 0);

    console.log('Total: ', total);
}
