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
    role: 'Patriarch' | 'Prophet' | 'King' | 'Apostle' | 'Disciple' | 'Judge' | 'Queen' | 'Other';
    connections: string[];
    imagePrompt?: string;
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
    year: string;
    title: string;
    description: string;
    references: string[];
    era: 'Creation' | 'Patriarchs' | 'Exodus' | 'Conquest' | 'Judges' | 'Kingdom' | 'Exile' | 'Return' | 'Silence' | 'Life of Christ' | 'Early Church';
}

export interface Place {
    id: string;
    name: string;
    modernLocation: string;
    significance: string;
    events: { title: string; ref: string }[];
    coordinates?: { lat: number; lng: number };
}

export interface ConceptSymbol {
    id: string;
    name: string;
    meaning: string;
    appearances: { ref: string; context: string }[];
    theme: 'Nature' | 'Cultic' | 'Color' | 'Number' | 'Object';
}

export interface Typology {
    id: string;
    title: string;
    otType: { entity: string; description: string; ref: string };
    ntAntitype: { entity: string; description: string; ref: string };
    significance: string;
}

export interface HarmonyEvent {
    id: string;
    title: string;
    references: {
        matthew?: string;
        mark?: string;
        luke?: string;
        john?: string;
    };
    description: string;
}

export interface Pattern {
    id: string;
    title: string;
    description: string;
    steps: { order: number; label: string; ref?: string }[];
    occurrences: string[];
}

export interface BookOutline {
    id: string;
    bookName: string;
    theme: string;
    sections: { title: string; range: string; subpoints?: string[] }[];
}

