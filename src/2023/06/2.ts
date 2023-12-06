export default function (input: string) {
    const lines = input.split(/\n/);
    const time = +lines[0].match(/\d+/g)?.join('')!;
    const record = +lines[1].match(/\d+/g)?.join('')!;
    let won = 0;
    for (let j = 1; j < time; j++) {
        if (j * (time - j) > record) {
            won++;
        }
    }

    console.log(won);
}
