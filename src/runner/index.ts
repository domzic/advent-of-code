import { program } from 'commander';

program
    .version('1.0.0')
    .description('CLI to run advent of code scripts')
    .option('-d, --day <day>', 'day', '01')
    .option('-y, --year <year>', 'year', '2023')
    .option('-f, --file <file>', 'file name', 'index.ts')
    .parse(process.argv);

const { year, day, file } = program.opts();
const inputPath = `${process.cwd()}/src/${year}/data`;
const path = `${process.cwd()}/src/${year}/${day}/${file}`;

import(inputPath).then(async (dynamicInputModule) => {
    import(path)
        .then(async (dynamicModule) => {
            console.info('\x1b[36m%s\x1b[0m', path + ':');
            const input = await dynamicInputModule.default(day);
            const t0 = performance.now();
            dynamicModule.default(input);
            const t1 = performance.now();
            console.log('Execution time: ', (t1 - t0).toFixed(3), 'ms');
        })
        .catch((err) => {
            console.log('\x1b[31m', err);
        });
});