export interface BiblicalEra {
    id: string;
    title: string;
    dates: string;
    description: string;
    majorFigures: string[];
    books: string[];
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
        id: 'abraham-blessing',
        title: 'Blessing to All Nations',
        description: 'The promise that Abraham\'s descendant would bless the entire world.',
        otReference: { book: 'Genesis', chapter: 12, verse: '3', text: '...and all peoples on earth will be blessed through you.' },
        ntFulfillment: { book: 'Acts', chapter: 3, verse: '25', text: 'He said to Abraham, "Through your offspring all peoples on earth will be blessed."' },
        context: 'The foundational covenant with Abraham.',
        category: 'Messianic'
    },
    {
        id: 'scepter-judah',
        title: 'The Scepter of Judah',
        description: 'The Messiah would come from the tribe of Judah.',
        otReference: { book: 'Genesis', chapter: 49, verse: '10', text: 'The scepter will not depart from Judah, nor the ruler\'s staff from between his feet, until he to whom it belongs shall come...' },
        ntFulfillment: { book: 'Luke', chapter: 3, verse: '33', text: '...the son of Amminadab, the son of Ram, the son of Hezron, the son of Perez, the son of Judah...' },
        context: 'Jacob\'s dying blessing to his sons.',
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
        id: 'adam',
        name: 'Adam',
        title: 'The First Man',
        meaning: 'Man / Earth',
        dates: 'Creation',
        keyVerses: [
            { ref: 'Genesis 1:27', text: 'So God created mankind in his own image...' },
            { ref: '1 Corinthians 15:45', text: 'The first man Adam became a living being; the last Adam, a life-giving spirit.' }
        ],
        bio: 'Created directly by God from texthe dust of the ground. The father of the human race. Through his disobedience, sin entered the world, but he also received the first promise of redemption.',
        traits: ['First', 'Headship', 'Fallen'],
        role: 'Patriarch',
        connections: ['eve', 'cain', 'abel', 'seth', 'jesus']
    },
    {
        id: 'noah',
        name: 'Noah',
        title: 'Preacher of Righteousness',
        meaning: 'Rest / Comfort',
        dates: 'c. 2900 BC',
        keyVerses: [
            { ref: 'Genesis 6:9', text: 'Noah was a righteous man, blameless among the people of his time, and he walked faithfully with God.' },
            { ref: 'Hebrews 11:7', text: 'By faith Noah, when warned about things not yet seen, in holy fear built an ark...' }
        ],
        bio: 'Found grace in the eyes of the Lord during a time of total wickedness. Built the Ark to save his family and the animals from the Flood. God established a covenant with him never to destroy the earth by water again.',
        traits: ['Faithful', 'Obedient', 'Patient', 'Builder'],
        role: 'Patriarch',
        connections: ['shem', 'ham', 'japheth']
    },
    {
        id: 'abraham',
        name: 'Abraham',
        title: 'Father of Nations',
        meaning: 'Father of a Multitude',
        dates: 'c. 2166–1991 BC',
        keyVerses: [
            { ref: 'Genesis 15:6', text: 'Abram believed the Lord, and he credited it to him as righteousness.' }
        ],
        bio: 'Called by God to leave his home in Ur for a land he had never seen. The recipient of the Abrahamic Covenant. His faith was tested when asked to sacrifice his son Isaac.',
        traits: ['Faithful', 'Hospitable', 'Intercessor', 'Patriarch'],
        role: 'Patriarch',
        connections: ['sarah', 'isaac', 'lot', 'hagar', 'ishmael']
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
        id: 'ruth',
        name: 'Ruth',
        title: 'The Loyal Moabitess',
        meaning: 'Friendship',
        dates: 'Time of Judges',
        keyVerses: [
            { ref: 'Ruth 1:16', text: 'Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.' }
        ],
        bio: 'A Moabite widow who refused to abandon her Israelite mother-in-law, Naomi. Her loyalty led her to Boaz, her kinsman-redeemer, and she became the great-grandmother of King David.',
        traits: ['Loyal', 'Hardworking', 'Faithful'],
        role: 'Other',
        connections: ['naomi', 'boaz', 'david']
    },
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
        id: 'esther',
        name: 'Esther',
        title: 'Queen of Persia',
        meaning: 'Star',
        dates: 'c. 480 BC',
        keyVerses: [
            { ref: 'Esther 4:14', text: 'And who knows but that you have come to your royal position for such a time as this?' }
        ],
        bio: 'A Jewish orphan raised by her cousin Mordecai who became Queen of Persia. She risked her life to intercede for her people, saving the Jews from genocide.',
        traits: ['Courageous', 'Beautiful', 'Wise', 'Patriotic'],
        role: 'Queen',
        connections: ['mordecai', 'xerxes', 'haman']
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
            { ref: '2 Samuel 7:16', text: 'Your house and your kingdom will endure forever before me...', note: 'Davidic Covenant' },
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
            { ref: 'John 18:36', text: 'Jesus said, "My kingdom is not of this world."', note: 'Nature' },
            { ref: 'Revelation 11:15', text: 'The kingdom of the world has become the kingdom of our Lord...', note: 'Consummation' }
        ],
        relatedThemes: ['messiah', 'authority', 'glory']
    },
    {
        id: 'atonement',
        title: 'Atonement',
        definition: 'The work of Christ by which He brought about reconciliation between God and man through His sacrificial death.',
        verses: [
            { ref: 'Leviticus 17:11', text: 'For the life of a creature is in the blood, and I have given it to you to make atonement...', note: 'OT Sacrifice' },
            { ref: 'Romans 3:25', text: 'God presented Christ as a sacrifice of atonement, through the shedding of his blood...', note: 'Propitiation' },
            { ref: 'Hebrews 9:22', text: 'In fact, the law requires that nearly everything be cleansed with blood, and without the shedding of blood there is no forgiveness.', note: 'Necessity' }
        ],
        relatedThemes: ['sacrifice', 'sin', 'justification']
    }
];

