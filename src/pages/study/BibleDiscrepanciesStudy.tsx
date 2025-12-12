import React from 'react';
import { ArrowLeft, BookOpen, GitMerge, Scale, ShieldCheck, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import VerseLink from '../../components/study/VerseLink';

export default function BibleDiscrepanciesStudy() {
    const discrepancies = [
        {
            id: 'creation',
            title: 'Creation Accounts: Genesis 1 vs. 2',
            challenge: 'Genesis 1 describes animals being created before humans (Gen 1:24-27). Genesis 2 appears to say man was created first, then animals (Gen 2:18-19).',
            resolution: 'Genesis 1 is a chronological, cosmic overview ("The Wide Lens"). Genesis 2 is a topical, relational focus ("The Zoom Lens") centering on Man\'s purpose in the Garden. The Hebrew verb "formed" in Gen 2:19 can be translated pluperfect ("had formed"), indicating God brought animals He *had already formed* to Adam for naming, rather than creating them at that specific moment. They are complementary accounts, not conflicting timelines.'
        },
        {
            id: 'noah',
            title: 'Noah\'s Ark: How Many Animals?',
            challenge: 'Genesis 6:19 commands Noah to take "two of every kind." But Genesis 7:2 commands him to take "seven pairs of clean animals."',
            resolution: 'This is a case of "General vs. Specific." Genesis 6 gives the general rule (pairs for reproduction). Genesis 7 provides the specific exception for "clean" animals, which were needed in greater numbers for the post-flood sacrifice (Gen 8:20). If he had only taken two, the species would have gone extinct the moment he sacrificed one.'
        },
        {
            id: 'genealogy',
            title: ' Jesus\' Genealogies: Matthew vs. Luke',
            challenge: 'Matthew 1 lists Joseph\'s father as Jacob. Luke 3 lists Joseph\'s father as Heli. The names diverge significantly after King David.',
            resolution: 'Matthew, writing to a Jewish audience, traces the *legal* lineage through Joseph (the legal father) to establish Jesus\' royal right to the Throne of David. Luke, focusing on Jesus\' humanity, likely traces the *biological* lineage through Mary (making Jesus the grandson of Heli, Mary\'s father). Since women were rarely listed in genealogies, Joseph is listed as the "son" (son-in-law) of Heli. This allows Jesus to be biologically descended from David (via Nathan, in Luke) and legally an heir to the throne (via Solomon, in Matthew) without inheriting the curse of Jeconiah (Jeremiah 22:30).'
        },
        {
            id: 'judas',
            title: 'The Death of Judas',
            challenge: 'Matthew 27:5 says Judas "hanged himself." Acts 1:18 says he "fell headlong, his body burst open and all his intestines spilled out."',
            resolution: 'These accounts are sequential, not contradictory. Judas hanged himself (Matthew). Likely, the body began to decompose and bloat in the hot sun. eventually, the rope or branch broke, and his body fell "headlong" (or swelled up) and burst open upon impact (Acts). Acts describes the gruesome aftermath of the hanging described in Matthew.'
        },
        {
            id: 'seeing-god',
            title: 'Seeing God: Face to Face?',
            challenge: 'Genesis 32:30 says Jacob saw God "face to face." Exodus 33:11 says God spoke to Moses "face to face." Yet John 1:18 and 1 Timothy 6:16 say "no one has ever seen God."',
            resolution: 'The phrase "face to face" is an idiom for intimate, direct communication (like a friend), not necessarily a literal beholding of God\'s essential glory. When people in the OT "saw God," they saw a *theophany* (a visible manifestation, often the "Angel of the Lord" or pre-incarnate Christ) or a diminished form of His glory. No one has seen the full, unapproachable essence of the Father in His unmitigated glory and lived.'
        },
        {
            id: 'angels',
            title: 'Resurrection Angels: One or Two?',
            challenge: 'Matthew 28:2 mentions "an angel" rolling back the stone. Mark 16:5 mentions "a young man" (angel). Luke 24:4 mentions "two men." John 20:12 mentions "two angels."',
            resolution: 'A fundamental rule of historiography is: "Where there represent two, there is also one." Matthew and Mark focus on the one who spoke or was most prominent (the spokesman). They do not say there was *only* one. Luke and John provide the fuller detail that there were two. Independent eyewitness accounts often focus on different details; this variation actually supports the authenticity of the testimony rather than it being a colluded fabrication.'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header */}
            <div className="space-y-6">
                <Link to="/bible/study" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Bible Study
                </Link>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-3">Biblical Continuity</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Addressing alleged contradictions and discovering the unity of Scripture.
                    </p>
                </div>
            </div>

            {/* Intro */}
            <div className="bg-secondary/10 border border-border/50 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    The Nature of Discrepancy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    Critics often point to "contradictions" in the Bible to undermine its reliability. However, most of these are easily resolved by understanding <strong>context</strong>, <strong>genre</strong>, and the difference between <strong>contradiction</strong> (A and not-A) and <strong>complementary variation</strong> (different perspectives on the same event).
                </p>
            </div>

            {/* List */}
            <div className="space-y-8">
                {discrepancies.map((item) => (
                    <div key={item.id} className="group border border-border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow">
                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                {item.title}
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Challenge */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
                                        <AlertCircle className="w-4 h-4" />
                                        The Challenge
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed bg-amber-500/5 p-4 rounded-lg border border-amber-500/10">
                                        {item.challenge}
                                    </p>
                                </div>

                                {/* Resolution */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm uppercase tracking-wider">
                                        <CheckCircle2 className="w-4 h-4" />
                                        The Continuity
                                    </div>
                                    <p className="text-foreground leading-relaxed bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10">
                                        {item.resolution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Conclusion */}
            <div className="text-center pt-8 text-muted-foreground">
                <p className="italic">
                    "The sum of Your word is truth, and every one of Your righteous ordinances is everlasting."
                    <br />
                    <span className="text-sm not-italic mt-1 inline-block">— <VerseLink reference="Psalm 119:160" /></span>
                </p>
            </div>
        </div>
    );
}
