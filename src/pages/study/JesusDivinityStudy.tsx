import React from 'react';
import { ArrowLeft, BookOpen, Quote, ShieldQuestion, Waves, Activity, Gavel, Flame, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';
import VerseLink from '../../components/study/VerseLink';

export default function JesusDivinityStudy() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header */}
            <div className="space-y-6">
                <Link to="/bible/study" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Bible Study
                </Link>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-3">Claims of Divinity</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Did Jesus actually claim to be God? Examining the implicit and explicit evidence in the Gospels.
                    </p>
                </div>
            </div>

            {/* Introduction: The "Telephone Game" Misconception */}
            <section className="space-y-4">
                <div className="bg-secondary/10 border border-border/50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <ShieldQuestion className="w-6 h-6 text-primary" />
                        The Skeptic's Challenge
                    </h2>
                    <p className="text-lg leading-relaxed mb-4">
                        A common skeptical claim (often popularized by scholars like Bart Ehrman) is that Jesus never claimed to be God. The argument suggests that in the earliest Gospel (Mark), Jesus is merely a human prophet, and only in the latest Gospel (John) does "High Christology" evolve to call Him divine.
                    </p>
                    <p className="text-lg leading-relaxed">
                        However, Christian scholars like <strong>Wes Huff</strong> argue that this distinction is artificial. While John is <em>explicit</em>, Mark is profoundly <em>implicit</em>. Mark portrays Jesus doing things that <strong>only God can do</strong> (Yahweh actions) and taking titles that belong to God alone.
                    </p>
                </div>
            </section>

            {/* Part 1: Implicit Claims in Mark */}
            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <h2 className="text-3xl font-bold text-foreground">1. The Implicit Claims in Mark</h2>
                    <p className="text-muted-foreground mt-2">
                        In the Gospel of Mark, Jesus assumes the prerogatives of Yahweh without explicitly saying "I am God" until the very end. The Jewish audience would have understood these actions unmistakably.
                    </p>
                </div>

                {/* Claim 1: Forgiveness */}
                <div className="grid md:grid-cols-[1fr_300px] gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                            <Gavel className="w-5 h-5" />
                            A. Authority to Forgive Sins
                        </h3>
                        <p className="leading-relaxed">
                            In <VerseLink reference="Mark 2:1-12" />, Jesus heals a paralytic but first says, "Son, your sins are forgiven." The scribes immediately recoil, asking, <em>"Who can forgive sins but God alone?"</em> (Mark 2:7).
                        </p>
                        <p className="leading-relaxed">
                            They were right—only God can forgive sins against His law. Instead of correcting them ("No, I'm just a prophet speaking for God"), Jesus doubles down. He heals the man to prove He has <strong>authority on earth</strong> to forgive sins—an authority belonging only to Yahweh.
                        </p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 h-fit text-sm">
                        <h4 className="font-bold text-muted-foreground uppercase tracking-wide mb-2 text-xs">Key Text</h4>
                        <p className="italic mb-2">"But that you may know that the Son of Man has authority on earth to forgive sins..."</p>
                        <p className="text-right font-bold text-primary">— Mark 2:10</p>
                    </div>
                </div>

                {/* Claim 2: Lord of the Sabbath */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                        <Activity className="w-5 h-5" />
                        B. Lord of the Sabbath
                    </h3>
                    <p className="leading-relaxed">
                        In <VerseLink reference="Mark 2:23-28" />, Jesus declares Himself "Lord even of the Sabbath." The Sabbath was established by God at creation. To claim lordship over the Sabbath is to claim lordship over God's own established law and creation order. No prophet or king ever dared to claim ownership of the Sabbath.
                    </p>
                </div>

                {/* Claim 3: Power Over Nature */}
                <div className="grid md:grid-cols-[1fr_300px] gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                            <Waves className="w-5 h-5" />
                            C. Commanding the Sea (Yahweh's Domain)
                        </h3>
                        <p className="leading-relaxed">
                            In the Old Testament, only <strong>Yahweh</strong> controls the sea (<VerseLink reference="Psalm 107:29" />, <VerseLink reference="Psalm 89:9" />).
                        </p>
                        <p className="leading-relaxed">
                            In <VerseLink reference="Mark 4:35-41" /> (Calming the Storm) and <VerseLink reference="Mark 6:45-52" /> (Walking on Water), Jesus is not praying for the storm to stop; He commands it ("Hush, be still").
                        </p>
                        <p className="leading-relaxed">
                            Specifically, in Mark 6:48, Mark writes Jesus "meant to pass by them." This is a direct allusion to <VerseLink reference="Job 9:8" /> (God "treads on the waves of the sea") and <VerseLink reference="Exodus 33:19" /> (God "passes by" Moses to reveal His glory). Mark is painting Jesus in the role of Yahweh revealing His glory.
                        </p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 h-fit text-sm">
                        <h4 className="font-bold text-muted-foreground uppercase tracking-wide mb-2 text-xs">OT Parallel</h4>
                        <p className="italic mb-2">"He alone stretches out the heavens and treads on the waves of the sea."</p>
                        <p className="text-right font-bold text-primary">— Job 9:8</p>
                    </div>
                </div>
            </section>

            {/* Part 2: Explicit Claims */}
            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <h2 className="text-3xl font-bold text-foreground">2. The Explicit Claims</h2>
                    <p className="text-muted-foreground mt-2">
                        While explicit statements are less frequent in the Synoptics to preserve the "Messianic Secret," they inevitably surface during Jesus' trial.
                    </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">The "I AM" of Mark 14:62</h3>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <p className="text-lg">
                                At His trial, the High Priest asks directly: <em>"Are you the Christ, the Son of the Blessed?"</em>
                            </p>
                            <p className="text-lg">
                                Jesus answers: <strong>"I AM, and you will see the Son of Man seated at the right hand of Power..."</strong>
                            </p>
                        </div>
                        <div className="flex-1 bg-background/50 rounded-lg p-6 space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                                    <span className="text-sm"><strong>"I AM" (Ego Eimi):</strong> The divine name from Exodus 3:14.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                                    <span className="text-sm"><strong>"Son of Man":</strong> The divine cosmic judge from Daniel 7:13-14.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                                    <span className="text-sm"><strong>"Right Hand of Power":</strong> The position of equality with God (<VerseLink reference="Psalm 110:1" />).</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="mt-6 text-center italic text-muted-foreground">
                        The High Priest tore his clothes immediately. He knew exactly what Jesus was claiming: <strong>Blasphemy (claiming to be God).</strong>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-500" />
                            Explicit Claims in John
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            John's Gospel, written later for a different purpose, is explicit from the first verse.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>John 1:1:</strong> "The Word was God."</li>
                            <li><strong>John 8:58:</strong> "Before Abraham was, I AM." (They picked up stones to kill Him).</li>
                            <li><strong>John 10:30:</strong> "I and the Father are one."</li>
                            <li><strong>John 20:28:</strong> Thomas calls Him "My Lord and my God!"</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <ScrollText className="w-5 h-5 text-amber-500" />
                            Early High Christology
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Paul's letters (written <em>before</em> the Gospels, ~50-60 AD) contain the highest Christology, proving this wasn't a late legend.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Philippians 2:5-11:</strong> The "Carmen Christi" hymn describes Jesus as being in "very nature God."</li>
                            <li><strong>Colossians 1:15-20:</strong> Jesus is the "image of the invisible God" and the Creator of all things.</li>
                            <li><strong>1 Corinthians 8:6:</strong> Jesus is included in the Shema ("One Lord, Jesus Christ").</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <div className="bg-muted p-6 rounded-xl text-center">
                <p className="font-medium text-lg text-foreground">
                    "Jesus was crucified not for what He did, but for who He claimed to be."
                </p>
            </div>
        </div>
    );
}

