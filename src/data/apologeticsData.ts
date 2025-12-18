
export interface ApologeticEntry {
    id: string;
    verse: string; // e.g., "John 1:1"
    referenceLink: string; // e.g., "/bible/read/John/1/1"
    misuse: string; // What they claim it says
    context: string; // What it actually says/context
    refutation: string; // How to explain the truth
}

export interface FaithCategory {
    id: string;
    name: string;
    description: string;
    entries: ApologeticEntry[];
}

export const APOLOGETICS_DATA: FaithCategory[] = [
    {
        id: "islam",
        name: "Islam",
        description: "Addressing Islamic claims about the Bible, Jesus, and Muhammad.",
        entries: [
            {
                id: "gen-21-12",
                verse: "Genesis 21:12",
                referenceLink: "/bible/read/Genesis/21/12",
                misuse: "Muslims claim Ishmael was the child of promise, not Isaac, and that the Bible was corrupted to change this.",
                context: "God explicitly chooses Isaac as the line of covenant blessing.",
                refutation: "God clearly says 'through Isaac shall your offspring be named'. The Quran actually validates the Bible (Sura 5:47, 10:94) and never claims the text is corrupted (tahrif), only the interpretation. History confirms the Isaac narrative predates Islam by 2000+ years."
            },
            {
                id: "deut-18-18",
                verse: "Deuteronomy 18:18",
                referenceLink: "/bible/read/Deuteronomy/18/18",
                misuse: "Muslims claim the 'Prophet like Moses' mentioned here is Muhammad, not Jesus, because Muhammad came with a law (Sharia) like Moses and was a warrior/leader.",
                context: "God promises to raise up a prophet 'from among their brothers' (Israelites) who will speak God's words.",
                refutation: "The text says 'from among their brothers' (Israelites). Muhammad was Ishmaelite/Arab, not Israelite. Acts 3:22 explicitly identifies Jesus as this prophet. Jesus matches Moses as a Mediator of a Covenant, Redeemer from slavery (sin), and knowing God face-to-face."
            },
            {
                id: "song-5-16",
                verse: "Song of Solomon 5:16",
                referenceLink: "/bible/read/Song%20of%20Solomon/5/16",
                misuse: "They argue the Hebrew word 'machamadim' (altogether lovely) is a prophecy of Muhammad by name.",
                context: "A description of the Bridegroom's loveliness in a romantic poem.",
                refutation: "The word is a plural adjective meaning 'desirable things' or 'loveliness', used often in the OT (e.g., Ezekiel 24:16 'desire of your eyes'). It is not a proper name. Contextually, it describes a husband, not a future prophet."
            },
            {
                id: "john-14-16",
                verse: "John 14:16",
                referenceLink: "/bible/read/John/14/16",
                misuse: "They argue the 'Comforter' (Parakletos) is a corruption of 'Periklytos' (Praised One), referring to Ahmad (Muhammad).",
                context: "Jesus promises the Holy Spirit who will abide with believers 'forever' and be 'in you'.",
                refutation: "No manuscript supports 'Periklytos'. Jesus identifies the Comforter as the 'Holy Spirit' (v.26) and says He 'dwells with you and will be in you' (v.17). Muhammad cannot dwell in believers nor be with them forever. Acts 1:5 confirms the Spirit came at Pentecost."
            },
            {
                id: "mark-10-18",
                verse: "Mark 10:18",
                referenceLink: "/bible/read/Mark/10/18",
                misuse: "Jesus says 'Why do you call me good? No one is good except God alone,' allegedly denying His divinity.",
                context: "Jesus is challenging the rich young ruler's understanding of 'goodness' to lead him to realize who Jesus actually is.",
                refutation: "Jesus is not denying He is good (He calls Himself the Good Shepherd in John 10:11). He is asking, 'Do you realize what you are saying?' If Jesus is good, and only God is good, then Jesus is God. He is forcing the man to acknowledge His deity."
            },
            {
                id: "john-20-17",
                verse: "John 20:17",
                referenceLink: "/bible/read/John/20/17",
                misuse: "Jesus says 'I am ascending to my Father and your Father, to my God and your God,' allegedly admitting He is merely a creature with a God.",
                context: "The Incarnate Son speaking in His role as the Second Adam and true human.",
                refutation: "As a man under the Law, Jesus correctly refers to the Father as God. But note the distinction: 'My Father and Your Father', not 'Our Father'. His relationship to the Father is unique and eternal by nature; ours is by adoption."
            },
            {
                id: "gal-1-8",
                verse: "Galatians 1:8",
                referenceLink: "/bible/read/Galatians/1/8",
                misuse: "N/A - This is a defensive verse for Christians against the claim of a new revelation (Quran) from an angel (Gabriel).",
                context: "Paul warning against any gospel other than what was already preached.",
                refutation: "Paul specifically warns that even if 'we or an angel from heaven' preaches a different gospel, let him be accursed. Islam believes an angel (Gabriel) brought a new gospel correcting the previous one. The Bible explicitly forewarned against this exact scenario."
            }
        ]
    },
    {
        id: "judaism",
        name: "Judaism",
        description: "Responding to Jewish objections regarding Jesus as Messiah.",
        entries: [
            {
                id: "gen-49-10",
                verse: "Genesis 49:10",
                referenceLink: "/bible/read/Genesis/49/10",
                misuse: "They argue the 'scepter' refers to tribal identity, not kingship, or that it never departed.",
                context: "Jacob prophesies the scepter (ruling authority) will not depart Judah *until* Shiloh (Messiah) comes.",
                refutation: "The Jewish Sanhedrin lost the right to pronounce capital punishment around 30 AD (removing the scepter of judgement). If Messiah didn't come before then, the prophecy failed. Jesus arrived exactly before the scepter departed and the Temple was destroyed."
            },
            {
                id: "isaiah-7-14",
                verse: "Isaiah 7:14",
                referenceLink: "/bible/read/Isaiah/7/14",
                misuse: "They argue the Hebrew word 'almah' means 'young woman', not 'virgin', so it's not a prophecy of a virgin birth.",
                context: "A sign given to Ahaz: a woman shall conceive and bear a son, Immanuel.",
                refutation: "While 'almah' can mean young woman, it is never used in the OT of a non-virgin. The Septuagint (Jewish translation ~200BC) translated it 'parthenos' (virgin). Matthew 1:23 confirms it refers to the virgin birth of Jesus."
            },
            {
                id: "isaiah-9-6",
                verse: "Isaiah 9:6",
                referenceLink: "/bible/read/Isaiah/9/6",
                misuse: "They argue 'Mighty God' refers to God calling the child, not the child being God, or translate it 'The Mighty God calls him...'.",
                context: "Prophecy of the child born onto us who will sit on David's throne.",
                refutation: "The word structure (Name shall be called X) aligns with the titles belonging to the child. 'El Gibbor' (Mighty God) is used in Isaiah 10:21 for YHWH Himself. It is impossible for a human king to be called 'Internal Father' or 'Mighty God' in a strict monotheistic context unless He is divine."
            },
            {
                id: "isaiah-53",
                verse: "Isaiah 53",
                referenceLink: "/bible/read/Isaiah/53/1",
                misuse: "They interpret the 'Suffering Servant' as the nation of Israel suffering for the Gentiles, not a personal Messiah.",
                context: "The passage describes a sinless figure who bears the sins of others ('for the transgression of my people').",
                refutation: "The Servant suffers 'for the transgression of my people' (v.8), distinguished from the people (Israel). Israel is consistently portrayed as sinful in Isaiah (Is 1:4), while the Servant is innocent (v.9). A sinful nation cannot atone for others. The text points to a substitutionary individual."
            },
            {
                id: "daniel-9-26",
                verse: "Daniel 9:26",
                referenceLink: "/bible/read/Daniel/9/26",
                misuse: "They reinterpret the 'weeks' to land on a different historical figure like Agrippa or Onias.",
                context: "Timeline for the 'Anointed One' (Messiah) to be cut off (killed) before the city and sanctuary (Temple) are destroyed.",
                refutation: "The Temple was destroyed in 70 AD. The Messiah had to appear and be killed *before* that event. Jesus is the only claimant who fits the timeline and the description of being 'cut off, but not for himself' (atonement)."
            },
            {
                id: "zech-12-10",
                verse: "Zechariah 12:10",
                referenceLink: "/bible/read/Zechariah/12/10",
                misuse: "They translate 'look on Me' as 'look to Me regarding him whom they pierced'.",
                context: "YHWH speaking about the House of David mourning.",
                refutation: "The Hebrew text says 'look on Me (YHWH) whom they pierced'. God Himself is the one pierced. This is a profound mystery of the Incarnation, fulfilled in John 19:37 at the cross."
            },
            {
                id: "micah-5-2",
                verse: "Micah 5:2",
                referenceLink: "/bible/read/Micah/5/2",
                misuse: "They claim it just refers to the clan of David's origin, not a birthplace of a specific Messiah.",
                context: "Prediction of the Ruler coming from Bethlehem Ephrathah.",
                refutation: "Jewish scribes in Matthew 2:5 understanding this as the exact birthplace of the Messiah. The text adds 'whose coming forth is from of old, from ancient days (eternity)', pointing to a pre-existent (Divine) ruler born in Bethlehem."
            }
        ]
    },
    {
        id: "mormonism",
        name: "Mormonism (LDS)",
        description: "Clarifying biblical truth vs. Latter-day Saint doctrine.",
        entries: [
            {
                id: "gen-1-26",
                verse: "Genesis 1:26",
                referenceLink: "/bible/read/Genesis/1/26",
                misuse: "They use 'Let us make man in our image' to argue for a plurality of Gods (polytheism/henotheism).",
                context: "God speaking within the Trinity or heavenly court.",
                refutation: "The following verse (1:27) uses the singular: 'God created man in HIS own image'. Deut 6:4 establishes God is One. 'Us' reflects the Trinity (Father, Son, Spirit) in unity, not a council of separate gods."
            },
            {
                id: "isaiah-43-10",
                verse: "Isaiah 43:10",
                referenceLink: "/bible/read/Isaiah/43/10",
                misuse: "Contradicts the LDS teaching of eternal progression (God was once a man, men can become gods).",
                context: "God declaring His uniqueness.",
                refutation: "'Before Me no god was formed, nor shall there be after Me.' This explicitly refutes the idea that God has a father-god or that we can become gods. God is the uncreated, eternal, sole Deity."
            },
            {
                id: "john-10-16",
                verse: "John 10:16",
                referenceLink: "/bible/read/John/10/16",
                misuse: "They claim the 'other sheep' refers to the Nephites in ancient America whom Jesus visited.",
                context: "Jesus speaks of Gentile believers fitting into one flock with the Jews.",
                refutation: "In context of the NT, the 'other sheep' are Gentiles (non-Jews) brought into the Church (Eph 2:11-22). Jesus said 'they will listen to my voice' through the preaching of the Apostles, not a secret visit to America."
            },
            {
                id: "john-4-24",
                verse: "John 4:24",
                referenceLink: "/bible/read/John/4/24",
                misuse: "LDS Doctrine & Covenants 130:22 says 'The Father has a body of flesh and bones'. Jesus says God is Spirit.",
                context: "Jesus teaching the Samaritan woman about true worship.",
                refutation: "Jesus states 'God is Spirit'. Spirit is by definition immaterial (Luke 24:39: 'a spirit does not have flesh and bones'). If the Father has a body, He is localized and not omnipresent, contradicting scripture."
            },
            {
                id: "1-cor-15-29",
                verse: "1 Corinthians 15:29",
                referenceLink: "/bible/read/1%20Corinthians/15/29",
                misuse: "Used to justify 'Baptism for the Dead' rituals in temples.",
                context: "Paul using an ad hominem argument: 'If dead aren't raised, why do *they* baptize?'",
                refutation: "Paul says 'why do *they* baptize', distinguishing the practice from 'we' (Christians). He doesn't condone it but uses the practice of a fringe group to prove they essentially believe in an afterlife."
            },
            {
                id: "gal-1-8",
                verse: "Galatians 1:8",
                referenceLink: "/bible/read/Galatians/1/8",
                misuse: "N/A - Direct refutation of the Moron angel story.",
                context: "Warning against different gospels delivered by angels.",
                refutation: "Paul warns: 'If we or an angel from heaven should preach to you a gospel contrary to the one we preached... let him be accursed.' Joseph Smith claimed an angel (Moroni) brought a restored gospel. This fits the warning perfectly."
            },
            {
                id: "james-1-5",
                verse: "James 1:5",
                referenceLink: "/bible/read/James/1/5",
                misuse: "Used to tell people to 'pray about the Book of Mormon' to get a 'burning in the bosom'.",
                context: "Promise of wisdom for trials.",
                refutation: "Promising wisdom for hurdles in life (Context v2-4) is not a command to pray to test objective truth. Truth is tested by Scripture (Acts 17:11). Feelings (burning in bosom) are unreliable (Jer 17:9 'The heart is deceitful')."
            },
            {
                id: "ezekiel-37-16",
                verse: "Ezekiel 37:16",
                referenceLink: "/bible/read/Ezekiel/37/16",
                misuse: "The 'Stick of Joseph' is claimed to be the Book of Mormon.",
                context: "Symbolic act of reuniting the Northern and Southern Kingdoms.",
                refutation: "Verse 22 explicitly interprets the sign: 'I will make them one nation'. It refers to people groups, not books. 'Stick' (etz) means wood/timber, never a scroll."
            }
        ]
    },
    {
        id: "jehovahs-witnesses",
        name: "Jehovah's Witnesses",
        description: "Defending the Deity of Christ, the Trinity, and the Resurrection.",
        entries: [
            {
                id: "john-1-1",
                verse: "John 1:1",
                referenceLink: "/bible/read/John/1/1",
                misuse: "NWT translates 'and the Word was [a] god', arguing Jesus is a created lesser god.",
                context: "Identifying the Word as eternal God.",
                refutation: "Standard Greek grammar allows definite nouns in the predicate without the article (Colwell's Rule). Also, if Jesus is 'a god', JWs fulfill the definition of polytheism. Isaiah 43:10 says there is no god besides YHWH."
            },
            {
                id: "john-8-58",
                verse: "John 8:58",
                referenceLink: "/bible/read/John/8/58",
                misuse: "NWT translates 'I have been', avoiding the divine name connection.",
                context: "Jesus claiming eternal pre-existence.",
                refutation: "The Jews picked up stones to kill Him (v59) because they understood He was claiming the Divine Name 'I AM' (Exodus 3:14). Grammatically 'Ego Eimi' is present tense 'I am', implying continuous eternal existence."
            },
            {
                id: "john-20-28",
                verse: "John 20:28",
                referenceLink: "/bible/read/John/20/28",
                misuse: "They claim Thomas was exclaiming 'My God!' in surprise, not addressing Jesus.",
                context: "Thomas seeing the risen Christ.",
                refutation: "Thomas said 'TO Him' (Jesus): 'My Lord and my God!'. Jesus accepts the title and blesses him. A Jewish man would never use God's name as an interjection of surprise, nor call a man God without blasphemy."
            },
            {
                id: "colossians-1-15",
                verse: "Colossians 1:15",
                referenceLink: "/bible/read/Colossians/1/15",
                misuse: "They claim 'firstborn of all creation' means Jesus was created first.",
                context: "Establishing Christ's supremacy.",
                refutation: "'Firstborn' (prototokos) implies rank/heirship. Psalm 89:27 calls David 'firstborn' though he was the youngest son. Col 1:16 says 'By Him ALL things were created'. He cannot create Himself."
            },
            {
                id: "colossians-2-9",
                verse: "Colossians 2:9",
                referenceLink: "/bible/read/Colossians/2/9",
                misuse: "They minimize 'fullness' to mean God's approval or qualities.",
                context: "Warning against false philosophy.",
                refutation: "'For in Him dwells all the fullness of the Deity (Theotetos - Godhead) in bodily form.' It states clearly that everything that makes God, God, dwells in Jesus bodily."
            },
            {
                id: "titus-2-13",
                verse: "Titus 2:13",
                referenceLink: "/bible/read/Titus/2/13",
                misuse: "They separate 'Great God' and 'Savior', making them two persons.",
                context: "Looking for the blessed hope.",
                refutation: "Granville Sharp's rule of Greek grammar: Article + Noun + 'and' + Noun (singular) refers to the same person. 'The Great God and Savior of us, Jesus Christ'. Jesus is both Great God and Savior."
            },
            {
                id: "heb-1-8",
                verse: "Hebrews 1:8",
                referenceLink: "/bible/read/Hebrews/1/8",
                misuse: "They translate 'God is your throne' instead of 'Your throne, O God'.",
                context: "God the Father speaking to the Son.",
                refutation: "The Father calls the Son 'God' (Ho Theos). 'Your throne, O God, is forever'. This mirrors Python 45:6. It establishes the Son's deity and eternal rule."
            },
            {
                id: "rev-3-14",
                verse: "Revelation 3:14",
                referenceLink: "/bible/read/Revelation/3/14",
                misuse: "Jesus called 'beginning of the creation', interpreted as first creation.",
                context: "Jesus identifying His authority.",
                refutation: "'Arche' means author, source, or ruler (like Arch-bishop). Jesus is the Origin/Source of creation, distinct from it."
            }
        ]
    },
    {
        id: "new-age",
        name: "New Age & Eastern Spirituality",
        description: "Addressing the 'Cosmic Christ' and pantheistic interpretations of Scripture.",
        entries: [
            {
                id: "luke-17-21",
                verse: "Luke 17:21",
                referenceLink: "/bible/read/Luke/17/21",
                misuse: "Quoted as 'The Kingdom of God is within you' to support pantheism or the idea that we all have a 'divine spark' inside.",
                context: "Jesus speaking to the Pharisees who rejected Him.",
                refutation: "Jesus was speaking to His enemies (Pharisees). The Kingdom wasn't inside their hearts! The Greek 'entos' here is best translated 'in your midst' (ESV/NASB). The King (Jesus) was standing right in front of them."
            },
            {
                id: "john-10-34",
                verse: "John 10:34",
                referenceLink: "/bible/read/John/10/34",
                misuse: "Quote: 'Ye are gods'. Used to claim humans are divine or evolving into godhood (common in Hinduism/New Age).",
                context: "Jesus quoting Psalm 82 to rebuke Jewish leaders.",
                refutation: "Jesus is quoting Psalm 82 where God mocks corrupt human judges by calling them 'gods' (elohim - mighty ones/rulers) before saying 'you shall die like men'. It's a judgment on their failure, not an affirmation of their divinity."
            },
            {
                id: "psalm-46-10",
                verse: "Psalm 46:10",
                referenceLink: "/bible/read/Psalms/46/10",
                misuse: "'Be still and know that I am God'. Used to promote emptying the mind or Eastern meditation techniques.",
                context: "A command to the warring nations to stop fighting Yahweh.",
                refutation: "The Hebrew 'raphah' (be still) means 'cease striving', 'drop your weapons', or 'let go'. It's a command to the enemies of God to stop resisting Him, not a command to breathe deeply. It's about surrender to God's sovereignty."
            }
        ]
    },
    {
        id: "atheism",
        name: "Atheism & Skepticism",
        description: "Answering common moral objections and alleged contradictions.",
        entries: [
            {
                id: "matt-7-1",
                verse: "Matthew 7:1",
                referenceLink: "/bible/read/Matthew/7/1",
                misuse: "'Judge not, that you be not judged.' Used to silence any moral criticism or claim Jesus was a relativist.",
                context: "Jesus warning against *hypocritical* judgment.",
                refutation: "Jesus isn't forbidding judgment; just 5 verses later (v6) He tells us to judge who are 'dogs' and 'swine'. In John 7:24 He commands: 'Do not judge by appearances, but judge with right judgment.' Check yourself first, then judge truth."
            },
            {
                id: "lev-19-19",
                verse: "Leviticus 19:19",
                referenceLink: "/bible/read/Leviticus/19/19",
                misuse: "'You catch Christians eating pork but wearing mixed fabrics? Hypocrites!' Used to claim the Bible is arbitrary/outdated.",
                context: "Civil and ceremonial laws for the Nation of Israel to set them apart.",
                refutation: "The Law had three parts: Moral (eternal), Civil (Israel's government), and Ceremonial (Temple/Purity). Christ fulfilled the Ceremonial law (Mark 7:19 declares all foods clean) and Civil law ended with the theocracy. The Moral law remains."
            },
            {
                id: "exodus-21-20",
                verse: "Exodus 21:20",
                referenceLink: "/bible/read/Exodus/21/20",
                misuse: "Claim: 'The Bible endorses chattel slavery and beating slaves.'",
                context: "Laws regulating and limiting an existing ancient Near East practice, pointing toward dignity.",
                refutation: "Biblical 'slavery' was often indentured servitude for debt. Exodus 21:16 makes 'man-stealing' (kidnapping for slavery) a capital offense punishable by death. This verse actually limits masters, punishing them if the servant dies—unheard of in surrounding pagan cultures."
            },
            {
                id: "1-tim-2-12",
                verse: "1 Timothy 2:12",
                referenceLink: "/bible/read/1%20Timothy/2/12",
                misuse: "'I do not permit a woman to teach.' Used to claim the Bible is misogynistic and hates women.",
                context: "Paul establishing order for the gathered church assembly.",
                refutation: "This is about the specific office of Elder/Overseer in the church. The Bible elevates women: they were the first witnesses of the Resurrection, Priscilla taught Apollos (Acts 18:26), and Phoebe was a deaconess/servant (Rom 16:1). Different roles do not equal unequal value."
            }
        ]
    }
];
