import React, { useState } from 'react';
import { ArrowLeft, Megaphone, Heart, MessageCircle, Map, Target, BookOpen, Quote, CheckCircle2, Circle, AlertCircle, Fingerprint, Footprints, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import VerseLink from '../../components/study/VerseLink';

export default function EvangelismStudy() {
    const [activeTab, setActiveTab] = useState<'methods' | 'testimony' | 'reference'>('methods');

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header */}
            <div className="space-y-6">
                <Link to="/bible/study" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Bible Study
                </Link>
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 mb-4 animate-in zoom-in-50 duration-500">
                        <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Evangelism & Witness</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        "Go into all the world and proclaim the gospel to the whole creation."
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border/50 pb-1">
                {[
                    { id: 'methods', label: 'Methods', icon: Map },
                    { id: 'testimony', label: 'My Story', icon: Fingerprint },
                    { id: 'reference', label: 'Quick Guide', icon: Target }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-sm transition-all relative top-[1px] ${activeTab === tab.id
                            ? 'text-primary border-b-2 border-primary bg-primary/5'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                    >
                        {tab.id === 'methods' && <Map className="w-4 h-4" />}
                        {tab.id === 'testimony' && <Fingerprint className="w-4 h-4" />}
                        {tab.id === 'reference' && <Target className="w-4 h-4" />}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'methods' && <MethodsSection />}
                {activeTab === 'testimony' && <TestimonySection />}
                {activeTab === 'reference' && <ReferenceSection />}
            </div>
        </div>
    );
}

function MethodsSection() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Intro */}
            <div className="bg-muted/30 border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Why We Share
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    Evangelism isn't just a duty; it's an act of worship and overflow. We share because we have found the Bread of Life and we want other beggars to know where to find it. Success is not conversion; success is <strong>faithfulness to share</strong>.
                </p>
            </div>

            {/* Romans Road */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <Footprints className="w-6 h-6 text-primary" />
                    The Romans Road
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <StepCard
                        step="1"
                        title="The Problem"
                        verse="Romans 3:23"
                        text="For all have sinned and fall short of the glory of God."
                        explanation="Everyone has messed up. We are separated from a StepCarderfect God."
                    />
                    <StepCard
                        step="2"
                        title="The Consequence"
                        verse="Romans 6:23"
                        text="For the wages of sin is death, but the free gift of God is eternal life..."
                        explanation="What we earn for our sin is death (separation). But God offers a gift."
                    />
                    <StepCard
                        step="3"
                        title="The Solution"
                        verse="Romans 5:8"
                        text="But God shows his love for us in that while we were still sinners, Christ died for us."
                        explanation="We don't clean ourselves up first. Jesus paid the penalty."
                    />
                    <StepCard
                        step="4"
                        title="The Response"
                        verse="Romans 10:9"
                        text="Because, if you confess with your mouth that Jesus is Lord and believe..."
                        explanation="We must agree with God and surrender to Jesus as King."
                    />
                    <StepCard
                        step="5"
                        title="The Assurance"
                        verse="Romans 10:13"
                        text="For everyone who calls on the name of the Lord will be saved."
                        explanation="No fine print. The promise is for everyone who calls."
                    />
                </div>
            </div>

            {/* 3 Circles */}
            <div className="space-y-6 pt-8 border-t border-border/50">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    The 3 Circles
                </h2>
                <p className="text-muted-foreground">A visual way to explain the Gospel using three circles: God's Design, Brokenness, and The Gospel.</p>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-8">
                    {/* Circle 1 */}
                    <div className="text-center space-y-3 max-w-[200px]">
                        <div className="w-32 h-32 rounded-full border-4 border-emerald-500 flex items-center justify-center mx-auto bg-emerald-500/5">
                            <Heart className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h4 className="font-bold text-lg">God's Design</h4>
                        <p className="text-xs text-muted-foreground">Perfect, whole, full of love and purpose. <VerseLink reference="Gen 1:31" /></p>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
                        <span className="text-xs font-bold uppercase tracking-wider">Sin</span>
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </div>

                    {/* Circle 2 */}
                    <div className="text-center space-y-3 max-w-[200px]">
                        <div className="w-32 h-32 rounded-full border-4 border-rose-500 flex items-center justify-center mx-auto bg-rose-500/5">
                            <AlertCircle className="w-12 h-12 text-rose-600" />
                        </div>
                        <h4 className="font-bold text-lg">Brokenness</h4>
                        <p className="text-xs text-muted-foreground">We turned away. Result: pain, emptiness, death. <VerseLink reference="Rom 1:25" /></p>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
                        <span className="text-xs font-bold uppercase tracking-wider">Repent & Believe</span>
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </div>

                    {/* Circle 3 */}
                    <div className="text-center space-y-3 max-w-[200px]">
                        <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto bg-blue-500/5">
                            <CrossIcon className="w-12 h-12 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-lg">The Gospel</h4>
                        <p className="text-xs text-muted-foreground">Jesus entered our brokenness to restore us. <VerseLink reference="1 Pet 3:18" /></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TestimonySection() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-8 text-center space-y-4">
                <Quote className="w-10 h-10 text-indigo-500 mx-auto opacity-50" />
                <h3 className="text-2xl font-bold">Your Story is Powerful</h3>
                <p className="max-w-xl mx-auto text-muted-foreground">
                    No one can argue with your experience. "I was blind, now I see" <VerseLink reference="John 9:25" /> is unassailable. Keep it brief (2-3 mins) and Christ-centered.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20">
                        <span className="text-6xl font-black">1</span>
                    </div>
                    <h4 className="font-bold text-xl text-primary">Before Christ</h4>
                    <p className="text-sm text-muted-foreground">What was your life like? What were you chasing? (Satisfaction, approval, peace?)</p>
                    <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground/80">
                        <li>Avoid "church kid" language.</li>
                        <li>Focus on the internal lack/void.</li>
                        <li>Be honest but don't glorify the sin.</li>
                    </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20">
                        <span className="text-6xl font-black">2</span>
                    </div>
                    <h4 className="font-bold text-xl text-primary">How I Met Him</h4>
                    <p className="text-sm text-muted-foreground">When did it click? What happened?</p>
                    <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground/80">
                        <li>Was it a specific moment or a process?</li>
                        <li>What realization changed you?</li>
                        <li><strong>Mention Jesus specifically</strong> (His death/resurrection).</li>
                    </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4 relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20">
                        <span className="text-6xl font-black">3</span>
                    </div>
                    <h4 className="font-bold text-xl text-primary">After Christ</h4>
                    <p className="text-sm text-muted-foreground">How is your life different now?</p>
                    <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground/80">
                        <li>Not "perfect," but "purposeful."</li>
                        <li>How has He dealt with your sin/shame?</li>
                        <li>Inviting them to know Him too.</li>
                    </ul>
                </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 flex gap-4 items-start">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="font-bold text-amber-600 text-sm uppercase tracking-wide">Translation Guide</h4>
                    <p className="text-sm text-muted-foreground">Avoid "Christianese". Translate for the culture.</p>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 pt-2 text-sm">
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="text-rose-500 line-through decoration-rose-500/50">"I was saved"</span>
                            <span className="text-emerald-500">"God rescued me / forgave me"</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="text-rose-500 line-through decoration-rose-500/50">"Fellowship"</span>
                            <span className="text-emerald-500">"Community / Deep friendship"</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="text-rose-500 line-through decoration-rose-500/50">"Sin"</span>
                            <span className="text-emerald-500">"Rebellion / Going my own way"</span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="text-rose-500 line-through decoration-rose-500/50">"Repent"</span>
                            <span className="text-emerald-500">"Turn around / Change my mind"</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReferenceSection() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="p-4 bg-muted border border-border rounded-lg text-center">
                <p className="text-sm font-medium">Use this page while engaging in conversation as a quick prompt.</p>
            </div>

            <div className="grid gap-4">
                <details className="group bg-card border border-border rounded-lg overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors list-none font-bold">
                        <span>❓ Conversation Starters</span>
                        <Circle className="w-4 h-4 text-muted-foreground group-open:text-primary group-open:fill-current" />
                    </summary>
                    <div className="p-4 pt-0 border-t border-border mt-0 bg-muted/10 space-y-2 text-sm">
                        <p className="py-2">"Do you have any spiritual beliefs?"</p>
                        <p className="py-2 border-t border-border/50">"To you, who is Jesus?"</p>
                        <p className="py-2 border-t border-border/50">"If you could ask God one question, what would it be?"</p>
                        <p className="py-2 border-t border-border/50">"Has anyone ever shared the Gospel with you?"</p>
                    </div>
                </details>

                <details className="group bg-card border border-border rounded-lg overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors list-none font-bold">
                        <span>🤔 Handling Objections</span>
                        <Circle className="w-4 h-4 text-muted-foreground group-open:text-primary group-open:fill-current" />
                    </summary>
                    <div className="p-4 pt-0 border-t border-border mt-0 bg-muted/10 space-y-4 text-sm">
                        <div>
                            <span className="font-bold block mb-1 text-primary">"I don't believe in God."</span>
                            <p className="text-muted-foreground">"I respect that. What led you to that conclusion? (Listen). If you were wrong, would you want to know?"</p>
                        </div>
                        <div>
                            <span className="font-bold block mb-1 text-primary">"The Bible is just written by men."</span>
                            <p className="text-muted-foreground">"It was written by 40 authors over 1500 years but tells one unified story. Have you ever read it for yourself?"</p>
                        </div>
                        <div>
                            <span className="font-bold block mb-1 text-primary">"Christians are hypocrites."</span>
                            <p className="text-muted-foreground">"You are absolutely right. That's why we need a Savior. We aren't perfect; we are forgiven."</p>
                        </div>
                    </div>
                </details>

                <details className="group bg-card border border-border rounded-lg overflow-hidden" open>
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors list-none font-bold">
                        <span>⚡ Quick Gospel Outline</span>
                        <Circle className="w-4 h-4 text-muted-foreground group-open:text-primary group-open:fill-current" />
                    </summary>
                    <div className="p-4 pt-0 border-t border-border mt-0 bg-muted/10 space-y-2">
                        <div className="flex gap-3 items-center">
                            <span className="font-mono font-bold text-emerald-500">GOD</span>
                            <span className="text-sm">Created us for relationship. (Love)</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="font-mono font-bold text-rose-500">US</span>
                            <span className="text-sm">We rebelled (Sinned). Relationship broken.</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="font-mono font-bold text-blue-500">JESUS</span>
                            <span className="text-sm">Lived perfect life, died for our sin, rose again.</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="font-mono font-bold text-purple-500">YOU</span>
                            <span className="text-sm">Must decide. Repent (Turn) & Believe (Trust).</span>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}

function StepCard({ step, title, verse, text, explanation }: { step: string, title: string, verse: string, text: string, explanation: string }) {
    return (
        <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5 text-6xl font-black font-mono select-none">
                {step}
            </div>
            <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">Step {step}</span>
                <h4 className="text-lg font-bold mt-2 mb-1">{title}</h4>
                <div className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <VerseLink reference={verse} />
                </div>
                <p className="text-sm italic text-foreground/80 mb-3 ml-2 border-l-2 border-border pl-3">
                    "{text}"
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground/70">Explain:</span> {explanation}
                </p>
            </div>
        </div>
    );
}

function CrossIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2v20M7 8h10" />
        </svg>
    )
}