export const TIMELINE: TimelineEvent[] = [
    { id: 'creation', year: 'Undated', title: 'Creation & Fall', description: 'God creates the heavens and the earth. Adam and Eve sin.', references: ['Genesis 1'], era: 'Creation' },
    { id: 'flood', year: 'Undated', title: 'The Flood', description: 'God judges the earth with water; Noah is saved.', references: ['Genesis 6'], era: 'Creation' },
    { id: 'call-abraham', year: 'c. 2100 BC', title: 'Call of Abraham', description: 'God calls Abram to leave Ur. The Covenant is established.', references: ['Genesis 12'], era: 'Patriarchs' },
    { id: 'isaac-jacob', year: 'c. 2000 BC', title: 'Isaac Given, Jacob Born', description: 'The line of promise continues through Isaac and Jacob (Israel).', references: ['Genesis 21'], era: 'Patriarchs' },
    { id: 'joseph-egypt', year: 'c. 1898 BC', title: 'Joseph in Egypt', description: 'Joseph rises to power, saving his family from famine.', references: ['Genesis 37'], era: 'Patriarchs' },
    { id: 'exodus', year: 'c. 1446 BC', title: 'The Exodus', description: 'Moses leads Israel out of Egypt. The Passover.', references: ['Exodus 12'], era: 'Exodus' },
    { id: 'conquest', year: 'c. 1406 BC', title: 'Conquest of Canaan', description: 'Joshua leads Israel into the Promised Land.', references: ['Joshua 1'], era: 'Conquest' },
    { id: 'judges', year: 'c. 1375 BC', title: 'Period of Judges', description: 'Israel cycles through rebellion and deliverance.', references: ['Judges 2'], era: 'Judges' },
    { id: 'david-king', year: 'c. 1010 BC', title: 'David Becomes King', description: 'David ascends to the throne of Judah, later all Israel.', references: ['2 Samuel 2'], era: 'Kingdom' },
    { id: 'temple-built', year: 'c. 966 BC', title: 'Solomon Builds Temple', description: 'The First Temple is constructed in Jerusalem.', references: ['1 Kings 6'], era: 'Kingdom' },
    { id: 'kingdom-split', year: '930 BC', title: 'Kingdom Divided', description: 'Israel splits into North (Israel) and South (Judah).', references: ['1 Kings 12'], era: 'Kingdom' },
    { id: 'exile-israel', year: '722 BC', title: 'Fall of Northern Kingdom', description: 'Assyria conquers Israel (Samaria).', references: ['2 Kings 17'], era: 'Kingdom' },
    { id: 'josiah-reform', year: '640 BC', title: 'Josiah\'s Reforms', description: 'A brief revival of faithful worship in Judah.', references: ['2 Kings 22'], era: 'Kingdom' },
    { id: 'exile-judah', year: '586 BC', title: 'Fall of Jerusalem', description: 'Babylon destroys the Temple and exiles Judah.', references: ['2 Kings 25'], era: 'Exile' },
    { id: 'decree-cyrus', year: '538 BC', title: 'Decree of Cyrus', description: 'King Cyrus allows Jews to return and rebuild.', references: ['Ezra 1'], era: 'Return' },
    { id: 'temple-rebuilt', year: '516 BC', title: 'Temple Rebuilt', description: 'The Second Temple is completed under Zerubbabel.', references: ['Ezra 6'], era: 'Return' },
    { id: 'malachi', year: 'c. 430 BC', title: 'Prophecy of Malachi', description: 'The final prophet before the 400 years of silence.', references: ['Malachi 1'], era: 'Silence' },
    { id: 'birth-jesus', year: 'c. 4 BC', title: 'Birth of Jesus', description: 'The Word becomes flesh in Bethlehem.', references: ['Luke 2'], era: 'Life of Christ' },
    { id: 'ministry-start', year: 'c. 27 AD', title: 'Jesus Begins Ministry', description: 'Baptism by John and temptation in the wilderness.', references: ['Mark 1'], era: 'Life of Christ' },
    { id: 'crucifixion', year: 'c. 30/33 AD', title: 'Crucifixion & Resurrection', description: 'The death and resurrection of Christ.', references: ['Matthew 27'], era: 'Life of Christ' },
    { id: 'pentecost', year: 'c. 30/33 AD', title: 'Pentecost', description: 'The Holy Spirit descends. The Church is born.', references: ['Acts 2'], era: 'Early Church' },
    { id: 'paul-conversion', year: 'c. 34 AD', title: 'Conversion of Paul', description: 'Saul encounters Jesus on the road to Damascus.', references: ['Acts 9'], era: 'Early Church' },
    { id: 'council-jerusalem', year: 'c. 49 AD', title: 'Council of Jerusalem', description: 'The church decides Gentiles do not need to follow Jewish law.', references: ['Acts 15'], era: 'Early Church' },
    { id: 'jerusalem-fall', year: '70 AD', title: 'Destruction of Jerusalem', description: 'Roman legions destroy the Second Temple.', references: ['Luke 21:20'], era: 'Early Church' }
];

