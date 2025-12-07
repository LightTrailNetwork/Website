import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


export function GraceView() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-blue-500">GRACE</h1>
                <p className="text-xl text-muted-foreground">God's Riches At Christ's Expense</p>
                <div className="space-y-4 text-left max-w-2xl mx-auto mt-8">
                    {[
                        { letter: 'G', word: 'God', desc: 'God created everything perfect.' },
                        { letter: 'R', word: 'Rebellion', desc: 'Man rebelled against God (Sin).' },
                        { letter: 'A', word: 'Atonement', desc: 'God provided a way back (Jesus).' },
                        { letter: 'C', word: 'Church', desc: 'The community of believers.' },
                        { letter: 'E', word: 'Eternity', desc: 'New Heaven and New Earth.' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center p-4 bg-card border border-border rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary mr-4 shrink-0">
                                {item.letter}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{item.word}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CrownPathView() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4 pb-20">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-yellow-500">CROWN PATH</h1>
                <p className="text-xl text-muted-foreground">The Story of the Bible in 9 Words</p>

                <div className="space-y-4 text-left max-w-2xl mx-auto mt-8">
                    {[
                        { letter: 'C', word: 'Creation', people: '(Adam & Noah)', desc: 'God makes and sustains the world.' },
                        { letter: 'R', word: 'Roots', people: '(Abraham & Isaac)', desc: 'God plants faith through promise.' },
                        { letter: 'O', word: 'Origins', people: '(Jacob & Joseph)', desc: 'God forms a people through struggle.' },
                        { letter: 'W', word: 'Wilderness', people: '(Moses & Joshua)', desc: 'God leads with law and deliverance.' },
                        { letter: 'N', word: 'Nation', people: '(Samuel & David)', desc: 'God builds His kingdom.' },
                        { letter: 'P', word: 'Prophecy', people: '(Elijah & Daniel)', desc: 'God speaks truth through courage.' },
                        { letter: 'A', word: 'Atonement', people: '(Mary & Jesus)', desc: 'God fulfills redemption.' },
                        { letter: 'T', word: 'Testimony', people: '(Peter & Paul)', desc: 'God spreads the gospel.' },
                        { letter: 'H', word: 'Hope', people: '(John & You)', desc: 'God finishes His story through us.' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start p-4 bg-card border border-border rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl font-bold text-yellow-500 mr-4 shrink-0 mt-1">
                                {item.letter}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold flex flex-wrap gap-2 items-baseline">
                                    {item.word}
                                    <span className="text-sm font-medium text-muted-foreground">{item.people}</span>
                                </h3>
                                <p className="text-muted-foreground mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function John316View() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-red-500">John 3:16</h1>
                <blockquote className="text-2xl font-serif italic text-foreground leading-relaxed my-8">
                    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
                </blockquote>
                <p className="text-muted-foreground font-bold">- NIV Translation</p>
            </div>
        </div>
    );
}

export function GatherAroundView() {
    const sections = [
        {
            word: "GATHER",
            meaning: "New Testament Sections",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            items: [
                { char: "G", text: "Gospels", link: "/bible/read/Matthew" },
                { char: "A", text: "Acts", link: "/bible/read/Acts" },
                { char: "T", text: "Thirteen Letters from Paul", link: "/bible/read/Romans" },
                { char: "H", text: "Hebrews", link: "/bible/read/Hebrews" },
                { char: "E", text: "Everyone Else's Letters (James, Peter, John, Jude)", link: "/bible/read/James" },
                { char: "R", text: "Revelation", link: "/bible/read/Revelation" }
            ]
        },
        {
            word: "AROUND",
            meaning: "Four Gospels",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            items: [
                { char: "A", text: "Anointed (Matthew)", link: "/bible/read/Matthew" },
                { char: "R", text: "Rapid (Mark)", link: "/bible/read/Mark" },
                { char: "O", text: "Orderly (Luke)", link: "/bible/read/Luke" },
                { char: "U", text: "Upper Room (John 13–17 — love, Spirit, vine)", link: "/bible/read/John" },
                { char: "N", text: "New Birth (John 3 — Niccodemus)", link: "/bible/read/John" },
                { char: "D", text: "Doubt Dispelled (John 20 — Thomas believes)", link: "/bible/read/John" }
            ]
        },
        {
            word: "CIRCLE",
            meaning: "Paul’s Letters (Grouped)",
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            items: [
                { char: "C", text: "Core — The core gospel teaching (Romans)", link: "/bible/read/Romans" },
                { char: "I", text: "Issues — Letters correcting church issues & divisions (1 & 2 Corinthians)", link: "/bible/read/1Corinthians" },
                { char: "R", text: "Rescue — Grace rescuing from legalism (Galatians)", link: "/bible/read/Galatians" },
                { char: "C", text: "Chains — Letters written in chains (Ephesians, Philippians, Colossians, Philemon)", link: "/bible/read/Ephesians" },
                { char: "L", text: "Longing — Letters about longing for Christ’s return (1 & 2 Thessalonians)", link: "/bible/read/1Thessalonians" },
                { char: "E", text: "Elders — Letters training elders/pastors (1 & 2 Timothy, Titus)", link: "/bible/read/1Timothy" }
            ]
        },
        {
            word: "LIGHT",
            meaning: "General / Extra Epistles",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            items: [
                { char: "L", text: "Legitimate Faith (James)", link: "/bible/read/James" },
                { char: "I", text: "Identity (1 Peter)", link: "/bible/read/1Peter" },
                { char: "G", text: "Growth (2 Peter)", link: "/bible/read/2Peter" },
                { char: "H", text: "Heartfelt Love (1–3 John)", link: "/bible/read/1John" },
                { char: "T", text: "Take Your Stand (Jude)", link: "/bible/read/Jude" }
            ]
        },
        {
            word: "LAMPS",
            meaning: "Old Testament Sections",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            items: [
                { char: "L", text: "Law (Genesis–Deuteronomy)", link: "/bible/read/Genesis" },
                { char: "A", text: "Ancient History (Joshua–Esther)", link: "/bible/read/Joshua" },
                { char: "M", text: "Meditations on Wisdom (Job–Song of Solomon)", link: "/bible/read/Job" },
                { char: "P", text: "Prophets — Major (Isaiah–Daniel)", link: "/bible/read/Isaiah" },
                { char: "S", text: "Small Prophets — Minor (Hosea–Malachi)", link: "/bible/read/Hosea" }
            ]
        },
        {
            word: "GOD'S",
            meaning: "Torah / Law",
            color: "text-red-500",
            bg: "bg-red-500/10",
            items: [
                { char: "G", text: "Genesis", link: "/bible/read/Genesis" },
                { char: "O", text: "Out of Egypt (Exodus)", link: "/bible/read/Exodus" },
                { char: "D", text: "Dwelling with God in the Desert (Leviticus–Numbers)", link: "/bible/read/Leviticus" },
                { char: "S", text: "Second Telling (Deuteronomy)", link: "/bible/read/Deuteronomy" }
            ]
        },
        {
            word: "KINGDOM",
            meaning: "Ancient History",
            color: "text-amber-600",
            bg: "bg-amber-600/10",
            items: [
                { char: "K", text: "Kingdom Conquered (Joshua)", link: "/bible/read/Joshua" },
                { char: "I", text: "In Judges They Fell (Judges & Ruth)", link: "/bible/read/Judges" },
                { char: "N", text: "National Kings Rise (1–2 Samuel)", link: "/bible/read/1Samuel" },
                { char: "G", text: "Great Kingdom Splits (1–2 Kings)", link: "/bible/read/1Kings" },
                { char: "D", text: "David’s Line & Temple Records (1–2 Chronicles)", link: "/bible/read/1Chronicles" },
                { char: "O", text: "Outcry & Return (Ezra–Nehemiah)", link: "/bible/read/Ezra" },
                { char: "M", text: "Maid Becomes Queen (Esther)", link: "/bible/read/Esther" }
            ]
        },
        {
            word: "WILL",
            meaning: "Wisdom Books",
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            items: [
                { char: "W", text: "Wisdom in Suffering (Job)", link: "/bible/read/Job" },
                { char: "I", text: "Israel’s Songs (Psalms)", link: "/bible/read/Psalms" },
                { char: "L", text: "Lessons of Wisdom (Proverbs / Ecclesiastes)", link: "/bible/read/Proverbs" },
                { char: "L", text: "Love’s Song (Song of Solomon)", link: "/bible/read/SongofSolomon" }
            ]
        },
        {
            word: "SOON",
            meaning: "Major Prophets",
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            items: [
                { char: "S", text: "Salvation Promised (Isaiah)", link: "/bible/read/Isaiah" },
                { char: "O", text: "Outcry & Tears (Jeremiah–Lamentations)", link: "/bible/read/Jeremiah" },
                { char: "O", text: "Our Hearts Renewed (Ezekiel)", link: "/bible/read/Ezekiel" },
                { char: "N", text: "Nations Bow (Daniel)", link: "/bible/read/Daniel" }

            ]
        },
        {
            word: "RETURN",
            meaning: "Minor Prophets",
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            items: [
                { char: "R", text: "Relentless Love (Hosea)", link: "/bible/read/Hosea" },
                { char: "E", text: "Evil Exposed (Joel–Amos)", link: "/bible/read/Joel" },
                { char: "T", text: "Turn or Be Judged (Obadiah–Jonah–Micah)", link: "/bible/read/Obadiah" },
                { char: "U", text: "Unfaithful Nations Judged (Nahum–Habakkuk)", link: "/bible/read/Nahum" },
                { char: "R", text: "Return & Rebuild (Zephaniah–Haggai–Zechariah)", link: "/bible/read/Zephaniah" },
                { char: "N", text: "Name Remembered (Malachi)", link: "/bible/read/Malachi" }
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4 pb-20">
            {/* Header / Intro */}
            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-foreground">GATHER AROUND...</h1>
                <p className="text-xl text-muted-foreground font-serif italic max-w-3xl mx-auto leading-relaxed">
                    "GATHER AROUND in a CIRCLE and LIGHT your LAMPS.<br />
                    GOD’S KINGDOM WILL SOON RETURN."
                </p>
                <div className="bg-secondary/10 p-4 rounded-lg inline-block">
                    <p className="text-sm text-secondary-foreground font-medium">A framework for every book group in the Bible.</p>
                </div>
            </div>

            {/* Mnemonic Cards */}
            <div className="space-y-12">
                {sections.map((section, idx) => (
                    <div key={section.word} className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className={`text-4xl font-black ${section.color} tracking-wider`}>
                                {section.word}
                            </div>
                            <div className="h-px bg-border flex-1" />
                            <div className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
                                {section.meaning}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {section.items.map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.link}
                                    className="flex items-center p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/5 transition-all group"
                                >
                                    <div className={`w-10 h-10 rounded-lg ${section.bg} ${section.color} flex items-center justify-center text-xl font-bold shrink-0 mr-4 shadow-sm group-hover:scale-110 transition-transform`}>
                                        {item.char}
                                    </div>
                                    <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                                        {item.text}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
