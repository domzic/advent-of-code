export default async function (input: string) {
    const [rangesBlcok, ingredientsBlock] = input.split('\n\n');
    const ranges = rangesBlcok
        .split('\n')
        .map((r) => r.split('-'))
        .map((range) => [Number(range[0]), Number(range[1])]);
    const ingredients = ingredientsBlock.split('\n').map(Number);

    let result = 0;
    for (const ingredient of ingredients) {
        let fresh = false;
        for (const [min, max] of ranges) {
            if (ingredient >= Number(min) && ingredient <= Number(max)) {
                fresh = true;
                break;
            }
        }
        if (fresh) {
            result++;
        }
    }
    console.log({ result });
}