export const PLACES: Place[] = [
    {
        id: 'jerusalem',
        name: 'Jerusalem',
        modernLocation: 'Jerusalem',
        significance: 'The political and spiritual center of Israel. Site of the Temple, the crucifixion, and the resurrection.',
        events: [
            { title: 'Melchizedek meets Abraham', ref: 'Genesis 14:18' },
            { title: 'David conquers the city', ref: '2 Samuel 5' },
            { title: 'Solomon builds the Temple', ref: '1 Kings 6' },
            { title: 'Jesus crucified', ref: 'John 19' }
        ]
    },
    {
        id: 'bethel',
        name: 'Bethel',
        modernLocation: 'Beitin, West Bank',
        significance: 'Meaning "House of God". A place of encounter with the divine.',
        events: [
            { title: 'Abraham builds an altar', ref: 'Genesis 12:8' },
            { title: 'Jacob\'s ladder dream', ref: 'Genesis 28' },
            { title: 'Jeroboam sets up golden calf', ref: '1 Kings 12:29' }
        ]
    },
    {
        id: 'babylon',
        name: 'Babylon',
        modernLocation: 'Hillal, Iraq',
        significance: 'The archetypal city of man\'s rebellion and the place of Judah\'s exile.',
        events: [
            { title: 'Tower of Babel', ref: 'Genesis 11' },
            { title: 'Judah taken captive', ref: '2 Kings 25' },
            { title: 'Nebuchadnezzar\'s dream', ref: 'Daniel 2' }
        ]
    },
    {
        id: 'nazareth',
        name: 'Nazareth',
        modernLocation: 'Nazareth, Israel',
        significance: 'The childhood home of Jesus.',
        events: [
            { title: 'The Annunciation', ref: 'Luke 1:26' },
            { title: 'Jesus rejected in synagogue', ref: 'Luke 4:16' }
        ]
    },
    {
        id: 'capernaum',
        name: 'Capernaum',
        modernLocation: 'Kfar Nahum',
        significance: 'The headquarters of Jesus\' Galilean ministry.',
        events: [
            { title: 'Jesus heals paralyzed man', ref: 'Mark 2' },
            { title: 'Peter\'s mother-in-law healed', ref: 'Matthew 8:14' },
            { title: 'Bread of Life discourse', ref: 'John 6' }
        ]
    }
];

