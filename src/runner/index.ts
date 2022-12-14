import { program } from 'commander';
import getInput from '../2022/data';

program
    .version('1.0.0')
    .description('CLI to run advent of code scripts')
    .option('-d, --day <day>', 'day', '01')
    .option('-y, --year <year>', 'year', '2022')
    .option('-f, --file <file>', 'file name', 'index.ts')
    .parse(process.argv);

const { year, day, file } = program.opts();
const path = `${process.cwd()}/src/${year}/${day}/${file}`;

import(path)
    .then(async (dynamicModule) => {
        console.info('\x1b[36m%s\x1b[0m', path + ':');
        const input = await getInput(day);
        dynamicModule.default(input);
    })
    .catch((err) => {
        console.log('\x1b[31m', err);
    });
