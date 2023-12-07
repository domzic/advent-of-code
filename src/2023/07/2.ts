const CARD_RANK = {
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    T: 9,
    J: 0,
    Q: 11,
    K: 12,
    A: 13,
};

type Card = keyof typeof CARD_RANK;

export default function (input: string) {
    const hands = input.split(/\n/).map((l) => {
        const [cards, bid] = l.split(' ');
        return { cards: [...cards] as Card[], bid: +bid };
    });

    const rankedHands = hands.map((hand) => {
        const cardsCounts = hand.cards.reduce<CardsCount>((acc, card) => {
            acc[card] = acc[card] ? acc[card] + 1 : 1;
            return acc;
        }, {} as CardsCount);

        const jokers = cardsCounts.J || 0;
        cardsCounts.J = 0;
        const [winning = 0, second = 0] = Object.values(cardsCounts).sort(
            (a, b) => b - a
        );

        return {
            ...hand,
            rank: 2 * (winning + jokers) + second,
        };
    });
    const sorted = rankedHands.sort(comparator);
    console.log(sorted.reduce((sum, h, i) => h.bid * (i + 1) + sum, 0));
}

type CardsCount = Record<Partial<Card>, number>;

interface Hand {
    cards: Card[];
    bid: number;
}

interface RankedHand extends Hand {
    rank: number;
}

function comparator(a: RankedHand, b: RankedHand) {
    if (a.rank !== b.rank) {
        return a.rank - b.rank;
    }

    for (let i = 0; ; i++) {
        if (a.cards[i] !== b.cards[i]) {
            return CARD_RANK[a.cards[i]] - CARD_RANK[b.cards[i]];
        }
    }
}
