
export interface MnemonicNode {
    char: string;
    term: string;
    description?: string;
    subMnemonic?: string; // e.g. "ANCHORS" for Apologetics or "PhilEMOn" for Axioms
    subItems?: MnemonicNode[]; // The expansion of the subMnemonic
}

export const TABLE_MNEMONIC: MnemonicNode[] = [
    {
        char: 'T',
        term: 'Tradition',
        description: 'Memorized in full with corresponding 13 outer passages in Scout phase, studied again on Wednesday of Prep Week, recited at Cloak Ceremony.',
    },
    {
        char: 'A',
        term: 'Apologetics',
        description: 'The ANCHORS of Apologetics',
        subMnemonic: 'ANCHORS',
        subItems: [
            {
                char: 'A', term: 'Axioms', subMnemonic: 'PhilEMOn', subItems: [
                    { char: 'Phil', term: 'Philosophy' },
                    { char: 'E', term: 'Ethics' },
                    { char: 'M', term: 'Morality' },
                    { char: 'On', term: 'Ontology' }
                ]
            },
            {
                char: 'N', term: 'Narratives', subMnemonic: 'SCRIPT', subItems: [
                    { char: 'S', term: 'Source of Revelation' },
                    { char: 'C', term: 'Canon of Recognition' },
                    { char: 'R', term: 'Reliability of Transmission' },
                    { char: 'I', term: 'Integrity of Message' },
                    { char: 'P', term: 'Prophecy and Fulfillment' },
                    { char: 'T', term: 'Transformation of Witness' }
                ]
            },
            {
                char: 'C', term: 'Creeds', subMnemonic: 'ANCA', subItems: [
                    { char: 'A', term: 'Apostles' },
                    { char: 'N', term: 'Nicene' },
                    { char: 'C', term: 'Chalcedonian' },
                    { char: 'A', term: 'Athanasian' }
                ]
            },
            {
                char: 'H', term: 'History', subMnemonic: 'CHURCH', subItems: [
                    { char: 'C', term: 'Christ (30-100 AD)' },
                    { char: 'H', term: 'Heroic (100-500 AD)' },
                    { char: 'U', term: 'Unified (500-1000 AD)' },
                    { char: 'R', term: 'Reformation (1000-1700 AD)' },
                    { char: 'C', term: 'Colonial (1700-1900 AD)' },
                    { char: 'H', term: 'Holistic (1900-Present)' }
                ]
            },
            {
                char: 'O', term: 'Optics', subMnemonic: 'MIRROR', subItems: [
                    { char: 'M', term: 'Money' },
                    { char: 'I', term: 'Influence (Politics)' },
                    { char: 'R', term: 'Rivalry (Division and Pride)' },
                    { char: 'R', term: 'Relevance (Cultural Compromise)' },
                    { char: 'O', term: 'Oppression (Abuse and Coercion)' },
                    { char: 'R', term: 'Rejection (Church Hurt)' }
                ]
            },
            {
                char: 'R', term: 'Religion', subMnemonic: 'WORLD & CHRIST', subItems: [
                    { char: 'W', term: 'Western / Monotheism' },
                    { char: 'O', term: 'Oriental Philosophies' },
                    { char: 'R', term: 'Religions of Renunciation' },
                    { char: 'L', term: 'Local / Tribal Faiths' },
                    { char: 'D', term: 'Doubt / Secular Worldviews' },
                    { char: 'C', term: 'Catholic' },
                    { char: 'H', term: 'Historic Orthodox' },
                    { char: 'R', term: 'Reformed / Protestant' },
                    { char: 'I', term: 'Independent / Charismatic' },
                    { char: 'S', term: 'Syncretic / Contextual' },
                    { char: 'T', term: 'Traditionalist / Restorationist' }
                ]
            },
            {
                char: 'S', term: 'Science', subMnemonic: 'SCIENCE', subItems: [
                    { char: 'S', term: 'Space' },
                    { char: 'C', term: 'Causation' },
                    { char: 'I', term: 'Information' },
                    { char: 'E', term: 'Entropy' },
                    { char: 'N', term: 'Nature' },
                    { char: 'C', term: 'Consciousness' },
                    { char: 'E', term: 'Earth' }
                ]
            }
        ]
    },
    {
        char: 'B',
        term: 'Bible',
        description: 'The STORY of the Bible',
        subMnemonic: 'STORY',
        subItems: [
            { char: 'S', term: 'Summary' },
            { char: 'T', term: 'Theology' },
            { char: 'O', term: 'Observation' },
            { char: 'R', term: 'Revelation' },
            { char: 'Y', term: 'Yield' }
        ]
    },
    {
        char: 'L',
        term: 'Lists',
        description: 'Lists to memorize (Faithful Witnesses, etc.), done throughout the quarter.',
    },
    {
        char: 'E',
        term: 'Ethos',
        description: 'The ETHOS of the Triads',
        subMnemonic: 'ETHOS',
        subItems: [
            {
                char: 'E', term: 'Ethics', subItems: [
                    { char: 'Heart', term: 'Heart' },
                    { char: 'Mind', term: 'Mind' },
                    { char: 'Words', term: 'Words' },
                    { char: 'Actions', term: 'Actions' }
                ]
            },
            {
                char: 'T', term: 'Traditions', subItems: [
                    { char: 'Traditions', term: 'Traditions' }
                ]
            },
            {
                char: 'H', term: 'Habits', subMnemonic: 'The Core HABITS of a Christian MAN', subItems: [
                    { char: 'Honor', term: 'Honor' },
                    { char: 'Attend', term: 'Attend' },
                    { char: 'Belong', term: 'Belong' },
                    { char: 'Intercede', term: 'Intercede' },
                    { char: 'Train', term: 'Train' },
                    { char: 'Serve', term: 'Serve' },
                    { char: 'Morning', term: 'Morning' },
                    { char: 'Afternoon', term: 'Afternoon' },
                    { char: 'Night', term: 'Night' }
                ]
            },
            {
                char: 'O', term: 'Organization', subItems: [
                    { char: 'Structure', term: 'Structure' },
                    { char: 'Triad Tribe', term: 'Triad Tribe' }
                ]
            },
            {
                char: 'S', term: 'Stewardship', subItems: [
                    { char: 'Stewardship', term: 'Stewardship' }
                ]
            }
        ]
    }
];

