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
    theme: 'Nature' | 'Cultic' | 'Color' | 'Number' | 'Object' | 'Role';
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
    category?: string;
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
    // Creation Era
    { id: 'creation', year: 'Undated', title: 'Creation', description: 'God creates the heavens and the earth ex nihilo.', references: ['Genesis 1'], era: 'Creation' },
    { id: 'fall', year: 'Undated', title: 'The Fall', description: 'Adam and Eve disobey God; sin and death enter the world.', references: ['Genesis 3'], era: 'Creation' },
    { id: 'first-murder', year: 'Undated', title: 'Cain kills Abel', description: 'The spread of sin culminates in the first murder.', references: ['Genesis 4'], era: 'Creation' },
    { id: 'flood', year: 'Undated', title: 'The Great Flood', description: 'God judges the earth with water; Noah and his family are saved in the Ark.', references: ['Genesis 6-9'], era: 'Creation' },
    { id: 'babel', year: 'Undated', title: 'Tower of Babel', description: 'Humanity unites in rebellion; God confuses languages and scatters the nations.', references: ['Genesis 11'], era: 'Creation' },

    // Patriarchs Era
    { id: 'call-abraham', year: 'c. 2091 BC', title: 'Call of Abraham', description: 'God calls Abram to leave Ur. The Abrahamic Covenant is established.', references: ['Genesis 12'], era: 'Patriarchs' },
    { id: 'abraham-covenant', year: 'c. 2081 BC', title: 'Covenant Ratified', description: 'God walks between the pieces, promising the land to Abraham\'s offspring.', references: ['Genesis 15'], era: 'Patriarchs' },
    { id: 'sodom', year: 'c. 2067 BC', title: 'Destruction of Sodom', description: 'God judges Sodom and Gomorrah; Lot is rescued.', references: ['Genesis 19'], era: 'Patriarchs' },
    { id: 'isaac-born', year: 'c. 2066 BC', title: 'Birth of Isaac', description: 'The son of promise is born to Abraham and Sarah in their old age.', references: ['Genesis 21'], era: 'Patriarchs' },
    { id: 'sacrifice-isaac', year: 'c. 2050 BC', title: 'Offering of Isaac', description: 'Abraham\'s faith is tested on Mount Moriah.', references: ['Genesis 22'], era: 'Patriarchs' },
    { id: 'jacob-esau', year: 'c. 2006 BC', title: 'Birth of Jacob & Esau', description: 'Rebekah gives birth to twins; the older will serve the younger.', references: ['Genesis 25'], era: 'Patriarchs' },
    { id: 'jacob-flee', year: 'c. 1929 BC', title: 'Jacob Flees to Haran', description: 'Jacob sees the ladder to heaven at Bethel.', references: ['Genesis 28'], era: 'Patriarchs' },
    { id: 'jacob-wrestle', year: 'c. 1909 BC', title: 'Jacob Wrestles God', description: 'Jacob\'s name is changed to Israel.', references: ['Genesis 32'], era: 'Patriarchs' },
    { id: 'joseph-sold', year: 'c. 1898 BC', title: 'Joseph Sold into Slavery', description: 'Joseph\'s brothers betray him; he is taken to Egypt.', references: ['Genesis 37'], era: 'Patriarchs' },
    { id: 'joseph-gov', year: 'c. 1885 BC', title: 'Joseph Rules Egypt', description: 'Joseph interprets Pharaoh\'s dreams and becomes second in command.', references: ['Genesis 41'], era: 'Patriarchs' },
    { id: 'jacob-egypt', year: 'c. 1876 BC', title: 'Israel Moves to Egypt', description: 'The family of Jacob moves to Goshen to survive the famine.', references: ['Genesis 46'], era: 'Patriarchs' },

    // Exodus Era
    { id: 'moses-birth', year: 'c. 1526 BC', title: 'Birth of Moses', description: 'Moses is born and hidden in the Nile basket.', references: ['Exodus 2'], era: 'Exodus' },
    { id: 'burning-bush', year: 'c. 1446 BC', title: 'The Burning Bush', description: 'God calls Moses to deliver Israel.', references: ['Exodus 3'], era: 'Exodus' },
    { id: 'plagues', year: 'c. 1446 BC', title: 'The Ten Plagues', description: 'God judges the gods of Egypt.', references: ['Exodus 7-11'], era: 'Exodus' },
    { id: 'passover', year: 'c. 1446 BC', title: 'The First Passover', description: 'The blood of the lamb saves Israel\'s firstborn.', references: ['Exodus 12'], era: 'Exodus' },
    { id: 'red-sea', year: 'c. 1446 BC', title: 'Crossing the Red Sea', description: 'Israel crosses on dry ground; Pharaoh\'s army drowns.', references: ['Exodus 14'], era: 'Exodus' },
    { id: 'law-sinai', year: 'c. 1446 BC', title: 'Law Given at Sinai', description: 'God gives the Ten Commandments and the Mosaic Covenant.', references: ['Exodus 20'], era: 'Exodus' },
    { id: 'golden-calf', year: 'c. 1446 BC', title: 'The Golden Calf', description: 'Israel falls into idolatry while Moses is on the mountain.', references: ['Exodus 32'], era: 'Exodus' },
    { id: 'kadesh', year: 'c. 1445 BC', title: 'Spies sent to Canaan', description: 'Israel refuses to enter the land and is condemned to wander 40 years.', references: ['Numbers 13-14'], era: 'Exodus' },
    { id: 'bronze-serpent', year: 'c. 1406 BC', title: 'The Bronze Serpent', description: 'Moses lifts up the serpent to save the people from snakes.', references: ['Numbers 21'], era: 'Exodus' },
    { id: 'moses-death', year: 'c. 1406 BC', title: 'Death of Moses', description: 'Moses views the land from Mt. Nebo but does not enter.', references: ['Deuteronomy 34'], era: 'Exodus' },

    // Conquest Era
    { id: 'jordan-cross', year: 'c. 1406 BC', title: 'Crossing the Jordan', description: 'Joshua leads Israel into the Promised Land.', references: ['Joshua 3'], era: 'Conquest' },
    { id: 'jericho', year: 'c. 1406 BC', title: 'Fall of Jericho', description: 'The walls come down after 7 days of marching.', references: ['Joshua 6'], era: 'Conquest' },
    { id: 'sun-stand', year: 'c. 1400 BC', title: 'The Sun Stands Still', description: 'God fights for Israel during the southern campaign.', references: ['Joshua 10'], era: 'Conquest' },
    { id: 'land-divide', year: 'c. 1399 BC', title: 'Land Divided', description: 'The tribes receive their inheritance.', references: ['Joshua 13-21'], era: 'Conquest' },

    // Judges Era
    { id: 'judges-cycle', year: 'c. 1375 BC', title: 'Joshua Dies / Cycle Begins', description: 'A generation arises that does not know the Lord.', references: ['Judges 2'], era: 'Judges' },
    { id: 'deborah', year: 'c. 1209 BC', title: 'Deborah & Barak', description: 'Victory over Sisera and the Canaanites.', references: ['Judges 4-5'], era: 'Judges' },
    { id: 'gideon', year: 'c. 1162 BC', title: 'Gideon\'s 300', description: 'Gideon defeats the Midianites with a small army.', references: ['Judges 7'], era: 'Judges' },
    { id: 'samson', year: 'c. 1075 BC', title: 'Samson\'s Ministry', description: 'A Nazirite judge with great strength fights the Philistines.', references: ['Judges 13-16'], era: 'Judges' },
    { id: 'ruth-boaz', year: 'c. 1100 BC', title: 'Ruth & Boaz', description: 'A story of redemption in Bethlehem during the time of Judges.', references: ['Ruth 4'], era: 'Judges' },
    { id: 'samuel-birth', year: 'c. 1100 BC', title: 'Birth of Samuel', description: 'Hannah prays for a son; Samuel is dedicated to the Lord.', references: ['1 Samuel 1'], era: 'Judges' },

    // United Kingdom
    { id: 'saul-king', year: 'c. 1050 BC', title: 'Saul Anointed King', description: 'Israel demands a king; Saul is chosen.', references: ['1 Samuel 10'], era: 'Kingdom' },
    { id: 'david-goliath', year: 'c. 1025 BC', title: 'David & Goliath', description: 'Young David defeats the Philistine giant.', references: ['1 Samuel 17'], era: 'Kingdom' },
    { id: 'david-king-judah', year: 'c. 1010 BC', title: 'David King of Judah', description: 'After Saul\'s death, David rules in Hebron.', references: ['2 Samuel 2'], era: 'Kingdom' },
    { id: 'david-king-all', year: 'c. 1003 BC', title: 'David King of Israel', description: 'David conquers Jerusalem and unites the tribes.', references: ['2 Samuel 5'], era: 'Kingdom' },
    { id: 'davidic-covenant', year: 'c. 1000 BC', title: 'Davidic Covenant', description: 'God promises David an eternal throne.', references: ['2 Samuel 7'], era: 'Kingdom' },
    { id: 'solomon-king', year: 'c. 970 BC', title: 'Solomon Crowned', description: 'David dies; Solomon succeeds him.', references: ['1 Kings 1'], era: 'Kingdom' },
    { id: 'temple-dedication', year: 'c. 960 BC', title: 'Temple Dedication', description: 'The glory of the Lord fills the completed Temple.', references: ['1 Kings 8'], era: 'Kingdom' },

    // Divided Kingdom
    { id: 'schism', year: '930 BC', title: 'The Kingdom Divides', description: 'Ten tribes rebel against Rehoboam; Jeroboam sets up golden calves.', references: ['1 Kings 12'], era: 'Kingdom' },
    { id: 'elijah-carmel', year: 'c. 860 BC', title: 'Elijah on Mt. Carmel', description: 'Fire from heaven defeats the prophets of Baal.', references: ['1 Kings 18'], era: 'Kingdom' },
    { id: 'jonah-nineveh', year: 'c. 760 BC', title: 'Jonah to Nineveh', description: 'Jonah preaches repentance to the Assyrian capital.', references: ['Jonah 3'], era: 'Kingdom' },
    { id: 'isaiah-call', year: 'c. 740 BC', title: 'Call of Isaiah', description: 'In the year King Uzziah died, Isaiah sees the Lord.', references: ['Isaiah 6'], era: 'Kingdom' },
    { id: 'fall-israel', year: '722 BC', title: 'Fall of Israel (North)', description: 'Samaria falls to Assyria; the people are exiled.', references: ['2 Kings 17'], era: 'Kingdom' },
    { id: 'hezekiah-deliverance', year: '701 BC', title: 'Assyrian Siege', description: 'God kills 185,000 Assyrians to save Jerusalem.', references: ['2 Kings 19'], era: 'Kingdom' },
    { id: 'josiah-finds-law', year: '622 BC', title: 'Book of Law Found', description: 'Josiah leads a reformation based on Deuteronomy.', references: ['2 Kings 22'], era: 'Kingdom' },
    { id: 'daniel-exile', year: '605 BC', title: 'First Deportation', description: 'Daniel and friends taken to Babylon.', references: ['Daniel 1'], era: 'Exile' },
    { id: 'ezekiel-call', year: '593 BC', title: 'Call of Ezekiel', description: 'Ezekiel sees visions of God among the exiles.', references: ['Ezekiel 1'], era: 'Exile' },
    { id: 'fall-jerusalem', year: '586 BC', title: 'Fall of Jerusalem', description: 'Nebuchadnezzar destroys the Temple and city.', references: ['2 Kings 25'], era: 'Exile' },

    // Exile & Return Era
    { id: 'fiery-furnace', year: 'c. 585 BC', title: 'The Fiery Furnace', description: 'Shadrach, Meshach, and Abednego preserved in the fire.', references: ['Daniel 3'], era: 'Exile' },
    { id: 'belshazzar', year: '539 BC', title: 'Writing on the Wall', description: 'Babylon falls to the Medes and Persians.', references: ['Daniel 5'], era: 'Exile' },
    { id: 'cyrus-decree', year: '538 BC', title: 'Decree of Cyrus', description: 'Jews allowed to return to Jerusalem.', references: ['Ezra 1'], era: 'Return' },
    { id: 'temple-complete', year: '516 BC', title: 'Second Temple Dedicated', description: 'Rebuilding completed under Zerubbabel.', references: ['Ezra 6'], era: 'Return' },
    { id: 'esther-queen', year: '479 BC', title: 'Esther Becomes Queen', description: 'Esther marries Xerxes in Susa.', references: ['Esther 2'], era: 'Return' },
    { id: 'ezra-return', year: '458 BC', title: 'Return of Ezra', description: 'Ezra returns to teach the Law.', references: ['Ezra 7'], era: 'Return' },
    { id: 'nehemiah-wall', year: '445 BC', title: 'Walls Rebuilt', description: 'Nehemiah rebuilds Jerusalem\'s walls in 52 days.', references: ['Nehemiah 6'], era: 'Return' },
    { id: 'malachi-prophecy', year: 'c. 430 BC', title: 'Malachi Prophesies', description: 'The last OT prophet warns against dead worship.', references: ['Malachi 1'], era: 'Silence' },

    // Silence
    { id: 'alexander', year: '332 BC', title: 'Alexander the Great', description: 'Conquers Palestine; Hellenization begins.', references: [], era: 'Silence' },
    { id: 'septuagint', year: 'c. 250 BC', title: 'Septuagint Translated', description: 'Hebrew Scriptures translated into Greek (LXX) in Egypt.', references: [], era: 'Silence' },
    { id: 'maccabees', year: '167 BC', title: 'Maccabean Revolt', description: 'Judas Maccabeus leads revolt against Antiochus Epiphanes.', references: [], era: 'Silence' },
    { id: 'rome-pompey', year: '63 BC', title: 'Rome Conquers Judea', description: 'Pompey enters Jerusalem; Roman rule begins.', references: [], era: 'Silence' },

    // Life of Christ
    { id: 'annunciation', year: 'c. 5 BC', title: 'The Annunciation', description: 'Gabriel announces the birth of Jesus to Mary.', references: ['Luke 1'], era: 'Life of Christ' },
    { id: 'birth-jesus', year: 'c. 4 BC', title: 'Birth of Jesus', description: 'Born in Bethlehem.', references: ['Luke 2'], era: 'Life of Christ' },
    { id: 'magi', year: 'c. 2 BC', title: 'Visit of Magi', description: 'Wise men worship the King.', references: ['Matthew 2'], era: 'Life of Christ' },
    { id: 'temple-boy', year: 'c. 8 AD', title: 'Boy Jesus at Temple', description: 'Jesus in His Father\'s house.', references: ['Luke 2'], era: 'Life of Christ' },
    { id: 'baptism', year: 'c. 27 AD', title: 'Baptism of Jesus', description: 'Ministry begins; Spirit descends.', references: ['Matthew 3'], era: 'Life of Christ' },
    { id: 'temptation', year: 'c. 27 AD', title: 'Wilderness Temptation', description: 'Jesus overcomes Satan\'s tests.', references: ['Luke 4'], era: 'Life of Christ' },
    { id: 'nicodemus', year: 'c. 27 AD', title: 'Jesus & Nicodemus', description: 'Teaching on being born again.', references: ['John 3'], era: 'Life of Christ' },
    { id: 'transfiguration', year: 'c. 29 AD', title: 'The Transfiguration', description: 'Jesus\' glory revealed on the mountain.', references: ['Mark 9'], era: 'Life of Christ' },
    { id: 'triumphal-entry', year: 'c. 30 AD', title: 'Triumphal Entry', description: 'Palm Sunday; Jesus enters as King.', references: ['John 12'], era: 'Life of Christ' },
    { id: 'last-supper', year: 'c. 30 AD', title: 'The Last Supper', description: 'Institution of the Eucharist.', references: ['Luke 22'], era: 'Life of Christ' },
    { id: 'crucifixion', year: 'c. 30 AD', title: 'The Crucifixion', description: 'Jesus dies for the sins of the world.', references: ['Matthew 27'], era: 'Life of Christ' },
    { id: 'resurrection', year: 'c. 30 AD', title: 'The Resurrection', description: 'Jesus rises from the dead on the third day.', references: ['John 20'], era: 'Life of Christ' },
    { id: 'ascension', year: 'c. 30 AD', title: 'The Ascension', description: 'Jesus returns to the Father.', references: ['Acts 1'], era: 'Life of Christ' },

    // Early Church
    { id: 'pentecost', year: 'c. 30 AD', title: 'Pentecost', description: 'Holy Spirit poured out; 3,000 saved.', references: ['Acts 2'], era: 'Early Church' },
    { id: 'stephen', year: 'c. 33 AD', title: 'Stoning of Stephen', description: 'First Christian martyr.', references: ['Acts 7'], era: 'Early Church' },
    { id: 'conversion-paul', year: 'c. 34 AD', title: 'Conversion of Paul', description: 'Road to Damascus encounter.', references: ['Acts 9'], era: 'Early Church' },
    { id: 'cornelius', year: 'c. 38 AD', title: 'Peter & Cornelius', description: 'Gospel opens to Gentiles.', references: ['Acts 10'], era: 'Early Church' },
    { id: 'first-journey', year: 'c. 46-48 AD', title: '1st Missionary Journey', description: 'Paul and Barnabas to Galatia.', references: ['Acts 13-14'], era: 'Early Church' },
    { id: 'jerusalem-council', year: 'c. 49 AD', title: 'Jerusalem Council', description: 'Gentiles not under Law.', references: ['Acts 15'], era: 'Early Church' },
    { id: 'second-journey', year: 'c. 49-52 AD', title: '2nd Missionary Journey', description: 'Paul to Macedonia and Greece.', references: ['Acts 16-18'], era: 'Early Church' },
    { id: 'third-journey', year: 'c. 53-57 AD', title: '3rd Missionary Journey', description: 'Paul\'s long stay in Ephesus.', references: ['Acts 19-21'], era: 'Early Church' },
    { id: 'paul-arrest', year: 'c. 57 AD', title: 'Paul Arrested', description: 'Taken into Roman custody in Jerusalem.', references: ['Acts 21'], era: 'Early Church' },
    { id: 'rome-arrival', year: 'c. 60 AD', title: 'Paul Arrives in Rome', description: 'House arrest and prison epistles.', references: ['Acts 28'], era: 'Early Church' },
    { id: 'peter-paul-death', year: 'c. 64-67 AD', title: 'Martyrdom of Leaders', description: 'Peter and Paul killed under Nero.', references: ['2 Timothy 4'], era: 'Early Church' },
    { id: 'jerusalem-fall', year: '70 AD', title: 'Destruction of Jerusalem', description: 'Temple destroyed by Titus.', references: ['Luke 21:20'], era: 'Early Church' },
    { id: 'john-patmos', year: 'c. 95 AD', title: 'John on Patmos', description: 'Revelation received.', references: ['Revelation 1'], era: 'Early Church' }
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
    // Torah
    {
        id: 'genesis', bookName: 'Genesis', theme: 'Beginnings', category: 'Torah',
        sections: [
            { title: 'Primeval History', range: '1-11', subpoints: ['Creation', 'Fall', 'Flood', 'Babel'] },
            { title: 'Patriarchal History', range: '12-50', subpoints: ['Abraham', 'Isaac', 'Jacob', 'Joseph'] }
        ]
    },
    {
        id: 'exodus', bookName: 'Exodus', theme: 'Redemption & Deliverance', category: 'Torah',
        sections: [
            { title: 'Israel in Egypt', range: '1-12', subpoints: ['Slavery', 'Plagues', 'Passover'] },
            { title: 'Journey to Sinai', range: '13-18', subpoints: ['Red Sea', 'Manna', 'Water'] },
            { title: 'Revelation at Sinai', range: '19-40', subpoints: ['Law', 'Covenant', 'Tabernacle'] }
        ]
    },
    {
        id: 'leviticus', bookName: 'Leviticus', theme: 'Holiness', category: 'Torah',
        sections: [
            { title: 'Way to God (Sacrifice)', range: '1-10', subpoints: ['Offerings', 'Priesthood'] },
            { title: 'Walk with God (Sanctification)', range: '11-27', subpoints: ['Purity', 'Day of Atonement', 'Feasts'] }
        ]
    },
    {
        id: 'numbers', bookName: 'Numbers', theme: 'Wandering', category: 'Torah',
        sections: [
            { title: 'Preparation at Sinai', range: '1-10', subpoints: ['Census', 'Camp Arrangement'] },
            { title: 'Wandering in Wilderness', range: '11-25', subpoints: ['Rebellion', 'Spies', 'Bronze Serpent'] },
            { title: 'Preparation for Promised Land', range: '26-36', subpoints: ['New Census', 'Succession'] }
        ]
    },
    {
        id: 'deuteronomy', bookName: 'Deuteronomy', theme: 'Covenant Renewal', category: 'Torah',
        sections: [
            { title: 'Review of History', range: '1-4', subpoints: ['Wilderness Years'] },
            { title: 'Review of Law', range: '5-26', subpoints: ['10 Commandments', 'Statutes'] },
            { title: 'Review of Covenant', range: '27-34', subpoints: ['Blessings/Curses', 'Song of Moses', 'Death of Moses'] }
        ]
    },
    // HISTORY
    // HISTORY
    {
        id: 'joshua', bookName: 'Joshua', theme: 'Conquest & Possession', category: 'Old Testament History',
        sections: [
            { title: 'Entering the Land', range: '1-5', subpoints: ['Rahab', 'Jordan Crossing', 'Jericho'] },
            { title: 'Conquering the Land', range: '6-12', subpoints: ['Central', 'Southern', 'Northern Campaigns'] },
            { title: 'Dividing the Land', range: '13-24', subpoints: ['Tribal Allotments', 'Covenant Renewal'] }
        ]
    },
    {
        id: 'judges', bookName: 'Judges', theme: 'Cycles of Apostasy', category: 'Old Testament History',
        sections: [
            { title: 'Incomplete Conquest', range: '1-2', subpoints: ['Failure to drive out Canaanites'] },
            { title: 'Cycles of Judges', range: '3-16', subpoints: ['Deborah', 'Gideon', 'Samson'] },
            { title: 'Moral Chaos', range: '17-21', subpoints: ['Idolatry', 'Civil War'] }
        ]
    },
    {
        id: 'ruth', bookName: 'Ruth', theme: 'Kinsman Redeemer', category: 'Old Testament History',
        sections: [
            { title: 'Return to Bethlehem', range: '1', subpoints: ['Naomi and Ruth'] },
            { title: 'Reaping in Fields', range: '2', subpoints: ['Ruth meets Boaz'] },
            { title: 'Request for Redemption', range: '3', subpoints: ['Threshing Floor'] },
            { title: 'Redemption & Marriage', range: '4', subpoints: ['Boaz marries Ruth', 'Line of David'] }
        ]
    },
    {
        id: '1samuel', bookName: '1 Samuel', theme: 'Transition to Monarchy', category: 'Old Testament History',
        sections: [
            { title: 'Samuel: Prophet & Judge', range: '1-7', subpoints: ['Birth', 'Call', 'Revival'] },
            { title: 'Saul: King After Man\'s Heart', range: '8-15', subpoints: ['Anointing', 'Disobedience', 'Rejection'] },
            { title: 'David: King After God\'s Heart', range: '16-31', subpoints: ['Goliath', 'Fugitive Years', 'Death of Saul'] }
        ]
    },
    {
        id: '2samuel', bookName: '2 Samuel', theme: 'Reign of David', category: 'Old Testament History',
        sections: [
            { title: 'David\'s Triumphs', range: '1-10', subpoints: ['King of Judah/Israel', 'Ark to Jerusalem', 'Covenant'] },
            { title: 'David\'s Transgressions', range: '11-12', subpoints: ['Bathsheba', 'Uriah', 'Nathan\'s Rebuke'] },
            { title: 'David\'s Troubles', range: '13-24', subpoints: ['Absalom\'s Rebellion', 'Restoration'] }
        ]
    },
    {
        id: '1kings', bookName: '1 Kings', theme: 'Division of Kingdom', category: 'Old Testament History',
        sections: [
            { title: 'United Kingdom (Solomon)', range: '1-11', subpoints: ['Wisdom', 'Temple', 'Apostasy'] },
            { title: 'Divided Kingdom', range: '12-22', subpoints: ['Rehoboam/Jeroboam', 'Elijah vs Ahab'] }
        ]
    },
    {
        id: '2kings', bookName: '2 Kings', theme: 'Captivity', category: 'Old Testament History',
        sections: [
            { title: 'Prophet Elisha', range: '1-8', subpoints: ['Miracles', 'Double Portion'] },
            { title: 'Decline of Kingdoms', range: '9-16', subpoints: ['Jehu', 'Athaliah', 'Uzziah'] },
            { title: 'Fill of Israel (Assyria)', range: '17', subpoints: ['Samaria Captured'] },
            { title: 'Fall of Judah (Babylon)', range: '18-25', subpoints: ['Hezekiah', 'Josiah', 'Exile'] }
        ]
    },
    {
        id: '1chronicles', bookName: '1 Chronicles', theme: 'Davidic Covenant', category: 'Old Testament History',
        sections: [
            { title: 'Royal Genealogy', range: '1-9', subpoints: ['Adam to Exile', 'Twelve Tribes'] },
            { title: 'Reign of David', range: '10-29', subpoints: ['Ark Return', 'Temple Preparations'] }
        ]
    },
    {
        id: '2chronicles', bookName: '2 Chronicles', theme: 'Priestly View of Judah', category: 'Old Testament History',
        sections: [
            { title: 'Reign of Solomon', range: '1-9', subpoints: ['Temple Dedication', 'Glory'] },
            { title: 'The Kings of Judah', range: '10-36', subpoints: ['Reforms of Asa, Jehoshaphat, Hezekiah, Josiah'] },
            { title: 'Decree of Cyrus', range: '36:22-23', subpoints: ['Return from Exile'] }
        ]
    },
    {
        id: 'ezra', bookName: 'Ezra', theme: 'Restoration of Temple', category: 'Old Testament History',
        sections: [
            { title: 'Return under Zerubbabel', range: '1-6', subpoints: ['Rebuilding Temple', 'Opposition'] },
            { title: 'Return under Ezra', range: '7-10', subpoints: ['Teaching Law', 'Moral Reform'] }
        ]
    },
    {
        id: 'nehemiah', bookName: 'Nehemiah', theme: 'Rebuilding Walls', category: 'Old Testament History',
        sections: [
            { title: 'Rebuilding the Walls', range: '1-7', subpoints: ['Prayer', 'Inspection', 'Opposition', 'Completion'] },
            { title: 'Renewing the People', range: '8-13', subpoints: ['Reading Law', 'Covenant Renewal'] }
        ]
    },
    {
        id: 'esther', bookName: 'Esther', theme: 'Providence', category: 'Old Testament History',
        sections: [
            { title: 'Threat to Jews', range: '1-4', subpoints: ['Vashti Deposed', 'Esther Queen', 'Haman\'s Plot'] },
            { title: 'Deliverance of Jews', range: '5-10', subpoints: ['Esther\'s Banquet', 'Mordecai Honored', 'Feast of Purim'] }
        ]
    },
    // POETRY
    {
        id: 'job', bookName: 'Job', theme: 'Sovereignty & Suffering', category: 'Poetry',
        sections: [
            { title: 'Job\'s Distress', range: '1-3', subpoints: ['Loss of Family/Wealth', 'Lament'] },
            { title: 'Job\'s Defense', range: '4-37', subpoints: ['Friends\' Accusations', 'Job\'s Rebuttals', 'Elihu'] },
            { title: 'God\'s Deliverance', range: '38-42', subpoints: ['God Speaks', 'Job Repents', 'Restoration'] }
        ]
    },
    {
        id: 'psalms', bookName: 'Psalms', theme: 'Worship', category: 'Poetry',
        sections: [
            { title: 'Book I', range: '1-41', subpoints: ['Davidic', 'Man-ward'] },
            { title: 'Book II', range: '42-72', subpoints: ['Davidic/Korah', 'Deliverance'] },
            { title: 'Book III', range: '73-89', subpoints: ['Asaph', 'Sanctuary'] },
            { title: 'Book IV', range: '90-106', subpoints: ['Moses/Anonymous', 'Reign of God'] },
            { title: 'Book V', range: '107-150', subpoints: ['Hallel', 'Word of God (119)'] }
        ]
    },
    {
        id: 'proverbs', bookName: 'Proverbs', theme: 'Wisdom', category: 'Poetry',
        sections: [
            { title: 'Wisdom vs Folly', range: '1-9', subpoints: ['Father\'s Instruction'] },
            { title: 'Proverbs of Solomon', range: '10-24', subpoints: ['Righteous vs Wicked'] },
            { title: 'Hezekiah\'s Collection', range: '25-29', subpoints: ['Leadership'] },
            { title: 'Agur & Lemuel', range: '30-31', subpoints: ['Virtuous Woman'] }
        ]
    },
    {
        id: 'ecclesiastes', bookName: 'Ecclesiastes', theme: 'Vanity vs Meaning', category: 'Poetry',
        sections: [
            { title: 'Vanity of Life "Under Sun"', range: '1-6', subpoints: ['Pleasure', 'Work', 'Riches'] },
            { title: 'Wisdom for Life', range: '7-12', subpoints: ['Fear God', 'Judgement Coming'] }
        ]
    },
    {
        id: 'songofsolomon', bookName: 'Song of Solomon', theme: 'Love & Marriage', category: 'Poetry',
        sections: [
            { title: 'Courtship', range: '1-3', subpoints: ['Longing', 'Praise'] },
            { title: 'Wedding', range: '3-4', subpoints: ['Procession', 'Consummation'] },
            { title: 'Maturing Marriage', range: '5-8', subpoints: ['Conflict', 'Restoration'] }
        ]
    },
    // MAJOR PROPHETS
    {
        id: 'isaiah', bookName: 'Isaiah', theme: 'Salvation', category: 'Major Prophets',
        sections: [
            { title: 'Prophecies of Condemnation', range: '1-35', subpoints: ['Judah', 'Nations'] },
            { title: 'Historical Interlude', range: '36-39', subpoints: ['Hezekiah\'s Crisis'] },
            { title: 'Prophecies of Comfort', range: '40-66', subpoints: ['Servant Songs', 'Future Glory'] }
        ]
    },
    {
        id: 'jeremiah', bookName: 'Jeremiah', theme: 'Judgment & New Covenant', category: 'Major Prophets',
        sections: [
            { title: 'Call of Jeremiah', range: '1', subpoints: ['Appointed Prophet'] },
            { title: 'Prophecies to Judah', range: '2-45', subpoints: ['Temple Sermon', '70 Years', 'New Covenant (31)'] },
            { title: 'Prophecies to Nations', range: '46-51', subpoints: ['Egypt', 'Babylon'] },
            { title: 'Fall of Jerusalem', range: '52', subpoints: ['Historical Appendix'] }
        ]
    },
    {
        id: 'lamentations', bookName: 'Lamentations', theme: 'Mourning', category: 'Major Prophets',
        sections: [
            { title: 'Ruins of Jerusalem', range: '1', subpoints: ['Widowed City'] },
            { title: 'Wrath of God', range: '2', subpoints: ['Day of Anger'] },
            { title: 'Hope in Mercy', range: '3', subpoints: ['Great is Thy Faithfulness'] },
            { title: 'Siege & Prayer', range: '4-5', subpoints: ['Restoration Plea'] }
        ]
    },
    {
        id: 'ezekiel', bookName: 'Ezekiel', theme: 'Glory of God', category: 'Major Prophets',
        sections: [
            { title: 'Judgement on Judah', range: '1-24', subpoints: ['Call', 'Glory Departs'] },
            { title: 'Judgement on Nations', range: '25-32', subpoints: ['Tyre', 'Egypt'] },
            { title: 'Restoration of Israel', range: '33-48', subpoints: ['Dry Bones', 'New Temple', 'Glory Returns'] }
        ]
    },
    {
        id: 'daniel', bookName: 'Daniel', theme: 'God\'s Sovereignty', category: 'Major Prophets',
        sections: [
            { title: 'Personal History', range: '1-6', subpoints: ['Diet', 'Statue', 'Furnace', 'Lions'] },
            { title: 'Prophetic Visions', range: '7-12', subpoints: ['Four Beasts', '70 Weeks', 'End Times'] }
        ]
    },
    // MINOR PROPHETS
    {
        id: 'hosea', bookName: 'Hosea', theme: 'Unfaithful Israel', category: 'Minor Prophets',
        sections: [
            { title: 'Adulterous Wife (Gomer)', range: '1-3', subpoints: ['Marriage Illustration'] },
            { title: 'Adulterous People (Israel)', range: '4-14', subpoints: ['Charge against Israel', 'Call to Repent'] }
        ]
    },
    {
        id: 'joel', bookName: 'Joel', theme: 'Day of the Lord', category: 'Minor Prophets',
        sections: [
            { title: 'Locust Invasion', range: '1', subpoints: ['Current Judgment'] },
            { title: 'Coming Day of Lord', range: '2-3', subpoints: ['Spirit Poured Out', 'Valley of Decision'] }
        ]
    },
    {
        id: 'amos', bookName: 'Amos', theme: 'Social Justice', category: 'Minor Prophets',
        sections: [
            { title: 'Judgments on Neighbors', range: '1-2', subpoints: ['Damascus, Gaza, Tyre...'] },
            { title: 'Judgments on Israel', range: '3-6', subpoints: ['Cows of Bashan', 'Woe to complacent'] },
            { title: 'Visions of End', range: '7-9', subpoints: ['Plumb Line', 'Basket of Fruit'] }
        ]
    },
    {
        id: 'obadiah', bookName: 'Obadiah', theme: 'Judgment on Edom', category: 'Minor Prophets',
        sections: [
            { title: 'Doom of Edom', range: '1-14', subpoints: ['Pride', 'Violence against Jacob'] },
            { title: 'Day of the Lord', range: '15-21', subpoints: ['Kingdom shall be the Lord\'s'] }
        ]
    },
    {
        id: 'jonah', bookName: 'Jonah', theme: 'God\'s Mercy on Gentiles', category: 'Minor Prophets',
        sections: [
            { title: 'Running from God', range: '1-2', subpoints: ['Storm', 'Fish'] },
            { title: 'Running with God', range: '3-4', subpoints: ['Nineveh Repents', 'Jonah\'s Anger'] }
        ]
    },
    {
        id: 'micah', bookName: 'Micah', theme: 'Justice & Mercy', category: 'Minor Prophets',
        sections: [
            { title: 'Sin and Judgment', range: '1-3', subpoints: ['Rulers and Prophets condemned'] },
            { title: 'Hope and Kingdom', range: '4-5', subpoints: ['Mountain of Lord', 'Bethlehem Prophecy'] },
            { title: 'Plea and Promise', range: '6-7', subpoints: ['Do Justice', 'Who is like God?'] }
        ]
    },
    {
        id: 'nahum', bookName: 'Nahum', theme: 'Doom of Nineveh', category: 'Minor Prophets',
        sections: [
            { title: 'Character of God', range: '1', subpoints: ['Jealous and Avenger'] },
            { title: 'Siege of Nineveh', range: '2', subpoints: ['Chariots', 'Plunder'] },
            { title: 'Misery of Nineveh', range: '3', subpoints: ['Woe to City of Blood'] }
        ]
    },
    {
        id: 'habakkuk', bookName: 'Habakkuk', theme: 'Faith in Crisis', category: 'Minor Prophets',
        sections: [
            { title: 'Prophet\'s Questions', range: '1-2', subpoints: ['Why evil persists?', 'Babylon as tool?'] },
            { title: 'Prophet\'s Prayer', range: '3', subpoints: ['Yet I will Rejoice'] }
        ]
    },
    {
        id: 'zephaniah', bookName: 'Zephaniah', theme: 'Judgment & Joy', category: 'Minor Prophets',
        sections: [
            { title: 'Universal Judgment', range: '1', subpoints: ['Day of Wrath'] },
            { title: 'Call to Seek Lord', range: '2', subpoints: ['Judgment on Nations'] },
            { title: 'Restoration of Remnant', range: '3', subpoints: ['He will sing over you'] }
        ]
    },
    {
        id: 'haggai', bookName: 'Haggai', theme: 'Rebuilding the Temple', category: 'Minor Prophets',
        sections: [
            { title: 'Call to Rebuild', range: '1', subpoints: ['Consider your ways'] },
            { title: 'Glory of the Temple', range: '2', subpoints: ['Greater glory', 'Signet Ring'] }
        ]
    },
    {
        id: 'zechariah', bookName: 'Zechariah', theme: 'Future Glory', category: 'Minor Prophets',
        sections: [
            { title: 'Eight Visions', range: '1-6', subpoints: ['Horses', 'Lampstand', 'Scroll'] },
            { title: 'Questions on Fasting', range: '7-8', subpoints: ['Obedience > Ritual'] },
            { title: 'Coming King', range: '9-14', subpoints: ['Donkey entry', 'Pierced One', 'Refiner\'s Fire'] }
        ]
    },
    {
        id: 'malachi', bookName: 'Malachi', theme: 'Sincerity', category: 'Minor Prophets',
        sections: [
            { title: 'God\'s Love', range: '1:1-5', subpoints: ['Jacob loved, Esau hated'] },
            { title: 'Priests\' Sins', range: '1:6-2:9', subpoints: ['Blemished offerings'] },
            { title: 'People\'s Sins', range: '2:10-4:6', subpoints: ['Divorce', 'Tithing', 'Sun of Righteousness'] }
        ]
    },
    // GOSPELS
    {
        id: 'matthew', bookName: 'Matthew', theme: 'Jesus the King', category: 'Gospels',
        sections: [
            { title: 'Presentation of King', range: '1-4', subpoints: ['Genealogy', 'Birth', 'Baptism'] },
            { title: 'Proclamation (Sermon)', range: '5-7', subpoints: ['Beatitudes', 'Law fulfilled'] },
            { title: 'Power', range: '8-10', subpoints: ['Miracles', 'Mission'] },
            { title: 'Rejection', range: '11-16', subpoints: ['Parables', 'Pharisees'] },
            { title: 'Preparation', range: '17-25', subpoints: ['Transfiguration', 'Olivet Discourse'] },
            { title: 'Passion & Resurrection', range: '26-28', subpoints: ['Cross', 'Great Commission'] }
        ]
    },
    {
        id: 'mark', bookName: 'Mark', theme: 'Jesus the Servant', category: 'Gospels',
        sections: [
            { title: 'Servant Witness (Galilee)', range: '1-9', subpoints: ['Immediate action', 'Miracles'] },
            { title: 'Servant Way (Journey)', range: '10', subpoints: ['Discipleship costs'] },
            { title: 'Servant Week (Jerusalem)', range: '11-16', subpoints: ['Passion', 'Empty Tomb'] }
        ]
    },
    {
        id: 'luke', bookName: 'Luke', theme: 'Jesus the Son of Man', category: 'Gospels',
        sections: [
            { title: 'Introduction', range: '1-4', subpoints: ['Birth', 'Childhood', 'Genealogy back to Adam'] },
            { title: 'Ministry in Galilee', range: '4-9', subpoints: ['Teaching', 'Healing'] },
            { title: 'Journey to Jerusalem', range: '9-19', subpoints: ['Parables (Prodigal Son, Samaritan)'] },
            { title: 'Jerusalem Ministry', range: '19-21', subpoints: ['Entry', 'Temple'] },
            { title: 'Death & Resurrection', range: '22-24', subpoints: ['Emmaus Road', 'Ascension'] }
        ]
    },
    {
        id: 'john', bookName: 'John', theme: 'Jesus the Son of God', category: 'Gospels',
        sections: [
            { title: 'Incarnation', range: '1', subpoints: ['Word made flesh'] },
            { title: 'Book of Signs', range: '2-12', subpoints: ['7 Signs', 'I AM Statements'] },
            { title: 'Book of Glory', range: '13-20', subpoints: ['Upper Room', 'Prayer', 'Passion'] },
            { title: 'Epilogue', range: '21', subpoints: ['Peter Restored'] }
        ]
    },
    // HISTORY
    {
        id: 'acts', bookName: 'Acts', theme: 'Spread of Gospel', category: 'New Testament History',
        sections: [
            { title: 'Church in Jerusalem', range: '1-7', subpoints: ['Pentecost', 'Stephen'] },
            { title: 'Judea and Samaria', range: '8-12', subpoints: ['Philip', 'Saul\'s Conversion', 'Peter\'s Vision'] },
            { title: 'Ends of the Earth', range: '13-28', subpoints: ['Paul\'s 3 Journeys', 'Rome'] }
        ]
    },
    // PAULINE EPISTLES
    {
        id: 'romans', bookName: 'Romans', theme: 'Righteousness of God', category: 'Pauline Epistles',
        sections: [
            { title: 'Sin (Condemnation)', range: '1-3', subpoints: ['All guilty'] },
            { title: 'Salvation (Justification)', range: '3-5', subpoints: ['Faith alone', 'Peace'] },
            { title: 'Sanctification', range: '6-8', subpoints: ['Dead to sin', 'Spirit life'] },
            { title: 'Sovereignty (Israel)', range: '9-11', subpoints: ['Remnant', 'Graffed in'] },
            { title: 'Service (Application)', range: '12-16', subpoints: ['Living Sacrifice'] }
        ]
    },
    {
        id: '1corinthians', bookName: '1 Corinthians', theme: 'Correction', category: 'Pauline Epistles',
        sections: [
            { title: 'Divisions', range: '1-4', subpoints: ['Wisdom of God', 'Leaders'] },
            { title: 'Disorders', range: '5-6', subpoints: ['Immorality', 'Lawsuits'] },
            { title: 'Difficulties', range: '7-14', subpoints: ['Marriage', 'Idols', 'Gifts', 'Love (13)'] },
            { title: 'Doctrine', range: '15', subpoints: ['Resurrection'] },
            { title: 'Duties', range: '16', subpoints: ['Collection'] }
        ]
    },
    {
        id: '2corinthians', bookName: '2 Corinthians', theme: 'Paul\'s Defense', category: 'Pauline Epistles',
        sections: [
            { title: 'Paul\'s Ministry', range: '1-7', subpoints: ['Comfort', 'New Covenant', 'Jars of Clay'] },
            { title: 'Generous Giving', range: '8-9', subpoints: ['Sowing/Reaping'] },
            { title: 'Paul\'s Authority', range: '10-13', subpoints: ['Thorn in flesh', 'Weakness is strength'] }
        ]
    },
    {
        id: 'galatians', bookName: 'Galatians', theme: 'Freedom in Christ', category: 'Pauline Epistles',
        sections: [
            { title: 'Gospel Defense', range: '1-2', subpoints: ['No other gospel', 'Paul\'s history'] },
            { title: 'Gospel Doctrine', range: '3-4', subpoints: ['Faith vs Works', 'Sons vs Slaves'] },
            { title: 'Gospel Duty', range: '5-6', subpoints: ['Fruit of Spirit', 'Walking in Spirit'] }
        ]
    },
    {
        id: 'ephesians', bookName: 'Ephesians', theme: 'The Church', category: 'Pauline Epistles',
        sections: [
            { title: 'Wealth (Doctrine)', range: '1-3', subpoints: ['Chosen', 'Grace', 'One Body', 'Prayer'] },
            { title: 'Walk (Duty)', range: '4-6', subpoints: ['Unity', 'Husband/Wife', 'Armor of God'] }
        ]
    },
    {
        id: 'philippians', bookName: 'Philippians', theme: 'Joy', category: 'Pauline Epistles',
        sections: [
            { title: 'Joy in Suffering', range: '1', subpoints: ['To live is Christ'] },
            { title: 'Joy in Serving', range: '2', subpoints: ['Mind of Christ', 'Humility'] },
            { title: 'Joy in Believing', range: '3', subpoints: ['Goal of the Prize'] },
            { title: 'Joy in Giving', range: '4', subpoints: ['Contentment'] }
        ]
    },
    {
        id: 'colossians', bookName: 'Colossians', theme: 'Supremacy of Christ', category: 'Pauline Epistles',
        sections: [
            { title: 'Doctrine: Christ Preeminent', range: '1-2', subpoints: ['Image of God', 'Fullness', 'No Legalism'] },
            { title: 'Duty: Christ Lived Out', range: '3-4', subpoints: ['New Self', 'Household Codes'] }
        ]
    },
    {
        id: '1thessalonians', bookName: '1 Thessalonians', theme: 'Christ\'s Return', category: 'Pauline Epistles',
        sections: [
            { title: 'Looking Back', range: '1-3', subpoints: ['Faith/Love', 'Paul\'s example'] },
            { title: 'Looking Forward', range: '4-5', subpoints: ['Rapture', 'Day of Lord', 'Sanctification'] }
        ]
    },
    {
        id: '2thessalonians', bookName: '2 Thessalonians', theme: 'Day of the Lord', category: 'Pauline Epistles',
        sections: [
            { title: 'Encouragement', range: '1', subpoints: ['Judgment on persecutors'] },
            { title: 'Explanation', range: '2', subpoints: ['Man of Lawlessness', 'Restrainer'] },
            { title: 'Exhortation', range: '3', subpoints: ['Warning against idleness'] }
        ]
    },
    {
        id: '1timothy', bookName: '1 Timothy', theme: 'Church Order', category: 'Pauline Epistles',
        sections: [
            { title: 'Doctrine', range: '1', subpoints: ['Warning false teachers'] },
            { title: 'Worship', range: '2', subpoints: ['Prayer', 'Women'] },
            { title: 'Leaders', range: '3', subpoints: ['Overseers', 'Deacons'] },
            { title: 'Practice', range: '4-6', subpoints: ['Pastoral care', 'Money'] }
        ]
    },
    {
        id: '2timothy', bookName: '2 Timothy', theme: 'Faithfulness', category: 'Pauline Epistles',
        sections: [
            { title: 'Teacher\'s Perseverance', range: '1-2', subpoints: ['Not ashamed', 'Soldier/Athlete/Farmer'] },
            { title: 'Teacher\'s Preaching', range: '3-4', subpoints: ['Inspired Scripture', 'Preach the Word'] }
        ]
    },
    {
        id: 'titus', bookName: 'Titus', theme: 'Good Works', category: 'Pauline Epistles',
        sections: [
            { title: 'Order in Church', range: '1', subpoints: ['Elders', 'Rebuking'] },
            { title: 'Order in Home', range: '2', subpoints: ['Older/Younger', 'Grace'] },
            { title: 'Order in World', range: '3', subpoints: ['Citizenship', 'Good deeds'] }
        ]
    },
    {
        id: 'philemon', bookName: 'Philemon', theme: 'Forgiveness', category: 'Pauline Epistles',
        sections: [
            { title: 'Prayer for Philemon', range: '1:1-7', subpoints: ['Love and Faith'] },
            { title: 'Plea for Onesimus', range: '1:8-25', subpoints: ['Brother, not slave'] }
        ]
    },
    // GENERAL EPISTLES
    {
        id: 'hebrews', bookName: 'Hebrews', theme: 'Jesus is Better', category: 'General Epistles',
        sections: [
            { title: 'Superior Person', range: '1-4', subpoints: ['> Angels', '> Moses', '> Joshua'] },
            { title: 'Superior Priesthood', range: '5-10', subpoints: ['Melchizedek', 'New Covenant', 'Perfect Sacrifice'] },
            { title: 'Superior Principle (Faith)', range: '11-13', subpoints: ['Hall of Faith', 'Endurance'] }
        ]
    },
    {
        id: 'james', bookName: 'James', theme: 'Faith in Action', category: 'General Epistles',
        sections: [
            { title: 'Authentic Faith...', range: '1', subpoints: ['Tested by Trials', 'Obeys Word'] },
            { title: 'Faith & Works', range: '2', subpoints: ['Favoritism', 'Demons believe'] },
            { title: 'Faith & Tongue', range: '3', subpoints: ['Taming tongue', 'Wisdom'] },
            { title: 'Faith & Submission', range: '4-5', subpoints: ['Worldliness', 'Patience', 'Prayer'] }
        ]
    },
    {
        id: '1peter', bookName: '1 Peter', theme: 'Suffering & Glory', category: 'General Epistles',
        sections: [
            { title: 'Salvation', range: '1-2:10', subpoints: ['Living Hope', 'Living Stones'] },
            { title: 'Submission', range: '2:11-3:12', subpoints: ['Authorities', 'Spouses'] },
            { title: 'Suffering', range: '3:13-5:14', subpoints: ['Fiery ordeal', 'Shepherds'] }
        ]
    },
    {
        id: '2peter', bookName: '2 Peter', theme: 'Knowledge of God', category: 'General Epistles',
        sections: [
            { title: 'True Knowledge', range: '1', subpoints: ['Growth', 'Prophecy'] },
            { title: 'False Teachers', range: '2', subpoints: ['Condemnation'] },
            { title: 'Sure Return', range: '3', subpoints: ['Day of Lord', 'New Heavens'] }
        ]
    },
    {
        id: '1john', bookName: '1 John', theme: 'Fellowship & Assurance', category: 'General Epistles',
        sections: [
            { title: 'God is Light', range: '1-2', subpoints: ['Walk in light', 'Advocate'] },
            { title: 'God is Love', range: '3-4', subpoints: ['Love one another', 'Testing spirits'] },
            { title: 'God is Life', range: '5', subpoints: ['Victory', 'Assurance'] }
        ]
    },
    {
        id: '2john', bookName: '2 John', theme: 'Truth', category: 'General Epistles',
        sections: [
            { title: 'Walk in Truth', range: '1:1-6', subpoints: ['Commandment to love'] },
            { title: 'Watch for Deceivers', range: '1:7-13', subpoints: ['Don\'t welcome false teachers'] }
        ]
    },
    {
        id: '3john', bookName: '3 John', theme: 'Hospitality', category: 'General Epistles',
        sections: [
            { title: 'Commendation (Gaius)', range: '1:1-8', subpoints: ['Walking in truth'] },
            { title: 'Condemnation (Diotrephes)', range: '1:9-14', subpoints: ['Loves to be first'] }
        ]
    },
    {
        id: 'jude', bookName: 'Jude', theme: 'Contend for Faith', category: 'General Epistles',
        sections: [
            { title: 'Warning', range: '1-16', subpoints: ['Intruders', 'Past judgments'] },
            { title: 'Exhortation', range: '17-25', subpoints: ['Build yourselves up', 'Doxology'] }
        ]
    },
    {
        id: 'revelation', bookName: 'Revelation', theme: 'Victory of Christ', category: 'Prophecy',
        sections: [
            { title: 'Vision of Christ', range: '1', subpoints: ['Son of Man'] },
            { title: 'Letters to Churches', range: '2-3', subpoints: ['7 Churches'] },
            { title: 'Tribulation (Seals/Trumpets)', range: '4-11', subpoints: ['Throne Room', '2 Witnesses'] },
            { title: 'Conflict & Bowls', range: '12-18', subpoints: ['Dragon/Beast', 'Babylon Falls'] },
            { title: 'Return & Reign', range: '19-20', subpoints: ['Second Coming', 'Millennium'] },
            { title: 'New Creation', range: '21-22', subpoints: ['New Jerusalem'] }
        ]
    }
];



