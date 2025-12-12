import { Role } from './types';
import { getPassage } from '../utils/passageLookup';

export interface CurriculumItem {
    area: string;
    subArea?: string;
    topic: string;
    description?: string;
    reference?: string;
}

export interface DailyContent {
    read?: string;
    memorize?: string;
    study?: string;
    area?: string;
    action?: string; // For things like "Fast", "Steak Dinner", "Serve Day"
}

export interface WeekSchedule {
    weekNum: number; // 0-12
    session: 'Preparation' | 'Session 1' | 'Session 2' | 'Session 3' | 'Rest';
    theme?: string;
    days: {
        [key: string]: DailyContent; // Monday, Tuesday, etc.
    };
}

export interface ScoutSchedule {
    weekNum: number;
    memorize: string;
    topic?: string;
}

// T.A.B.L.E. Hierarchy Data
export const tableHierarchy = {
    Tradition: {
        description: "The creed and passage pyramid which serves as a central thing for the whole network.",
        subAreas: []
    },
    Apologetics: {
        description: "The ANCHORS of Apologetics",
        subAreas: {
            Axioms: {
                acronym: "PhilEMOn",
                topics: ["Philosophy", "Ethics", "Morality", "Ontology"]
            },
            Narratives: {
                acronym: "The Bible SCRIPT",
                topics: [
                    { name: "Source of Revelation", question: "Who truly speaks for God?" },
                    { name: "Canon of Recognition", question: "Why these texts and not others?" },
                    { name: "Reliability of Transmission", question: "Has the story been preserved accurately?" },
                    { name: "Integrity of Message", question: "Does the story hold together?" },
                    { name: "Prophecy and Fulfillment", question: "Does it show divine fingerprints?" },
                    { name: "Transformation of Witness", question: "What effect does this story have?" }
                ]
            },
            Creeds: {
                acronym: "The ANCA of Belief",
                topics: ["Apostles", "Nicene", "Chalcedonian", "Athanasian"]
            },
            History: {
                acronym: "The History of the CHURCH",
                topics: [
                    { name: "Christ (30-100 AD)", description: "Major Events" },
                    { name: "Heroic (100-500 AD)", description: "Martyr / Persecuted Christian Biographies" },
                    { name: "Unified (500-1000 AD)", description: "" },
                    { name: "Reformation (1000-1700 AD)", description: "" },
                    { name: "Colonial (1700-1900 AD)", description: "" },
                    { name: "Holistic (1900-Present)", description: "" }
                ]
            },
            Optics: {
                acronym: "MIRROR",
                topics: [
                    { name: "Money", description: "" },
                    { name: "Influence (Politics)", description: "" },
                    { name: "Rivalry (Division and Pride)", description: "" },
                    { name: "Relevance (Cultural Compromise)", description: "" },
                    { name: "Oppression (Abuse and Coercion)", description: "" },
                    { name: "Rejection (Church Hurt)", description: "" }
                ]
            },
            Religion: {
                acronym: "The WORLD and CHRIST",
                topics: [
                    "Western / Monotheism", "Oriental Philosophies", "Religions of Renunciation",
                    "Local / Tribal Faiths", "Doubt / Secular Worldviews", "Catholic",
                    "Historic Orthodox", "Reformed / Protestant", "Independent / Charismatic",
                    "Syncretic / Contextual", "Traditionalist / Restorationist"
                ]
            },
            Science: {
                topics: [
                    { name: "Space", description: "The origin and fine-tuning of the universe" },
                    { name: "Causation", description: "The laws of physics and the principle of sufficient reason" },
                    { name: "Information", description: "DNA, language, and data structures in life" },
                    { name: "Entropy", description: "Thermodynamics and time’s arrow" },
                    { name: "Nature", description: "Biology, evolution, and the origin of species" },
                    { name: "Consciousness", description: "The mystery of mind and self-awareness" },
                    { name: "Earth", description: "The habitability and fine-tuning of our home planet" }
                ]
            }
        }
    },
    Bible: {
        description: "The STORY of the Bible",
        subAreas: ["Summary", "Theology", "Observation", "Revelation", "Yield"]
    },
    Lists: {
        description: "FAITHFUL WITNESSES",
        topics: [
            "F – Faith", "A – Action", "I – Integrity", "T – Togetherness", "H – Holiness",
            "F – Follow", "U – Understand", "L – Learn", "W – Warrior", "I – Iron",
            "T – Trustworthy", "N – Noble", "E – Earn", "S – Serve", "S – Suffer",
            "E – Exchange", "S – Sacrifice"
        ]
    },
    Ethos: {
        description: "The ETHOS of the Triads",
        subAreas: {
            Ethics: ["Heart", "Mind", "Words", "Actions"],
            Traditions: ["Biblical", "Brotherly"],
            Habits: [
                { name: "Honor", verse: "Romans 12:10" },
                { name: "Attend", verse: "Philippians 4:8" },
                { name: "Belong", verse: "1 Peter 3:8" },
                { name: "Intercede", verse: "LIFE PAIN / LIFE GAIN mnemonics" },
                { name: "Train", verse: "1 Timothy 4:7" },
                { name: "Serve", verse: "Mark 10:45" },
                { name: "Morning", verse: "Psalm 5:3" },
                { name: "Afternoon", verse: "Psalm 119:11" },
                { name: "Night", verse: "Psalm 1:2" }
            ],
            Organization: ["Roles", "Triple Triads", "Triple Triple Triads"],
            Stewardship: ["Triad Tribe"]
        }
    }
};

