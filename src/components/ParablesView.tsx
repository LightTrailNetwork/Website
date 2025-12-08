import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Wheat, Crown, Scale, Heart, AlertTriangle, Sprout, Search } from 'lucide-react';
import VerseLink from './study/VerseLink';

interface Parable {
    title: string;
    ref: string;
    meaning: string;
}

interface ParableCategory {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    parables: Parable[];
}

const PARABLE_CATEGORIES: ParableCategory[] = [
    {
        title: "The Kingdom of God",
        description: "What is God's reign like? It starts small, grows mysteriously, and is of infinite value.",
        icon: Crown,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        parables: [
            { title: "The Sower", ref: "Matthew 13:3-9", meaning: "How hearts receive the Word." },
            { title: "The Mustard Seed", ref: "Matthew 13:31-32", meaning: "Small beginnings, huge growth." },
            { title: "The Leaven", ref: "Matthew 13:33", meaning: "Pervasive influence of the Kingdom." },
            { title: "The Hidden Treasure", ref: "Matthew 13:44", meaning: "The Kingdom is worth everything." },
            { title: "The Pearl of Great Price", ref: "Matthew 13:45-46", meaning: "Surpassing value of Christ." }
        ]
    },
    {
        title: "God's Grace & Mercy",
        description: "The heart of the Father towards the lost and the unworthy.",
        icon: Heart,
        color: "text-red-500",
        bg: "bg-red-500/10",
        parables: [
            { title: "The Lost Sheep", ref: "Luke 15:3-7", meaning: "God seeks the one lost soul." },
            { title: "The Lost Coin", ref: "Luke 15:8-10", meaning: "Diligent search for the lost." },
            { title: "The Prodigal Son", ref: "Luke 15:11-32", meaning: "The Father's lavish welcome." },
            { title: "The Good Samaritan", ref: "Luke 10:25-37", meaning: "Love your neighbor as yourself." },
            { title: "The Unforgiving Servant", ref: "Matthew 18:23-35", meaning: "Forgive as you have been forgiven." },
            { title: "The Two Debtors", ref: "Luke 7:41-43", meaning: "Much forgiveness yields much love." }
        ]
    },
    {
        title: "Judgment & Readiness",
        description: "The call to be watchful, faithful, and prepared for the King's return.",
        icon: Scale,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        parables: [
            { title: "The Ten Virgins", ref: "Matthew 25:1-13", meaning: "Spiritual preparedness." },
            { title: "The Talents", ref: "Matthew 25:14-30", meaning: "Faithful stewardship of gifts." },
            { title: "The Sheep and Goats", ref: "Matthew 25:31-46", meaning: "Judgment based on active love." },
            { title: "The Rich Fool", ref: "Luke 12:16-21", meaning: "Vanity of earthly wealth." },
            { title: "The Wheat and Tares", ref: "Matthew 13:24-30", meaning: "Coexistence until final judgment." }
        ]
    },
    {
        title: "Prayer & Humility",
        description: "How we should approach God and live before men.",
        icon: Sprout,
        color: "text-green-500",
        bg: "bg-green-500/10",
        parables: [
            { title: "The Pharisee and Tax Collector", ref: "Luke 18:9-14", meaning: "Humility justifies, pride condemns." },
            { title: "The Persistent Widow", ref: "Luke 18:1-8", meaning: "Don't lose heart in prayer." },
            { title: "The Two Sons", ref: "Matthew 21:28-32", meaning: "Obedience is better than lip service." },
            { title: "The Lowest Seat", ref: "Luke 14:7-14", meaning: "Exaltation comes to the humble." }
        ]
    }
];

export function ParablesView() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in space-y-12">
            {/* Header */}
            <div className="pt-8 text-center space-y-4">
                <Link to="/bible/memory" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Memory Tools
                </Link>
                <div className="flex justify-center">
                    <div className="p-3 bg-amber-500/10 rounded-full">
                        <Wheat className="w-8 h-8 text-amber-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">The Parables of Jesus</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    "I will open my mouth in parables; I will utter things hidden since the creation of the world."
                    <span className="block text-sm font-medium mt-1 text-primary">— <VerseLink reference="Matthew 13:35" className="hover:underline" /></span>
                </p>

                <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6 mt-8 text-left shadow-sm">
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <Search className="w-5 h-5 text-primary" />
                        Why Study Parables?
                    </h3>
                    <p className="text-muted-foreground">
                        Jesus actively used parables to reveal truth to those who were hungry and conceal it from the proud.
                        They aren't just moral stories; they are <strong>windows into the reality of God's Kingdom</strong>.
                        To understand them is to understand the heart of the King.
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PARABLE_CATEGORIES.map((category) => (
                    <div key={category.title} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className={`p-6 border-b border-border/50 ${category.bg}`}>
                            <div className="flex items-center gap-4 mb-2">
                                <div className={`p-2 rounded-lg bg-background/50 backdrop-blur-sm`}>
                                    <category.icon className={`w-6 h-6 ${category.color}`} />
                                </div>
                                <h2 className={`text-2xl font-bold ${category.color}`}>{category.title}</h2>
                            </div>
                            <p className="text-foreground/80 font-medium">
                                {category.description}
                            </p>
                        </div>

                        <div className="p-0">
                            {category.parables.map((parable, idx) => (
                                <div
                                    key={parable.title}
                                    className="p-4 border-b last:border-0 border-border/50 hover:bg-secondary/5 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                >
                                    <div>
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {parable.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground italic">
                                            {parable.meaning}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <VerseLink
                                            reference={parable.ref}
                                            className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/20 rounded-2xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
                <BookOpen className="w-12 h-12 text-primary mx-auto opacity-80" />
                <h2 className="text-3xl font-bold">Don't Just Read. Live Them.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    The parables demand a response. They ask: <em>Which soil are you? Are you ready for the return? Who is your neighbor?</em>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-primary/20">1</div>
                        <h4 className="font-bold">Study</h4>
                        <p className="text-sm text-muted-foreground">Read each reference in context. Ask what it reveals about God and man.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-primary/20">2</div>
                        <h4 className="font-bold">Memorize</h4>
                        <p className="text-sm text-muted-foreground">Commit the key verses to heart so they shape your worldview.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-primary/20">3</div>
                        <h4 className="font-bold">Live</h4>
                        <p className="text-sm text-muted-foreground">Put the Kingdom principles into practice today.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
