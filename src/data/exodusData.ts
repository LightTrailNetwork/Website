
export interface ExodusLocation {
    id: string;
    title: string;
    description: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    bibleReferences: string[];
    significance: string;
    imageUrl?: string;
    type: 'place' | 'event' | 'artifact';
}

export const EXODUS_LOCATIONS: ExodusLocation[] = [
    {
        id: 'joseph-tomb',
        title: "Joseph's Tomb at Avaris",
        description: "In the ancient soil of Goshen, beneath the ruins of Avaris (Tell el-Dab’a), archaeologists unearthed a Syrian-style palace and a tomb of a Semitic ruler. The tomb contained a statue of a man with yellow skin (Asiatic), red hair, and a multicolor coat involving throw-stick (ruler's staff). The tomb was found empty of bones, consistent with the biblical account that Moses took Joseph's bones.",
        coordinates: { lat: 30.7874, lng: 31.8214 }, // Approximate for Tell el-Dab'a (Avaris)
        bibleReferences: ["Genesis 50:25", "Exodus 13:19"],
        significance: "Confirmation of Hebrew presence and high status in Egypt before the enslavement.",
        type: 'place'
    },
    {
        id: 'church-avar',
        title: "Early Church at Avaris",
        description: "Located near the potential tomb of Joseph. Evidence suggests a large Semitic population lived here.",
        coordinates: { lat: 30.483656918398303, lng: 30.64980877104782 }, // User provided coords
        bibleReferences: [],
        significance: "Indicates a believing community in Egypt.",
        type: 'place'
    },
    {
        id: 'bahr-yussef',
        title: "Bahr Yussef (The Waterway of Joseph)",
        description: "A canal that connects the Nile River to Fayyum. Its name means 'The Waterway of Joseph'. Local tradition and its name attribute its construction to the biblical Joseph during his time as Vizier of Egypt to manage the water/famine.",
        coordinates: { lat: 29.35789727029898, lng: 30.860956160668714 },
        bibleReferences: ["Genesis 41"],
        significance: "Links the biblical Joseph to major Egyptian infrastructure projects.",
        type: 'place'
    },
    {
        id: 'nuweiba-beach',
        title: "Nuweiba Beach (Red Sea Crossing)",
        description: "A massive beach large enough to hold millions of people, shut in by mountains on the west and the sea on the east. The 'Wadi Watir' leads directly to this beach.",
        coordinates: { lat: 29.011316961477785, lng: 34.64216726993448 },
        bibleReferences: ["Exodus 14"],
        significance: "The likely point where Israel was 'trapped' before the sea parted.",
        type: 'event'
    },
    {
        id: 'crossing-depths',
        title: "Underwater Land Bridge",
        description: "Google Earth and sonar soundings show a gentle underwater land bridge at Nuweiba extending across the Gulf of Aqaba to Saudi Arabia. It is significantly shallower than the deep trenches to the north and south.",
        coordinates: { lat: 29.003982758112038, lng: 34.66355757147585 },
        bibleReferences: ["Exodus 14:21-22"],
        significance: "Topographical feasibility for a crossing.",
        type: 'place'
    },
    {
        id: 'mt-sinai',
        title: "Mt. Sinai (Jebel al-Lawz)",
        description: "The mountain in Arabia (Galatians 4:25) with a blackened peak, as if burned by fire. Traditionally known as Jebel al-Lawz.",
        coordinates: { lat: 28.65461879094077, lng: 35.30441813860656 },
        bibleReferences: ["Exodus 19:18", "Galatians 4:25"],
        significance: "The true location of the giving of the Law.",
        type: 'place'
    },
    {
        id: 'golden-calf-altar',
        title: "Altar of the Golden Calf",
        description: "A large rock formation with ancient petroglyphs of Egyptian-style bulls (Apis bulls). Evidence of a massive altar site. Located within view of the mountain peak.",
        coordinates: { lat: 28.58147209009158, lng: 35.39611109795541 },
        bibleReferences: ["Exodus 32"],
        significance: "Physical evidence of the idolatry described in Exodus.",
        type: 'artifact'
    },
    {
        id: 'split-rock',
        title: "The Split Rock at Horeb",
        description: "A massive boulder, split down the middle, sitting atop a rocky hill. Water erosion marks are visible coming from the split, despite being in an arid desert.",
        coordinates: { lat: 28.726739276090257, lng: 35.23615381747483 },
        bibleReferences: ["Exodus 17:6"],
        significance: "Match for the rock Moses struck to provide water.",
        type: 'place'
    },
    {
        id: 'cave-elijah',
        title: "Cave of Elijah",
        description: "A cave located on the mountain, referencing where Elijah stayed when he fled to Horeb.",
        // Approximating based on "somewhere on Jebel al-Lawz"
        coordinates: { lat: 28.65, lng: 35.31 },
        bibleReferences: ["1 Kings 19:8-9"],
        significance: "Connects the Exodus site to later biblical history.",
        type: 'place'
    },
    {
        id: 'twelve-pillars',
        title: "Twelve Stone Pillars",
        description: "Remnants of white marble pillars found at the foot of the mountain, corresponding to the twelve tribes of Israel.",
        coordinates: { lat: 28.66, lng: 35.31 }, // Approximate near mountain base
        bibleReferences: ["Exodus 24:4"],
        significance: "Covenant ratification site.",
        type: 'artifact'
    },
    {
        id: 'graveyard',
        title: "Graveyard of the 3,000",
        description: "A large ancient cemetery near the Golden Calf altar site. Contains standing stones, a practice not used by Muslims later in history.",
        coordinates: { lat: 28.59, lng: 35.40 }, // Approximate near calf altar
        bibleReferences: ["Exodus 32:28"],
        significance: "Burial site of those judged after the Golden Calf incident.",
        type: 'place'
    },
    {
        id: 'seventy-elders',
        title: "Plain of the 70 Elders",
        description: "A plateau or plain on the mountain where Moses took the 70 elders to see God.",
        coordinates: { lat: 28.64, lng: 35.32 }, // Approximate on mtn
        bibleReferences: ["Exodus 24:9"],
        significance: "Site of the leaders' encounter with God.",
        type: 'place'
    },
    {
        id: 'kadesh-barnea',
        title: "Kadesh Barnea",
        description: "The oasis area where the Israelites camped for most of their 38 years of wandering after the spies returned with a negative report. Likely Tell el-Qudeirat.",
        coordinates: { lat: 30.647, lng: 34.422 },
        bibleReferences: ["Numbers 13:26", "Deuteronomy 1:46"],
        significance: "Base camp for the wilderness wanderings.",
        type: 'place'
    },
    {
        id: 'mt-nebo',
        title: "Mt. Nebo",
        description: "The mountain where Moses viewed the Promised Land before he died. Located in modern day Jordan (Moab).",
        coordinates: { lat: 31.768, lng: 35.726 },
        bibleReferences: ["Deuteronomy 34:1"],
        significance: "The final stop for Moses.",
        type: 'place'
    },
    {
        id: 'jordan-crossing',
        title: "Jordan Crossing (Jericho)",
        description: "The site where the waters of the Jordan were stopped, allowing the Israelites to cross into the Promised Land on dry ground, opposite Jericho (Gilgal).",
        coordinates: { lat: 31.838, lng: 35.545 },
        bibleReferences: ["Joshua 3-4"],
        significance: "Entry point into the Promised Land.",
        type: 'event'
    }
];

// Simplified path coordinates for the route
export const EXODUS_ROUTE: [number, number][] = [
    // Goshen area start
    [30.7874, 31.8214],
    // South through Sinai Peninsula wilderness (Wadi Watir area approx path)
    [30.0, 33.0],
    [29.5, 34.0],
    // Nuweiba
    [29.011317, 34.642167],
    // Across Red Sea
    [29.0, 34.8],
    // Saudi Side
    [28.9, 35.0],
    // To Mt Sinai area
    [28.7, 35.2],
    [28.6546, 35.3044],
    // North to Kadesh Barnea (simplified wandering)
    [29.5, 35.0],
    [30.0, 34.8],
    [30.647, 34.422], // Kadesh
    // East and North around Edom/Moab (simplified King's Highway)
    [30.5, 35.5],
    [31.0, 35.7],
    [31.5, 35.8],
    [31.768, 35.726], // Mt Nebo
    // Down to Jordan Crossing
    [31.800, 35.600],
    [31.838, 35.545]  // Jericho crossing
];
