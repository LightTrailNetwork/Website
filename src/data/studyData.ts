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
            { title: 'Jesus crucified', ref: 'John 19' },
            { title: 'Pentecost', ref: 'Acts 2' }
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
        id: 'egypt',
        name: 'Egypt',
        modernLocation: 'Egypt',
        significance: 'A place of refuge and slavery. Representing the world system.',
        events: [
            { title: 'Abraham visits during famine', ref: 'Genesis 12:10' },
            { title: 'Joseph rises to power', ref: 'Genesis 41' },
            { title: 'The Exodus', ref: 'Exodus 12' },
            { title: 'Holy Family flees Herod', ref: 'Matthew 2:13' }
        ]
    },
    {
        id: 'sea-galilee',
        name: 'Sea of Galilee',
        modernLocation: 'Lake Kinneret',
        significance: 'The setting for much of Jesus\' ministry and miracles.',
        events: [
            { title: 'Jesus calls disciples', ref: 'Matthew 4:18' },
            { title: 'Calming the storm', ref: 'Mark 4:35' },
            { title: 'Walking on water', ref: 'Matthew 14:22' },
            { title: 'Breakfast on the beach', ref: 'John 21' }
        ]
    },
    {
        id: 'wilderness',
        name: 'The Wilderness',
        modernLocation: 'Negev / Judean Wilderness',
        significance: 'A place of testing, preparation, and encounter with God.',
        events: [
            { title: 'Hagar sees God', ref: 'Genesis 16' },
            { title: 'Israel wanders 40 years', ref: 'Numbers 14' },
            { title: 'David hides from Saul', ref: '1 Samuel 23' },
            { title: 'Jesus tempted', ref: 'Matthew 4' }
        ]
    },
    {
        id: 'jericho',
        name: 'Jericho',
        modernLocation: 'Jericho, West Bank',
        significance: 'The city of palms. First city conquered in Canaan.',
        events: [
            { title: 'Walls fall down', ref: 'Joshua 6' },
            { title: 'Jesus heals Bartimaeus', ref: 'Mark 10:46' },
            { title: 'Zacchaeus matches Jesus', ref: 'Luke 19' }
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
    },
    {
        id: 'bethlehem',
        name: 'Bethlehem',
        modernLocation: 'Bethlehem, West Bank',
        significance: 'The City of David. House of Bread.',
        events: [
            { title: 'Death of Rachel', ref: 'Genesis 35:19' },
            { title: 'Ruth and Boaz', ref: 'Ruth 4' },
            { title: 'David anointed king', ref: '1 Samuel 16' },
            { title: 'Birth of Jesus', ref: 'Luke 2' }
        ]
    },
    {
        id: 'dead-sea',
        name: 'The Dead Sea',
        modernLocation: 'Dead Sea, Israel/Jordan',
        significance: 'Lowest point on earth. A place of judgment and salt.',
        events: [
            { title: 'Battle of the Kings', ref: 'Genesis 14' },
            { title: 'Sodom and Gomorrah', ref: 'Genesis 19' },
            { title: 'Prophecy of Living Waters', ref: 'Ezekiel 47' }
        ]
    },
    {
        id: 'jordan-river',
        name: 'Jordan River',
        modernLocation: 'Jordan River',
        significance: 'The border of the Promise. A place of transition and new beginnings.',
        events: [
            { title: 'Israel crosses into Canaan', ref: 'Joshua 3' },
            { title: 'Naaman healed of leprosy', ref: '2 Kings 5' },
            { title: 'Baptism of Jesus', ref: 'Matthew 3' }
        ]
    },
    {
        id: 'rome',
        name: 'Rome',
        modernLocation: 'Rome, Italy',
        significance: 'Capital of the Empire. The ends of the earth in Acts.',
        events: [
            { title: 'Paul writes Epistle to Romans', ref: 'Romans 1' },
            { title: 'Paul imprisoned', ref: 'Acts 28' },
            { title: 'Peter and Paul martyred', ref: '2 Timothy 4' }
        ]
    },
    {
        id: 'mt-sinai',
        name: 'Mount Sinai',
        modernLocation: 'Jabal Musa, Egypt',
        significance: 'The Mountain of God. Site of the giving of the Law.',
        events: [
            { title: 'Burning Bush', ref: 'Exodus 3' },
            { title: 'Ten Commandments given', ref: 'Exodus 20' },
            { title: 'Elijah flees Jezebel', ref: '1 Kings 19' }
        ]
    },
    {
        id: 'antioch',
        name: 'Antioch',
        modernLocation: 'Antakya, Turkey',
        significance: 'Base of operations for Paul\'s missionary journeys.',
        events: [
            { title: 'Disciples first called Christians', ref: 'Acts 11:26' },
            { title: 'Paul and Barnabas sent out', ref: 'Acts 13' },
            { title: 'Peter rebuked by Paul', ref: 'Galatians 2' }
        ]
    },
    {
        id: 'ephesus',
        name: 'Ephesus',
        modernLocation: 'Selçuk, Turkey',
        significance: 'Major commercial and religious center in Asia Minor.',
        events: [
            { title: 'Riot of the silversmiths', ref: 'Acts 19' },
            { title: 'Paul writes to Ephesians', ref: 'Ephesians 1' },
            { title: 'Jesus\' warning in Revelation', ref: 'Revelation 2' }
        ]
    },
    {
        id: 'damascus',
        name: 'Damascus',
        modernLocation: 'Damascus, Syria',
        significance: 'One of the oldest continuously inhabited cities.',
        events: [
            { title: 'Abraham rescues Lot', ref: 'Genesis 14' },
            { title: 'Saul\'s conversion', ref: 'Acts 9' },
            { title: 'Paul escapes in a basket', ref: '2 Corinthians 11' }
        ]
    },
    {
        id: 'nineveh',
        name: 'Nineveh',
        modernLocation: 'Mosul, Iraq',
        significance: 'Capital of Assyria. A great and wicked city.',
        events: [
            { title: 'Jonah preaches repentance', ref: 'Jonah 3' },
            { title: 'Destruction prophesied', ref: 'Nahum 1' }
        ]
    },
    {
        id: 'ur',
        name: 'Ur of the Chaldeans',
        modernLocation: 'Tell el-Muqayyar, Iraq',
        significance: 'The ancestral home of Abraham.',
        events: [
            { title: 'Call of Abraham', ref: 'Genesis 11:31' }
        ]
    },
    {
        id: 'caesarea-philippi',
        name: 'Caesarea Philippi',
        modernLocation: 'Banias, Golan Heights',
        significance: 'A pagan center where Jesus revealed His identity.',
        events: [
            { title: 'Peter\'s confession of Christ', ref: 'Matthew 16' },
            { title: 'Transfiguration (nearby)', ref: 'Mark 9' }
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
        id: 'bread',
        name: 'Bread',
        meaning: 'Sustenance, Life, Fellowship, Word of God.',
        appearances: [
            { ref: 'Exodus 16:4', context: 'Manna from heaven' },
            { ref: 'Matthew 4:4', context: 'Man shall not live by bread alone' },
            { ref: 'John 6:35', context: 'I am the Bread of Life' },
            { ref: '1 Corinthians 11:24', context: 'This is my body' }
        ],
        theme: 'Nature'
    },
    {
        id: 'shepherd',
        name: 'Shepherd',
        meaning: 'Care, Guidance, Protection, Leadership.',
        appearances: [
            { ref: 'Psalm 23:1', context: 'The Lord is my Shepherd' },
            { ref: 'Ezekiel 34:11', context: 'I myself will search for my sheep' },
            { ref: 'John 10:11', context: 'The Good Shepherd' },
            { ref: '1 Peter 5:4', context: 'Chief Shepherd' }
        ],
        theme: 'Role'
    },
    {
        id: 'rock',
        name: 'Rock / Stone',
        meaning: 'Stability, Safety, Foundation, Stumbling Block.',
        appearances: [
            { ref: 'Exodus 17:6', context: 'Strike the rock' },
            { ref: 'Psalm 61:2', context: 'Lead me to the rock that is higher than I' },
            { ref: 'Matthew 16:18', context: 'On this rock I will build my church' },
            { ref: '1 Peter 2:6', context: 'Cornerstone' }
        ],
        theme: 'Nature'
    },
    {
        id: 'light',
        name: 'Light',
        meaning: 'Truth, Purity, Guidance, God\'s Nature.',
        appearances: [
            { ref: 'Genesis 1:3', context: 'Let there be light' },
            { ref: 'Psalm 119:105', context: 'Lamp to my feet' },
            { ref: 'John 8:12', context: 'I am the Light of the World' },
            { ref: '1 John 1:5', context: 'God is light' }
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
        id: 'passover',
        title: 'The Passover Lamb',
        otType: { entity: 'Lamb', description: 'Unblemished male lamb, slain, blood applied to doorposts saves from death.', ref: 'Exodus 12' },
        ntAntitype: { entity: 'Christ', description: 'Christ our Passover is sacrificed for us; His blood saves from wrath.', ref: '1 Corinthians 5:7' },
        significance: 'Redemption through the blood of a substitute.'
    },
    {
        id: 'bronze-serpent',
        title: 'The Bronze Serpent',
        otType: { entity: 'Bronze Serpent', description: 'Lifted up on a pole; those who looked at it lived.', ref: 'Numbers 21' },
        ntAntitype: { entity: 'The Cross', description: 'The Son of Man lifted up; those who believe have eternal life.', ref: 'John 3:14' },
        significance: 'Salvation comes through looking to God\'s provision in faith.'
    },
    {
        id: 'adam',
        title: 'Adam and Christ',
        otType: { entity: 'Adam', description: 'The first man; brought sin and death to all his descendants.', ref: 'Genesis 3' },
        ntAntitype: { entity: 'Last Adam (Christ)', description: 'The second man; brings righteousness and life to all in Him.', ref: 'Romans 5:12-21' },
        significance: 'Contrast between the fall in the garden and victory in the garden/cross.'
    },
    {
        id: 'melchizedek',
        title: 'Melchizedek',
        otType: { entity: 'Melchizedek', description: 'King of Salem and Priest of God Most High; no record of beginnings or end.', ref: 'Genesis 14' },
        ntAntitype: { entity: 'Jesus', description: 'High Priest forever in the order of Melchizedek, not Aaron.', ref: 'Hebrews 7' },
        significance: 'A priesthood superior to the Levitical system, based on an indestructible life.'
    },
    {
        id: 'jonah',
        title: 'Jonah',
        otType: { entity: 'Jonah', description: 'Three days and nights in the belly of the fish.', ref: 'Jonah 1' },
        ntAntitype: { entity: 'Jesus', description: 'Three days and nights in the heart of the earth.', ref: 'Matthew 12:40' },
        significance: 'The sign of resurrection.'
    }
];

export const HARMONY: HarmonyEvent[] = [
    {
        id: 'birth-jesus',
        title: 'Birth of Jesus',
        description: 'The nativity of Christ in Bethlehem.',
        references: { matthew: '1:18-25', luke: '2:1-7' }
    },
    {
        id: 'visit-magi',
        title: 'Visit of the Magi',
        description: 'Wise men from the East worship the newborn King.',
        references: { matthew: '2:1-12' }
    },
    {
        id: 'boy-jesus',
        title: 'Boy Jesus at the Temple',
        description: 'Jesus visits the Temple at age twelve.',
        references: { luke: '2:41-52' }
    },
    {
        id: 'baptism',
        title: 'The Baptism of Jesus',
        description: 'Jesus is baptized by John in the Jordan river.',
        references: { matthew: '3:13-17', mark: '1:9-11', luke: '3:21-22', john: '1:29-34' }
    },
    {
        id: 'temptation',
        title: 'Temptation in the Wilderness',
        description: 'Jesus fasts for 40 days and overcomes Satan.',
        references: { matthew: '4:1-11', mark: '1:12-13', luke: '4:1-13' }
    },
    {
        id: 'wedding-cana',
        title: 'Wedding at Cana',
        description: 'Jesus turns water into wine (First Miracle).',
        references: { john: '2:1-11' }
    },
    {
        id: 'nicodemus',
        title: 'Jesus and Nicodemus',
        description: 'Teaching on being born again.',
        references: { john: '3:1-21' }
    },
    {
        id: 'woman-well',
        title: 'Woman at the Well',
        description: 'Jesus reveals He is the Living Water in Samaria.',
        references: { john: '4:1-42' }
    },
    {
        id: 'call-disciples',
        title: 'Calling of First Disciples',
        description: 'Simon Peter, Andrew, James, and John follow Jesus.',
        references: { matthew: '4:18-22', mark: '1:16-20', luke: '5:1-11' }
    },
    {
        id: 'sermon-mount',
        title: 'Sermon on the Mount',
        description: 'The Beatitudes and ethical teaching of the Kingdom.',
        references: { matthew: '5:1-7:29', luke: '6:17-49' }
    },
    {
        id: 'calming-storm',
        title: 'Calming the Storm',
        description: 'Jesus has authority over wind and waves.',
        references: { matthew: '8:23-27', mark: '4:35-41', luke: '8:22-25' }
    },
    {
        id: 'feeding-5000',
        title: 'Feeding of the 5,000',
        description: 'The only miracle recorded in all four Gospels.',
        references: { matthew: '14:13-21', mark: '6:30-44', luke: '9:10-17', john: '6:1-15' }
    },
    {
        id: 'walking-water',
        title: 'Walking on Water',
        description: 'Jesus walks on the Sea of Galilee.',
        references: { matthew: '14:22-33', mark: '6:45-52', john: '6:16-21' }
    },
    {
        id: 'peter-confession',
        title: 'Peter\'s Confession',
        description: 'Peter declares Jesus to be the Christ.',
        references: { matthew: '16:13-20', mark: '8:27-30', luke: '9:18-20' }
    },
    {
        id: 'transfiguration',
        title: 'The Transfiguration',
        description: 'Jesus\' glory revealed with Moses and Elijah.',
        references: { matthew: '17:1-13', mark: '9:2-13', luke: '9:28-36' }
    },
    {
        id: 'good-samaritan',
        title: 'Parable of Good Samaritan',
        description: '"Who is my neighbor?"',
        references: { luke: '10:25-37' }
    },
    {
        id: 'lazarus',
        title: 'Raising of Lazarus',
        description: 'Jesus raises Lazarus from the dead.',
        references: { john: '11:1-44' }
    },
    {
        id: 'triumphal-entry',
        title: 'The Triumphal Entry',
        description: 'Jesus enters Jerusalem on a donkey.',
        references: { matthew: '21:1-11', mark: '11:1-11', luke: '19:28-44', john: '12:12-19' }
    },
    {
        id: 'last-supper',
        title: 'The Last Supper',
        description: 'Jesus washes feet and institutes the Lord\'s Supper.',
        references: { matthew: '26:17-30', mark: '14:12-26', luke: '22:7-39', john: '13:1-17:26' }
    },
    {
        id: 'gethsemane',
        title: 'Gethsemane & Arrest',
        description: 'Jesus prays in agony and is betrayed by Judas.',
        references: { matthew: '26:36-56', mark: '14:32-52', luke: '22:39-53', john: '18:1-12' }
    },
    {
        id: 'crucifixion',
        title: 'The Crucifixion',
        description: 'Jesus is crucified at Golgotha.',
        references: { matthew: '27:32-56', mark: '15:21-41', luke: '23:26-49', john: '19:16-37' }
    },
    {
        id: 'resurrection',
        title: 'The Resurrection',
        description: 'The empty tomb and angelic announcement.',
        references: { matthew: '28:1-10', mark: '16:1-8', luke: '24:1-12', john: '20:1-10' }
    },
    {
        id: 'great-commission',
        title: 'The Great Commission',
        description: 'Go and make disciples of all nations.',
        references: { matthew: '28:16-20', mark: '16:15-18' }
    },
    {
        id: 'ascension',
        title: 'The Ascension',
        description: 'Jesus ascends to heaven.',
        references: { mark: '16:19-20', luke: '24:50-53' }
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
        dates: 'Undated',
        description: 'God creates the world, man falls into sin, and the promise of redemption is given.',
        majorFigures: ['Adam', 'Eve', 'Noah'],
        books: ['Genesis 1-11']
    },
    {
        id: 'patriarchs',
        title: 'The Patriarchs',
        dates: 'c. 2100 - 1800 BC',
        description: 'God calls Abraham and establishes His covenant with the fathers of Israel.',
        majorFigures: ['Abraham', 'Isaac', 'Jacob', 'Joseph'],
        books: ['Genesis 12-50', 'Job']
    },
    {
        id: 'exodus',
        title: 'Exodus & Conquest',
        dates: 'c. 1446 - 1375 BC',
        description: 'Deliverance from Egypt, giving of the Law, and entering the Promised Land.',
        majorFigures: ['Moses', 'Aaron', 'Joshua', 'Caleb'],
        books: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua']
    },
    {
        id: 'judges',
        title: 'Period of Judges',
        dates: 'c. 1375 - 1050 BC',
        description: 'A cycle of sin, servitude, supplication, and salvation as Israel has no king.',
        majorFigures: ['Deborah', 'Gideon', 'Samson', 'Samuel', 'Ruth'],
        books: ['Judges', 'Ruth', '1 Samuel 1-7']
    },
    {
        id: 'united-kingdom',
        title: 'United Kingdom',
        dates: 'c. 1050 - 930 BC',
        description: 'Israel united under three great kings. The height of power and the Temple.',
        majorFigures: ['Saul', 'David', 'Solomon'],
        books: ['1 Samuel 8-31', '2 Samuel', '1 Kings 1-11', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon']
    },
    {
        id: 'divided-kingdom',
        title: 'Divided Kingdom',
        dates: '930 - 586 BC',
        description: 'The kingdom splits into Israel (North) and Judah (South). Rise of the prophets.',
        majorFigures: ['Elijah', 'Elisha', 'Hezekiah', 'Josiah', 'Isaiah', 'Jeremiah'],
        books: ['1 Kings 12-22', '2 Kings', '2 Chronicles', 'Isaiah', 'Jeremiah', 'Hosea', 'Amos', 'Jonah', 'Micah']
    },
    {
        id: 'exile',
        title: 'The Exile',
        dates: '586 - 538 BC',
        description: 'Judah is taken captive to Babylon. The temple is destroyed.',
        majorFigures: ['Daniel', 'Ezekiel', 'Nebuchadnezzar'],
        books: ['Ezekiel', 'Daniel', 'Lamentations', 'Obadiah']
    },
    {
        id: 'return',
        title: 'Return & Restoration',
        dates: '538 - 400 BC',
        description: 'The exiles return to rebuild the Temple and the walls of Jerusalem.',
        majorFigures: ['Ezra', 'Nehemiah', 'Zerubbabel', 'Esther', 'Malachi'],
        books: ['Ezra', 'Nehemiah', 'Esther', 'Haggai', 'Zechariah', 'Malachi']
    },
    {
        id: 'christ',
        title: 'Life of Christ',
        dates: 'c. 4 BC - AD 30',
        description: 'The Incarnation, Ministry, Death, and Resurrection of Jesus the Messiah.',
        majorFigures: ['Jesus', 'Mary', 'Peter', 'John the Baptist'],
        books: ['Matthew', 'Mark', 'Luke', 'John']
    },
    {
        id: 'church',
        title: 'The Early Church',
        dates: 'AD 30 - 100',
        description: 'The Holy Spirit is poured out and the Gospel spreads to the nations.',
        majorFigures: ['Peter', 'Paul', 'Stephen', 'Timothy', 'John'],
        books: ['Acts', 'Romans', 'Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', 'Thessalonians', 'Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', 'Peter', 'John', 'Jude', 'Revelation']
    }
];
