import getInput from '../data';

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.

const EQUALS: Record<string, string> = {
    X: 'A',
    Y: 'B',
    Z: 'C',
};
const DEFEATS: Record<string, string> = {
    X: 'C',
    Z: 'B',
    Y: 'A',
} as const;

const SHAPE_SCORES: Record<string, number> = {
    X: 1,
    Y: 2,
    Z: 3,
} as const;

const DRAW_SCORE = 3;

const WIN_SCORE = 6;

(async function () {
    const input = await getInput('02');
    const games = input.split('\n');

    const total = games.reduce<number>((accumulated, current) => {
        const [opponent, , you] = [...current];
        let additionalScore = 0;
        if (DEFEATS[you] === opponent) {
            additionalScore = WIN_SCORE;
        }
        if (EQUALS[you] === opponent) {
            additionalScore = DRAW_SCORE;
        }
        return accumulated + SHAPE_SCORES[you] + additionalScore;
    }, 0);

    console.log('Total: ', total);
})();
