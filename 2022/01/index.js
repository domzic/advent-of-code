const getInput = require('../data');

(async function() {
    const input = await getInput('01');
    const sum = array => array.reduce((acc, current) => acc + parseInt(current), 0);

    const totals = input
        .split('\n\n')
        .map(elf => sum(elf.split('\n')))
        .sort((a, b) => b - a);

    console.log('Totals: ', totals[0]);
    console.log('Top 3: ', sum(totals.slice(0, 3)))
})();