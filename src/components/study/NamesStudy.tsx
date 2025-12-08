import { useState, useMemo } from 'react';
import { Search, Crown, Users, BookOpen, Anchor } from 'lucide-react';
import { GOD_NAMES, PEOPLE_NAMES, type NameEntry } from '../../data/biblicalNames';
import VerseLink from './VerseLink';

export default function NamesStudy() {
    const [activeTab, setActiveTab] = useState<'GOD' | 'PEOPLE'>('GOD');
    const [searchQuery, setSearchQuery] = useState('');

    const data = activeTab === 'GOD' ? GOD_NAMES : PEOPLE_NAMES;

    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        const q = searchQuery.toLowerCase();
        return data.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.transliteration.toLowerCase().includes(q) ||
            item.meaning.toLowerCase().includes(q)
        );
    }, [data, searchQuery]);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* Header */}
            <div className="text-center space-y-4 py-8">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-2">
                    <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">Biblical Names & Meanings</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore the original Hebrew meanings, origins, and significance of names in Scripture.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-card border border-border rounded-xl p-4 shadow-sm sticky top-20 z-10 backdrop-blur-md bg-opacity-95">
                {/* Tabs */}
                <div className="flex p-1 bg-secondary/20 rounded-lg">
                    <button
                        onClick={() => setActiveTab('GOD')}
                        className={`px-6 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'GOD'
                            ? 'bg-background shadow-sm text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Crown className="w-4 h-4" />
                        Names of God
                    </button>
                    <button
                        onClick={() => setActiveTab('PEOPLE')}
                        className={`px-6 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'PEOPLE'
                            ? 'bg-background shadow-sm text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        People
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'GOD' ? 'God\'s' : 'people\'s'} names...`}
                        className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                    <NameCard key={item.name} item={item} type={activeTab} />
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No names found matching "{searchQuery}"
                </div>
            )}
        </div>
    );
}

function NameCard({ item, type }: { item: NameEntry, type: 'GOD' | 'PEOPLE' }) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
            <div className={`p-6 border-b border-border/50 ${type === 'GOD' ? 'bg-amber-500/5' : 'bg-blue-500/5'}`}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                    </h3>
                    <div className="text-right">
                        <span className="block text-xl font-serif text-foreground/80 font-medium" lang="he" dir="rtl">
                            {item.hebrew}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            {item.transliteration}
                        </span>
                    </div>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-background border border-border text-sm font-semibold text-primary mt-2">
                    {item.meaning}
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col space-y-4">
                <p className="text-foreground/90 leading-relaxed flex-1">
                    {item.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/50 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">First Mention:</span>
                        <VerseLink reference={item.firstMention} className="text-primary hover:underline bg-primary/5 px-2 py-0.5 rounded" />
                    </div>

                    {item.role && (
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground font-medium">Role:</span>
                            <span className="text-foreground">{item.role}</span>
                        </div>
                    )}

                    {item.othersWithSameName && item.othersWithSameName.length > 0 && item.othersWithSameName[0] !== "None" && (
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground font-medium">Others with name:</span>
                            <div className="flex flex-wrap gap-1">
                                {item.othersWithSameName.map((other, idx) => (
                                    <span key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                                        {other}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
