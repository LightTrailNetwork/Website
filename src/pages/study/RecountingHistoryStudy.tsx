import React from 'react';
import { ArrowLeft, Scroll, BookOpen, Anchor, MapPin, History, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import VerseLink from '../../components/study/VerseLink';

interface HistoryEntry {
    reference: string;
    scope: string;
    theme: string;
}

interface HistoryCategory {
    title: string;
    description?: string;
    entries: HistoryEntry[];
}

export default function RecountingHistoryStudy() {
    const data: HistoryCategory[] = [
        {
            title: "Historical Psalms",
            entries: [
                { reference: "Psalm 78", scope: "Egypt to the reign of King David", theme: "Warning against rebellion; God's mercy despite faithlessness." },
                { reference: "Psalm 105", scope: "Abrahamic Covenant to the Entry of Canaan", theme: "Celebration of God's faithfulness and fulfilled promises." },
                { reference: "Psalm 106", scope: "Exodus through the Period of the Judges", theme: "National confession of sin and plea for gathering from exile." },
                { reference: "Psalm 135", scope: "Creation and the defeat of Sihon/Og", theme: "God's sovereignty over nations and idols." },
                { reference: "Psalm 136", scope: "Creation to the Conquest of Canaan", theme: "The enduring nature of God’s “Steadfast Love” (Hesed)." },
            ]
        },
        {
            title: "Speeches in Acts",
            entries: [
                { reference: "Acts 7:2-53", scope: "Abraham to the building of Solomon's Temple", theme: "Stephen’s defense: Israel’s history of rejecting God's messengers." },
                { reference: "Acts 13:16-41", scope: "The Exodus to the Resurrection of Jesus", theme: "Paul’s sermon: Jesus as the fulfillment of the Davidic promise." },
            ]
        },
        {
            title: "Farewells & Covenants",
            entries: [
                { reference: "Deuteronomy 1-4", scope: "Horeb (Sinai) to the Plains of Moab", theme: "Moses’ review of the wilderness journey to prepare the new generation." },
                { reference: "Joshua 24:2-13", scope: "Terah (Abraham's father) to the Conquest", theme: "Joshua’s challenge to the tribes to serve God alone." },
                { reference: "1 Samuel 12:6-11", scope: "Moses/Aaron through the Era of the Judges", theme: "Samuel’s reminder of God's deliverance as the Monarchy begins." },
                { reference: "Nehemiah 9:5-37", scope: "Creation to the Return from Exile", theme: "A corporate prayer of repentance during the restoration of Jerusalem." },
            ]
        },
        {
            title: "Theological Summaries",
            entries: [
                { reference: "Ezekiel 20:5-31", scope: "Egypt to the current Babylonian Exile", theme: "A “legal” history focusing on Israel's persistent idolatry." },
                { reference: "Hebrews 11", scope: "Abel to the Maccabean Martyrs", theme: "The “Hall of Faith”: Endurance through trust in God's word." },
                { reference: "Deuteronomy 26:5-10", scope: "The Patriarchs to the Harvest in the Land", theme: "The “Ancient Credo” recited when offering firstfruits." }
            ]
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header */}
            <div className="space-y-6">
                <Link to="/bible/study" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Bible Study
                </Link>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-3">Recounting History</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        A collection of passages where the biblical authors stop to retell the story of God's people.
                    </p>
                </div>
            </div>

            {/* Content Categories */}
            <div className="space-y-10">
                {data.map((category, idx) => (
                    <section key={idx} className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-border/50 pb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                {idx === 0 ? <BookOpen className="w-5 h-5" /> :
                                    idx === 1 ? <MessageSquare className="w-5 h-5" /> :
                                        idx === 2 ? <Anchor className="w-5 h-5" /> :
                                            <History className="w-5 h-5" />}
                            </div>
                            <h2 className="text-2xl font-bold">{category.title}</h2>
                        </div>

                        <div className="grid gap-4">
                            {category.entries.map((entry, entryIdx) => (
                                <div key={entryIdx} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-md transition-all">
                                    <div className="sm:w-48 shrink-0">
                                        <div className="font-bold text-lg text-primary mb-1">
                                            <VerseLink reference={entry.reference} />
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                                            <History className="w-3.5 h-3.5" />
                                            Scope
                                        </div>
                                        <div className="text-sm text-foreground/80 leading-snug mt-1">
                                            {entry.scope}
                                        </div>
                                    </div>

                                    <div className="border-l border-border/50 hidden sm:block" />

                                    <div className="flex-grow">
                                        <div className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mb-1">
                                            <Scroll className="w-3.5 h-3.5" />
                                            Key Theme / Purpose
                                        </div>
                                        <p className="text-foreground leading-relaxed">
                                            {entry.theme}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer */}
            <div className="bg-muted/50 p-6 rounded-xl text-center border border-border/50">
                <p className="text-muted-foreground italic">
                    "Remember the days of old; consider the years of many generations..." <VerseLink reference="Deuteronomy 32:7" />
                </p>
            </div>
        </div>
    );
}
