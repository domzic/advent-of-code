export default async function (input: string) {
    let result = 0;
    const parts = input.split('\n\n');
    const regions = parts[parts.length - 1].trim().split('\n');
    for (const region of regions) {
        const [left, right] = region.split(': ');
        const [lengthStr, widthStr] = left.split('x');

        const length = parseInt(lengthStr, 10);
        const width = parseInt(widthStr, 10);

        const requirements = right.trim().split(/\s+/);

        let total = 0;

        for (const r of requirements) {
            total += parseInt(r, 10);
        }

        if (total <= Math.floor(length / 3) * Math.floor(width / 3)) {
            result++;
        }
    }

    console.log({ result });
}
