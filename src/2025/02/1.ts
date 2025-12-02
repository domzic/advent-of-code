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
    if (str.length % 2 !== 0) {
        return false;
    }
    const half = str.length / 2;
    const a = str.slice(0, half);
    const b = str.slice(half);

    return a === b;
};
