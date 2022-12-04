// A for Rock, B for Paper, and C for Scissors
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.

export default function (input: string) {
    const DEFEATS: Record<string, string> = {
        A: 'C',
        C: 'B',
        B: 'A',
    } as const;

    const SHAPE_SCORES: Record<string, number> = {
        A: 1,
        B: 2,
        C: 3,
    } as const;

    const DRAW_SCORE = 3;

    const WIN_SCORE = 6;

    const ENDING_SCORES: Record<string, number> = {
        X: 0,
        Y: DRAW_SCORE,
        Z: WIN_SCORE,
    } as const;

    const games = input.split('\n');

    const resolveShape = (opponent: string, ending: string): string => {
        if (ending === 'Y') {
            return opponent;
        }

        const defeats = DEFEATS[opponent];
        return ending === 'X' ? defeats : DEFEATS[defeats];
    };

    const total = games.reduce<number>((accumulated, current) => {
        const [opponent, , ending] = [...current];
        let endingScore = ENDING_SCORES[ending];
        return (
            accumulated +
            endingScore +
            SHAPE_SCORES[resolveShape(opponent, ending)]
        );
    }, 0);

    console.log('Total: ', total);
}
