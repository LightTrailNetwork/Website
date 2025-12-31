
export type ExodusCategory = 'context' | 'journey';

export interface ExodusLocation {
    id: string;
    order?: number; // Optional now, mainly for 'journey' items
    category: ExodusCategory;
    title: string;
    description: string;
    narrative?: string; // Larger story context
    coordinates: {
        lat: number;
        lng: number;
    };
    bibleReferences: string[];
    significance: string;
    type: 'place' | 'event' | 'artifact';
}

export const EXODUS_LOCATIONS: ExodusLocation[] = [
    // --- CONTEXT: JOSEPH'S LEGACY ---
    {
        id: 'joseph-tomb',
        category: 'context',
        title: "Joseph's Tomb at Avaris",
        description: "Beneath the ruins of Avaris (Tell el-Dab’a), archaeologists unearthed a Syrian-style palace and a tomb of a Semitic ruler. The tomb contained a statue of a man with yellow skin (Asiatic), red hair, and a multicolor coat.",
        coordinates: { lat: 30.7874, lng: 31.8214 },
        bibleReferences: ["Genesis 50:25", "Exodus 13:19"],
        significance: "Confirmation of Hebrew presence and high status in Egypt before the enslavement.",
        type: 'place'
    },
    {
        id: 'church-avar',
        category: 'context',
        title: "Early Church at Avaris",
        description: "Located near the potential tomb of Joseph, evidence suggests a large Semitic population lived here, distinct from Egyptian culture.",
        coordinates: { lat: 30.483656918398303, lng: 30.64980877104782 },
        bibleReferences: [],
        significance: "Indicates a believing community in Egypt.",
        type: 'place'
    },
    {
        id: 'bahr-yussef',
        category: 'context',
        title: "Bahr Yussef (Waterway of Joseph)",
        description: "A canal connecting the Nile River to Fayyum. Local tradition attributes its construction to the biblical Joseph during his time as Vizier.",
        coordinates: { lat: 29.35789727029898, lng: 30.860956160668714 },
        bibleReferences: ["Genesis 41"],
        significance: "Links the biblical Joseph to major Egyptian infrastructure projects.",
        type: 'place'
    },

    // --- ACT I: THE ESCAPE ---
    {
        id: 'nuweiba-beach',
        category: 'journey',
        order: 1,
        title: "Nuweiba Beach (The Trap)",
        narrative: "After the ten plagues, Pharaoh finally relented. But as the Israelites fled south through the Sinai peninsula, Pharaoh changed his mind and pursued them. He trapped them against the sea at a massive beach called Nuweiba, 'shut in by the wilderness'.",
        description: "A large beach large enough to hold millions of people, shut in by mountains on the west and the sea on the east.",
        coordinates: { lat: 29.011316961477785, lng: 34.64216726993448 },
        bibleReferences: ["Exodus 14:1-4"],
        significance: "The geographical 'trap' described in Exodus.",
        type: 'event'
    },
    {
        id: 'crossing-depths',
        category: 'journey',
        order: 2,
        title: "The Red Sea Crossing",
        narrative: "Moses stretched out his hand, and the waters divided. Remarkably, underwater sonar reveals a gentle 'land bridge' here—a natural pathway significantly shallower than the deep trenches to the north and south, allowing a safe crossing for millions.",
        description: "Detailed bathymetry shows a gradual slope across the Gulf of Aqaba at this specific location.",
        coordinates: { lat: 29.003982758112038, lng: 34.66355757147585 },
        bibleReferences: ["Exodus 14:21-22"],
        significance: "Topographical feasibility for a crossing.",
        type: 'place'
    },

    // --- ACT II: THE MOUNTAIN OF GOD ---
    {
        id: 'mt-sinai',
        category: 'journey',
        order: 3,
        title: "Mt. Sinai (Jebel al-Lawz)",
        narrative: "Safe on the Arabian side (Midian), they journeyed to the Mountain of God. Here, the peak is blackened as if scorced by fire, preserving the memory of the day God descended in smoke and fire to give the Law.",
        description: "The mountain in Arabia (Galatians 4:25) with a distinctive blackened peak.",
        coordinates: { lat: 28.65461879094077, lng: 35.30441813860656 },
        bibleReferences: ["Exodus 19:18", "Galatians 4:25"],
        significance: "The true location of the giving of the Law.",
        type: 'place'
    },
    {
        id: 'golden-calf-altar',
        category: 'journey',
        order: 4,
        title: "Altar of the Golden Calf",
        narrative: "While Moses was on the mountain, the people grew restless. They built a golden calf to worship. Archaeologists have found a massive altar site nearby covered in petroglyphs of Egyptian-style bulls.",
        description: "A large rock formation with ancient petroglyphs of Apis bulls.",
        coordinates: { lat: 28.58147209009158, lng: 35.39611109795541 },
        bibleReferences: ["Exodus 32"],
        significance: "Physical evidence of the idolatry described in Exodus.",
        type: 'artifact'
    },
    {
        id: 'split-rock',
        category: 'journey',
        order: 5,
        title: "The Split Rock at Horeb",
        narrative: "Thirsty in the desert, the people complained. God told Moses to strike the rock. Today, a massive boulder split down the middle stands on a hill, with deep water erosion marks visible in an area that receives almost no rain.",
        description: "A massive boulder, split down the middle, sitting atop a rocky hill.",
        coordinates: { lat: 28.726739276090257, lng: 35.23615381747483 },
        bibleReferences: ["Exodus 17:6"],
        significance: "Match for the rock Moses struck to provide water.",
        type: 'place'
    },
    {
        id: 'cave-elijah',
        category: 'journey',
        order: 6,
        title: "Cave of Elijah",
        description: "A cave located on the mountain, referencing where Elijah stayed when he fled to Horeb centuries later.",
        coordinates: { lat: 28.648, lng: 35.302 },
        bibleReferences: ["1 Kings 19:8-9"],
        significance: "Connects the Exodus site to later biblical history.",
        type: 'place'
    },
    {
        id: 'twelve-pillars',
        category: 'journey',
        order: 7,
        title: "Twelve Stone Pillars",
        narrative: "To ratify the Covenant, Moses built an altar and set up twelve pillars. Marble pillar remnants have been found at the base of the mountain, corresponding to the twelve tribes.",
        description: "Remnants of white marble pillars found at the foot of the mountain.",
        coordinates: { lat: 28.650, lng: 35.310 },
        bibleReferences: ["Exodus 24:4"],
        significance: "Covenant ratification site.",
        type: 'artifact'
    },
    {
        id: 'graveyard',
        category: 'journey',
        order: 8,
        title: "Graveyard of the 3,000",
        description: "A large ancient cemetery near the Golden Calf altar site.",
        coordinates: { lat: 28.59, lng: 35.40 },
        bibleReferences: ["Exodus 32:28"],
        significance: "Burial site of those judged after the Golden Calf incident.",
        type: 'place'
    },
    {
        id: 'seventy-elders',
        category: 'journey',
        order: 9,
        title: "Plain of the 70 Elders",
        description: "A plateau on the mountain where Moses took the 70 elders to see God.",
        coordinates: { lat: 28.645, lng: 35.325 },
        bibleReferences: ["Exodus 24:9"],
        significance: "Site of the leaders' encounter with God.",
        type: 'place'
    },

    // --- ACT III: THE WILDERNESS & DETOUR ---
    {
        id: 'kadesh-barnea',
        category: 'journey',
        order: 10,
        title: "Kadesh Barnea",
        narrative: "After an 11-day journey north from Sinai, they arrived at the border of the Promised Land. But fear overtook them. Ten spies gave a bad report, and the people rebelled. As a result, God declared they would wander for 40 years until that generation passed away.",
        description: "The oasis area where the Israelites camped. Likely Tell el-Qudeirat.",
        coordinates: { lat: 30.647, lng: 34.422 },
        bibleReferences: ["Numbers 13:26", "Deuteronomy 1:19"],
        significance: "The turning point leading to 38 years of wandering.",
        type: 'place'
    },
    {
        id: 'ezion-geber',
        category: 'journey',
        order: 11,
        title: "Ezion-Geber (The Detour)",
        narrative: "When the 40 years were up, they tried to enter via the 'King's Highway' through Edom. The King of Edom refused and threatened war. God told them not to fight their distant relatives (descendants of Esau). So, they made a massive detour, turning SOUTH back to the Red Sea (Ezion-Geber/Eilat) to skirt around the mountains of Edom.",
        description: "The Israelites returned to the head of the Gulf of Aqaba before turning north again.",
        coordinates: { lat: 29.547, lng: 34.974 },
        bibleReferences: ["Deuteronomy 2:8", "Numbers 33:35"],
        significance: "The pivot point for the final approach.",
        type: 'place'
    },

    // --- ACT IV: THE PROMISE ---
    {
        id: 'mt-nebo',
        category: 'journey',
        order: 12,
        title: "Mt. Nebo",
        narrative: "After defeating the Kings of the Amorites on the east side of the Jordan, the journey for Moses ended here. He viewed the land he could not enter, and passed the mantle of leadership to Joshua.",
        description: "The mountain where Moses viewed the Promised Land before he died.",
        coordinates: { lat: 31.768, lng: 35.726 },
        bibleReferences: ["Deuteronomy 34:1"],
        significance: "The final stop for Moses.",
        type: 'place'
    },
    {
        id: 'jordan-crossing',
        category: 'journey',
        order: 13,
        title: "Jordan Crossing (Jericho)",
        narrative: "The long wait was over. The priests stepped into the Jordan River, and the waters stopped flowing. The nation crossed on dry ground, entering the land God had promised to Abraham centuries before.",
        description: "Entry point into the Promised Land opposite Jericho.",
        coordinates: { lat: 31.838, lng: 35.545 },
        bibleReferences: ["Joshua 3-4"],
        significance: "Entry point into the Promised Land.",
        type: 'event'
    }
];

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