export interface DivineName {
    id: string;
    english: string;
    original: string; // Hebrew or Greek script
    transliteration: string;
    language: 'Hebrew' | 'Greek' | 'Aramaic';
    meaning: string;
    significance: string;
    references: string[];
    category: 'Name of God' | 'Title of Christ' | 'Holy Spirit';
}

export const DIVINE_NAMES: DivineName[] = [
    // --- Hebrew Names of God ---
    {
        id: 'elohim',
        english: 'God',
        original: 'אֱלֹהִים',
        transliteration: 'Elohim',
        language: 'Hebrew',
        meaning: 'Strong One, Creator, Mighty',
        significance: 'The first name of God in Scripture (Gen 1:1), emphasizing His transcendent power and sovereignty as Creator. The "im" ending is plural, hinting at the Trinity (plurality in unity).',
        references: ['Genesis 1:1', 'Psalm 19:1'],
        category: 'Name of God'
    },
    {
        id: 'yhwh',
        english: 'LORD',
        original: 'יהוה',
        transliteration: 'Yahweh (YHWH)',
        language: 'Hebrew',
        meaning: 'I AM WHO I AM',
        significance: 'The personal, covenant name of God revealed to Moses. It speaks of His eternal self-existence and relationship with His people. Often rendered "LORD" in all caps.',
        references: ['Exodus 3:14', 'Exodus 6:3'],
        category: 'Name of God'
    },
    {
        id: 'el-shaddai',
        english: 'God Almighty',
        original: 'אֵל שַׁדַּי',
        transliteration: 'El Shaddai',
        language: 'Hebrew',
        meaning: 'God Almighty / All-Sufficient',
        significance: 'The name by which God appeared to the Patriarchs (Abraham, Isaac, Jacob), emphasizing His power to fulfill promises against all natural odds (e.g., Isaac\'s birth).',
        references: ['Genesis 17:1', 'Genesis 35:11'],
        category: 'Name of God'
    },
    {
        id: 'adonai',
        english: 'Lord / Master',
        original: 'אֲדֹנָי',
        transliteration: 'Adonai',
        language: 'Hebrew',
        meaning: 'Lord, Master, Owner',
        significance: 'Acknowledges God\'s authority and our position as His servants. Used reverently by Jews in place of pronouncing YHWH.',
        references: ['Genesis 15:2', 'Psalm 8:1'],
        category: 'Name of God'
    },
    {
        id: 'jehovah-jireh',
        english: 'The LORD Will Provide',
        original: 'יְהוָה יִרְאֶה',
        transliteration: 'Yahweh Yireh',
        language: 'Hebrew',
        meaning: 'The LORD Will Provide / See to it',
        significance: 'Revealed when God provided the ram as a substitute for Isaac. Prophetically points to God providing the Lamb of God for our salvation.',
        references: ['Genesis 22:14'],
        category: 'Name of God'
    },
    {
        id: 'jehovah-rapha',
        english: 'The LORD Who Heals',
        original: 'יְהוָה רֹפְאֶךָ',
        transliteration: 'Yahweh Rophe',
        language: 'Hebrew',
        meaning: 'The LORD Who Heals',
        significance: 'God reveals Himself as the physician of His people, healing both physical ailments and spiritual brokenness.',
        references: ['Exodus 15:26'],
        category: 'Name of God'
    },
    {
        id: 'jehovah-nissi',
        english: 'The LORD My Banner',
        original: 'יְהוָה נִסִּי',
        transliteration: 'Yahweh Nissi',
        language: 'Hebrew',
        meaning: 'The LORD My Banner',
        significance: 'Given after the victory over Amalek. A "banner" was a rallying point in battle; God is our victory and focus.',
        references: ['Exodus 17:15'],
        category: 'Name of God'
    },
    {
        id: 'jehovah-shalom',
        english: 'The LORD Is Peace',
        original: 'יְהוָה שָׁלוֹם',
        transliteration: 'Yahweh Shalom',
        language: 'Hebrew',
        meaning: 'The LORD Is Peace / Wholeness',
        significance: 'Revealed to Gideon when he was afraid he would die after seeing the Angel of the LORD. God is the source of true peace.',
        references: ['Judges 6:24'],
        category: 'Name of God'
    },
    {
        id: 'jehovah-tsidkenu',
        english: 'The LORD Our Righteousness',
        original: 'יְהוָה צִדְקֵנוּ',
        transliteration: 'Yahweh Tsidkenu',
        language: 'Hebrew',
        meaning: 'The LORD Our Righteousness',
        significance: 'Prophetic name used by Jeremiah predicting the Messiah who would provide the righteousness we lack.',
        references: ['Jeremiah 23:6'],
        category: 'Name of God'
    },

    // --- Greek Titles of Christ ---
    {
        id: 'logos',
        english: 'The Word',
        original: 'Λόγος',
        transliteration: 'Logos',
        language: 'Greek',
        meaning: 'Word, Reason, Expression',
        significance: 'Jesus is the perfect expression of God\'s mind and the creative power by which all things exist. "The Word became flesh."',
        references: ['John 1:1', 'Revelation 19:13'],
        category: 'Title of Christ'
    },
    {
        id: 'kurios',
        english: 'Lord',
        original: 'Κύριος',
        transliteration: 'Kyrios',
        language: 'Greek',
        meaning: 'Lord, Master, Sovereign',
        significance: 'The standard translation for "YHWH" in the Greek OT (Septuagint). Applying this title to Jesus is a direct claim to His deity.',
        references: ['Romans 10:9', 'Philippians 2:11'],
        category: 'Title of Christ'
    },
    {
        id: 'alpha-omega',
        english: 'Alpha & Omega',
        original: 'Α & Ω',
        transliteration: 'Alpha kai Omega',
        language: 'Greek',
        meaning: 'The Beginning and the End',
        significance: 'First and last letters of the Greek alphabet. Signifies Christ\'s eternity, sovereignty over history, and completeness.',
        references: ['Revelation 1:8', 'Revelation 22:13'],
        category: 'Title of Christ'
    },
    {
        id: 'amnos-theou',
        english: 'Lamb of God',
        original: 'Ἀμνὸς τοῦ Θεοῦ',
        transliteration: 'Amnos tou Theou',
        language: 'Greek',
        meaning: 'Lamb of God',
        significance: 'Identifies Jesus as the perfect sacrificial offering who fulfills the Passover and Isaiah 53, taking away the sin of the world.',
        references: ['John 1:29', 'Revelation 5:6'],
        category: 'Title of Christ'
    },
    {
        id: 'iam',
        english: 'I AM',
        original: 'Ἐγώ εἰμι',
        transliteration: 'Ego Eimi',
        language: 'Greek',
        meaning: 'I Am / I Exist',
        significance: 'Jesus applies the holy name of God (Exodus 3:14) to Himself, causing the crowd to pick up stones to execute Him for blasphemy.',
        references: ['John 8:58', 'John 18:6'],
        category: 'Title of Christ'
    },
    {
        id: 'messiah-christ',
        english: 'Christ / Messiah',
        original: 'Χριστός',
        transliteration: 'Christos',
        language: 'Greek',
        meaning: 'Anointed One',
        significance: 'The Greek equivalent of the Hebrew "Mashiach" (Messiah). He is the Prophet, Priest, and King anointed by God for salvation.',
        references: ['Matthew 16:16', 'John 4:25-26'],
        category: 'Title of Christ'
    },
    {
        id: 'theos',
        english: 'God',
        original: 'Θεός',
        transliteration: 'Theos',
        language: 'Greek',
        meaning: 'God',
        significance: 'Explicitly used of Jesus, showing He is not just a man or angel, but God Himself.',
        references: ['John 1:1', 'John 20:28', 'Titus 2:13'],
        category: 'Title of Christ'
    },
    {
        id: 'parakletos',
        english: 'Helper / Advocate',
        original: 'Παράκλητος',
        transliteration: 'Parakletos',
        language: 'Greek',
        meaning: 'Called to one\'s aid / Comforter',
        significance: 'The Holy Spirit is one called to walk alongside us, our Advocate and Helper, just as Jesus was.',
        references: ['John 14:16', 'John 14:26'],
        category: 'Holy Spirit'
    }
];


