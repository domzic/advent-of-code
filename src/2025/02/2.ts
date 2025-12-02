export default async function (input: string) {
    let result = 0;
    const ranges = input.trim().split(',');

    ranges.forEach((range) => {
        const [start, end] = range.split('-');
        const startNum = Number(start);
        const endNum = Number(end);

        for (let id = startNum; id <= endNum; id++) {
            if (isInvalid(id)) {
                result += id;
            }
        }
    });

    console.log({ result });
}

const isInvalid = (num: number) => {
    const str = String(num);

    for (let i = 1; i <= str.length / 2; i++) {
        if (str.length % i !== 0) {
            continue;
        }

        const possiblyRepeatedNumber = str.slice(0, i);
        if (possiblyRepeatedNumber.repeat(str.length / i) === str) {
            return true;
        }
    }
    return false;
};