// Quarterly Schedule Data
export const quarterlySchedule: WeekSchedule[] = [
    // Preparation Week (Week 0)
    {
        weekNum: 0,
        session: 'Preparation',
        days: {
            Monday: { read: "Memorize Your Testimony", area: "Tradition" },
            Tuesday: {},
            Wednesday: { read: "Practice the Tradition creed and its 13 Outer Passages." },
            Thursday: { action: "Fast" },
            Friday: { action: "Cloak Ceremony" },
            Saturday: { action: "Steak Dinner" } // Non-Sabbath
        }
    },
    // Session 1 (Weeks 1-3)
    {
        weekNum: 1,
        session: 'Session 1',
        days: {
            Monday: {
                read: "Matthew 28",
                memorize: getPassage("Matthew 28:19 BSB"),
                study: "Philosophy Apologetics",
                area: "Apologetics Axioms"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "Mark 10",
                memorize: getPassage("Mark 10:45 BSB"),
                study: "Ethics & Morality Apologetics",
                area: "Apologetics Axioms"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "Luke 2",
                memorize: getPassage("Luke 2:11 BSB"),
                study: "Ontology Apologetics",
                area: "Apologetics Axioms"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    {
        weekNum: 2,
        session: 'Session 1',
        days: {
            Monday: {
                read: "John 3",
                memorize: getPassage("John 3:17 BSB"),
                study: "The Source and Canon of the Bible",
                area: "Apologetics Narratives"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "Acts 17",
                memorize: getPassage("Acts 17:28 CSB"),
                study: "Reliability of Transmission and Integrity of the Message of the Bible",
                area: "Apologetics Narratives"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "Romans 8",
                memorize: getPassage("Romans 8:28 BSB"),
                study: "Prophecies of the Messiah and Transformation of Witnesses",
                area: "Apologetics Narratives"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    {
        weekNum: 3,
        session: 'Session 1',
        days: {
            Monday: {
                read: "1 Corinthians 13",
                memorize: getPassage("1 Corinthians 13:13 BSB"),
                study: "Apostles Creed",
                area: "Apologetics Creeds"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "2 Corinthians 5",
                memorize: getPassage("2 Corinthians 5:1 BSB"),
                study: "Nicene Creed",
                area: "Apologetics Creeds"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "Galatians 2",
                memorize: getPassage("Galatians 2:20 BSB"),
                study: "Chalcedonian and Athanasian Creeds",
                area: "Apologetics Creeds"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    // Session 2 (Weeks 4-6)
    {
        weekNum: 4,
        session: 'Session 2',
        days: {
            Monday: {
                read: "Ephesians 2",
                memorize: getPassage("Ephesians 2:13 BSB"),
                study: "History of the Church - Christ (30-100 AD)",
                area: "Apologetics History"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "Philippians 4",
                memorize: getPassage("Philippians 4:8 NIV"),
                study: "History of the Church - Heroic (100-500 AD) and Unified (500-1000 AD)",
                area: "Apologetics History"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "Colossians 4",
                memorize: getPassage("Colossians 4:6 BSB"),
                study: "History of the Church - Reformation (1000-1700 AD), Colonial (1700-1900 AD), Holistic (1900-Present)",
                area: "Apologetics History"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    {
        weekNum: 5,
        session: 'Session 2',
        days: {
            Monday: {
                read: "1 Thessalonians 5",
                memorize: getPassage("1 Thessalonians 5:23 BSB"),
                study: "Money and Influence/Politics Optics Apologetics",
                area: "Apologetics Optics"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "2 Thessalonians 3",
                memorize: getPassage("2 Thessalonians 3:10 BSB"),
                study: "Rivalry (Division and Pride) and Relevance (Cultural Compromise) Optics Apologetics",
                area: "Apologetics Optics"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "1 Timothy 6",
                memorize: getPassage("1 Timothy 6:10 BSB"),
                study: "Oppression (Abuse and Coercion) and Rejection (Church Hurt) Optics Apologetics",
                area: "Apologetics Optics"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    {
        weekNum: 6,
        session: 'Session 2',
        days: {
            Monday: {
                read: "2 Timothy 3",
                memorize: getPassage("2 Timothy 3:16 ESV"),
                study: "WORLD Religions",
                area: "Apologetics Religion"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "Titus 3",
                memorize: getPassage("Titus 3:2 ESV"),
                study: "CHRISTian Churches",
                area: "Apologetics Religion"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "Philemon 1",
                memorize: getPassage("Philemon 1:7 BSB"),
                study: "Review Religions & Churches",
                area: "Apologetics Religion"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    // Session 3 (Weeks 7-9)
    {
        weekNum: 7,
        session: 'Session 3',
        days: {
            Monday: {
                read: "Hebrews 4",
                memorize: getPassage("Hebrews 4:12 BSB"),
                study: "Space, Causation, and Information (SCI) Apologetics",
                area: "Apologetics Science"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "James 1",
                memorize: getPassage("James 1:2 BSB"),
                study: "Entropy, Nature, Consciousness, and Earth (ENCE) Apologetics",
                area: "Apologetics Science"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "1 Peter 5",
                memorize: getPassage("1 Peter 5:7 NKJV"),
                study: "Review of SCIENCE Apologetics",
                area: "Apologetics Science"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    {
        weekNum: 8,
        session: 'Session 3',
        days: {
            Monday: {
                read: "2 Peter 1",
                memorize: getPassage("2 Peter 1:4 NIV"),
                study: "Bible Summary & Theology",
                area: "Bible"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "1 John 4",
                memorize: getPassage("1 John 4:8 BSB"),
                study: "Bible Observation & Revelation",
                area: "Bible"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "2 John 1",
                memorize: getPassage("2 John 1:4 BLB"),
                study: "Yielding to the Bible",
                area: "Bible"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    {
        weekNum: 9,
        session: 'Session 3',
        days: {
            Monday: {
                read: "3 John 1",
                memorize: getPassage("3 John 1:5 BSB"),
                study: "Ethics and Traditions of the Triad",
                area: "Ethos"
            },
            Tuesday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Wednesday: {
                read: "Jude 1",
                memorize: getPassage("Jude 1:24 BSB"),
                study: "Habits and Organization of the Triad",
                area: "Ethos"
            },
            Thursday: { read: "Devotional", memorize: "Review", study: "Fellowship" },
            Friday: {
                read: "Revelation 21",
                memorize: getPassage("Revelation 21:4 NIV"),
                study: "Stewardship of the Triad",
                area: "Ethos"
            },
            Saturday: { action: "Serve Day" }
        }
    },
    // Rest (Weeks 10-12)
    {
        weekNum: 10,
        session: 'Rest',
        days: {
            Monday: {
                read: "Ephesians 2",
                memorize: getPassage("Ephesians 2:13 BSB"),
                study: "Rest",
                area: "Apologetics History"
            },
            Tuesday: { read: "Rest / Catch Up" },
            Wednesday: {
                read: "Philippians 4",
                memorize: getPassage("Philippians 4:8 NIV"),
                study: "Rest",
                area: "Apologetics History"
            },
            Thursday: { read: "Rest / Catch Up" },
            Friday: {
                read: "Colossians 4",
                memorize: getPassage("Colossians 4:6 BSB"),
                study: "Rest",
                area: "Apologetics History"
            },
            Saturday: { read: "Rest / Catch Up" }
        }
    },
    {
        weekNum: 11,
        session: 'Rest',
        days: {
            Monday: {
                read: "1 Thessalonians 5",
                memorize: getPassage("1 Thessalonians 5:23 BSB"),
                study: "Rest",
                area: "Apologetics Optics"
            },
            Tuesday: { read: "Rest / Catch Up" },
            Wednesday: {
                read: "2 Thessalonians 3",
                memorize: getPassage("2 Thessalonians 3:10 BSB"),
                study: "Rest",
                area: "Apologetics Optics"
            },
            Thursday: { read: "Rest / Catch Up" },
            Friday: {
                read: "1 Timothy 6",
                memorize: getPassage("1 Timothy 6:10 BSB"),
                study: "Rest",
                area: "Apologetics Optics"
            },
            Saturday: { read: "Rest / Catch Up" }
        }
    },
    {
        weekNum: 12,
        session: 'Rest',
        days: {
            Monday: {
                read: "2 Timothy 3",
                memorize: getPassage("2 Timothy 3:16 ESV"),
                study: "Rest",
                area: "Apologetics Religion"
            },
            Tuesday: { read: "Rest / Catch Up" },
            Wednesday: {
                read: "Titus 3",
                memorize: getPassage("Titus 3:2 ESV"),
                study: "Rest",
                area: "Apologetics Religion"
            },
            Thursday: { read: "Rest / Catch Up" },
            Friday: {
                read: "Philemon 1",
                memorize: getPassage("Philemon 1:7 BSB"),
                study: "Rest",
                area: "Apologetics Religion"
            },
            Saturday: { read: "Rest / Catch Up" }
        }
    }
];

export const preScoutSchedule: ScoutSchedule[] = [
    { weekNum: 1, memorize: "GRACE" },
    { weekNum: 2, memorize: "CROWN PATH" },
    { weekNum: 3, memorize: "John 3:16" },
    { weekNum: 4, memorize: "10 Commandments" },
    { weekNum: 5, memorize: "9 Fruits of the Spirit" },
    { weekNum: 6, memorize: "8 Beatitudes" },
    { weekNum: 7, memorize: "7 Armors of God (Ephesians 6)" },
    { weekNum: 8, memorize: "Lord's Prayer" },
    { weekNum: 9, memorize: "Psalm 23" }
];

export const scoutSchedule: ScoutSchedule[] = [
    { weekNum: 0, memorize: "AIM Verse" },
    { weekNum: 1, memorize: "Abide Verse", topic: "THE MESSIAH" },
    { weekNum: 2, memorize: "Imitate Verse", topic: "15 Biblical Characteristics of Love (1 Cor 13)" },
    { weekNum: 3, memorize: "Mobilize Verse", topic: "10 Steps of the Romans Road" },
    { weekNum: 4, memorize: "Glorify Verse", topic: "8 “I AM” Statements of Jesus" },
    { weekNum: 5, memorize: "Obey Verse", topic: "8 Rungs on Peter’s Growth Ladder (2 Pet 1:5-7)" },
    { weekNum: 6, memorize: "Delight Verse", topic: "8 Verses for LIFE PAIN" },
    { weekNum: 7, memorize: "Made Verse", topic: "5 Responses to the FLESH" },
    { weekNum: 8, memorize: "Aware Verse", topic: "The 19 Last Days Attitudes" },
    { weekNum: 9, memorize: "New Verse", topic: "THE END TIMES" },
    { weekNum: 10, memorize: "Witness Verse" },
    { weekNum: 11, memorize: "Acts Verse", topic: "Parables of Jesus Mnemonic (LOST SEED WISE TRUST SERVE)" },
    { weekNum: 12, memorize: "Yield Verse" }
];