export interface ArchaeologicalFind {
    id: string;
    title: string;
    description: string;
    dateDiscovered: string;
    artifactDate: string;
    location: string;
    coordinates: { lat: number; lng: number };
    bibleReferences: string[];
    significance: string;
    imageUrl?: string;
    currentLocation?: string; // e.g. "British Museum, London"
}

export const ARCHAEOLOGY_DATA: ArchaeologicalFind[] = [
    {
        id: 'silver-scrolls',
        title: 'Ketef Hinnom Silver Scrolls',
        description: 'Two tiny silver scrolls found in a burial cave in Jerusalem containing the Priestly Blessing from Numbers 6.',
        dateDiscovered: '1979',
        artifactDate: 'c. 600 BC',
        location: 'Jerusalem (Ketef Hinnom)',
        coordinates: { lat: 31.7690, lng: 35.2256 },
        bibleReferences: ['Numbers 6:24-26'],
        significance: 'The oldest biblical text ever found, pre-dating the Dead Sea Scrolls by 400 years. Confirms the text of the Torah was in use before the Babylonian Exile.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'dead-sea-scrolls',
        title: 'Dead Sea Scrolls',
        description: 'Thousands of fragments from 981 different texts discovered in 12 caves near the Dead Sea.',
        dateDiscovered: '1946-1956',
        artifactDate: 'c. 300 BC - 100 AD',
        location: 'Qumran',
        coordinates: { lat: 31.7417, lng: 35.4592 },
        bibleReferences: ['Isaiah 40:8', 'Jeremiah 32:44'],
        significance: 'Provided manuscripts 1,000 years older than previous copies, demonstrating the incredible accuracy of the transmission of the Hebrew Bible.',
        currentLocation: 'The Israel Museum (Shrine of the Book), Jerusalem'
    },
    {
        id: 'tel-dan-stele',
        title: 'Tel Dan Stele',
        description: 'A broken victory stele erected by an Aramean king (likely Hazael) boasting of defeating the "House of David".',
        dateDiscovered: '1993',
        artifactDate: 'c. 840 BC',
        location: 'Tel Dan',
        coordinates: { lat: 33.2486, lng: 35.6525 },
        bibleReferences: ['2 Kings 8:28-29'],
        significance: 'The first extra-biblical reference to King David and his dynasty, refuting claims that David was a myth.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },

    {
        id: 'pilate-stone',
        title: 'Pilate Stone',
        description: 'A limestone block dedicated to Tiberius Caesar by "Pontius Pilate, Prefect of Judea".',
        dateDiscovered: '1961',
        artifactDate: 'c. 26-36 AD',
        location: 'Caesarea Maritima',
        coordinates: { lat: 32.5000, lng: 34.8917 },
        bibleReferences: ['Matthew 27:2', 'Luke 3:1'],
        significance: 'Confirmed the existence and office of Pontius Pilate, who some critics previously doubted existed.',
        currentLocation: 'The Israel Museum, Jerusalem (Replica at Caesarea)'
    },
    {
        id: 'caiaphas-ossuary',
        title: 'Caiaphas Ossuary',
        description: 'An ornate burial box (ossuary) inscribed with "Joseph son of Caiaphas".',
        dateDiscovered: '1990',
        artifactDate: 'c. 1st Century AD',
        location: 'Jerusalem',
        coordinates: { lat: 31.7511, lng: 35.2222 },
        bibleReferences: ['Matthew 26:3', 'John 11:49'],
        significance: 'Provides physical evidence of the High Priest who presided over Jesus\' trial.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'hezekiahs-tunnel',
        title: 'Hezekiah\'s Tunnel',
        description: 'A water tunnel carved through solid rock to bring water from the Gihon Spring to the Pool of Siloam.',
        dateDiscovered: '1838',
        artifactDate: 'c. 701 BC',
        location: 'City of David, Jerusalem',
        coordinates: { lat: 31.7725, lng: 35.2356 },
        bibleReferences: ['2 Kings 20:20', '2 Chronicles 32:30'],
        significance: 'Matches the biblical account of Hezekiah\'s preparation for the Assyrian siege perfectly.',
        currentLocation: 'In Situ (City of David, Jerusalem)'
    },
    {
        id: 'sennacherib-prism',
        title: 'Sennacherib\'s Prism',
        description: 'A hexagonal clay prism describing King Sennacherib\'s siege of Jerusalem.',
        dateDiscovered: '1830',
        artifactDate: 'c. 691 BC',
        location: 'Nineveh',
        coordinates: { lat: 36.3585, lng: 43.1519 },
        bibleReferences: ['2 Kings 18:13-19:37', 'Isaiah 36-37'],
        significance: 'Confirms the siege of Jerusalem and that Hezekiah was "shut up like a bird in a cage" but notably does NOT claim the city was conquered, matching the Bible\'s account of divine deliverance.',
        currentLocation: 'The British Museum, London (Taylor Prism); The Israel Museum, Jerusalem (Sennacherib Prism)'
    },
    {
        id: 'cyrus-cylinder',
        title: 'Cyrus Cylinder',
        description: 'A clay cylinder decree by Cyrus the Great allowing captive peoples to return to their lands and rebuild temples.',
        dateDiscovered: '1879',
        artifactDate: 'c. 539 BC',
        location: 'Babylon',
        coordinates: { lat: 32.5422, lng: 44.4211 },
        bibleReferences: ['Ezra 1:1-4', '2 Chronicles 36:23'],
        significance: 'Confirms the biblical policy of Cyrus regarding the return of exiles, a policy once thought to be fiction.',
        currentLocation: 'The British Museum, London'
    },
    {
        id: 'pool-of-siloam',
        title: 'Pool of Siloam',
        description: 'The actual stepped pool from the Second Temple period where Jesus healed the blind man.',
        dateDiscovered: '2004',
        artifactDate: 'c. 1st Century AD',
        location: 'Jerusalem',
        coordinates: { lat: 31.7709, lng: 35.2350 },
        bibleReferences: ['John 9:7'],
        significance: 'Until 2004, critics questioned John\'s accuracy. The discovery of the pool exactly where the Bible places it validates the Gospel of John.',
        currentLocation: 'In Situ (City of David, Jerusalem)'
    },
    {
        id: 'peters-house',
        title: 'House of Peter',
        description: 'A 1st-century dwelling in Capernaum with Christian graffiti and later church structures built over it.',
        dateDiscovered: '1968',
        artifactDate: 'c. 1st Century AD',
        location: 'Capernaum',
        coordinates: { lat: 32.8811, lng: 35.5751 },
        bibleReferences: ['Mark 1:29', 'Luke 4:38'],
        significance: 'Strong evidence for the home of Peter, which served as a base for Jesus\' ministry.',
        currentLocation: 'In Situ (Capernaum, Israel)'
    },
    {
        id: 'jericho-walls',
        title: 'Walls of Jericho',
        description: 'Excavations showing mudbrick walls that collapsed outward, forming a ramp, and a burnt layer.',
        dateDiscovered: '1930s-1950s',
        artifactDate: 'c. 1400 BC',
        location: 'Jericho',
        coordinates: { lat: 31.8703, lng: 35.4429 },
        bibleReferences: ['Joshua 6:20'],
        significance: 'The fallen walls forming a ramp matches Joshua 6:20 ("the wall fell down flat... the people went up"). The burn layer matches the city being burned.',
        currentLocation: 'In Situ (Tel Jericho)'
    },
    {
        id: 'hittite-capital',
        title: 'Hittite Capital (Hattusa)',
        description: 'The massive capital city of the Hittite Empire.',
        dateDiscovered: '1906',
        artifactDate: 'c. 1600-1200 BC',
        location: 'Boghazkoy, Turkey',
        coordinates: { lat: 40.0194, lng: 34.6153 },
        bibleReferences: ['Genesis 23:10', '2 Kings 7:6'],
        significance: 'For centuries, critics claimed the Hittites were a biblical invention. This discovery proved the existence of this major empire mentioned often in Scripture.',
        currentLocation: 'In Situ (Boghazkoy, Turkey); Artifacts at Museum of Anatolian Civilizations, Ankara'
    },
    {
        id: 'black-obelisk',
        title: 'Black Obelisk of Shalmaneser III',
        description: 'Depicts Jehu, King of Israel, bowing before the Assyrian king.',
        dateDiscovered: '1846',
        artifactDate: 'c. 841 BC',
        location: 'Nimrud',
        coordinates: { lat: 36.0988, lng: 43.3283 },
        bibleReferences: ['2 Kings 9-10'],
        significance: 'The only contemporary image of an Israelite king ever discovered.',
        currentLocation: 'The British Museum, London'
    },
    {
        id: 'temple-warning',
        title: 'Temple Warning Inscription',
        description: 'Stone inscription from the Temple mount warning Gentiles not to enter the inner courts on pain of death.',
        dateDiscovered: '1871',
        artifactDate: 'c. 1st Century AD',
        location: 'Jerusalem',
        coordinates: { lat: 31.7781, lng: 35.2360 },
        bibleReferences: ['Acts 21:28', 'Ephesians 2:14'],
        significance: 'Illustrates the "dividing wall of hostility" mentioned in Ephesians and the charge against Paul in Acts.',
        currentLocation: 'Istanbul Archaeology Museums, Istanbul'
    },
    {
        id: 'mesha-stele',
        title: 'Mesha Stele (Moabite Stone)',
        description: 'A black basalt stone where King Mesha of Moab describes his rebellion against Israel, mentioning "Omri king of Israel" and the "vessels of YHWH".',
        dateDiscovered: '1868',
        artifactDate: 'c. 840 BC',
        location: 'Dibon (Modern Dhiban)',
        coordinates: { lat: 31.5009, lng: 35.7766 },
        bibleReferences: ['2 Kings 3:4-27'],
        significance: 'Confirms the existence of King Omri, the revolt of Moab, and contains the earliest extra-biblical reference to the name of God (YHWH).',
        currentLocation: 'The Louvre, Paris'
    },
    {
        id: 'kurkh-monolith',
        title: 'Kurkh Monoliths',
        description: 'Assyrian monoliths describing the Battle of Qarqar, listing "Ahab the Israelite" as a major opponent providing 2,000 chariots.',
        dateDiscovered: '1861',
        artifactDate: 'c. 853 BC',
        location: 'Kurkh, Turkey',
        coordinates: { lat: 37.8425, lng: 40.6738 },
        bibleReferences: ['1 Kings 20-22'],
        significance: 'Establishes King Ahab as a major regional power, contradicting the minimalist view that Israel was a small, insignificant tribe.',
        currentLocation: 'The British Museum, London'
    },
    {
        id: 'jehoiachin-tablets',
        title: 'Jehoiachin\'s Ration Tablets',
        description: 'Babylonian cuneiform tablets listing oil rations for "Jehoiachin, king of the land of Judah" and his sons.',
        dateDiscovered: '1899-1917',
        artifactDate: 'c. 592 BC',
        location: 'Babylon',
        coordinates: { lat: 32.5422, lng: 44.4211 },
        bibleReferences: ['2 Kings 25:27-30', 'Jeremiah 52:31-34'],
        significance: 'Directly confirms the biblical account that King Jehoiachin was treated kindly and given a daily allowance by the king of Babylon.',
        currentLocation: 'Pergamon Museum, Berlin'
    },
    {
        id: 'lachish-reliefs',
        title: 'Lachish Reliefs',
        description: 'Detailed stone carvings from Sennacherib\'s palace in Nineveh depicting the siege and conquest of the Judean city of Lachish.',
        dateDiscovered: '1840s',
        artifactDate: 'c. 700 BC',
        location: 'Nineveh',
        coordinates: { lat: 36.3585, lng: 43.1519 },
        bibleReferences: ['2 Kings 18:13-17', '2 Chronicles 32:9'],
        significance: 'Provides a "war correspondent\'s" visual record of the biblical siege, matching details like the battering rams and the captivity of the people.',
        currentLocation: 'The British Museum, London'
    },
    {
        id: 'seal-of-baruch',
        title: 'Seal of Baruch',
        description: 'A clay bulla (seal impression) reading "Belonging to Berekhyahu son of Neriyahu the Scribe".',
        dateDiscovered: '1975',
        artifactDate: 'c. 600 BC',
        location: 'Jerusalem',
        coordinates: { lat: 31.7770, lng: 35.2340 },
        bibleReferences: ['Jeremiah 36:4'],
        significance: 'Physical signature of Jeremiah\'s scribe, Baruch, proving he was a real historical figure holding the office described in the Bible.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'seal-of-hezekiah',
        title: 'Seal of King Hezekiah',
        description: 'A clay bulla stamped with "Belonging to Hezekiah [son of] Ahaz king of Judah" featuring a winged sun disk.',
        dateDiscovered: '2015',
        artifactDate: 'c. 700 BC',
        location: 'Jerusalem (Ophel)',
        coordinates: { lat: 31.7750, lng: 35.2360 },
        bibleReferences: ['2 Kings 18-20', 'Isaiah 36-39'],
        significance: 'The personal seal impression of one of Judah\'s greatest kings, found in a controlled excavation near the Temple Mount.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'broad-wall',
        title: 'The Broad Wall',
        description: 'A massive 7-meter thick defensive wall built in Jerusalem to protect the western hill.',
        dateDiscovered: '1970s',
        artifactDate: 'c. 701 BC',
        location: 'Jerusalem (Jewish Quarter)',
        coordinates: { lat: 31.7761, lng: 35.2312 },
        bibleReferences: ['Isaiah 22:10', 'Nehemiah 3:8'],
        significance: 'Archaeological proof of Hezekiah\'s fortification of Jerusalem against the Assyrians, mentioned specifically by Isaiah.',
        currentLocation: 'In Situ (Jewish Quarter, Jerusalem)'
    },
    {
        id: 'amarna-letters',
        title: 'Amarna Letters',
        description: 'Clay tablets from Canaanite vassal kings to the Egyptian Pharaoh, asking for help against the invading "Habiru".',
        dateDiscovered: '1887',
        artifactDate: 'c. 1350 BC',
        location: 'Amarna, Egypt',
        coordinates: { lat: 27.6464, lng: 30.9036 },
        bibleReferences: ['Joshua 10-12', 'Judges 1'],
        significance: 'Describes the chaotic conditions in Canaan consistent with the Israelite conquest/incursion from the perspective of the Canaanites.',
        currentLocation: 'The British Museum, London; The Louvre, Paris; Vorderasiatisches Museum, Berlin'
    },
    {
        id: 'mt-ebal-altar',
        title: 'Altar on Mt. Ebal',
        description: 'A massive stone structure found on Mt. Ebal containing kosher animal bones and an earlier circular altar underneath.',
        dateDiscovered: '1980s',
        artifactDate: 'c. 1250 BC / 1400 BC',
        location: 'Mt. Ebal',
        coordinates: { lat: 32.2285, lng: 35.2755 },
        bibleReferences: ['Joshua 8:30-35', 'Deuteronomy 27:4-8'],
        significance: 'Matches the biblical description of Joshua\'s altar. The presence of a "curse tablet" (defixio) found recently further supports early literacy and worship here.',
        currentLocation: 'In Situ (Mt. Ebal)'
    },
    {
        id: 'gallio-inscription',
        title: 'Gallio Inscription',
        description: 'Fragments of a letter from Emperor Claudius giving the date of Gallio\'s proconsulship in Achaia.',
        dateDiscovered: '1905',
        artifactDate: 'c. 52 AD',
        location: 'Delphi, Greece',
        coordinates: { lat: 38.4824, lng: 22.5010 },
        bibleReferences: ['Acts 18:12-17'],
        significance: 'The Linchpin of Pauline Chronology. Because we know exactly when Gallio ruled, we can date Paul\'s time in Corinth and his epistles.',
        currentLocation: 'Archaeological Museum of Delphi, Greece'
    },
    {
        id: 'erastus-inscription',
        title: 'Erastus Inscription',
        description: 'A pavement stone in Corinth inscribed "Erastus in return for his aedileship laid [the pavement] at his own expense".',
        dateDiscovered: '1929',
        artifactDate: 'c. 1st Century AD',
        location: 'Corinth',
        coordinates: { lat: 37.9056, lng: 22.8790 },
        bibleReferences: ['Romans 16:23', '2 Timothy 4:20'],
        significance: 'Identifies the high-ranking city official "Erastus" mentioned by Paul, showing that early Christians were not just from the lower classes.',
        currentLocation: 'In Situ (Corinth, Greece)'
    },
    {
        id: 'pool-of-bethesda',
        title: 'Pool of Bethesda',
        description: 'A large double pool with five covered colonnades (porticoes) discovered deep underground.',
        dateDiscovered: '19th Century',
        artifactDate: 'c. 1st Century',
        location: 'Jerusalem (St. Anne)',
        coordinates: { lat: 31.7816, lng: 35.2356 },
        bibleReferences: ['John 5:2'],
        significance: 'Confirmed the existence of the specific "five porticoes" mentioned by John, a detail once dismissed by critics as allegorical.',
        currentLocation: 'In Situ (St. Anne\'s Church, Jerusalem)'
    },
    {
        id: 'synagogue-magdala',
        title: 'Magdala Synagogue',
        description: 'A 1st-century synagogue found in the hometown of Mary Magdalene, complete with a unique "Magdala Stone" depicting the Temple.',
        dateDiscovered: '2009',
        artifactDate: 'c. 1st Century AD',
        location: 'Magdala',
        coordinates: { lat: 32.8573, lng: 35.5238 },
        bibleReferences: ['Matthew 4:23', 'Luke 8:2'],
        significance: 'One of the oldest synagogues in Galilee, where Jesus almost certainly taught. The stone shows that Galileans were deeply connected to the Temple.',
        currentLocation: 'In Situ (Magdala); Stone at Israel Antiquities Authority'
    },
    {
        id: 'nazareth-decree',
        title: 'Nazareth Decree',
        description: 'A marble tablet bearing an imperial edict from Caesar ordering capital punishment for anyone who moves a body from a tomb.',
        dateDiscovered: '1878',
        artifactDate: 'c. 41-54 AD',
        location: 'Nazareth (Origins)',
        coordinates: { lat: 32.7019, lng: 35.2971 },
        bibleReferences: ['Matthew 28:11-15'],
        significance: 'Suggests that the Roman authorities were reacting to the rumors of Jesus\' resurrection and the "stolen body" theory circulating in the area.',
        currentLocation: 'National Library of France (BnF), Paris'
    },
    {
        id: 'scythopolis',
        title: 'Beit She\'an / Scythopolis',
        description: 'The capital of the Decapolis. A massive, well-preserved Roman city displaying the Hellenistic culture Jesus and disciples encountered.',
        dateDiscovered: 'Excavated 20th Century',
        artifactDate: 'c. 1st Century AD',
        location: 'Beit She\'an',
        coordinates: { lat: 32.5015, lng: 35.5020 },
        bibleReferences: ['Mark 7:31', 'Matthew 4:25'],
        significance: 'Provides the visual context for the "Decapolis" region where Jesus ministered. The contrast between this pagan metropolis and humble Galilean villages is striking.',
        currentLocation: 'In Situ (Beit She\'an National Park)'
    },
    {
        id: 'large-stone-structure',
        title: 'Large Stone Structure (David\'s Palace)',
        description: 'A massive public building located at the highest point of the City of David, believed by excavator Eilat Mazar to be King David\'s palace.',
        dateDiscovered: '2005',
        artifactDate: 'c. 10th Century BC',
        location: 'City of David (Area G)',
        coordinates: { lat: 31.7738, lng: 35.2355 },
        bibleReferences: ['2 Samuel 5:11', '1 Chronicles 14:1'],
        significance: 'Situated exactly where the Bible says David went "down" to the citadel, this structure dating to the 10th century is the strongest candidate for David\'s royal residence.',
        currentLocation: 'In Situ (City of David National Park)'
    },
    {
        id: 'stepped-stone-structure',
        title: 'Stepped Stone Structure',
        description: 'A massive curved retaining wall standing 60 feet high, supporting the Large Stone Structure above it.',
        dateDiscovered: '1920s (Re-excavated 1970s/2000s)',
        artifactDate: 'c. 1200-1000 BC',
        location: 'City of David (Area G)',
        coordinates: { lat: 31.7737, lng: 35.2356 },
        bibleReferences: ['2 Samuel 5:9'],
        significance: 'Likely the "Millo" (filling) mentioned in Scripture that David built/repaired. It is one of the largest Iron Age structures in Israel.',
        currentLocation: 'In Situ (City of David National Park)'
    },
    {
        id: 'bulla-gemaryahu',
        title: 'Bulla of Gemaryahu ben Shaphan',
        description: 'A clay seal impression found in a destroyed archive room ("House of Bullae") reading "Belonging to Gemaryahu son of Shaphan".',
        dateDiscovered: '1982',
        artifactDate: 'c. 600 BC',
        location: 'City of David (Area G)',
        coordinates: { lat: 31.7736, lng: 35.2355 },
        bibleReferences: ['Jeremiah 36:10'],
        significance: 'Identifies the exact scribe mentioned in Jeremiah who urged the king not to burn the scroll. Found in a layer of ash from the Babylonian destruction (586 BC).',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'bulla-yehucal',
        title: 'Bulla of Jehucal (Yukal)',
        description: 'A stamped clay seal reading "Belonging to Yehucal son of Shelemiah" found in the Large Stone Structure.',
        dateDiscovered: '2005',
        artifactDate: 'c. 590 BC',
        location: 'City of David',
        coordinates: { lat: 31.7738, lng: 35.2355 },
        bibleReferences: ['Jeremiah 37:3', 'Jeremiah 38:1'],
        significance: 'Confirms the existence of the royal official sent by King Zedekiah to ask Jeremiah for prayer, found in the very palace ruins where he would have served.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'bulla-gedaliah',
        title: 'Bulla of Gedaliah',
        description: 'A bulla reading "Belonging to Gedaliah son of Pashhur" found just meters from the Jehucal bulla.',
        dateDiscovered: '2008',
        artifactDate: 'c. 590 BC',
        location: 'City of David',
        coordinates: { lat: 31.7739, lng: 35.2355 },
        bibleReferences: ['Jeremiah 38:1'],
        significance: 'Confirms another of Jeremiah\'s accusers. Finding two specific officials mentioned in the same verse (Jer 38:1) in the same excavation area is statistically astounding.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'pilgrimage-road',
        title: 'Ancient Pilgrimage Road',
        description: 'The paved stepped street leading from the Pool of Siloam up to the Temple Mount, walked by millions of pilgrims.',
        dateDiscovered: '2000s-Present',
        artifactDate: 'c. 1st Century AD',
        location: 'City of David',
        coordinates: { lat: 31.7715, lng: 35.2354 },
        bibleReferences: ['Psalm 122:4', 'John 7:14'],
        significance: 'The actual stones Jesus and his disciples would have walked on to ascend to the Temple. Coins found underneath date its construction to Pontius Pilate.',
        currentLocation: 'In Situ (City of David National Park)'
    },
    // --- Patriarchs & Egypt ---
    {
        id: 'beni-hasan',
        title: 'Beni Hasan Tomb Painting',
        description: 'A wall painting in the tomb of Khnumhotep II depicting a caravan of 37 Asiatic (Semitic) people entering Egypt, wearing multicolored coats.',
        dateDiscovered: '1890',
        artifactDate: 'c. 1890 BC',
        location: 'Beni Hasan, Egypt',
        coordinates: { lat: 27.9333, lng: 30.8333 },
        bibleReferences: ['Genesis 37:3', 'Genesis 46:6'],
        significance: 'Provides a vivid contemporary visual of what the Patriarchs (like Jacob\'s family) looked like entering Egypt, including the "coat of many colors" style.',
        currentLocation: 'In Situ (Tomb of Khnumhotep II, Beni Hasan)'
    },
    {
        id: 'brooklyn-papyrus',
        title: 'Brooklyn Papyrus',
        description: 'An Egyptian tax list of slaves, where over 50% have Semitic names, including biblical names like "Shiphrah" and "Menahem".',
        dateDiscovered: '1800s (Published 1955)',
        artifactDate: 'c. 1700-1600 BC',
        location: 'Thebes, Egypt',
        coordinates: { lat: 25.7000, lng: 32.6000 },
        bibleReferences: ['Exodus 1:11-14', 'Exodus 1:15'],
        significance: 'Confirms the presence of a large Semitic slave population in Egypt during the era preceding the Exodus, including the specific mid-wife name Shiphrah.',
        currentLocation: 'Brooklyn Museum, New York'
    },
    {
        id: 'soleb-hieroglyph',
        title: 'Soleb Hieroglyph (Yahweh Inscription)',
        description: 'An inscription in the temple of Amenhotep III listing enemies, including the "Land of the Shasu of YHWH".',
        dateDiscovered: '1957',
        artifactDate: 'c. 1380 BC',
        location: 'Soleb, Sudan',
        coordinates: { lat: 20.4333, lng: 30.3333 },
        bibleReferences: ['Exodus 3:14', 'Exodus 5:2'],
        significance: 'The earliest known historical mention of the name of God (YHWH) by outsiders, proving the Israelites worshiping YHWH were a known entity before the monarchy.',
        currentLocation: 'In Situ (Temple of Amun-Ra, Soleb, Sudan)'
    },
    {
        id: 'merneptah-stele',
        title: 'Merneptah Stele (Israel Stele)',
        description: 'A giant granite victory stele of Pharaoh Merneptah boasting "Israel is laid waste; his seed is not."',
        dateDiscovered: '1896',
        artifactDate: 'c. 1208 BC',
        location: 'Thebes, Egypt',
        coordinates: { lat: 25.7200, lng: 32.6100 },
        bibleReferences: ['Joshua 11:23', 'Judges 1'],
        significance: 'The absolute earliest concrete mention of "Israel" as a people group in the land of Canaan found in archaeology, destroying the theory that Israel emerged much later.',
        currentLocation: 'The Egyptian Museum, Cairo'
    },
    {
        id: 'nuzi-tablets',
        title: 'Nuzi Tablets',
        description: 'Thousands of clay tablets relating to the Hurrians, detailing customs of adoption, birthright handling, and household idols (teraphim).',
        dateDiscovered: '1925',
        artifactDate: 'c. 1450 BC',
        location: 'Nuzi (Iraq)',
        coordinates: { lat: 35.3000, lng: 44.2500 },
        bibleReferences: ['Genesis 15:2', 'Genesis 25:31', 'Genesis 31:19'],
        significance: 'Validates the precise, peculiar cultural customs described in the Patriarchal narratives (e.g., Rachel stealing idols) that were unknown in later eras.',
        currentLocation: 'Iraq Museum, Baghdad; Harvard Semitic Museum, Cambridge'
    },
    // --- Judges & United Monarchy ---
    {
        id: 'khirbet-qeiyafa',
        title: 'Khirbet Qeiyafa Ostracon',
        description: 'A pottery shard with early Hebrew text found in a fortified city from David\'s time, mentioning "king", "judge", and "widow".',
        dateDiscovered: '2008',
        artifactDate: 'c. 1000 BC',
        location: 'Elah Valley',
        coordinates: { lat: 31.6961, lng: 34.9547 },
        bibleReferences: ['1 Samuel 17:52', '1 Chronicles 4:31'],
        significance: 'Proves widespread literacy and a centralized administration in Judah during David\'s reign, countering claims that David was a mere tribal chieftain.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'gath-ostracon',
        title: 'The Gath Ostracon',
        description: 'A shard found in Philistine Gath with two names (Alwat and Wlt) etymologically similar to "Goliath".',
        dateDiscovered: '2005',
        artifactDate: 'c. 950 BC',
        location: 'Tell es-Safi (Gath)',
        coordinates: { lat: 31.7000, lng: 34.8500 },
        bibleReferences: ['1 Samuel 17:4'],
        significance: 'While not Goliath\'s name tag, it proves that names like Goliath were authentic to that specific time and place (Iron Age Philistia).',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'gezer-calendar',
        title: 'Gezer Calendar',
        description: 'A small limestone tablet serving as a schoolboy\'s exercise listing the agricultural seasons of ancient Israel.',
        dateDiscovered: '1908',
        artifactDate: 'c. 925 BC',
        location: 'Tel Gezer',
        coordinates: { lat: 31.8617, lng: 34.9192 },
        bibleReferences: ['Amos 5:11', 'Isaiah 28:24'],
        significance: 'Evidence of literacy and confirms the agricultural cycle described in the Bible during Solomon\'s era.',
        currentLocation: 'Istanbul Archaeology Museums, Istanbul'
    },
    {
        id: 'tel-arad-temple',
        title: 'Tel Arad Temple',
        description: 'A fortress temple found in Judah with a "Holy of Holies", incense altars, and standing stones, modeled after Solomon\'s Temple but with unauthorized elements.',
        dateDiscovered: '1962',
        artifactDate: 'c. 900-600 BC',
        location: 'Tel Arad',
        coordinates: { lat: 31.2808, lng: 35.1250 },
        bibleReferences: ['2 Kings 23:8', '2 Chronicles 34:3-7'],
        significance: 'Shows that "high places" and alternative temples existed in Judah exactly as the kings were often condemned for allowing, until Josiah buried it.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'ziggurat-ur',
        title: 'Great Ziggurat of Ur',
        description: 'A massive dedicated tower structure (Etemenniguru) in Abraham\'s home city.',
        dateDiscovered: '1920s',
        artifactDate: 'c. 2100 BC',
        location: 'Ur (Iraq)',
        coordinates: { lat: 30.9630, lng: 46.1030 },
        bibleReferences: ['Genesis 11:4'],
        significance: 'Provides the architectural context for the Tower of Babel. These "towers reaching to heavens" were real Mesopotamian religious structures.',
        currentLocation: 'In Situ (Dhi Qar Province, Iraq)'
    },
    // --- Divided Kingdom ---
    {
        id: 'siloam-inscription',
        title: 'Siloam Inscription',
        description: 'The ancient Paleo-Hebrew inscription cut into the wall of Hezekiah\'s tunnel recording the moment the two teams of diggers met.',
        dateDiscovered: '1880',
        artifactDate: 'c. 701 BC',
        location: 'City of David',
        coordinates: { lat: 31.7720, lng: 35.2350 },
        bibleReferences: ['2 Kings 20:20'],
        significance: 'Primary source confirmation of the engineering feat described in Kings and Chronicles. One of the most important Hebrew inscriptions ever found.',
        currentLocation: 'Istanbul Archaeology Museums, Istanbul'
    },
    {
        id: 'samaria-ostraca',
        title: 'Samaria Ostraca',
        description: '60+ pottery shards recording shipments of wine and oil to the royal palace in Samaria.',
        dateDiscovered: '1910',
        artifactDate: 'c. 780 BC',
        location: 'Samaria (Sebaste)',
        coordinates: { lat: 32.2770, lng: 35.1900 },
        bibleReferences: ['Joshua 17:2', 'Numbers 26:30'],
        significance: 'Records clan names (like Abiezer, Helek, Shemida) that exactly match the clans of Manasseh listed in Joshua and Numbers, showing they still lived there centuries later.',
        currentLocation: 'Istanbul Archaeology Museums, Istanbul; The Israel Museum, Jerusalem'
    },
    {
        id: 'samaria-ivories',
        title: 'Samaria Ivories',
        description: 'Thousands of carved ivory pieces used to decorate furniture and walls in the palace of the Northern Kingdom.',
        dateDiscovered: '1930s',
        artifactDate: 'c. 850-750 BC',
        location: 'Samaria',
        coordinates: { lat: 32.2772, lng: 35.1905 },
        bibleReferences: ['Amos 6:4', '1 Kings 22:39'],
        significance: 'Direct physical evidence of the "beds of ivory" and "ivory house" that the prophet Amos condemned for their decadence.',
        currentLocation: 'The Israel Museum, Jerusalem; Rockefeller Museum, Jerusalem'
    },
    {
        id: 'seal-shema',
        title: 'Seal of Shema',
        description: 'A magnificent jasper seal reading "Belonging to Shema, servant of Jeroboam" featuring a roaring lion.',
        dateDiscovered: '1904',
        artifactDate: 'c. 760 BC',
        location: 'Megiddo',
        coordinates: { lat: 32.5850, lng: 35.1850 },
        bibleReferences: ['2 Kings 14:23'],
        significance: 'Reference to King Jeroboam II, testifying to the wealth and royal administration of the Northern Kingdom at its peak.',
        currentLocation: 'Lost (Bronze Cast at Rockefeller Museum)'
    },
    {
        id: 'tirzah-excavation',
        title: 'Tirzah (Tell el-Farah)',
        description: 'Excavations of the first capital of the Northern Kingdom showing it was abandoned unfinished/abruptly when Omri moved the capital.',
        dateDiscovered: '1946',
        artifactDate: 'c. 880 BC',
        location: 'Tirzah',
        coordinates: { lat: 32.2880, lng: 35.3380 },
        bibleReferences: ['1 Kings 16:23-24', 'Song of Solomon 6:4'],
        significance: 'Confirms the biblical history of the capital moving from Tirzah to Samaria under King Omri.',
        currentLocation: 'In Situ (Tell el-Farah North)'
    },
    // --- Exile & Prophecy ---
    {
        id: 'nabonidus-chronicle',
        title: 'Nabonidus Chronicle',
        description: 'A clay tablet history revealing that King Nabonidus spent years in Arabia, leaving his son Belshazzar to rule Babylon.',
        dateDiscovered: '1879',
        artifactDate: 'c. 530 BC',
        location: 'Babylon',
        coordinates: { lat: 32.5422, lng: 44.4211 },
        bibleReferences: ['Daniel 5:16', 'Daniel 5:29'],
        significance: 'Explains why Belshazzar could only offer Daniel the "third" place in the kingdom (he himself was second), a detail critics mocked until this discovery.',
        currentLocation: 'The British Museum, London'
    },
    {
        id: 'ishtar-gate',
        title: 'Ishtar Gate',
        description: 'The immense blue glazed-brick gate of Babylon featuring dragons (mushussu) and bulls, built by Nebuchadnezzar II.',
        dateDiscovered: '1902',
        artifactDate: 'c. 575 BC',
        location: 'Babylon (Rebuilt split)',
        coordinates: { lat: 32.5430, lng: 44.4220 },
        bibleReferences: ['Daniel 4:30'],
        significance: 'The massive glory of Babylon that Daniel lived in. The bricks themselves are stamped "Nebuchadnezzar, King of Babylon", confirming his building projects.',
        currentLocation: 'Pergamon Museum, Berlin'
    },
    {
        id: 'lachish-letters',
        title: 'Lachish Letters',
        description: 'Ostraca (inscribed pottery) from the last days of Judah, writing "We are watching for the signals of Lachish... for we cannot see Azekah."',
        dateDiscovered: '1935',
        artifactDate: 'c. 587 BC',
        location: 'Lachish',
        coordinates: { lat: 31.5640, lng: 34.8460 },
        bibleReferences: ['Jeremiah 34:7'],
        significance: 'A desperate real-time report matching Jeremiah 34:7, which names Lachish and Azekah as the last two cities standing against Babylon.',
        currentLocation: 'The British Museum, London; The Israel Museum, Jerusalem'
    },
    // --- New Testament ---
    {
        id: 'politarch-inscription',
        title: 'Politarch Inscription',
        description: 'Inscriptions from Thessalonica using the unique term "Politarchs" (City Rulers) to describe the officials there.',
        dateDiscovered: '1835',
        artifactDate: 'c. 1st Century AD',
        location: 'Thessalonica',
        coordinates: { lat: 40.6401, lng: 22.9444 },
        bibleReferences: ['Acts 17:6'],
        significance: 'Critics once claimed Luke was wrong to use this obscure title. Archaeology proved it was the *exact* correct legal title for that specific city.',
        currentLocation: 'The British Museum, London'
    },
    {
        id: 'sergius-paulus',
        title: 'Sergius Paulus Inscription',
        description: 'A boundary stone near Paphos mentioning "L. Sergius Paulus" as Proconsul.',
        dateDiscovered: '1877',
        artifactDate: 'c. 47 AD',
        location: 'Cyprus',
        coordinates: { lat: 35.0400, lng: 32.5500 },
        bibleReferences: ['Acts 13:7'],
        significance: 'Confirms the existence and correct title of the Roman Proconsul who converted to Christianity under Paul\'s ministry.',
        currentLocation: 'Cyprus Museum, Nicosia'
    },
    {
        id: 'crucified-man',
        title: 'Yehohanan (Crucified Man)',
        description: 'An ossuary containing a heel bone with a large iron nail driven through it and bent, preserving evidence of Roman crucifixion.',
        dateDiscovered: '1968',
        artifactDate: 'c. 1st Century AD',
        location: 'Givat HaMivtar, Jerusalem',
        coordinates: { lat: 31.8000, lng: 35.2200 },
        bibleReferences: ['John 19:18', 'Luke 24:39'],
        significance: 'The only physical skeletal evidence of Roman crucifixion ever found in Israel. It confirms that nails were indeed used (not just ropes) and driven through the heel/feet.',
        currentLocation: 'The Israel Museum, Jerusalem'
    },
    {
        id: 'temple-artemis',
        title: 'Temple of Artemis',
        description: 'Ruins of one of the Seven Wonders of the World, the massive center of pagan worship in Ephesus.',
        dateDiscovered: '1869',
        artifactDate: 'c. 1st Century AD',
        location: 'Ephesus',
        coordinates: { lat: 37.9497, lng: 27.3639 },
        bibleReferences: ['Acts 19:23-41'],
        significance: 'The context for the riot in Acts. Inscriptions found there even use the term "Neokoros" (Guardian of the Temple), exactly as the city clerk calls Ephesus in Acts 19:35.',
        currentLocation: 'In Situ (Ephesus); Artifacts at British Museum, London'
    },
    {
        id: 'jacobs-well',
        title: 'Jacob\'s Well',
        description: 'A deep hewn well in Nablus (Shechem) that has been venerated by Jews, Samaritans, Christians, and Muslims for millennia.',
        dateDiscovered: 'Ancient',
        artifactDate: 'c. 2000 BC',
        location: 'Nablus (Sychar)',
        coordinates: { lat: 32.2096, lng: 35.2696 },
        bibleReferences: ['John 4:6', 'Genesis 33:19'],
        significance: 'One of the few sites where we can be almost 100% sure Jesus sat. It is deep (over 100ft) just as the Samaritan woman said ("the well is deep").',
        currentLocation: 'In Situ (Greek Orthodox Church, Nablus)'
    },
    {
        id: 'robinsons-arch',
        title: 'Robinson\'s Arch',
        description: 'The remains of a massive stone arch that supported a monumental staircase leading from the street to the Temple Mount.',
        dateDiscovered: '1838',
        artifactDate: 'c. 1st Century BC',
        location: 'Jerusalem (Western Wall)',
        coordinates: { lat: 31.7760, lng: 35.2345 },
        bibleReferences: ['Matthew 24:1'],
        significance: 'Part of the massive Herod temple complex that the disciples marveled at. Stones from its destruction lie in a heap on the 1st-century street below today.',
        currentLocation: 'In Situ (Jerusalem Archaeological Park)'
    },
    {
        id: 'mamertine-prison',
        title: 'Mamertine Prison (Tullianum)',
        description: 'An ancient dungeon in Rome where tradition (and evidence) says Peter and Paul were held before execution.',
        dateDiscovered: 'Ancient',
        artifactDate: 'c. 7th Century BC',
        location: 'Rome',
        coordinates: { lat: 41.8936, lng: 12.4848 },
        bibleReferences: ['2 Timothy 4:6-21'],
        significance: 'The likely setting for Paul\'s final letter (2 Timothy), describing being "poured out like a drink offering" in a cold, dark place.',
        currentLocation: 'In Situ (San Pietro in Carcere, Rome)'
    },
    {
        id: 'areopagus-mars-hill',
        title: 'The Areopagus (Mars Hill)',
        description: 'A prominent rock outcropping beneath the Acropolis in Athens which served as the high court.',
        dateDiscovered: 'Ancient',
        artifactDate: 'Ancient',
        location: 'Athens',
        coordinates: { lat: 37.9722, lng: 23.7247 },
        bibleReferences: ['Acts 17:19-34'],
        significance: 'The actual physical platform where Paul delivered his famous sermon about the "Unknown God" on the Areopagus.',
        currentLocation: 'In Situ (Athens)'
    }
];


export interface JewishFeast {
    id: string;
    title: string;
    hebrewTitle: string;
    transliteration: string;
    month: string; // e.g. "Nisan 14"
    season: 'Spring' | 'Fall' | 'Winter';
    references: string[]; // Leviticus 23 ref
    significance: string; // Historic/Agricultural
    fulfillment: string; // Messianic Prophecy
    iconName?: string;
}

export const JEWISH_FEASTS: JewishFeast[] = [
    // --- Spring Feasts (First Coming) ---
    {
        id: 'passover',
        title: 'Passover',
        hebrewTitle: 'פֶּסַח',
        transliteration: 'Pesach',
        month: 'Nisan 14',
        season: 'Spring',
        references: ['Leviticus 23:5'],
        significance: 'Commemorates the deliverance from Egypt when the angel of death "passed over" the homes marked by the blood of the lamb.',
        fulfillment: 'Crucifixion: Jesus is the "Lamb of God" sacrificed on Passover (1 Cor 5:7), whose blood redeems us from death.',
    },
    {
        id: 'unleavened-bread',
        title: 'Unleavened Bread',
        hebrewTitle: 'חַג הַמַּצּוֹת',
        transliteration: 'Chag HaMatzot',
        month: 'Nisan 15-21',
        season: 'Spring',
        references: ['Leviticus 23:6-8'],
        significance: 'Eating bread without leaven (yeast) to remember the haste of leaving Egypt. Leaven also symbolizes sin in the Bible.',
        fulfillment: 'Burial: Jesus, the "Bread of Life", was buried on this feast. He was sinless (unleavened) and His body did not decay.',
    },
    {
        id: 'firstfruits',
        title: 'Firstfruits',
        hebrewTitle: 'יוֹם הַבִּכּוּרִים',
        transliteration: 'Yom HaBikkurim',
        month: 'Nisan 16 (Day after Sabbath)',
        season: 'Spring',
        references: ['Leviticus 23:10-14'],
        significance: 'Offering the very first sheaf of the barley harvest to God, acknowledging Him as the provider.',
        fulfillment: 'Resurrection: Jesus rose on the Feast of Firstfruits, becoming the "firstfruits of those who have fallen asleep" (1 Cor 15:20).',
    },
    {
        id: 'pentecost',
        title: 'Pentecost (Weeks)',
        hebrewTitle: 'שָׁבוּעוֹת',
        transliteration: 'Shavuot',
        month: 'Sivan 6 (50 days later)',
        season: 'Spring',
        references: ['Leviticus 23:15-22'],
        significance: 'Celebrates the wheat harvest and the giving of the Law (Torah) at Mt. Sinai.',
        fulfillment: 'Giving of the Spirit: The Holy Spirit was poured out on Pentecost (Acts 2), writing the Law on our hearts and birthing the Church.',
    },

    // --- Fall Feasts (Second Coming) ---
    {
        id: 'trumpets',
        title: 'Feast of Trumpets',
        hebrewTitle: 'יוֹם תְּרוּעָה',
        transliteration: 'Yom Teruah (Rosh Hashanah)',
        month: 'Tishrei 1',
        season: 'Fall',
        references: ['Leviticus 23:23-25'],
        significance: 'The Jewish New Year. A day of blowing the shofar (trumpet) to call the people to repentance and prepare for judgment.',
        fulfillment: 'Rapture / Return: Associated with the "Last Trumpet" (1 Cor 15:52) and the gathering of God\'s people.',
    },
    {
        id: 'atonement',
        title: 'Day of Atonement',
        hebrewTitle: 'יוֹם כִּפּוּר',
        transliteration: 'Yom Kippur',
        month: 'Tishrei 10',
        season: 'Fall',
        references: ['Leviticus 23:26-32'],
        significance: 'The holiest day of the year. The High Priest enters the Holy of Holies to make atonement for the nation\'s sins.',
        fulfillment: 'Redemption of Israel: Prophetic of the day when "all Israel will be saved" (Rom 11:26) as they mourn for Him whom they pierced (Zech 12:10).',
    },
    {
        id: 'tabernacles',
        title: 'Tabernacles (Booths)',
        hebrewTitle: 'סֻכּוֹת',
        transliteration: 'Sukkot',
        month: 'Tishrei 15-21',
        season: 'Fall',
        references: ['Leviticus 23:33-43'],
        significance: 'Living in temporary shelters (booths) to remember God\'s dwelling with them in the wilderness. The festival of "Ingathering".',
        fulfillment: 'Millennial Kingdom: God dwells with men (Rev 21:3). Jesus "tabernacled" among us (John 1:14), but the ultimate fulfillment is His reign on earth.',
    },
    // --- Winter / Additional ---
    {
        id: 'hanukkah',
        title: 'Hanukkah (Dedication)',
        hebrewTitle: 'חֲנֻכָּה',
        transliteration: 'Hanukkah',
        month: 'Kislev 25',
        season: 'Winter',
        references: ['John 10:22'],
        significance: 'Commemorates the rededication of the Temple after the Maccabean revolt against the Greeks.',
        fulfillment: 'Light of the World: Jesus visited the Temple during this "Feast of Dedication" (John 10:22) and spoke of His oneness with the Father.',
    },
    {
        id: 'purim',
        title: 'Purim (Lots)',
        hebrewTitle: 'פּוּרִים',
        transliteration: 'Purim',
        month: 'Adar 14',
        season: 'Winter',
        references: ['Esther 9:20-22'],
        significance: 'Celebrates the deliverance of the Jews from Haman\'s plot to annihilate them in Persia.',
        fulfillment: 'Providence: Highlights God\'s hidden hand in history preserving His people against Satanic attempts at genocide.',
    }
];


export interface MessianicProphecy {
    id: string;
    title: string;
    topic: 'Birth' | 'Ministry' | 'Passion' | 'Resurrection' | 'Kingship';
    prophecy: {
        verse: string;
        text: string;
        source: string; // e.g. "Isaiah"
    };
    fulfillment: {
        verse: string;
        text: string;
    };
    probability?: string;
}

export const MESSIANIC_PROPHECIES: MessianicProphecy[] = [
    // --- Birth ---
    {
        id: 'virgin-birth',
        title: 'Born of a Virgin',
        topic: 'Birth',
        prophecy: {
            verse: 'Isaiah 7:14',
            text: 'Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.',
            source: 'Isaiah'
        },
        fulfillment: {
            verse: 'Matthew 1:22-23',
            text: 'All this took place to fulfill what the Lord had spoken by the prophet: "Behold, the virgin shall conceive..."'
        }
    },
    {
        id: 'bethlehem',
        title: 'Born in Bethlehem',
        topic: 'Birth',
        prophecy: {
            verse: 'Micah 5:2',
            text: 'But you, O Bethlehem Ephrathah... from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days.',
            source: 'Micah'
        },
        fulfillment: {
            verse: 'Matthew 2:1',
            text: 'Now after Jesus was born in Bethlehem of Judea in the days of Herod the king...'
        },
        probability: 'Micah pinpointed the exact village out of thousands in Judah.'
    },
    {
        id: 'tribe-judah',
        title: 'From the Tribe of Judah',
        topic: 'Birth',
        prophecy: {
            verse: 'Genesis 49:10',
            text: 'The scepter shall not depart from Judah, nor the ruler\'s staff from between his feet, until tribute comes to him.',
            source: 'Jacob'
        },
        fulfillment: {
            verse: 'Hebrews 7:14',
            text: 'For it is evident that our Lord was descended from Judah...'
        }
    },

    // --- Ministry ---
    {
        id: 'preceded-messenger',
        title: 'Preceded by a Messenger',
        topic: 'Ministry',
        prophecy: {
            verse: 'Isaiah 40:3',
            text: 'A voice cries: "In the wilderness prepare the way of the LORD; make straight in the desert a highway for our God."',
            source: 'Isaiah'
        },
        fulfillment: {
            verse: 'Matthew 3:1-3',
            text: 'In those days John the Baptist came preaching in the wilderness of Judea... For this is he who was spoken of by the prophet Isaiah.'
        }
    },
    {
        id: 'ministry-galilee',
        title: 'Ministry in Galilee',
        topic: 'Ministry',
        prophecy: {
            verse: 'Isaiah 9:1-2',
            text: 'In the former time he brought into contempt the land of Zebulun... but in the latter time he has made glorious the way of the sea... Galilee of the nations.',
            source: 'Isaiah'
        },
        fulfillment: {
            verse: 'Matthew 4:12-16',
            text: 'He withdrew into Galilee... so that what was spoken by the prophet Isaiah might be fulfilled.'
        }
    },
    {
        id: 'parables',
        title: 'Teaching in Parables',
        topic: 'Ministry',
        prophecy: {
            verse: 'Psalm 78:2',
            text: 'I will open my mouth in a parable; I will utter dark sayings from of old.',
            source: 'Asaph'
        },
        fulfillment: {
            verse: 'Matthew 13:34-35',
            text: 'All these things Jesus said to the crowds in parables... to fulfill what was spoken by the prophet.'
        }
    },

    // --- Passion (Death) ---
    {
        id: 'triumphal-entry',
        title: 'The King on a Donkey',
        topic: 'Passion',
        prophecy: {
            verse: 'Zechariah 9:9',
            text: 'Rejoice greatly, O daughter of Zion!... Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey.',
            source: 'Zechariah'
        },
        fulfillment: {
            verse: 'Matthew 21:4-5',
            text: 'This took place to fulfill what was spoken by the prophet...'
        }
    },
    {
        id: 'betrayal-silver',
        title: 'Betrayed for 30 Pieces of Silver',
        topic: 'Passion',
        prophecy: {
            verse: 'Zechariah 11:12',
            text: 'Then I said to them, "If it seems good to you, give me my wages..." So they weighed out as my wages thirty pieces of silver.',
            source: 'Zechariah'
        },
        fulfillment: {
            verse: 'Matthew 26:15',
            text: 'They paid him thirty pieces of silver.'
        }
    },
    {
        id: 'pierced-hands',
        title: 'Pierced Hands and Feet',
        topic: 'Passion',
        prophecy: {
            verse: 'Psalm 22:16',
            text: 'For dogs encompass me; a company of evildoers encircles me; they have pierced my hands and feet.',
            source: 'David'
        },
        fulfillment: {
            verse: 'John 20:25',
            text: '"Unless I see in his hands the mark of the nails..." (Implied crucifixion)'
        }
    },
    {
        id: 'cast-lots',
        title: 'Lots Cast for Clothing',
        topic: 'Passion',
        prophecy: {
            verse: 'Psalm 22:18',
            text: 'They divide my garments among them, and for my clothing they cast lots.',
            source: 'David'
        },
        fulfillment: {
            verse: 'John 19:24',
            text: 'So they said to one another, "Let us not tear it, but cast lots for it to see whose it shall be."'
        }
    },
    {
        id: 'not-bone-broken',
        title: 'No Bone Broken',
        topic: 'Passion',
        prophecy: {
            verse: 'Psalm 34:20',
            text: 'He keeps all his bones; not one of them is broken.',
            source: 'David'
        },
        fulfillment: {
            verse: 'John 19:33-36',
            text: ' But when they came to Jesus and saw that he was already dead, they did not break his legs.'
        }
    },
    {
        id: 'burial-rich',
        title: 'Buried with the Rich',
        topic: 'Passion',
        prophecy: {
            verse: 'Isaiah 53:9',
            text: 'And they made his grave with the wicked and with a rich man in his death, although he had done no violence.',
            source: 'Isaiah'
        },
        fulfillment: {
            verse: 'Matthew 27:57-60',
            text: 'There came a rich man from Arimathea, named Joseph... he took the body... and laid it in his own new tomb.'
        }
    },

    // --- Resurrection ---
    {
        id: 'resurrection',
        title: 'Resurrection from the Dead',
        topic: 'Resurrection',
        prophecy: {
            verse: 'Psalm 16:10',
            text: 'For you will not abandon my soul to Sheol, or let your holy one see corruption.',
            source: 'David'
        },
        fulfillment: {
            verse: 'Acts 2:31',
            text: 'He foresaw and spoke about the resurrection of the Christ, that he was not abandoned to Hades, nor did his flesh see corruption.'
        }
    },
    {
        id: 'ascension',
        title: 'Ascension to the Right Hand',
        topic: 'Resurrection',
        prophecy: {
            verse: 'Psalm 110:1',
            text: 'The LORD says to my Lord: "Sit at my right hand, until I make your enemies your footstool."',
            source: 'David'
        },
        fulfillment: {
            verse: 'Acts 2:33',
            text: 'Being therefore exalted at the right hand of God...'
        }
    }
];

export interface Miracle {
    id: string;
    title: string;
    category: 'Nature' | 'Healing' | 'Resurrection' | 'Exorcism' | 'Provision';
    location: string;
    scripture: string;
    description: string;
}

export const MIRACLES: Miracle[] = [
    // Nature
    { id: 'water-wine', title: 'Water into Wine', category: 'Nature', location: 'Cana', scripture: 'John 2:1-11', description: 'Jesus transforms water into the finest wine at a wedding, manifesting His glory.' },
    { id: 'calm-storm', title: 'Calming the Storm', category: 'Nature', location: 'Sea of Galilee', scripture: 'Matthew 8:23-27', description: 'Jesus rebukes the wind and waves, demonstrating authority over creation.' },
    { id: 'walk-water', title: 'Walking on Water', category: 'Nature', location: 'Sea of Galilee', scripture: 'Matthew 14:22-33', description: 'Jesus defies physics to meet His disciples, and Peter joins Him briefly.' },
    { id: 'fig-tree', title: 'Withered Fig Tree', category: 'Nature', location: 'Mount of Olives', scripture: 'Matthew 21:18-22', description: 'A prophetic sign of judgment upon fruitless religion.' },

    // Provision
    { id: 'feed-5000', title: 'Feeding the 5,000', category: 'Provision', location: 'Bethsaida', scripture: 'John 6:1-14', description: 'Multiplying five loaves and two fish to feed a multitude.' },
    { id: 'feed-4000', title: 'Feeding the 4,000', category: 'Provision', location: 'Decapolis', scripture: 'Mark 8:1-9', description: 'Another miraculous multiplication for a mostly Gentile crowd.' },
    { id: 'large-catch', title: 'The Great Catch of Fish', category: 'Provision', location: 'Gennesaret', scripture: 'Luke 5:1-11', description: 'An overwhelming catch that leads Peter to leave everything and follow Jesus.' },
    { id: 'coin-mouth', title: 'Coin in the Fish\'s Mouth', category: 'Provision', location: 'Capernaum', scripture: 'Matthew 17:24-27', description: 'Supernatural provision to pay the temple tax without offense.' },

    // Healing
    { id: 'official-son', title: 'Official\'s Son', category: 'Healing', location: 'Cana/Capernaum', scripture: 'John 4:46-54', description: 'A long-distance healing spoken from Cana, effective instantly in Capernaum.' },
    { id: 'peter-mother', title: 'Peter\'s Mother-in-Law', category: 'Healing', location: 'Capernaum', scripture: 'Matthew 8:14-15', description: 'Instant healing from a high fever, enabling her to serve immediately.' },
    { id: 'leper', title: 'Cleansing a Leper', category: 'Healing', location: 'Galilee', scripture: 'Mark 1:40-45', description: 'Jesus touches the untouchable and restores him to community.' },
    { id: 'paralytic', title: 'The Paralytic through the Roof', category: 'Healing', location: 'Capernaum', scripture: 'Mark 2:1-12', description: 'Forgiving sins and healing the body to prove His authority.' },
    { id: 'withered-hand', title: 'Man with Withered Hand', category: 'Healing', location: 'Capernaum', scripture: 'Matthew 12:9-13', description: 'Healing on the Sabbath, challenging the legalism of the Pharisees.' },
    { id: 'centurion', title: 'Centurion\'s Servant', category: 'Healing', location: 'Capernaum', scripture: 'Luke 7:1-10', description: 'Healing granted in response to great faith from a Gentile.' },
    { id: 'blood-issue', title: 'Woman with Issue of Blood', category: 'Healing', location: 'Capernaum', scripture: 'Mark 5:25-34', description: 'Faith expressed through a touch of His garment heals a 12-year affliction.' },
    { id: 'deaf-mute', title: 'Deaf and Mute Man', category: 'Healing', location: 'Decapolis', scripture: 'Mark 7:31-37', description: '"Ephphatha!" (Be opened) restores hearing and plain speech.' },
    { id: 'blind-bethsaida', title: 'Blind Man at Bethsaida', category: 'Healing', location: 'Bethsaida', scripture: 'Mark 8:22-26', description: 'A two-stage healing ("I see men like trees walking").' },
    { id: 'man-born-blind', title: 'Man Born Blind', category: 'Healing', location: 'Jerusalem', scripture: 'John 9:1-41', description: 'Healing that provokes a national debate on spiritual blindness.' },
    { id: 'ten-lepers', title: 'Ten Lepers', category: 'Healing', location: 'Samaria/Galilee border', scripture: 'Luke 17:11-19', description: 'Ten are cleansed, but only one (a Samaritan) returns to give thanks.' },
    { id: 'malchus', title: 'Ear of Malchus', category: 'Healing', location: 'Gethsemane', scripture: 'Luke 22:50-51', description: 'Healing an enemy injured by a disciple during the arrest.' },

    // Exorcism
    { id: 'synagogue-demon', title: 'Demon in Synagogue', category: 'Exorcism', location: 'Capernaum', scripture: 'Mark 1:21-28', description: 'Authority over unclean spirits recognized even in the place of worship.' },
    { id: 'legion', title: 'Legion (Gerasene Demoniac)', category: 'Exorcism', location: 'Gadarenes', scripture: 'Mark 5:1-20', description: 'Casting a legion of demons into a herd of pigs, restoring a wild man.' },
    { id: 'syrophoenician', title: 'Syrophoenician\'s Daughter', category: 'Exorcism', location: 'Tyre/Sidon', scripture: 'Mark 7:24-30', description: 'Deliverance granted after a test of faith ("Even the dogs eat the crumbs").' },
    { id: 'boy-epileptic', title: 'Boy with Unclean Spirit', category: 'Exorcism', location: 'Near Mt. Tabor', scripture: 'Mark 9:14-29', description: 'Deliverance that follows the Transfiguration ("This kind cannot be driven out by anything but prayer").' },

    // Resurrection
    { id: 'widow-son', title: 'Widow\'s Son at Nain', category: 'Resurrection', location: 'Nain', scripture: 'Luke 7:11-17', description: 'Compassion leads Jesus to interrupt a funeral procession and raise the dead.' },
    { id: 'jairus-daughter', title: 'Jairus\' Daughter', category: 'Resurrection', location: 'Capernaum', scripture: 'Mark 5:21-43', description: 'Raising a 12-year-old girl ("Talitha cumi").' },
    { id: 'lazarus', title: 'Raising of Lazarus', category: 'Resurrection', location: 'Bethany', scripture: 'John 11:1-44', description: 'Calling Lazarus from the tomb after four days, prefiguring His own resurrection.' }
];

export interface Apostle {
    id: string;
    name: string;
    ako: string[]; // Also Known As
    meaning: string;
    occupation: string;
    symbol: string;
    scripture: string; // Deprecated, use keyVerses
    keyVerses: { ref: string; label: string }[];
    profile: string;
    martyrdom: string;
}

export const THE_APOSTLES: Apostle[] = [
    {
        id: 'peter',
        name: 'Simon Peter',
        ako: ['Cephas', 'Simon son of Jonah'],
        meaning: 'Rock (Petros)',
        occupation: 'Fisherman',
        symbol: 'Inverted Cross / Keys',
        scripture: 'Matthew 16:18',
        keyVerses: [
            { ref: 'Matthew 4:18-20', label: 'Call' },
            { ref: 'Matthew 16:13-19', label: 'Confession' },
            { ref: 'Luke 22:31-34', label: 'Denial Predicted' },
            { ref: 'John 21:15-19', label: 'Restoration' },
            { ref: 'Acts 2:14-41', label: 'Pentecost Sermon' },
            { ref: '1 Peter 1:1', label: 'Epistle' }
        ],
        profile: 'The impulsive leader of the Twelve. First to confess Jesus as Messiah, but also denied Him three times. Restored by Jesus to "feed my sheep" and became the pillar of the Jerusalem church.',
        martyrdom: 'Crucified upside down in Rome under Nero (c. 64-68 AD) because he felt unworthy to die in the same manner as his Lord.'
    },
    {
        id: 'andrew',
        name: 'Andrew',
        ako: ['Protocletus (First-Called)'],
        meaning: 'Manly',
        occupation: 'Fisherman',
        symbol: 'X-shaped Cross (Saltire)',
        scripture: 'John 1:40-42',
        keyVerses: [
            { ref: 'John 1:35-42', label: 'First Call' },
            { ref: 'John 6:8-9', label: 'loaves and fishes' },
            { ref: 'John 12:20-22', label: 'Bringing Greeks' },
            { ref: 'Mark 13:3', label: 'Olivet Question' }
        ],
        profile: 'Peter\'s brother and a former disciple of John the Baptist. Known for bringing others to Jesus (Peter, the lad with loaves, the Greeks).',
        martyrdom: 'Crucified on an X-shaped cross in Patras, Greece. He reportedly preached from the cross for two days before dying.'
    },
    {
        id: 'james-zebedee',
        name: 'James (Son of Zebedee)',
        ako: ['Boanerges (Son of Thunder)', 'James the Great'],
        meaning: 'Supplanter',
        occupation: 'Fisherman',
        symbol: 'Scallop Shell / Sword',
        scripture: 'Mark 3:17',
        keyVerses: [
            { ref: 'Matthew 4:21-22', label: 'Call' },
            { ref: 'Mark 3:17', label: 'Son of Thunder' },
            { ref: 'Matthew 17:1-8', label: 'Transfiguration' },
            { ref: 'Acts 12:1-2', label: 'Martyrdom' }
        ],
        profile: 'Part of the inner circle (with Peter and John). Known for his fiery zeal (wanting to call down fire on Samaritans). The first apostle to be martyred.',
        martyrdom: 'Beheaded by Herod Agrippa I in Jerusalem (44 AD). The only apostolic martyrdom recorded in Scripture.'
    },
    {
        id: 'john',
        name: 'John',
        ako: ['The Beloved Disciple', 'Boanerges', 'The Theologian'],
        meaning: 'God is Gracious',
        occupation: 'Fisherman',
        symbol: 'Eagle / Chalice with Snake',
        scripture: 'John 13:23',
        keyVerses: [
            { ref: 'John 19:26-27', label: 'At the Cross' },
            { ref: 'John 20:1-10', label: 'Empty Tomb' },
            { ref: 'Acts 4:13', label: 'Boldness' },
            { ref: 'Revelation 1:9', label: 'Patmos' }
        ],
        profile: 'The author of the Fourth Gospel, three epistles, and Revelation. Known for deep theology ("The Word was God") and emphasis on love. The only apostle thought to have died of natural causes.',
        martyrdom: 'Exiled to Patmos under Domitian. Tradition says he survived being boiled in oil in Rome before his exile.'
    },
    {
        id: 'philip',
        name: 'Philip',
        ako: [],
        meaning: 'Lover of Horses',
        occupation: 'Fisherman (likely)',
        symbol: 'Basket / Cross with Spears',
        scripture: 'John 1:43',
        keyVerses: [
            { ref: 'John 1:43-46', label: 'Call & Nathanael' },
            { ref: 'John 6:5-7', label: 'Feeding 5000' },
            { ref: 'John 14:8-9', label: 'Show us the Father' }
        ],
        profile: 'From Bethsaida (like Peter and Andrew). Practical and analytical ("Two hundred denarii worth of bread is not enough"). Led Nathanael to Jesus.',
        martyrdom: 'Crucified (and/or stoned) in Hierapolis, Phrygia (modern Turkey).'
    },
    {
        id: 'bartholomew',
        name: 'Bartholomew',
        ako: ['Nathanael'],
        meaning: 'Son of Tolmai',
        occupation: 'Unknown (Scholar?)',
        symbol: 'Flaying Knives',
        scripture: 'John 1:45-51',
        keyVerses: [
            { ref: 'John 1:45-51', label: 'Under the Fig Tree' },
            { ref: 'John 21:2', label: 'Fishing' },
            { ref: 'Acts 1:13', label: 'Upper Room' }
        ],
        profile: 'Praised by Jesus as "an Israelite in whom there is no deceit." Initially skeptical ("Can anything good come out of Nazareth?").',
        martyrdom: 'Flayed alive and then beheaded in Armenia (or India) for converting the king\'s brother.'
    },
    {
        id: 'thomas',
        name: 'Thomas',
        ako: ['Didymus (The Twin)'],
        meaning: 'Twin',
        occupation: 'Builder/Fisherman?',
        symbol: 'Spear / Carpenter\'s Square',
        scripture: 'John 20:24-29',
        keyVerses: [
            { ref: 'John 11:16', label: 'Let us die with Him' },
            { ref: 'John 14:5', label: 'We do not know the way' },
            { ref: 'John 20:24-29', label: 'My Lord and my God' }
        ],
        profile: 'Often called "Doubting Thomas," but demonstrated great courage ("Let us also go, that we may die with him") and gave the highest confession of Christ\'s divinity.',
        martyrdom: 'Speared to death in India (Mylapore, near Chennai) where he established ancient churches.'
    },
    {
        id: 'matthew',
        name: 'Matthew',
        ako: ['Levi'],
        meaning: 'Gift of God',
        occupation: 'Tax Collector',
        symbol: 'Angel / Money Bags',
        scripture: 'Matthew 9:9',
        keyVerses: [
            { ref: 'Matthew 9:9-13', label: 'Call' },
            { ref: 'Luke 5:29', label: 'Great Banquet' },
            { ref: 'Acts 1:13', label: 'Apostle' }
        ],
        profile: 'A despised tax collector who left his booth immediately to follow Jesus. Wrote the Gospel of Matthew, emphasizing Jesus as the Jewish Messiah and fulfillment of prophecy.',
        martyrdom: 'Martyred in Ethiopia (or Persia) by sword or spear.'
    },
    {
        id: 'james-alphaeus',
        name: 'James (Son of Alphaeus)',
        ako: ['James the Less', 'James the Younger'],
        meaning: 'Supplanter',
        occupation: 'Unknown',
        symbol: 'Saw / Fuller\'s Club',
        scripture: 'Mark 15:40',
        keyVerses: [
            { ref: 'Matthew 10:3', label: 'List of Twelve' },
            { ref: 'Acts 1:13', label: 'Upper Room' }
        ],
        profile: 'Little is known of him scripturally ("the Less" may refer to age or stature). Often confused with James the brother of Jesus (who wrote the Epistle of James).',
        martyrdom: 'Stoned and clubbed to death (traditionally in Jerusalem).'
    },
    {
        id: 'thaddaeus',
        name: 'Thaddaeus',
        ako: ['Jude', 'Judas son of James', 'Lebbaeus'],
        meaning: 'Heart / Courageous',
        occupation: 'Unknown',
        symbol: 'Club / Ship',
        scripture: 'John 14:22',
        keyVerses: [
            { ref: 'John 14:22', label: 'Question at Supper' },
            { ref: 'Jude 1:1', label: 'Epistle of Jude?' }
        ],
        profile: 'Asked Jesus why He would reveal Himself to the disciples and not the world. (Often associated with the author of Jude).',
        martyrdom: 'Martyred in Beirut or Persia (with Simon the Zealot) by axe or club.'
    },
    {
        id: 'simon',
        name: 'Simon the Zealot',
        ako: ['Simon the Cananaean'],
        meaning: 'He has heard',
        occupation: 'Revolutionary (Zealot)',
        symbol: 'Saw',
        scripture: 'Luke 6:15',
        keyVerses: [
            { ref: 'Matthew 10:4', label: 'List of Twelve' },
            { ref: 'Acts 1:13', label: 'Upper Room' }
        ],
        profile: 'A former member of the radical Zealot party which advocated violent overthrow of Rome. The fact that he could serve alongside Matthew (a Roman collaborator) is a testament to the Gospel\'s unifying power.',
        martyrdom: 'Sawn in half (traditionally in Persia).'
    },
    {
        id: 'judas',
        name: 'Judas Iscariot',
        ako: ['The Betrayer'],
        meaning: 'Man of Kerioth',
        occupation: 'Treasurer',
        symbol: 'Noose / 30 Pieces of Silver',
        scripture: 'Matthew 26:14-16',
        keyVerses: [
            { ref: 'John 12:4-6', label: 'The Thief' },
            { ref: 'Matthew 26:14-16', label: 'The Deal' },
            { ref: 'Matthew 27:3-5', label: 'The End' }
        ],
        profile: 'The treasurer of the group who stole from the money bag. Betrayed Jesus for 30 pieces of silver. Committed suicide.',
        martyrdom: 'Suicide (Hanged himself; Acts 1:18 describes his body bursting open).'
    },
    {
        id: 'matthias',
        name: 'Matthias',
        ako: ['The Replacement'],
        meaning: 'Gift of God',
        occupation: 'Witness from the Baptism',
        symbol: 'Book / Axe',
        scripture: 'Acts 1:21-26',
        keyVerses: [
            { ref: 'Acts 1:21-26', label: 'Selected by Lot' }
        ],
        profile: 'Chosen by lot to replace Judas. Had been with Jesus from the baptism of John until the Ascension. (Some argue Paul was the true 12th, but Scripture recognizes Matthias).',
        martyrdom: 'Stoned and beheaded in Jerusalem or Ethiopia.'
    },
    {
        id: 'paul',
        name: 'Paul (Saul)',
        ako: ['Apostle to the Gentiles'],
        meaning: 'Small (Paulus)',
        occupation: 'Pharisee / Tentmaker',
        symbol: 'Sword / Scroll',
        scripture: 'Acts 9:1-19',
        keyVerses: [
            { ref: 'Acts 9:1-19', label: 'Conversion' },
            { ref: 'Galatians 1:11-12', label: 'Revelation' },
            { ref: '2 Timothy 4:6-8', label: 'Finish Line' }
        ],
        profile: 'Persecutor turned Apostle. Author of 13 NT epistles. Not one of the Twelve, but "one untimely born." The central figure of the Gentile mission.',
        martyrdom: 'Beheaded in Rome under Nero (c. 64-67 AD).'
    }
];

export interface Parable {
    id: string;
    title: string;
    reference: string;
    gospels: ('Matthew' | 'Mark' | 'Luke')[];
    theme: 'Kingdom' | 'Grace' | 'Judgment' | 'Prayer' | 'Stewardship' | 'Wisdom';
    summary: string;
    lesson: string;
}

export const PARABLES: Parable[] = [
    {
        id: 'sower',
        title: 'The Sower',
        reference: 'Matthew 13:3-23',
        gospels: ['Matthew', 'Mark', 'Luke'],
        theme: 'Kingdom',
        summary: 'A sower scatters seed on path, rocky ground, thorns, and good soil.',
        lesson: 'The reception of God\'s Word depends on the condition of the human heart.'
    },
    {
        id: 'tares',
        title: 'The Wheat and Tares',
        reference: 'Matthew 13:24-30',
        gospels: ['Matthew'],
        theme: 'Judgment',
        summary: 'An enemy sows weeds among the wheat, and both grow together until harvest.',
        lesson: 'Good and evil will coexist in the world until the final judgment.'
    },
    {
        id: 'mustard',
        title: 'The Mustard Seed',
        reference: 'Matthew 13:31-32',
        gospels: ['Matthew', 'Mark', 'Luke'],
        theme: 'Kingdom',
        summary: 'A tiny seed grows into a large tree where birds can nest.',
        lesson: 'Values of the Kingdom start small but eventually spread worldwide.'
    },
    {
        id: 'leaven',
        title: 'The Leaven',
        reference: 'Matthew 13:33',
        gospels: ['Matthew', 'Luke'],
        theme: 'Kingdom',
        summary: 'Yeast works through dough until the whole batch rises.',
        lesson: 'The subtle, pervasive, and transforming power of the Kingdom.'
    },
    {
        id: 'treasure',
        title: 'The Hidden Treasure',
        reference: 'Matthew 13:44',
        gospels: ['Matthew'],
        theme: 'Wisdom',
        summary: 'A man finds treasure in a field and sells everything to buy the field.',
        lesson: 'The Kingdom of Heaven is worth sacrificing everything to possess.'
    },
    {
        id: 'pearl',
        title: 'The Pearl of Great Price',
        reference: 'Matthew 13:45-46',
        gospels: ['Matthew'],
        theme: 'Wisdom',
        summary: 'A merchant finds a perfect pearl and sells all he has to buy it.',
        lesson: 'The surpassing value of knowing Christ and the Kingdom.'
    },
    {
        id: 'dragnet',
        title: 'The Dragnet',
        reference: 'Matthew 13:47-50',
        gospels: ['Matthew'],
        theme: 'Judgment',
        summary: 'A net catches all kinds of fish, which are sorted on the shore.',
        lesson: 'The final separation of the righteous and the wicked.'
    },
    {
        id: 'unmerciful',
        title: 'The Unmerciful Servant',
        reference: 'Matthew 18:23-35',
        gospels: ['Matthew'],
        theme: 'Grace',
        summary: 'A servant forgiven a massive debt refuses to forgive a small debt.',
        lesson: 'We must forgive others because God has forgiven us an unpayable debt.'
    },
    {
        id: 'workers',
        title: 'Workers in the Vineyard',
        reference: 'Matthew 20:1-16',
        gospels: ['Matthew'],
        theme: 'Grace',
        summary: 'Workers hired at the eleventh hour receive the same pay as those who worked all day.',
        lesson: 'God\'s grace is sovereign and not based on human merit or duration of service.'
    },
    {
        id: 'two-sons',
        title: 'The Two Sons',
        reference: 'Matthew 21:28-32',
        gospels: ['Matthew'],
        theme: 'Wisdom',
        summary: 'One son says no but does it; the other says yes but doesn\'t.',
        lesson: 'Obedience is better than empty words; tax collectors enter before Pharisees.'
    },
    {
        id: 'tenants',
        title: 'The Wicked Tenants',
        reference: 'Matthew 21:33-46',
        gospels: ['Matthew', 'Mark', 'Luke'],
        theme: 'Judgment',
        summary: 'Tenants kill the servants and finally the son of the vineyard owner.',
        lesson: 'God will judge those who reject His prophets and His Son.'
    },
    {
        id: 'wedding',
        title: 'The Wedding Feast',
        reference: 'Matthew 22:1-14',
        gospels: ['Matthew'],
        theme: 'Grace',
        summary: 'Invited guests refuse to come, so the king invites everyone from the streets.',
        lesson: 'The invitation to the Kingdom is open to all, but requires a response (wedding garment).'
    },
    {
        id: 'virgins',
        title: 'The Ten Virgins',
        reference: 'Matthew 25:1-13',
        gospels: ['Matthew'],
        theme: 'Stewardship',
        summary: 'Five wise virgins brought oil; five foolish ones did not.',
        lesson: 'We must be spiritually prepared/watchful for Christ\'s return.'
    },
    {
        id: 'talents',
        title: 'The Talents',
        reference: 'Matthew 25:14-30',
        gospels: ['Matthew'],
        theme: 'Stewardship',
        summary: 'Servants are entrusted with property; two invest, one hides it.',
        lesson: 'We are accountable to use our God-given gifts for His glory.'
    },
    {
        id: 'sheep-goats',
        title: 'The Sheep and Goats',
        reference: 'Matthew 25:31-46',
        gospels: ['Matthew'],
        theme: 'Judgment',
        summary: 'The King separates nations based on how they treated "the least of these."',
        lesson: 'True faith is evidenced by love and service to the needy.'
    },
    {
        id: 'growing-seed',
        title: 'The Growing Seed',
        reference: 'Mark 4:26-29',
        gospels: ['Mark'],
        theme: 'Kingdom',
        summary: 'Seed grows secretly while the farmer sleeps.',
        lesson: 'The growth of the Kingdom is God\'s work, often unseen by us.'
    },
    {
        id: 'samaritan',
        title: 'The Good Samaritan',
        reference: 'Luke 10:25-37',
        gospels: ['Luke'],
        theme: 'Grace',
        summary: 'A Samaritan helps a wounded man ignored by a priest and Levite.',
        lesson: 'Who is my neighbor? Anyone in need, regardless of race or religion.'
    },
    {
        id: 'friend-midnight',
        title: 'Friend at Midnight',
        reference: 'Luke 11:5-8',
        gospels: ['Luke'],
        theme: 'Prayer',
        summary: 'A neighbor lends bread because of the requester\'s persistence.',
        lesson: 'God answers persistent, bold prayer.'
    },
    {
        id: 'rich-fool',
        title: 'The Rich Fool',
        reference: 'Luke 12:16-21',
        gospels: ['Luke'],
        theme: 'Stewardship',
        summary: 'A rich man builds bigger barns but dies that very night.',
        lesson: 'One\'s life does not consist in the abundance of possessions.'
    },
    {
        id: 'barren-fig',
        title: 'The Barren Fig Tree',
        reference: 'Luke 13:6-9',
        gospels: ['Luke'],
        theme: 'Judgment',
        summary: 'A tree is given one more year to bear fruit before being cut down.',
        lesson: 'God is patient, but judgment will come if there is no repentance.'
    },
    {
        id: 'great-banquet',
        title: 'The Great Banquet',
        reference: 'Luke 14:15-24',
        gospels: ['Luke'],
        theme: 'Grace',
        summary: 'Those invited make excuses, so the poor and crippled are brought in.',
        lesson: 'God\'s table will be full; if the self-righteous refuse, outcasts will be welcomed.'
    },
    {
        id: 'lost-sheep',
        title: 'The Lost Sheep',
        reference: 'Luke 15:3-7',
        gospels: ['Matthew', 'Luke'],
        theme: 'Grace',
        summary: 'A shepherd leaves ninety-nine sheep to find the one lost.',
        lesson: 'Heaven rejoices more over one sinner repenting than 99 righteous.'
    },
    {
        id: 'lost-coin',
        title: 'The Lost Coin',
        reference: 'Luke 15:8-10',
        gospels: ['Luke'],
        theme: 'Grace',
        summary: 'A woman searches diligently for one lost silver coin.',
        lesson: 'The value God places on finding the lost.'
    },
    {
        id: 'prodigal',
        title: 'The Prodigal Son',
        reference: 'Luke 15:11-32',
        gospels: ['Luke'],
        theme: 'Grace',
        summary: 'A wayward son returns home to a forgiving father; the older brother is jealous.',
        lesson: 'The Father\'s extravagant love for the lost and the danger of self-righteousness.'
    },
    {
        id: 'shrewd-manager',
        title: 'The Shrewd Manager',
        reference: 'Luke 16:1-13',
        gospels: ['Luke'],
        theme: 'Stewardship',
        summary: 'A manager uses his position to make friends before being fired.',
        lesson: 'Use worldly wealth to gain eternal friends (eternal rewards).'
    },
    {
        id: 'rich-lazarus',
        title: 'Rich Man and Lazarus',
        reference: 'Luke 16:19-31',
        gospels: ['Luke'],
        theme: 'Judgment',
        summary: 'A rich man ignores Lazarus; their roles are reversed in the afterlife.',
        lesson: 'Our eternal destiny is fixed at death; listen to Scripture now.'
    },
    {
        id: 'widow-judge',
        title: 'Persistent Widow',
        reference: 'Luke 18:1-8',
        gospels: ['Luke'],
        theme: 'Prayer',
        summary: 'An unjust judge grants justice due to a widow\'s nagging.',
        lesson: 'We should always pray and not give up.'
    },
    {
        id: 'pharisee-tax',
        title: 'Pharisee and Tax Collector',
        reference: 'Luke 18:9-14',
        gospels: ['Luke'],
        theme: 'Kingdom',
        summary: 'Two men pray; the humble sinner is justified, not the proud religious man.',
        lesson: 'Everyone who exalts himself will be humbled, and he who humbles himself will be exalted.'
    },
    {
        id: 'minas',
        title: 'The Ten Minas',
        reference: 'Luke 19:11-27',
        gospels: ['Luke'],
        theme: 'Stewardship',
        summary: 'Nobleman goes away to receive a kingdom, servants invest minas.',
        lesson: 'Faithfulness in potential intervening time before the Kingdom comes in fullness.'
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
        id: 'silence',
        title: 'Intertestamental Period',
        dates: '400 - 4 BC',
        description: 'The "Silent Years" where no new Scripture was given, but God prepared the world for the Messiah through political shifts.',
        majorFigures: ['Alexander the Great', 'Judas Maccabeus', 'Herod the Great'],
        books: ['Apocrypha (Historical Context)']
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