export interface WeekMnemonicInfo {
    weekNum: number;
    description: string[]; // Lines of text to display
    tags: { label: string; tooltip: string }[];
    focus?: {
        term: string;
        highlight: string; // The part of the term to highlight (e.g. "Phil")
    };
}

export function getWeekMnemonicInfo(weekNum: number): WeekMnemonicInfo | null {
    if (weekNum === 0) {
        return {
            weekNum,
            description: ["Preparation Week"],
            tags: [{ label: "Tradition", tooltip: "Focus on Tradition" }]
        };
    }

    // Weeks 1-7: ANCHORS (Apologetics)
    if (weekNum >= 1 && weekNum <= 7) {
        const apologetics = TABLE_MNEMONIC.find(m => m.char === 'A');
        if (!apologetics || !apologetics.subItems) return null;

        const anchorsItem = apologetics.subItems[weekNum - 1];
        if (!anchorsItem) return null;

        const subMnemonic = anchorsItem.subMnemonic; // e.g. PhilEMOn

        // Determine the focus term (the actual topic for the week)
        // For Week 1: PhilEMOn -> Philosophy (Mon), Ethics (Wed), ...
        // But the week covers the whole sub-mnemonic.
        // The modal usually shows "Focus: Axioms" (the parent).
        // User wants highlight on the letters.
        // Wait, the "Phil" in "Philosophy" example was for the sub-items.
        // Weekly focus is "Apologetics -> Axioms".
        // The sub-items (Physics, Ethics...) are daily topics.
        // Let's assume the focus IS the anchorsItem (Axioms).
        // Does "Axioms" have a highlight? "A" in ANCHORS.

        return {
            weekNum,
            description: [],
            tags: [
                { label: "Apologetics", tooltip: "A in TABLE" },
                { label: "ANCHORS", tooltip: "Apologetics Mnemonic" }
            ],
            focus: {
                term: anchorsItem.term, // e.g. "Axioms"
                highlight: anchorsItem.char // e.g. "A"
            }
        };
    }

    // Week 8: Bible
    if (weekNum === 8) {
        return {
            weekNum,
            description: ["Part of the Bible Curriculum (The STORY of the Bible)"],
            tags: [
                { label: "TABLE: Bible", tooltip: "B in TABLE" },
                { label: "STORY", tooltip: "Summary, Theology, Observation, Revelation, Yield" }
            ]
        };
    }

    // Week 9: Ethos
    if (weekNum === 9) {
        return {
            weekNum,
            description: ["Part of the Ethos Curriculum (The ETHOS of the Triads)"],
            tags: [
                { label: "TABLE: Ethos", tooltip: "E in TABLE" },
                { label: "ETHOS", tooltip: "Ethics, Traditions, Habits, Organization, Stewardship" }
            ]
        };
    }

    return null;
}
