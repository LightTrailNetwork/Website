
// Types
export interface Prophecy {
    id: string;
    title: string;
    description: string;
    otReference: { book: string; chapter: number; verse: string; text: string };
    ntFulfillment: { book: string; chapter: number; verse: string; text: string };
    context: string;
    category: 'Messianic' | 'Nation' | 'End Times' | 'Typology';
}

export interface BibleProfile {
    id: string;
    name: string;
    title: string;
    meaning: string;
    dates: string;
    keyVerses: { ref: string; text: string }[];
    bio: string;
    traits: string[];
    role: 'Patriarch' | 'Prophet' | 'King' | 'Apostle' | 'Disciple' | 'Other';
    connections: string[]; // IDs of other connected profiles
    imagePrompt?: string; // For future AI image gen
}

export interface BiblicalTheme {
    id: string;
    title: string;
    definition: string;
    verses: { ref: string; text: string; note: string }[];
    relatedThemes: string[];
}

export interface TimelineEvent {
    id: string;
    year: string; // e.g. "1446 BC" or "30 AD"
    title: string;
    description: string;
    references: string[];
    era: 'Creation' | 'Patriarchs' | 'Exodus' | 'Conquest' | 'Judges' | 'Kingdom' | 'Exile' | 'Return' | 'Silence' | 'Life of Christ' | 'Early Church';
}

// Data Collections