export const SYMBOLS: ConceptSymbol[] = [
    {
        id: 'water',
        name: 'Water',
        meaning: 'Cleansing, Life, Chaos (Sea), The Holy Spirit.',
        appearances: [
            { ref: 'Genesis 1:2', context: 'Spirit hovering over the waters' },
            { ref: 'Exodus 17:6', context: 'Water from the Rock' },
            { ref: 'Psalm 23:2', context: 'Quiet waters of rest' },
            { ref: 'John 4:14', context: 'Living Water' },
            { ref: 'Revelation 22:1', context: 'River of the Water of Life' }
        ],
        theme: 'Nature'
    },
    {
        id: 'lamb',
        name: 'The Lamb',
        meaning: 'Innocence, Sacrifice, Substitutionary Atonement.',
        appearances: [
            { ref: 'Genesis 22:8', context: 'God will provide the lamb' },
            { ref: 'Exodus 12:3', context: 'The Passover Lamb' },
            { ref: 'Isaiah 53:7', context: 'Led like a lamb to the slaughter' },
            { ref: 'John 1:29', context: 'Behold the Lamb of God' },
            { ref: 'Revelation 5:6', context: 'A Lamb looking as if it had been slain' }
        ],
        theme: 'Cultic'
    },
    {
        id: 'fire',
        name: 'Fire',
        meaning: 'God\'s Presence, Judgment, Purification, The Holy Spirit.',
        appearances: [
            { ref: 'Genesis 15:17', context: 'Smoking firepot at covenant' },
            { ref: 'Exodus 3:2', context: 'The Burning Bush' },
            { ref: 'Exodus 13:21', context: 'Pillar of Fire' },
            { ref: '1 Kings 18:38', context: 'Fire on Mt Carmel' },
            { ref: 'Acts 2:3', context: 'Tongues of Fire' }
        ],
        theme: 'Nature'
    },
    {
        id: 'three',
        name: 'The Number Three',
        meaning: 'Completeness, The Trinity, Resurrection.',
        appearances: [
            { ref: 'Genesis 18:2', context: 'Three visitors to Abraham' },
            { ref: 'Jonah 1:17', context: 'Three days in the fish' },
            { ref: 'Matthew 12:40', context: 'Sign of Jonah (3 days)' },
            { ref: 'Matthew 28:1', context: 'Resurrection on the third day' }
        ],
        theme: 'Number'
    }
];

export const TYPOLOGY: Typology[] = [
    {
        id: 'isaac',
        title: 'Abraham Sacrifices Isaac',
        otType: { entity: 'Isaac', description: 'The beloved son carrying the wood for his own sacrifice on Mt. Moriah.', ref: 'Genesis 22' },
        ntAntitype: { entity: 'Jesus', description: 'The Beloved Son carrying the cross for His sacrifice on Mt. Calvary (Moriah).', ref: 'John 19:17' },
        significance: 'Demonstrates the Father\'s willingness to sacrifice His Son and the Son\'s submission.'
    },
    {
        id: 'ark',
        title: 'Noah\'s Ark',
        otType: { entity: 'The Ark', description: 'The only means of salvation from the judgment of water.', ref: 'Genesis 6' },
        ntAntitype: { entity: 'Christ', description: 'The only means of salvation from the judgment of sin.', ref: '1 Peter 3:20' },
        significance: 'Security is found only by being "in" the Ark/Christ.'
    },
    {
        id: 'manna',
        title: 'The Manna',
        otType: { entity: 'Manna', description: 'Bread from heaven that sustained life in the wilderness.', ref: 'Exodus 16' },
        ntAntitype: { entity: 'Jesus', description: 'The True Bread from Heaven who gives eternal life.', ref: 'John 6:32' },
        significance: 'Jesus is the daily sustenance for the believer.'
    },
    {
        id: 'bronze-serpent',
        title: 'The Bronze Serpent',
        otType: { entity: 'Bronze Serpent', description: 'Lifted up on a pole; those who looked at it lived.', ref: 'Numbers 21' },
        ntAntitype: { entity: 'The Cross', description: 'The Son of Man lifted up; those who believe have eternal life.', ref: 'John 3:14' },
        significance: 'Salvation comes through looking to God\'s provision in faith.'
    }
];

