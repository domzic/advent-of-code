import fs from 'fs';

const getInput = (day: string) =>
    new Promise<string>((resolve, reject) => {
        fs.readFile(`${__dirname}/${day}.txt`, {}, (error, data) => {
            if (error) {
                return reject(
                    new Error('Input file for specified date was not found.')
                );
            }

            return resolve(data.toString());
        });
    });

export default getInput;
