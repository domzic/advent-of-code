const fs = require('fs');

const getInput = (day) => new Promise((resolve, reject) => {
    fs.readFile(`data/${day}.txt`, {}, (error, data) => {
        if (error) {
            return reject(new Error('Input file for specified date was not found.'));
        }
        return resolve(data.toString());
    });
});

module.exports = getInput;