export const HARMONY: HarmonyEvent[] = [
    {
        id: 'baptism',
        title: 'The Baptism of Jesus',
        description: 'Jesus is baptized by John in the Jordan river.',
        references: { matthew: '3:13-17', mark: '1:9-11', luke: '3:21-22', john: '1:29-34' }
    },
    {
        id: 'feeding-5000',
        title: 'Feeding of the 5,000',
        description: 'The only miracle recorded in all four Gospels.',
        references: { matthew: '14:13-21', mark: '6:30-44', luke: '9:10-17', john: '6:1-15' }
    },
    {
        id: 'peter-confession',
        title: 'Peter\'s Confession',
        description: 'Peter declares Jesus to be the Messiah.',
        references: { matthew: '16:13-20', mark: '8:27-30', luke: '9:18-20' }
    },
    {
        id: 'triumphal-entry',
        title: 'The Triumphal Entry',
        description: 'Jesus enters Jerusalem on a donkey.',
        references: { matthew: '21:1-11', mark: '11:1-11', luke: '19:28-44', john: '12:12-19' }
    },
    {
        id: 'resurrection',
        title: 'The Resurrection',
        description: 'The empty tomb and angelic announcement.',
        references: { matthew: '28:1-10', mark: '16:1-8', luke: '24:1-12', john: '20:1-10' }
    }
];

export const PATTERNS: Pattern[] = [
    {
        id: 'creation-week',
        title: 'The Creation Week',
        description: 'The structural pattern of forming (Days 1-3) and filling (Days 4-6).',
        steps: [
            { order: 1, label: 'Light', ref: 'Day 1' },
            { order: 2, label: 'Sea & Sky', ref: 'Day 2' },
            { order: 3, label: 'Land & Plants', ref: 'Day 3' },
            { order: 4, label: 'Sun, Moon, Stars', ref: 'Day 4 (Fills Day 1)' },
            { order: 5, label: 'Fish & Birds', ref: 'Day 5 (Fills Day 2)' },
            { order: 6, label: 'Animals & Man', ref: 'Day 6 (Fills Day 3)' },
            { order: 7, label: 'Rest', ref: 'Day 7' }
        ],
        occurrences: ['Genesis 1', 'John 1 (New Creation)']
    },
    {
        id: 'exod-pattern',
        title: 'The Exodus Pattern',
        description: 'The cycle of Bondage -> Deliverance -> Consecration -> Inheritance.',
        steps: [
            { order: 1, label: 'Bondage', ref: 'Egypt / Sin' },
            { order: 2, label: 'Deliverer', ref: 'Moses / Jesus' },
            { order: 3, label: 'Deliverance', ref: 'Red Sea / Cross' },
            { order: 4, label: 'Wilderness', ref: 'Testing / Sanctification' },
            { order: 5, label: 'Promised Land', ref: 'Canaan / New Creation' }
        ],
        occurrences: ['Exodus', 'Return from Exile', 'Christian Life']
    }
];

export const OUTLINES: BookOutline[] = [
    {
        id: 'genesis',
        bookName: 'Genesis',
        theme: 'Beginnings',
        sections: [
            { title: 'Primeval History', range: '1:1 - 11:32', subpoints: ['Creation', 'Fall', 'Flood', 'Nations'] },
            { title: 'Patriarchal History', range: '12:1 - 50:26', subpoints: ['Abraham (12-25)', 'Isaac (21-27)', 'Jacob (25-36)', 'Joseph (37-50)'] }
        ]
    }, // Add more book outlines?
    {
        id: 'matthew',
        bookName: 'Matthew',
        theme: 'Jesus the King',
        sections: [
            { title: 'Presentation of the King', range: '1:1 - 4:11' },
            { title: 'Proclamation of the Kingdom', range: '4:12 - 7:29' },
            { title: 'Power of the King', range: '8:1 - 10:42' },
            { title: 'Rejection of the King', range: '11:1 - 16:12' },
            { title: 'Preparation of Disciples', range: '16:13 - 20:28' },
            { title: 'Presentation & Rejection', range: '20:29 - 27:66' },
            { title: 'Resurrection & Commission', range: '28:1 - 28:20' }
        ]
    },
    {
        id: 'romans',
        bookName: 'Romans',
        theme: 'The Righteousness of God',
        sections: [
            { title: 'Sin: Righteousness Needed', range: '1:1 - 3:20' },
            { title: 'Salvation: Righteousness Imputed', range: '3:21 - 5:21' },
            { title: 'Sanctification: Righteousness Imparted', range: '6:1 - 8:39' },
            { title: 'Sovereignty: Righteousness Vindicated', range: '9:1 - 11:36' },
            { title: 'Service: Righteousness Practiced', range: '12:1 - 15:13' }
        ]
    }
];

