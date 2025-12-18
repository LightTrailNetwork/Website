
export interface ScienceEntry {
    id: string;
    verse: string;
    referenceLink: string;
    misuse: string;
    context: string; // The specific biblical truth
    refutation: string; // The scientific harmony/refutation
}

export interface ScienceCategory {
    id: string;
    name: string;
    description: string;
    entries: ScienceEntry[];
}

export const SCIENCE_DATA: ScienceCategory[] = [
    {
        id: "origins",
        name: "Origins & Cosmology",
        description: "The Big Bang, Fine Tuning, and the Beginning of the Universe.",
        entries: [
            {
                id: "gen-1-1",
                verse: "Genesis 1:1",
                referenceLink: "/bible/read/Genesis/1/1",
                misuse: "'Science has explained our origins (Big Bang) without God.'",
                context: "The absolute origin of space, time, energy, and matter.",
                refutation: "The Big Bang theory agrees with Genesis 1:1 that the universe had a beginning! If it had a beginning, it must have a Cause outside of itself (spaceless, timeless, powerful). Science has finally caught up to the Bible: there was a moment when 'nothing' became 'something' by the power of God."
            },
            {
                id: "psalm-19-1",
                verse: "Psalm 19:1",
                referenceLink: "/bible/read/Psalms/19/1",
                misuse: "'The universe is random chaos and life is a chemical accident.'",
                context: "David declaring that nature literally 'pours forth speech' about God.",
                refutation: "Astrophysics reveals the universe is 'Fine-Tuned' on a razor's edge (gravity, expansion rate) for life to exist. The odds are astronomically impossible by chance. The heavens imply a Master Architect who designed a home specifically for us."
            },
            {
                id: "romans-1-20",
                verse: "Romans 1:20",
                referenceLink: "/bible/read/Romans/1/20",
                misuse: "'There is no evidence for God; faith is blind.'",
                context: "Paul arguing that God's power is clearly perceived in the things that have been made.",
                refutation: "Faith is not blind; it is trust based on evidence. We see specific complexity (DNA information) and irreducible complexity (the eye) in nature. Information always comes from a Mind. The creation stands as a forensic proof of the Creator."
            }
        ]
    },
    {
        id: "evolution",
        name: "Evolution & Biology",
        description: "DNA, Human Origins, and the Image of God.",
        entries: [
            {
                id: "gen-2-7",
                verse: "Genesis 2:7",
                referenceLink: "/bible/read/Genesis/2/7",
                misuse: "'Humans are just evolved apes sharing 98% DNA, so the Bible is a myth.'",
                context: "The unique creation of man with the 'breath of life' (Imago Dei).",
                refutation: "Shared DNA points to a common Designer (just as a bike and car share similar 'blueprints' like wheels). What distinguishes us isn't just biology, but the 'Image of God'—consciousness, morality, love, and reason. Evolution cannot explain the origin of the soul or objective moral values."
            },
            {
                id: "psalm-139-14",
                verse: "Psalm 139:14",
                referenceLink: "/bible/read/Psalms/139/14",
                misuse: "'Embryos are just clumps of cells repeating evolutionary history (recapitulation theory).'",
                context: "God knitting the unborn together in the womb.",
                refutation: "Haeckel's recapitulation theory has been long debunked. From conception, a unique human DNA code exists that defines hair color, height, and personality. It is a distinct human life, 'fearfully and wonderfully made', not a fish or lizard."
            }
        ]
    },
    {
        id: "miracles",
        name: "Miracles & Laws of Physics",
        description: "Addressing the impossible and Divine intervention.",
        entries: [
            {
                id: "joshua-10-13",
                verse: "Joshua 10:13",
                referenceLink: "/bible/read/Joshua/10/13",
                misuse: "'Physics prohibits the earth stopping; everything would fly off into space.'",
                context: "A specific miracle of intervention where the sun stood still for battle.",
                refutation: "The God who created the laws of physics is not bound by them. Just as a purely natural system can be open to human intervention (catching a falling ball), the universe is open to Divine intervention. The Creator holds the clock and can pause it at will."
            },
            {
                id: "matt-14-25",
                verse: "Matthew 14:25",
                referenceLink: "/bible/read/Matthew/14/25",
                misuse: "'Walking on water is physically impossible due to surface tension and gravity.'",
                context: "Jesus demonstrating authority over creation.",
                refutation: "That is the point! If it were natural, it wouldn't be a sign. Jesus is the Logos (Word) by whom all things were made (John 1:3). The Architect of water can command it to be solid under His feet. It reveals His identity as God."
            }
        ]
    },
    {
        id: "accuracy",
        name: "Scientific Accuracy of Scripture",
        description: "Where the Bible was ahead of its time.",
        entries: [
            {
                id: "lev-17-11",
                verse: "Leviticus 17:11",
                referenceLink: "/bible/read/Leviticus/17/11",
                misuse: "'The Bible is scientifically illiterate and primitive.'",
                context: "Laws given to Moses 3,500 years ago defining atonement and health.",
                refutation: "Long before science understood circulation or pathogens, the Bible commanded quarantine (Lev 13), washing in running water (Lev 15), and identified 'the life of the flesh is in the blood'. The Bible was millennia ahead of medical science, protecting God's people."
            },
            {
                id: "job-26-7",
                verse: "Job 26:7",
                referenceLink: "/bible/read/Job/26/7",
                misuse: "'Ancient people believed the earth sat on elephants or turtles.'",
                context: "Job describing God's creative power.",
                refutation: "Job declares: 'He stretches out the north over the void and hangs the earth on nothing.' 3,500 years ago, surrounded by myths of flat earths and cosmic turtles, the Bible correctly described the earth suspended in space by gravity (nothing)."
            },
            {
                id: "isaiah-40-22",
                verse: "Isaiah 40:22",
                referenceLink: "/bible/read/Isaiah/40/22",
                misuse: "'The Bible teaches a flat earth.'",
                context: "God enthroned above the creation.",
                refutation: "The text says God sits above the 'circle' (chug - sphere/circuit) of the earth. The Bible consistently uses Phenomenological Language (language of appearance, like 'sunrise' which we still use today), but never affirms scientific error."
            }
        ]
    }
];
