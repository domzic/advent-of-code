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
    J: 10,
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
        const cardsCounts = Object.values(
            hand.cards.reduce<CardsCount>((acc, card) => {
                acc[card] = acc[card] ? acc[card] + 1 : 1;
                return acc;
            }, {} as CardsCount)
        );
        const rank = matchers.find((matcher) =>
            matcher.matches(cardsCounts)
        )!.rank;

        return { ...hand, rank };
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

interface TypeMatcher {
    rank: number;
    matches: (counts: number[]) => boolean;
}

const FiveOfKindMatcher: TypeMatcher = {
    rank: 7,
    matches: (counts: number[]) => counts.includes(5),
};

const FourOfKindMatcher: TypeMatcher = {
    rank: 6,
    matches: (counts: number[]) => counts.includes(4),
};

const FullHouseMatcher: TypeMatcher = {
    rank: 5,
    matches: (counts: number[]) => counts.includes(3) && counts.includes(2),
};

const ThreeOfKindMatcher: TypeMatcher = {
    rank: 4,
    matches: (counts: number[]) => counts.includes(3),
};

const TwoPairsMatcher: TypeMatcher = {
    rank: 3,
    matches: (counts: number[]) =>
        counts.filter((val) => val === 2).length === 2,
};

const OnePairMatcher: TypeMatcher = {
    rank: 2,
    matches: (counts: number[]) => counts.includes(2),
};

const HighCardMatcher: TypeMatcher = {
    rank: 1,
    matches: () => true,
};

const matchers = [
    FiveOfKindMatcher,
    FourOfKindMatcher,
    FullHouseMatcher,
    ThreeOfKindMatcher,
    TwoPairsMatcher,
    OnePairMatcher,
    HighCardMatcher,
];

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