export const ERAS: BiblicalEra[] = [
    {
        id: 'creation',
        title: 'Creation & Fall',
        dates: 'Creation - 2166 BC',
        description: 'God creates the world. Mankind falls into sin. The Flood judgments.',
        majorFigures: ['Adam', 'Eve', 'Noah'],
        books: ['Genesis 1-11']
    },
    {
        id: 'patriarchs',
        title: 'The Patriarchs',
        dates: '2166 - 1805 BC',
        description: 'God chooses a family through whom He will bless the world.',
        majorFigures: ['Abraham', 'Isaac', 'Jacob', 'Joseph'],
        books: ['Genesis 12-50', 'Job']
    },
    {
        id: 'exodus',
        title: 'Exodus & Wandering',
        dates: '1526 - 1406 BC',
        description: 'Deliverance from Egypt. Giving of the Law. 40 years in the wilderness.',
        majorFigures: ['Moses', 'Aaron', 'Miriam'],
        books: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']
    },
    {
        id: 'conquest',
        title: 'Conquest & Judges',
        dates: '1406 - 1050 BC',
        description: 'Conquering the land. Cycles of apostasy and deliverance.',
        majorFigures: ['Joshua', 'Deborah', 'Gideon', 'Samson', 'Ruth', 'Samuel'],
        books: ['Joshua', 'Judges', 'Ruth', '1 Samuel 1-7']
    },
    {
        id: 'kingdom',
        title: 'United Kingdom',
        dates: '1050 - 930 BC',
        description: 'Israel united under three great kings. The height of power.',
        majorFigures: ['Saul', 'David', 'Solomon'],
        books: ['1 Samuel 8-31', '2 Samuel', '1 Kings 1-11', 'Chronicles', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon']
    },
    {
        id: 'divided',
        title: 'Divided Kingdom',
        dates: '930 - 586 BC',
        description: 'Correction: Kingdom divides into North (Israel) and South (Judah). Prophets warn of judgment.',
        majorFigures: ['Elijah', 'Elisha', 'Isaiah', 'Jeremiah', 'Hezekiah', 'Josiah'],
        books: ['1 Kings 12-22', '2 Kings', 'Most Prophets']
    },
    {
        id: 'exile',
        title: 'Exile',
        dates: '586 - 538 BC',
        description: 'Judah taken captive to Babylon. The Temple destroyed.',
        majorFigures: ['Daniel', 'Ezekiel', 'Esther'],
        books: ['Daniel', 'Ezekiel', 'Lamentations', 'Esther']
    },
    {
        id: 'return',
        title: 'Return & Reconstruction',
        dates: '538 - 400 BC',
        description: 'Remnant returns. Temple and walls rebuilt.',
        majorFigures: ['Zerubbabel', 'Ezra', 'Nehemiah', 'Malachi'],
        books: ['Ezra', 'Nehemiah', 'Haggai', 'Zechariah', 'Malachi']
    },
    {
        id: 'christ',
        title: 'Life of Christ',
        dates: '4 BC - 33 AD',
        description: 'The Incarnation, Ministry, Death, and Resurrection of Jesus.',
        majorFigures: ['Jesus', 'John the Baptist', 'The 12 Disciples'],
        books: ['Matthew', 'Mark', 'Luke', 'John']
    },
    {
        id: 'church',
        title: 'The Early Church',
        dates: '33 AD - 100 AD',
        description: 'Spread of the Gospel from Jerusalem to Rome.',
        majorFigures: ['Peter', 'Paul', 'James', 'John'],
        books: ['Acts', 'Epistles', 'Revelation']
    }
];
