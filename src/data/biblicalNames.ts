
export interface NameEntry {
    name: string;
    hebrew: string;
    transliteration: string;
    meaning: string;
    firstMention: string;
    description: string;
    // For people
    role?: string;
    othersWithSameName?: string[];
}

export const GOD_NAMES: NameEntry[] = [
    {
        name: "God",
        hebrew: "אֱלֹהִים",
        transliteration: "Elohim",
        meaning: "Strong One, Powers",
        firstMention: "Genesis 1:1",
        description: "The Creator, Almighty and Strong. Plural form indicating majesty or the Trinity."
    },
    {
        name: "LORD",
        hebrew: "יהוה",
        transliteration: "Yahweh (YHWH)",
        meaning: "I AM, The Self-Existent One",
        firstMention: "Genesis 2:4",
        description: "The personal covenant name of God. God of relationship and promise."
    },
    {
        name: "Lord God",
        hebrew: "אֲדֹנָי יְהוִה",
        transliteration: "Adonai Yahweh",
        meaning: "Sovereign Lord",
        firstMention: "Genesis 15:2",
        description: "Emphasizes God's mastership and authority over His servants."
    },
    {
        name: "God Almighty",
        hebrew: "אֵל שַׁדַּי",
        transliteration: "El Shaddai",
        meaning: "God All-Sufficient / Breasted One (Nurturer)",
        firstMention: "Genesis 17:1",
        description: "God is the source of all blessing and power to fulfill His promises."
    },
    {
        name: "Most High God",
        hebrew: "אֵל עֶלְיוֹן",
        transliteration: "El Elyon",
        meaning: "The Highest God",
        firstMention: "Genesis 14:18",
        description: "Sovereign over all other gods and powers."
    },
    {
        name: "The LORD Will Provide",
        hebrew: "יְהוָה יִרְאֶה",
        transliteration: "Jehovah Jireh",
        meaning: "The LORD Will See (to it)",
        firstMention: "Genesis 22:14",
        description: "Revealed when God provided the ram for Abraham's sacrifice."
    },
    {
        name: "The LORD Is My Shepherd",
        hebrew: "יְהוָה רֹעִי",
        transliteration: "Jehovah Raah",
        meaning: "The LORD My Shepherd",
        firstMention: "Psalm 23:1",
        description: "The Lord guides, protects, and feeds His people."
    },
    {
        name: "The LORD Is My Banner",
        hebrew: "יְהוָה נִסִּי",
        transliteration: "Jehovah Nissi",
        meaning: "The LORD My Banner/Victory",
        firstMention: "Exodus 17:15",
        description: "God is our rallying point and victory in battle."
    },
    {
        name: "The LORD Is Peace",
        hebrew: "יְהוָה שָׁלוֹם",
        transliteration: "Jehovah Shalom",
        meaning: "The LORD is Peace",
        firstMention: "Judges 6:24",
        description: "God brings wholeness and peace to the troubled heart."
    }
];

