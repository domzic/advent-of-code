export default function (input: string) {
    const lines = input.split(/\n/);
    const time = +lines[0].match(/\d+/g)?.join('')!;
    const record = +lines[1].match(/\d+/g)?.join('')!;

    const d = time ** 2 - 4 * record;
    const r1 = Math.ceil((time - Math.sqrt(d)) / 2);
    const r2 = Math.floor((time + Math.sqrt(d)) / 2);

    console.log(r2 - r1 + 1);
}