export const PROPHECIES: Prophecy[] = [
    {
        id: 'seed-woman',
        title: 'The Seed of the Woman',
        description: 'The first foreshadowing of the Messiah who would crush Satan.',
        otReference: { book: 'Genesis', chapter: 3, verse: '15', text: 'And I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel.' },
        ntFulfillment: { book: 'Galatians', chapter: 4, verse: '4', text: 'But when the set time had fully come, God sent his Son, born of a woman, born under the law.' },
        context: 'Given immediately after the Fall in the Garden of Eden, offering hope of restoration.',
        category: 'Messianic'
    },
    {
        id: 'virgin-birth',
        title: 'Born of a Virgin',
        description: 'Isaiah predicts the miraculous nature of the Messiah\'s birth.',
        otReference: { book: 'Isaiah', chapter: 7, verse: '14', text: 'Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel.' },
        ntFulfillment: { book: 'Matthew', chapter: 1, verse: '22-23', text: 'All this took place to fulfill what the Lord had said through the prophet: "The virgin will conceive and give birth to a son..."' },
        context: 'Spoken to King Ahaz of Judah during a time of national crisis.',
        category: 'Messianic'
    },
    {
        id: 'suffering-servant',
        title: ' The Suffering Servant',
        description: 'The detailed depiction of Christ\'s atoning death.',
        otReference: { book: 'Isaiah', chapter: 53, verse: '5', text: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.' },
        ntFulfillment: { book: '1 Peter', chapter: 2, verse: '24', text: 'He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.' },
        context: 'Part of the Servant Songs in Isaiah, describing the method of salvation.',
        category: 'Messianic'
    },
    {
        id: 'bethlehem',
        title: 'Born in Bethlehem',
        description: 'The specific village where the Ruler of Israel would originate.',
        otReference: { book: 'Micah', chapter: 5, verse: '2', text: 'But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel...' },
        ntFulfillment: { book: 'Matthew', chapter: 2, verse: '1', text: 'After Jesus was born in Bethlehem in Judea, during the time of King Herod...' },
        context: 'Micah prophesies hope amidst upcoming judgment on Israel and Judah.',
        category: 'Messianic'
    },
    {
        id: 'passover-lamb',
        title: 'No Bones Broken',
        description: 'The correspondence between the Passover Lamb and Jesus on the cross.',
        otReference: { book: 'Psalm', chapter: 34, verse: '20', text: 'He protects all his bones, not one of them will be broken.' },
        ntFulfillment: { book: 'John', chapter: 19, verse: '33', text: 'But when they came to Jesus and found that he was already dead, they did not break his legs.' },
        context: 'A detail fulfilled literally during the crucifixion distinct from the two thieves.',
        category: 'Typology'
    }
];

export const PROFILES: BibleProfile[] = [
    {
        id: 'david',
        name: 'David',
        title: 'The Man After God\'s Own Heart',
        meaning: 'Beloved',
        dates: 'c. 1040–970 BC',
        keyVerses: [
            { ref: '1 Samuel 13:14', text: 'The Lord has sought out a man after his own heart.' },
            { ref: 'Psalm 23:1', text: 'The Lord is my shepherd, I lack nothing.' }
        ],
        bio: 'Shepherd, warrior, poet, and king. David unified the tribes of Israel, established Jerusalem as the capital, and laid the plans for the Temple. Despite grave moral failures, his repentance and heart for God set the standard for all future kings.',
        traits: ['Courageous', 'Musical', 'Repentant', 'Leader', 'Warrior'],
        role: 'King',
        connections: ['solomon', 'saul', 'jonathan', 'samuel']
    },
    {
        id: 'moses',
        name: 'Moses',
        title: 'The Lawgiver',
        meaning: 'Drawn Out',
        dates: 'c. 1526–1406 BC',
        keyVerses: [
            { ref: 'Deuteronomy 34:10', text: 'Since then, no prophet has risen in Israel like Moses, whom the Lord knew face to face.' }
        ],
        bio: 'Born a Hebrew slave, raised a specialized Egyptian prince, and called by God from a burning bush to lead His people out of bondage. He received the Ten Commandments and led Israel through the wilderness for 40 years.',
        traits: ['Humble', 'Intercessor', 'Prophet', 'Legislator'],
        role: 'Prophet',
        connections: ['aaron', 'joshua', 'pharaoh']
    },
    {
        id: 'peter',
        name: 'Peter (Simon)',
        title: 'The Rock',
        meaning: 'Rock (Petros)',
        dates: 'd. c. 64 AD',
        keyVerses: [
            { ref: 'Matthew 16:18', text: 'And I tell you that you are Peter, and on this rock I will build my church.' }
        ],
        bio: 'A fisherman called by Jesus to be a fisher of men. Impulsive yet passionate, Peter became the leader of the early church and the first to preach the gospel to the Gentiles.',
        traits: ['Bold', 'Impulsive', 'Leader', 'Passionate'],
        role: 'Apostle',
        connections: ['jesus', 'john', 'paul', 'andrew']
    },
    {
        id: 'paul',
        name: 'Paul (Saul)',
        title: 'Apostle to the Gentiles',
        meaning: 'Small / Humble',
        dates: 'c. 5–67 AD',
        keyVerses: [
            { ref: 'Philippians 1:21', text: 'For to me, to live is Christ and to die is gain.' }
        ],
        bio: 'Originally a zealous persecutor of the church, converted by a blinding vision of the risen Christ. Paul became the greatest missionary of the early church, authoring much of the New Testament.',
        traits: ['Intellectual', 'Zealous', 'Theologian', 'Missionary'],
        role: 'Apostle',
        connections: ['barnabas', 'timothy', 'luke', 'silas']
    }
];

export const THEMES: BiblicalTheme[] = [
    {
        id: 'covenant',
        title: 'Covenant',
        definition: 'A binding agreement between two parties, specifically between God and His people, establishing a relationship with promises and obligations.',
        verses: [
            { ref: 'Genesis 15:18', text: 'On that day the Lord made a covenant with Abram...', note: 'Abrahamic Covenant' },
            { ref: 'Exodus 24:8', text: 'Moses then took the blood... and said, "This is the blood of the covenant..."', note: 'Mosaic Covenant' },
            { ref: 'Jeremiah 31:31', text: 'The days are coming... when I will make a new covenant...', note: 'New Covenant Promise' },
            { ref: 'Luke 22:20', text: 'This cup is the new covenant in my blood...', note: 'New Covenant Inauguration' }
        ],
        relatedThemes: ['redemption', 'law', 'grace']
    },
    {
        id: 'kingdom',
        title: 'Kingdom of God',
        definition: 'God\'s sovereign rule and reign, inaugurated by Jesus Christ, present now in the hearts of believers, and to be fully realized in the future.',
        verses: [
            { ref: 'Mark 1:15', text: 'The time has come... The kingdom of God has come near.', note: 'Inauguration' },
            { ref: 'Matthew 6:33', text: 'But seek first his kingdom and his righteousness...', note: 'Priority' },
            { ref: 'Revelation 11:15', text: 'The kingdom of the world has become the kingdom of our Lord...', note: 'Consummation' }
        ],
        relatedThemes: ['messiah', 'authority', 'glory']
    }
];

export const TIMELINE: TimelineEvent[] = [
    { id: 'creation', year: 'Undated', title: 'Creation & Fall', description: 'God creates the heavens and the earth. Adam and Eve sin.', references: ['Genesis 1-3'], era: 'Creation' },
    { id: 'call-abraham', year: 'c. 2100 BC', title: 'Call of Abraham', description: 'God calls Abram to leave Ur. The Covenant is established.', references: ['Genesis 12'], era: 'Patriarchs' },
    { id: 'exodus', year: 'c. 1446 BC', title: 'The Exodus', description: 'Moses leads Israel out of Egypt. The Passover.', references: ['Exodus 12-14'], era: 'Exodus' },
    { id: 'david-king', year: 'c. 1010 BC', title: 'David Becomes King', description: 'David ascends to the throne of Judah, later all Israel.', references: ['2 Samuel 2'], era: 'Kingdom' },
    { id: 'temple-built', year: 'c. 966 BC', title: 'Solomon Builds Temple', description: 'The First Temple is constructed in Jerusalem.', references: ['1 Kings 6'], era: 'Kingdom' },
    { id: 'exile-israel', year: '722 BC', title: 'Fall of Northern Kingdom', description: 'Assyria conquers Israel (Samaria).', references: ['2 Kings 17'], era: 'Kingdom' },
    { id: 'exile-judah', year: '586 BC', title: 'Fall of Jerusalem', description: 'Babylon destroys the Temple and exiles Judah.', references: ['2 Kings 25'], era: 'Exile' },
    { id: 'decree-cyrus', year: '538 BC', title: 'Decree of Cyrus', description: 'King Cyrus allows Jews to return and rebuild.', references: ['Ezra 1'], era: 'Return' },
    { id: 'birth-jesus', year: 'c. 4 BC', title: 'Birth of Jesus', description: 'The Word becomes flesh in Bethlehem.', references: ['Luke 2'], era: 'Life of Christ' },
    { id: 'crucifixion', year: 'c. 30/33 AD', title: 'Crucifixion & Resurrection', description: 'The death and resurrection of Christ.', references: ['Matthew 27-28'], era: 'Life of Christ' },
    { id: 'pentecost', year: 'c. 30/33 AD', title: 'Pentecost', description: 'The Holy Spirit descends. The Church is born.', references: ['Acts 2'], era: 'Early Church' },
    { id: 'jerusalem-fall', year: '70 AD', title: 'Destruction of Jerusalem', description: 'Roman legions destroy the Second Temple.', references: ['History'], era: 'Early Church' }

];