export const PEOPLE_NAMES: NameEntry[] = [
    {
        name: "Adam",
        hebrew: "אָדָם",
        transliteration: "Adam",
        meaning: "Man, Earth/Red",
        firstMention: "Genesis 2:19",
        description: "The first man, formed from the dust of the ground (adamah).",
        role: "The First Man",
        othersWithSameName: ["None (generic term for mankind)"]
    },
    {
        name: "Eve",
        hebrew: "חַוָּה",
        transliteration: "Chavvah",
        meaning: "Life, Living",
        firstMention: "Genesis 3:20",
        description: "The mother of all the living.",
        role: "The First Woman",
        othersWithSameName: ["None"]
    },
    {
        name: "Noah",
        hebrew: "נֹחַ",
        transliteration: "Noach",
        meaning: "Rest, Comfort",
        firstMention: "Genesis 5:29",
        description: "He would bring relief from the painful toil on the ground.",
        role: "Builder of the Ark",
        othersWithSameName: ["None notable"]
    },
    {
        name: "Abraham",
        hebrew: "אַבְרָהָם",
        transliteration: "Avraham",
        meaning: "Father of a Multitude",
        firstMention: "Genesis 17:5",
        description: "Renamed from Abram (Exalted Father) to signify his destiny as father of nations.",
        role: "Patriarch of Israel",
        othersWithSameName: ["None"]
    },
    {
        name: "Sarah",
        hebrew: "שָׂרָה",
        transliteration: "Sarah",
        meaning: "Princess",
        firstMention: "Genesis 17:15",
        description: "Renamed from Sarai (My Princess) to signify she is a mother of nations.",
        role: "Matriarch of Israel",
        othersWithSameName: ["Serah (Asher's daughter)"]
    },
    {
        name: "Isaac",
        hebrew: "יִצְחָק",
        transliteration: "Yitzchak",
        meaning: "He Laughs",
        firstMention: "Genesis 17:19",
        description: "Named for the laughter of Abraham and Sarah at the promise of a son in old age.",
        role: "Son of Promise",
        othersWithSameName: ["None"]
    },
    {
        name: "Jacob",
        hebrew: "יַעֲקֹב",
        transliteration: "Yaakov",
        meaning: "Supplanter, Heel-Grabber",
        firstMention: "Genesis 25:26",
        description: "Born holding Esau's heel; later grew to struggle with men and God.",
        role: "Father of 12 Tribes",
        othersWithSameName: ["None in OT (James in NT is Iakobos/Yaakov)"]
    },
    {
        name: "Israel",
        hebrew: "יִשְׂרָאֵל",
        transliteration: "Yisrael",
        meaning: "Struggles with God",
        firstMention: "Genesis 32:28",
        description: "Jacob's new name after wrestling with the Angel of the Lord.",
        role: "Nation's Namesake",
        othersWithSameName: ["The Nation itself"]
    },
    {
        name: "Moses",
        hebrew: "מֹשֶׁה",
        transliteration: "Moshe",
        meaning: "Drawn Out",
        firstMention: "Exodus 2:10",
        description: "Drawn out of the water by Pharaoh's daughter.",
        role: "Deliverer & Lawgiver",
        othersWithSameName: ["None"]
    },
    {
        name: "Joshua",
        hebrew: "יְהוֹשֻׁעַ",
        transliteration: "Yehoshua",
        meaning: "The LORD is Salvation",
        firstMention: "Exodus 17:9",
        description: "Originally Hoshea (Salvation), renamed by Moses. The Hebrew form of Jesus.",
        role: "Conqueror of Canaan",
        othersWithSameName: ["High Priest in Zechariah", "Jesus (Yeshua)"]
    },
    {
        name: "David",
        hebrew: "דָּוִד",
        transliteration: "David",
        meaning: "Beloved",
        firstMention: "1 Samuel 16:13",
        description: "The man after God's own heart.",
        role: "King of Israel",
        othersWithSameName: ["None"]
    },
    {
        name: "Jesus",
        hebrew: "יֵשׁוּעַ",
        transliteration: "Yeshua",
        meaning: "The LORD is Salvation",
        firstMention: "Matthew 1:1",
        description: "The Savior of the world who saves His people from their sins.",
        role: "Messiah & Son of God",
        othersWithSameName: ["Joshua (OT)", "Justus (Col 4:11)"]
    },
    {
        name: "Peter",
        hebrew: "כֵּיפָא (Aramaic)",
        transliteration: "Cephas / Petros",
        meaning: "Rock / Stone",
        firstMention: "Matthew 4:18",
        description: "Simon was renamed by Jesus to signify the rock-like faith he would eventually have.",
        role: "Apostle to the Jews",
        othersWithSameName: ["None"]
    },
    {
        name: "Paul",
        hebrew: "שָׁאוּל (Saul)",
        transliteration: "Paulos (Latin/Greek)",
        meaning: "Small / Humble",
        firstMention: "Acts 13:9",
        description: "Saul (Requested One) became Paul (Small) as he became the apostle to the Gentiles.",
        role: "Apostle to the Gentiles",
        othersWithSameName: ["Sergius Paulus"]
    }
];
