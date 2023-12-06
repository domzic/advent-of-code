export default function (input: string) {
    let result = 1;
    const lines = input.split(/\n/);
    const times = lines[0].match(/\d+/g)?.map((n) => +n) || [];
    const records = lines[1].match(/\d+/g)?.map((n) => +n) || [];
    for (let i = 0; i < times.length; i++) {
        let won = 0;
        for (let j = 1; j < times[i]; j++) {
            if (j * (times[i] - j) > records[i]) {
                won++;
            }
        }
        result *= won;
    }
    console.log(result);
}
