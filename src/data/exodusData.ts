
export interface ExodusLocation {
    id: string;
    order: number;
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
        order: 1,
        title: "Joseph's Tomb at Avaris",
        description: "In the ancient soil of Goshen, beneath the ruins of Avaris (Tell el-Dab’a), archaeologists unearthed a Syrian-style palace and a tomb of a Semitic ruler. The tomb contained a statue of a man with yellow skin (Asiatic), red hair, and a multicolor coat.",
        coordinates: { lat: 30.7874, lng: 31.8214 }, // Approximate for Tell el-Dab'a (Avaris)
        bibleReferences: ["Genesis 50:25", "Exodus 13:19"],
        significance: "Confirmation of Hebrew presence and high status in Egypt before the enslavement.",
        type: 'place'
    },
    {
        id: 'church-avar',
        order: 2,
        title: "Early Church at Avaris",
        description: "Located near the potential tomb of Joseph. Evidence suggests a large Semitic population lived here worshipping differently than the Egyptians.",
        coordinates: { lat: 30.483656918398303, lng: 30.64980877104782 },
        bibleReferences: [],
        significance: "Indicates a believing community in Egypt.",
        type: 'place'
    },
    {
        id: 'bahr-yussef',
        order: 3,
        title: "Bahr Yussef (The Waterway of Joseph)",
        description: "A canal that connects the Nile River to Fayyum. Local tradition and its name attribute its construction to the biblical Joseph during his time as Vizier.",
        coordinates: { lat: 29.35789727029898, lng: 30.860956160668714 },
        bibleReferences: ["Genesis 41"],
        significance: "Links the biblical Joseph to major Egyptian infrastructure projects.",
        type: 'place'
    },
    {
        id: 'nuweiba-beach',
        order: 4,
        title: "Nuweiba Beach (Red Sea Crossing)",
        description: "A massive beach large enough to hold millions of people, shut in by mountains on the west and the sea on the east.",
        coordinates: { lat: 29.011316961477785, lng: 34.64216726993448 },
        bibleReferences: ["Exodus 14"],
        significance: "The likely point where Israel was 'trapped' before the sea parted.",
        type: 'event'
    },
    {
        id: 'crossing-depths',
        order: 5,
        title: "Underwater Land Bridge",
        description: "Sonar soundings show a gentle underwater land bridge at Nuweiba extending across the Gulf of Aqaba, significantly shallower than the surrounding trenches.",
        coordinates: { lat: 29.003982758112038, lng: 34.66355757147585 },
        bibleReferences: ["Exodus 14:21-22"],
        significance: "Topographical feasibility for a crossing.",
        type: 'place'
    },
    {
        id: 'mt-sinai',
        order: 6,
        title: "Mt. Sinai (Jebel al-Lawz)",
        description: "The mountain in Arabia with a blackened peak. The site of the giving of the Law.",
        coordinates: { lat: 28.65461879094077, lng: 35.30441813860656 },
        bibleReferences: ["Exodus 19:18", "Galatians 4:25"],
        significance: "The true location of the giving of the Law.",
        type: 'place'
    },
    {
        id: 'golden-calf-altar',
        order: 7,
        title: "Altar of the Golden Calf",
        description: "A large rock formation with ancient petroglyphs of Egyptian-style bulls (Apis bulls) within view of the mountain peak.",
        coordinates: { lat: 28.58147209009158, lng: 35.39611109795541 },
        bibleReferences: ["Exodus 32"],
        significance: "Physical evidence of the idolatry described in Exodus.",
        type: 'artifact'
    },
    {
        id: 'split-rock',
        order: 8,
        title: "The Split Rock at Horeb",
        description: "A massive boulder, split down the middle, sitting atop a rocky hill with prominent water erosion marks.",
        coordinates: { lat: 28.726739276090257, lng: 35.23615381747483 },
        bibleReferences: ["Exodus 17:6"],
        significance: "Match for the rock Moses struck to provide water.",
        type: 'place'
    },
    {
        id: 'cave-elijah',
        order: 9,
        title: "Cave of Elijah",
        description: "A cave located on the mountain, referencing where Elijah stayed when he fled to Horeb.",
        coordinates: { lat: 28.648, lng: 35.302 },
        bibleReferences: ["1 Kings 19:8-9"],
        significance: "Connects the Exodus site to later biblical history.",
        type: 'place'
    },
    {
        id: 'twelve-pillars',
        order: 10,
        title: "Twelve Stone Pillars",
        description: "Remnants of pillars corresponding to the twelve tribes of Israel at the foot of the mountain.",
        coordinates: { lat: 28.650, lng: 35.310 },
        bibleReferences: ["Exodus 24:4"],
        significance: "Covenant ratification site.",
        type: 'artifact'
    },
    {
        id: 'graveyard',
        order: 11,
        title: "Graveyard of the 3,000",
        description: "A large ancient cemetery near the Golden Calf altar site with standing stones.",
        coordinates: { lat: 28.59, lng: 35.40 },
        bibleReferences: ["Exodus 32:28"],
        significance: "Burial site of those judged after the Golden Calf incident.",
        type: 'place'
    },
    {
        id: 'seventy-elders',
        order: 12,
        title: "Plain of the 70 Elders",
        description: "A plateau on the mountain where Moses took the 70 elders to see God.",
        coordinates: { lat: 28.645, lng: 35.325 },
        bibleReferences: ["Exodus 24:9"],
        significance: "Site of the leaders' encounter with God.",
        type: 'place'
    },
    {
        id: 'kadesh-barnea',
        order: 13,
        title: "Kadesh Barnea (1st Visit)",
        description: "The oasis area where the Israelites camped. From here, spies were sent out, and the people rebelled.",
        coordinates: { lat: 30.647, lng: 34.422 },
        bibleReferences: ["Numbers 13:26", "Deuteronomy 1:19"],
        significance: "The turning point leading to 38 years of wandering.",
        type: 'place'
    },
    {
        id: 'ezion-geber',
        order: 14,
        title: "Ezion-Geber (Wandering)",
        description: "After being turned back from Kadesh, the Israelites wandered south back to the Red Sea (Gulf of Aqaba) before skirting around Edom.",
        coordinates: { lat: 29.547, lng: 34.974 }, // Near Eilat/Aqaba
        bibleReferences: ["Deuteronomy 2:8", "Numbers 33:35"],
        significance: "The pivot point for the final approach to the Promised Land.",
        type: 'place'
    },
    {
        id: 'mt-nebo',
        order: 15,
        title: "Mt. Nebo",
        description: "After 40 years, Moses views the land from here and dies.",
        coordinates: { lat: 31.768, lng: 35.726 },
        bibleReferences: ["Deuteronomy 34:1"],
        significance: "The final stop for Moses.",
        type: 'place'
    },
    {
        id: 'jordan-crossing',
        order: 16,
        title: "Jordan Crossing (Jericho)",
        description: "Israel crosses into the land on dry ground.",
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
    // South through Sinai Peninsula 
    [30.0, 33.0],
    [29.5, 34.0],
    // Nuweiba Beach
    [29.011317, 34.642167],
    // Across Red Sea
    [29.0, 34.8],
    // Into Arabia (Midian)
    [28.9, 35.0],
    // To Mt Sinai area
    [28.7, 35.2],
    [28.6546, 35.3044],
    // North to Kadesh Barnea (The 11 Days Journey)
    [29.5, 35.1],
    [30.647, 34.422], // Kadesh
    // The Wandering Loop (Back South)
    [30.0, 34.7], // Trending SE back towards Rift Valley
    [29.547, 34.974], // Ezion Geber (Eilat)
    // The Final Approach (Around Edom/Moab)
    [29.8, 35.3],
    [30.5, 35.6], // King's Highway Area
    [31.0, 35.7],
    [31.768, 35.726], // Mt Nebo
    // Down to Jordan Crossing
    [31.800, 35.600],
    [31.838, 35.545]  // Jericho
];
