import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Star, Heart, Shield, Award, Sparkles, Scroll } from 'lucide-react';

const PASSAGES = [
    {
        id: 'beatitudes',
        title: 'The Beatitudes',
        reference: 'Matthew 5:3-12',
        description: 'The opening blessings of the Sermon on the Mount, describing the character of the Kingdom citizens.',
        category: 'Teachings of Jesus',
        icon: Star,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10'
    },
    {
        id: 'lords-prayer',
        title: "The Lord's Prayer",
        reference: 'Matthew 6:9-13',
        description: 'The model prayer Jesus taught His disciples, focusing on God\'s glory and our needs.',
        category: 'Prayer',
        icon: Heart,
        color: 'text-red-500',
        bg: 'bg-red-500/10'
    },
    {
        id: 'psalm-23',
        title: 'Psalm 23',
        reference: 'Psalm 23',
        description: 'The Shepherd Psalm. A song of trust in God\'s guidance, provision, and protection.',
        category: 'Psalms',
        icon: Scroll,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        id: 'armor-of-god',
        title: 'The Armor of God',
        reference: 'Ephesians 6:10-18',
        description: 'Paul\'s exhortation to stand firm against spiritual forces using God\'s spiritual armor.',
        category: 'Spiritual Warfare',
        icon: Shield,
        color: 'text-slate-500',
        bg: 'bg-slate-500/10'
    },
    {
        id: 'love-chapter',
        title: 'The Love Chapter',
        reference: '1 Corinthians 13',
        description: 'The supreme definition of Christian love (agape) and its enduring nature.',
        category: 'Christian Living',
        icon: Heart,
        color: 'text-pink-500',
        bg: 'bg-pink-500/10'
    },
    {
        id: 'great-commission',
        title: 'The Great Commission',
        reference: 'Matthew 28:18-20',
        description: 'Jesus\' final command to make disciples of all nations, baptizing and teaching them.',
        category: 'Mission',
        icon: Sparkles,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    },
    {
        id: 'ten-commandments',
        title: 'The Ten Commandments',
        reference: 'Exodus 20:1-17',
        description: 'The moral law given by God to Moses on Mount Sinai.',
        category: 'Law',
        icon: Scroll,
        color: 'text-amber-600',
        bg: 'bg-amber-600/10'
    },
    {
        id: 'fruit-of-spirit',
        title: 'Fruit of the Spirit',
        reference: 'Galatians 5:22-23',
        description: 'The nine attributes of a life lived by the Holy Spirit.',
        category: 'Christian Living',
        icon: Award,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },
    {
        id: 'romans-8',
        title: 'Life in the Spirit',
        reference: 'Romans 8:1-39',
        description: 'The triumphant chapter on life in the Spirit, usually memorized in sections.',
        category: 'Theology',
        icon: Sparkles,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10'
    }
];

export default function MemoryPassages() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in">
            {/* Header */}
            <div className="py-8">
                <Link to="/bible/memory" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Memory Tools
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                    </div>
                    <h1 className="text-3xl font-bold">Famous Passages</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Essential texts every believer should carry in their heart.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PASSAGES.map((passage) => {
                    // Convert reference to URL friendly format
                    // e.g. "Matthew 5:3-12" -> "/bible/read/Matthew/5/3-12"
                    // "Psalm 23" -> "/bible/read/Psalms/23"
                    const parts = passage.reference.match(/^(\d?\s?[a-zA-Z]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
                    let url = '/bible/read/Matthew/1'; // fallback
                    if (parts) {
                        const book = parts[1].replace(/\s+/g, '');
                        const chapter = parts[2];
                        const start = parts[3];
                        const end = parts[4];
                        url = `/bible/read/${book}/${chapter}`;
                        if (start) {
                            url += `/${start}`;
                            if (end) url += `-${end}`;
                        }
                    }

                    return (
                        <Link
                            key={passage.id}
                            to={url}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all group flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${passage.bg}`}>
                                    <passage.icon className={`w-6 h-6 ${passage.color}`} />
                                </div>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-secondary text-secondary-foreground">
                                    {passage.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                {passage.title}
                            </h3>
                            <div className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {passage.reference}
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                                {passage.description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
                                <span className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    Start Memorizing <ArrowLeft className="w-3 h-3 rotate-180" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
