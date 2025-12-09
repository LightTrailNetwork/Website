
export interface MnemonicItem {
    letter?: string; // For acrostics
    title: string;
    reference?: string;
    text?: string; // The verse text or main content
    meaning?: string; // For things like "Meaning" or "Lesson"
    subItems?: { label: string; text: string }[]; // For Prophecy/Fulfillment pairs
}

export interface MnemonicSystem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    mnemonicPhrase?: string; // e.g. "FiVe KiSS GloBAL"
    items: MnemonicItem[];
    translationNote?: string;
}

export const MNEMONIC_SYSTEMS: MnemonicSystem[] = [
    {
        id: "armor-of-god",
        title: "The 7 Armors of God",
        subtitle: "Ephesians 6",
        description: "The full armor of God for spiritual warfare.",
        mnemonicPhrase: "Boat Builder. Ship Staff. Helps Sailors Prayers.",
        items: [
            { title: "Belt of Truth", reference: "Ephesians 6:14a", text: "Stand firm with the belt of truth buckled around your waist.", letter: "B" },
            { title: "Breastplate of Righteousness", reference: "Ephesians 6:14b", text: "With the breastplate of righteousness in place.", letter: "B" },
            { title: "Shoes of Peace", reference: "Ephesians 6:15", text: "With your feet fitted with readiness from the gospel of peace.", letter: "S" },
            { title: "Shield of Faith", reference: "Ephesians 6:16", text: "Take up the shield of faith… to extinguish all the flaming arrows of the evil one.", letter: "S" },
            { title: "Helmet of Salvation", reference: "Ephesians 6:17a", text: "Take the helmet of salvation.", letter: "H" },
            { title: "Sword of the Spirit", reference: "Ephesians 6:17b", text: "And the sword of the Spirit, which is the word of God.", letter: "S" },
            { title: "Prayer in the Spirit", reference: "Ephesians 6:18", text: "And pray in the Spirit on all occasions with all kinds of prayers and requests.", letter: "P" }
        ]
    },
    {
        id: "wisdom-james",
        title: "8 Characteristics of Wisdom",
        subtitle: "James 3:17",
        description: "The divine attributes of wisdom from above.",
        mnemonicPhrase: "PeoPle GO FOaM GOlF? IMPoSIbble.",
        translationNote: "ESV",
        items: [
            { letter: "P", title: "Pure", text: "But the wisdom from above is first pure," },
            { letter: "P", title: "Peaceable", text: "then peaceable," },
            { letter: "G", title: "Gentle", text: "gentle," },
            { letter: "O", title: "Open to reason", text: "open to reason," },
            { letter: "F", title: "Full of mercy", text: "full of mercy" },
            { letter: "G", title: "Good fruits", text: "and good fruits," },
            { letter: "I", title: "Impartial", text: "impartial" },
            { letter: "S", title: "Sincere", text: "and sincere." }
        ]
    },
    {
        id: "peter-ladder",
        title: "Peter's Spiritual Ladder",
        subtitle: "2 Peter 1:5-7",
        description: "The 8 rungs of spiritual growth.",
        mnemonicPhrase: "FiVe KiSS GloBAL",
        translationNote: "ESV",
        items: [
            { letter: "F", title: "Faith", text: "Supplement your faith" },
            { letter: "V", title: "Virtue", text: "with virtue," },
            { letter: "K", title: "Knowledge", text: "and virtue with knowledge," },
            { letter: "S", title: "Self-control", text: "and knowledge with self-control," },
            { letter: "S", title: "Steadfastness", text: "and self-control with steadfastness," },
            { letter: "G", title: "Godliness", text: "and steadfastness with godliness," },
            { letter: "B", title: "Brotherly affection", text: "and godliness with brotherly affection," },
            { letter: "L", title: "Love", text: "and brotherly affection with love." }
        ]
    },
    {
        id: "romans-road",
        title: "The Romans Road",
        subtitle: "Romans",
        description: "The path of salvation through the book of Romans.",
        mnemonicPhrase: "R.O.M.A.N.S. R.O.A.D.",
        items: [
            { letter: "R", title: "Rebellion of all", reference: "Romans 3:23", text: "For all have sinned and fall short of the glory of God.", meaning: "Every human being is guilty before God." },
            { letter: "O", title: "Outcome of sin", reference: "Romans 6:23a", text: "For the wages of sin is death…", meaning: "Sin earns separation and death." },
            { letter: "M", title: "Mercy of God", reference: "Romans 5:8", text: "But God shows his love for us in that while we were still sinners, Christ died for us.", meaning: "God’s love intervenes despite our rebellion." },
            { letter: "A", title: "Acceptance by faith", reference: "Romans 10:9–10", text: "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.", meaning: "Faith and confession open the door to salvation." },
            { letter: "N", title: "New life given", reference: "Romans 6:23b", text: "…but the free gift of God is eternal life in Christ Jesus our Lord.", meaning: "The gift replaces the wage—life for death." },
            { letter: "S", title: "Sacrificial living", reference: "Romans 12:1–2", text: "I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice...", meaning: "Saved people live transformed lives of worship and obedience." },
            { letter: "R", title: "Respond by calling", reference: "Romans 10:13", text: "Everyone who calls on the name of the Lord will be saved.", meaning: "Anyone can call and be rescued." },
            { letter: "O", title: "Outcome is peace", reference: "Romans 5:1", text: "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ.", meaning: "Justification leads to reconciliation." },
            { letter: "A", title: "Assurance in grace", reference: "Romans 8:1", text: "There is therefore now no condemnation for those who are in Christ Jesus.", meaning: "No more guilt; complete security." },
            { letter: "D", title: "Destination: glory", reference: "Romans 8:38–39", text: "For I am sure that neither death nor life... will be able to separate us from the love of God...", meaning: "Eternal love and union with God forever." }
        ]
    },
    {
        id: "separation-romans",
        title: "10 Things That Cannot Separate",
        subtitle: "Romans 8:38-39",
        description: "Nothing can separate us from the love of God.",
        mnemonicPhrase: "D.L. ARTT PHD, Anything Else?",
        items: [
            { letter: "D", title: "Death" },
            { letter: "L", title: "Life" },
            { letter: "A", title: "Angels" },
            { letter: "R", title: "Rulers" },
            { letter: "T", title: "Things present" },
            { letter: "T", title: "Things to come" },
            { letter: "P", title: "Powers" },
            { letter: "H", title: "Height" },
            { letter: "D", title: "Depth" },
            { letter: "A", title: "Anything else in all Creation" }
        ]
    },
    {
        id: "ten-commandments",
        title: "The 10 Commandments",
        subtitle: "Exodus 20",
        description: "God's moral law for His people.",
        mnemonicPhrase: "FINiSH MAd SLiCk",
        items: [
            { title: "Put God First" },
            { title: "No Idols" },
            { title: "Respect God's Name" },
            { title: "Keep Sabbath Holy" },
            { title: "Honor Father and Mother" },
            { title: "No Murder" },
            { title: "No Adultery" },
            { title: "No Stealing" },
            { title: "No Lying" },
            { title: "No Coveting" }
        ]
    },
    {
        id: "prophecies-jesus",
        title: "10 Prophecies Fulfilled",
        subtitle: "THE MESSIAH",
        description: "Major OT prophecies fulfilled in Jesus.",
        mnemonicPhrase: "THE MESSIAH",
        items: [
            {
                letter: "T", title: "Tribe & Temple",
                subItems: [
                    { label: "Tribe", text: "Descendant of Abraham, Judah, David (Gen 22:18, Matt 1:1)." },
                    { label: "Temple", text: "Lord comes to His temple; Zeal for God's house (Mal 3:1, John 2:17)." }
                ]
            },
            {
                letter: "H", title: "Humble & Harmless",
                subItems: [
                    { label: "Humble", text: "Riding on a donkey (Zech 9:9, Matt 21:5)." },
                    { label: "Harmless", text: "No violence, no deceit (Isa 53:9, 1 Pet 2:22)." }
                ]
            },
            {
                letter: "E", title: "Elijah & Eternal",
                subItems: [
                    { label: "Elijah", text: "Forerunner in spirit of Elijah (Mal 4:5, Matt 11:14)." },
                    { label: "Eternal", text: "Goings forth from eternity (Mic 5:2, John 8:58)." }
                ]
            },
            {
                letter: "M", title: "Mary & Mission",
                subItems: [
                    { label: "Mary", text: "Born of a virgin (Isa 7:14, Luke 1:35)." },
                    { label: "Mission", text: "Prophet like Moses; Preach good news (Deut 18:15, Isa 61:1)." }
                ]
            },
            {
                letter: "E", title: "Entry & Exit",
                subItems: [
                    { label: "Entry", text: "Born in Bethlehem; Entry to Jerusalem (Mic 5:2, Zech 9:9)." },
                    { label: "Exit", text: "Out of Egypt called my son (Hos 11:1, Matt 2:15)." }
                ]
            },
            {
                letter: "S", title: "Suffering & Sacrifice",
                subItems: [
                    { label: "Suffering", text: "Despised, rejected, crushed (Isa 53)." },
                    { label: "Sacrifice", text: "Pierced for our transgressions (Zech 12:10)." }
                ]
            },
            {
                letter: "S", title: "Second Covenant & Second Coming",
                subItems: [
                    { label: "2nd Covenant", text: "New covenant in blood (Jer 31:31, Luke 22:20)." },
                    { label: "2nd Coming", text: "Son of Man on clouds (Dan 7:13, Matt 24:30)." }
                ]
            },
            {
                letter: "I", title: "Innocent & Israel",
                subItems: [
                    { label: "Innocent", text: "No fault found in Him (Isa 53:9, Luke 23:4)." },
                    { label: "Israel", text: "Sent to lost sheep of Israel first (Isa 49:5, Matt 15:24)." }
                ]
            },
            {
                letter: "A", title: "Arisen & Ascended",
                subItems: [
                    { label: "Arisen", text: "Not abandon soul to Sheol (Psalm 16:10, Acts 2:31)." },
                    { label: "Ascended", text: "Ascended on high (Psalm 68:18, Acts 1:9)." }
                ]
            },
            {
                letter: "H", title: "Healer & Hope",
                subItems: [
                    { label: "Healer", text: "Blind see, lame walk (Isa 35:5, Matt 11:5)." },
                    { label: "Hope", text: "Light to the Gentiles (Isa 42:6, Acts 13:47)." }
                ]
            }
        ]
    },
    {
        id: "end-times",
        title: "11 Signs of End Times",
        subtitle: "THE END TIMES",
        description: "Major prophetic events of the last days.",
        mnemonicPhrase: "THE END TIMES",
        items: [
            { letter: "T", title: "Treachery", text: "Spiritual deception and falling away from truth.", reference: "Matt 24:4" },
            { letter: "H", title: "Hatred", text: "Growing lawlessness and persecution.", reference: "Matt 24:9" },
            { letter: "E", title: "Escalation", text: "Wars, chaos, famines, earthquakes.", reference: "Matt 24:6" },
            { letter: "E", title: "Exaltation", text: "Antichrist demanding worship.", reference: "2 Thess 2:3" },
            { letter: "N", title: "Nations", text: "Nations uniting against the Lord.", reference: "Psalm 2:1" },
            { letter: "D", title: "Desolation", text: "Abomination of desolation; tribulation.", reference: "Matt 24:15" },
            { letter: "T", title: "Trumpets", text: "Judgments shaking heaven and earth.", reference: "Rev 8-9" },
            { letter: "I", title: "Israel", text: "Israel restored; Jerusalem in focus.", reference: "Zech 12:2" },
            { letter: "M", title: "Messiah", text: "Visible return in power.", reference: "Matt 24:30" },
            { letter: "E", title: "Era", text: "Millennial kingdom reign.", reference: "Rev 20:4" },
            { letter: "S", title: "Sentence", text: "Final judgment on evil.", reference: "Rev 20:10" }
        ]
    },
    {
        id: "characteristics-love",
        title: "15 Characteristics of Love",
        subtitle: "1 Corinthians 13",
        description: "The definition of biblical love.",
        mnemonicPhrase: "PicK. wEBPage.DiSAvoW.Debt Right.PaTH Please.",
        translationNote: "NIV",
        items: [
            { title: "Patient" }, { title: "Kind" },
            { title: "does not Envy" }, { title: "does not Boast" }, { title: "not Proud" },
            { title: "not Dishonor others" }, { title: "not Self-seeking" }, { title: "not Easily Angered" }, { title: "no Record of Wrongs" },
            { title: "does not Delight in evil" }, { title: "Rejoices with truth" },
            { title: "Protects" }, { title: "Trusts" }, { title: "Hopes" }, { title: "Perseveres" }
        ]
    },
    {
        id: "last-days-attitudes",
        title: "19 Last Days Attitudes",
        subtitle: "2 Timothy 3:1-5",
        description: "The character of people in difficult times.",
        mnemonicPhrase: "SoMe PArADe! UUH. US? We BiG TReSPAssers.",
        translationNote: "ESV",
        items: [
            { title: "Self (Lovers of)" }, { title: "Money (Lovers of)" },
            { title: "Proud" }, { title: "Arrogant" }, { title: "Abusive" }, { title: "Disobedient to parents" },
            { title: "Ungrateful" }, { title: "Unholy" }, { title: "Heartless" },
            { title: "Unappeasable" }, { title: "Slanderous" },
            { title: "Without self-control" }, { title: "Brutal" }, { title: "Good (Not loving)" },
            { title: "Treacherous" }, { title: "Reckless" }, { title: "Swollen with conceit" },
            { title: "Pleasure (Lovers of)" }, { title: "Appearance of godliness (only)" }
        ]
    },
    {
        id: "parables-22",
        title: "22 Parables of Jesus",
        subtitle: "L.O.S.T. S.E.E.D. W.I.S.E. T.R.U.S.T. S.E.R.V.E.",
        description: "A memory system for 22 key parables.",
        mnemonicPhrase: "The LOST SEED is WISE to TRUST and SERVE",
        items: [
            // LOST
            { letter: "L", title: "Lost Sheep", reference: "Luke 15:4", meaning: "God pursues the one.", text: "A shepherd leaves 99 to find 1." },
            { letter: "O", title: "Overlooked Coin", reference: "Luke 15:8", meaning: "Heaven celebrates the found.", text: "Woman sweeps until she finds the coin." },
            { letter: "S", title: "Sons (Prodigal)", reference: "Luke 15:11", meaning: "Father's lavished grace.", text: "Rebellious son returns; older brother resents." },
            { letter: "T", title: "Treasure & Pearl", reference: "Matt 13:44", meaning: "Kingdom worth everything.", text: "Sell all to buy the field/pearl." },
            // SEED
            { letter: "S", title: "Sower", reference: "Matt 13:3", meaning: "Soil determines growth.", text: "Seed falls on path, rock, thorns, good soil." },
            { letter: "E", title: "Expanding Mustard", reference: "Matt 13:31", meaning: "Small start, huge growth.", text: "Smallest seed becomes a tree." },
            { letter: "E", title: "Enemy Weeds", reference: "Matt 13:24", meaning: "Coexistence until harvest.", text: "Wheat and tares grow together." },
            { letter: "D", title: "Dough Leavened", reference: "Matt 13:33", meaning: "Inside-out transformation.", text: "Yeast works through the dough." },
            // WISE
            { letter: "W", title: "Wise Builder", reference: "Matt 7:24", meaning: "Obedience is the foundation.", text: "Build on rock, not sand." },
            { letter: "I", title: "Invitation (Banquet)", reference: "Luke 14:16", meaning: "Don't refuse the call.", text: "Excuses kept guests away; poor invited." },
            { letter: "S", title: "Servants (Faithful)", reference: "Matt 24:45", meaning: "Be found doing his will.", text: "Master rewards the diligent servant." },
            { letter: "E", title: "Expectant Virgins", reference: "Matt 25:1", meaning: "Be ready at all times.", text: "5 wise had oil, 5 foolish did not." },
            // TRUST
            { letter: "T", title: "Talents", reference: "Matt 25:14", meaning: "Invest what God gives.", text: "Invested talents vs buried talent." },
            { letter: "R", title: "Rich Fool", reference: "Luke 12:16", meaning: "Life is not possessions.", text: "Built bigger barns but lost his soul." },
            { letter: "U", title: "Unforgiving Servant", reference: "Matt 18:23", meaning: "Forgive as you are forgiven.", text: "Forgiven huge debt, choked fellow servant." },
            { letter: "S", title: "Shrewd Manager", reference: "Luke 16:1", meaning: "Use wealth for eternity.", text: "Made friends with unrighteous wealth." },
            { letter: "T", title: "Ten Minas", reference: "Luke 19:11", meaning: "Faithfulness brings reward.", text: "Engage in business until I come." },
            // SERVE
            { letter: "S", title: "Samaritan", reference: "Luke 10:30", meaning: "Mercy makes a neighbor.", text: "Helped the wounded enemy." },
            { letter: "E", title: "Equal Wages", reference: "Matt 20:1", meaning: "Grace isn't 'fair'.", text: "First and last paid the same." },
            { letter: "R", title: "Repentant Tax Collector", reference: "Luke 18:9", meaning: "Humility justifies.", text: "Beat his breast vs Pharisee's pride." },
            { letter: "V", title: "Vinedressers", reference: "Matt 21:33", meaning: "Don't reject the Son.", text: "Tenants killed the heir." },
            { letter: "E", title: "Earnest Widow", reference: "Luke 18:1", meaning: "Pray and don't give up.", text: "Persistent plea to the judge." }
        ]
    },
    {
        id: "flesh-temptations",
        title: "The Five Temptations (FLESH)",
        subtitle: "Matthew 26:41",
        description: "Five temptations men must master.",
        mnemonicPhrase: "F.L.E.S.H.",
        items: [
            { letter: "F", title: "Fame / Pride", text: "Humble yourselves before the Lord, and he will exalt you. (James 4:10)", meaning: "Exalt Him, not yourself." },
            { letter: "L", title: "Lust", text: "Flee from sexual immorality... (1 Cor 6:18–20)", meaning: "Flee, don’t fight. Honor God with your body." },
            { letter: "E", title: "Envy / Comparison", text: "Let us not become conceited, envying one another. (Gal 5:26)", meaning: "Gratitude kills envy." },
            { letter: "S", title: "Sloth / Laziness", text: "Whatever you do, work heartily, as for the Lord. (Col 3:23)", meaning: "Work is worship." },
            { letter: "H", title: "Hunger for Power / Control", text: "Submit yourselves therefore to God. (James 4:7)", meaning: "Control is an illusion; surrender is strength." }
        ]
    },
    {
        id: "life-pain",
        title: "LIFE PAIN",
        subtitle: "Psalm 34:18",
        description: "Comfort in suffering.",
        mnemonicPhrase: "LIFE PAIN",
        items: [
            { letter: "L", title: "Loss", text: "The LORD is near to the brokenhearted...", reference: "Psalm 34:18" },
            { letter: "I", title: "Isolation", text: "God settles the solitary in a home...", reference: "Psalm 68:6" },
            { letter: "F", title: "Fear", text: "Fear not, for I am with you...", reference: "Isaiah 41:10" },
            { letter: "E", title: "Emptiness", text: "I came that they may have life abundantly.", reference: "John 10:10" },
            { letter: "P", title: "Pain", text: "God... comforts us in all our affliction.", reference: "2 Cor 1:3–4" },
            { letter: "A", title: "Addiction", text: "If the Son sets you free, you will be free indeed.", reference: "John 8:36" },
            { letter: "I", title: "Identity", text: "You are a chosen race...", reference: "1 Peter 2:9" },
            { letter: "N", title: "Neglect / Need", text: "My God will supply every need of yours...", reference: "Phil 4:19" }
        ]
    },
    {
        id: "life-gain",
        title: "LIFE GAIN",
        subtitle: "1 Corinthians 13",
        description: "Spiritual blessings.",
        mnemonicPhrase: "LIFE GAIN",
        items: [
            { letter: "L", title: "Love", text: "Love bears all things... love never ends.", reference: "1 Cor 13:7–8" },
            { letter: "I", title: "Intimacy", text: "Draw near to God...", reference: "James 4:8" },
            { letter: "F", title: "Faith", text: "We walk by faith, not by sight.", reference: "2 Cor 5:7" },
            { letter: "E", title: "Encouragement", text: "Encourage one another...", reference: "1 Thess 5:11" },
            { letter: "G", title: "Grace", text: "My grace is sufficient for you...", reference: "2 Cor 12:9" },
            { letter: "A", title: "Acceptance", text: "Welcome one another as Christ has welcomed you.", reference: "Rom 15:7" },
            { letter: "I", title: "Identity (Restored)", text: "If anyone is in Christ, he is a new creation.", reference: "2 Cor 5:17" },
            { letter: "N", title: "Nourishment", text: "Man shall not live by bread alone...", reference: "Matt 4:4" }
        ]
    },
    {
        id: "faith-hope-love",
        title: "Faith, Hope, Love",
        subtitle: "1 Corinthians 13:13",
        description: "The three theological virtues.",
        mnemonicPhrase: "Faith, Hope, Love",
        items: [
            { title: "Faith" },
            { title: "Hope" },
            { title: "Love (The Greatest)" }
        ]
    },
    {
        id: "i-am-statements",
        title: "7 I AM Statements",
        subtitle: "John",
        description: "Jesus' declarations of divinity.",
        mnemonicPhrase: "BILDGS RATL WaT Li TV (Buildings rattle! Watch live TV!)",
        items: [
            { letter: "B", title: "Bread of Life", reference: "John 6:35" },
            { letter: "I", title: "I Am (Before Abraham)", reference: "John 8:58" },
            { letter: "L", title: "Light of the World", reference: "John 8:12" },
            { letter: "D", title: "Door", reference: "John 10:9" },
            { letter: "GS", title: "Good Shepherd", reference: "John 10:11" },
            { letter: "R", title: "Resurrection and Life", reference: "John 11:25" },
            { letter: "W", title: "Way, Truth, Life", reference: "John 14:6" },
            { letter: "TV", title: "True Vine", reference: "John 15:1" }
        ]
    },
    {
        id: "beatitudes",
        title: "The Beatitudes",
        subtitle: "Matthew 5:3-10",
        description: "Blessings for the kingdom.",
        mnemonicPhrase: "PoorSH (is) Mour Comfort(able)...",
        items: [
            { title: "Poor in spirit" },
            { title: "Mourn" },
            { title: "Meek" },
            { title: "Hunger/Thirst for Righteousness" },
            { title: "Merciful" },
            { title: "Pure in heart" },
            { title: "Peacemakers" },
            { title: "Persecuted" }
        ]
    },
    {
        id: "treasure",
        title: "TREASURE (Wealth & Work)",
        subtitle: "Bible Stewardship",
        description: "What the Bible teaches about wealth & work.",
        mnemonicPhrase: "Trust. Return. Earn. Account. Share. Use. Resist. Establish.",
        items: [
            { letter: "T", title: "Trust God’s provision", reference: "Matt 6:24–33" },
            { letter: "R", title: "Return first and best", reference: "Prov 3:9–10" },
            { letter: "E", title: "Earn by honest work", reference: "Eph 4:28" },
            { letter: "A", title: "Account as a steward", reference: "Matt 25:14–30" },
            { letter: "S", title: "Share generously", reference: "2 Cor 9:6–8" },
            { letter: "U", title: "Use wealth for eternal purposes", reference: "Luke 16:9" },
            { letter: "R", title: "Resist greed", reference: "Luke 12:15" },
            { letter: "E", title: "Establish justice", reference: "Prov 11:1" }
        ]
    },
    {
        id: "overseer-qualifications",
        title: "Overseer Qualifications",
        subtitle: "1 Timothy 3:1-7",
        description: "Qualifications for church leadership.",
        mnemonicPhrase: "ARch(ee), HOW (does) SOMe SECONd RHAT Drunkard...",
        items: [
            { title: "Above reproach" },
            { title: "Husband of one wife" },
            { title: "Sober-minded" },
            { title: "Self-controlled" },
            { title: "Respectable" },
            { title: "Hospitable" },
            { title: "Able to teach" },
            { title: "Not a drunkard" },
            { title: "Not violent" },
            { title: "Not quarrelsome" },
            { title: "Not a lover of money" }
        ]
    },
    {
        id: "fabric-law",
        title: "The FABRIC of the LAW is the GOSPEL",
        subtitle: "Meta Mnemonic",
        description: "Catalog of all mnemonic systems.",
        mnemonicPhrase: "FABRIC of the LAW is the GOSPEL",
        items: [
            { letter: "F", title: "Faith, Hope, Love / Fruits / Flesh" },
            { letter: "A", title: "Assurance / Attention" },
            { letter: "B", title: "Bible Story / Beatitudes" },
            { letter: "R", title: "Romans Road" },
            { letter: "I", title: "I AM Statements" },
            { letter: "C", title: "Commandments" },
            { letter: "L", title: "Ladder / Lord's Prayer / Life Pain/Gain" },
            { letter: "A", title: "Armor of God" },
            { letter: "W", title: "Wisdom" },
            { letter: "G", title: "Gifts / Gospel (John 3:16)" },
            { letter: "O", title: "Overseer" },
            { letter: "S", title: "Shepherd" },
            { letter: "P", title: "Parables / Prophecies / Psalm 91" },
            { letter: "E", title: "End Times" },
            { letter: "L", title: "Love / Last Days" }
        ]
    }
];
