export interface DayHighlight {
    day: string; // "Mon", "Tue", "Wed", "Thu", "Fri"
    term?: string; // Optional: The full term to look for
    highlight: string; // The specific part to highlight
    slug?: string; // Optional: Override the link slug (e.g. map "CHRISTian" -> "uniqueness")
}

export interface AcrosticDetail {
    weekNum: number;
    tableLetter: string; // T, A, B, L, or E
    area: string; // "Apologetics", "Bible", etc.
    subMnemonic?: string | undefined; // "ANCHORS", "S.T.O.R.Y."
    subMnemonicHighlight?: string | undefined; // "A" in ANCHORS
    focusTerm?: string | undefined; // "Axioms"
    focusHighlight?: string | undefined; // "A"
    deepMnemonic?: string | undefined; // "Phil.E.M.On"
    dailyHighlights?: DayHighlight[];
}

export const ACROSTIC_DATA: Record<number, AcrosticDetail> = {
    // Week 1: Phil.E.M.On
    1: {
        weekNum: 1,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "A",
        focusTerm: "Axioms",
        focusHighlight: "A",
        deepMnemonic: "Phil.E.M.On",
        dailyHighlights: [
            { day: "Mon", term: "Philosophy", highlight: "Phil" },
            { day: "Wed", term: "Ethics", highlight: "E" },
            { day: "Wed", term: "Morality", highlight: "M" },
            { day: "Fri", term: "Ontology", highlight: "On" }
        ]
    },
    // Week 2: SCRIPT
    2: {
        weekNum: 2,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "N",
        focusTerm: "Narratives",
        focusHighlight: "N",
        deepMnemonic: "S.C.R.I.P.T.",
        dailyHighlights: [
            { day: "Mon", term: "Source", highlight: "S" },
            { day: "Mon", term: "Canon", highlight: "C" },
            { day: "Wed", term: "Reliability", highlight: "R" },
            { day: "Wed", term: "Integrity", highlight: "I" },
            { day: "Fri", term: "Prophecies", highlight: "P" },
            { day: "Fri", term: "Transformation", highlight: "T" }
        ]
    },
    // Week 3: ANCA
    3: {
        weekNum: 3,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "C",
        focusTerm: "Creeds",
        focusHighlight: "C",
        deepMnemonic: "A.N.C.A.",
        dailyHighlights: [
            { day: "Mon", term: "Apostles", highlight: "A" },
            { day: "Wed", term: "Nicene", highlight: "N" },
            { day: "Fri", term: "Chalcedonian", highlight: "C" },
            { day: "Fri", term: "Athanasian", highlight: "A" }
        ]
    },
    // Week 4: CHURCH
    4: {
        weekNum: 4,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "H",
        focusTerm: "History",
        focusHighlight: "H",
        deepMnemonic: "C.H.U.R.C.H.",
        dailyHighlights: [
            { day: "Mon", term: "Christ", highlight: "C" },
            { day: "Wed", term: "Heroic", highlight: "H" },
            { day: "Wed", term: "Unified", highlight: "U" },
            { day: "Fri", term: "Reformation", highlight: "R" },
            { day: "Fri", term: "Colonial", highlight: "C" },
            { day: "Fri", term: "Holistic", highlight: "H" }
        ]
    },
    // Week 5: MIRROR
    5: {
        weekNum: 5,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "O",
        focusTerm: "Optics",
        focusHighlight: "O",
        deepMnemonic: "M.I.R.R.O.R.",
        dailyHighlights: [
            { day: "Mon", term: "Money", highlight: "M" },
            { day: "Mon", term: "Influence", highlight: "I" },
            { day: "Wed", term: "Rivalry", highlight: "R" },
            { day: "Wed", term: "Relevance", highlight: "R" },
            { day: "Wed", term: "Optics", highlight: "O" },
            { day: "Fri", term: "Oppression", highlight: "O" },
            { day: "Fri", term: "Rejection", highlight: "R" }
        ]
    },
    // Week 6: WORLD / CHRIST
    6: {
        weekNum: 6,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "R",
        focusTerm: "Religion",
        focusHighlight: "R",
        deepMnemonic: "W.O.R.L.D. / C.H.R.I.S.T.",
        dailyHighlights: [
            { day: "Mon", highlight: "WORLD", slug: "uniqueness" }, // Emphasize all of WORLD
            { day: "Wed", term: "CHRISTian", highlight: "CHRIST", slug: "uniqueness" } // Emphasize all of CHRIST in Christian
        ]
    },
    // Week 7: SCIENCE
    7: {
        weekNum: 7,
        tableLetter: "A",
        area: "Apologetics",
        subMnemonic: "ANCHORS",
        subMnemonicHighlight: "S",
        focusTerm: "Science",
        focusHighlight: "S",
        deepMnemonic: "S.C.I.E.N.C.E.",
        dailyHighlights: [
            { day: "Mon", term: "Space", highlight: "S" },
            { day: "Mon", term: "Causation", highlight: "C" },
            { day: "Mon", term: "Information", highlight: "I" },
            { day: "Wed", term: "Entropy", highlight: "E" },
            { day: "Wed", term: "Nature", highlight: "N" },
            { day: "Wed", term: "Consciousness", highlight: "C" },
            { day: "Wed", term: "Earth", highlight: "E" }
            // Fri: explicit no highlight for "Review of SCIENCE"
        ]
    },
    // Week 8: STORY (Fix doubling: Area=Bible, Sub=S.T.O.R.Y., Deep=S.T.O.R.Y.)
    // User requested "Bible > S.T.O.R.Y." twice issue fix.
    // If we have Area "Bible", Sub "S.T.O.R.Y.", Focus "Bible", Deep "S.T.O.R.Y."
    // It renders: T.A.B.L.E > Bible > S.T.O.R.Y. > Bible > S.T.O.R.Y.
    // We should probably remove Focus/Deep if they are redundant or adjust.
    // User said: "Week 8 The breadcrumbs are doubled up with Bible > S.T.O.R.Y. twice so fix that"
    // Let's set focusTerm as null or empty since Bible IS the area. Or set SubMnemonic as null if it's not a sub-branch.
    // Actually, T.A.B.L.E -> Bible.
    // Then there is S.T.O.R.Y. as the mnemonic for the WHOLE Bible section?
    // Let's try: Area: Bible, Sub: null, Focus: S.T.O.R.Y., Deep: null?
    // Or: Area: Bible, Sub: S.T.O.R.Y. ...
    // Let's config it to render: T.A.B.L.E > Bible > S.T.O.R.Y.
    8: {
        weekNum: 8,
        tableLetter: "B",
        area: "Bible",
        subMnemonic: "STORY",
        subMnemonicHighlight: undefined,
        focusTerm: undefined, // Remove intermediate "Bible" focus term
        focusHighlight: undefined,
        deepMnemonic: undefined, // Remove deep to avoid duplication if Sub is STORY
        dailyHighlights: [
            { day: "Mon", term: "Summary", highlight: "S" },
            { day: "Mon", term: "Theology", highlight: "T" },
            { day: "Wed", term: "Observation", highlight: "O" },
            { day: "Wed", term: "Revelation", highlight: "R" },
            { day: "Fri", term: "Yielding", highlight: "Y" }
        ]
    },
    // Week 9: ETHOS (Fix doubling)
    // "ETHOS > E.T.H.O.S. > E.T.H.I.C.S."
    9: {
        weekNum: 9,
        tableLetter: "E",
        area: "Ethos", // E in TABLE
        subMnemonic: undefined, // Sub
        subMnemonicHighlight: undefined,
        focusTerm: undefined,
        focusHighlight: undefined,
        deepMnemonic: undefined,
        dailyHighlights: [
            { day: "Mon", term: "Ethics", highlight: "E" },
            { day: "Mon", term: "Traditions", highlight: "T" },
            { day: "Wed", term: "Habits", highlight: "H" },
            { day: "Wed", term: "Organization", highlight: "O" },
            { day: "Fri", term: "Stewardship", highlight: "S" }
        ]
    }
};
