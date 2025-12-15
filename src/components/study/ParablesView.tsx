import React, { useState } from 'react';
import { BookOpen, Search, Filter, Wheat, Scale, Crown, HandHeart, Lightbulb, Coins } from 'lucide-react';
import { PARABLES, type Parable } from '../../data/studyData';
import VerseLink from './VerseLink';

const THEMES: { id: Parable['theme'] | 'All'; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'All', label: 'All Parables', icon: BookOpen, color: 'text-gray-600 dark:text-gray-400' },
    { id: 'Kingdom', label: 'Kingdom', icon: Crown, color: 'text-amber-600 dark:text-amber-400' },
    { id: 'Grace', label: 'Grace', icon: HandHeart, color: 'text-rose-600 dark:text-rose-400' },
    { id: 'Judgment', label: 'Judgment', icon: Scale, color: 'text-red-600 dark:text-red-400' },
    { id: 'Prayer', label: 'Prayer', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400' },
    { id: 'Stewardship', label: 'Stewardship', icon: Coins, color: 'text-emerald-600 dark:text-emerald-400' },
    { id: 'Wisdom', label: 'Wisdom', icon: Lightbulb, color: 'text-violet-600 dark:text-violet-400' },
];

export default function ParablesView() {
    const [selectedTheme, setSelectedTheme] = useState<Parable['theme'] | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredParables = PARABLES.filter(parable => {
        const matchesTheme = selectedTheme === 'All' || parable.theme === selectedTheme;
        const matchesSearch = parable.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parable.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTheme && matchesSearch;
    });

    const getThemeColor = (theme: string) => {
        const t = THEMES.find(t => t.id === theme);
        return t ? t.color : 'text-primary';
    };

    const getThemeIcon = (theme: string) => {
        const t = THEMES.find(t => t.id === theme);
        const Icon = t ? t.icon : BookOpen;
        return <Icon className={`w-4 h-4 ${t?.color}`} />;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-3">
                            <Wheat className="w-8 h-8" />
                            The Parables of Jesus
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            "I will open my mouth in parables; I will utter things hidden since the creation of the world." - <VerseLink reference="Matthew 13:35" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-10 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-sm">

                {/* Theme Filter */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                    {THEMES.map((theme) => {
                        const Icon = theme.icon;
                        const isSelected = selectedTheme === theme.id;
                        return (
                            <button
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                                    ${isSelected
                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                                        : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {theme.label}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search parables..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredParables.map((parable) => (
                    <div key={parable.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col hover:border-emerald-500/30">
                        {/* Header */}
                        <div className="p-5 border-b border-border bg-gradient-to-br from-secondary/30 to-background">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 px-2 py-1 rounded bg-background border border-border/50 text-xs font-semibold">
                                    {getThemeIcon(parable.theme)}
                                    <span className={getThemeColor(parable.theme)}>{parable.theme}</span>
                                </div>
                                <div className="flex gap-1">
                                    {parable.gospels.map(g => (
                                        <span key={g} title={g} className="text-[10px] font-bold text-muted-foreground/50 bg-secondary px-1 rounded uppercase cursor-help">
                                            {g.substring(0, 2)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {parable.title}
                            </h3>
                            <VerseLink reference={parable.reference} className="text-xs text-muted-foreground mt-1 block hover:text-emerald-500 transition-colors">
                                {parable.reference}
                            </VerseLink>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-grow space-y-4 flex flex-col">
                            <div className="flex-grow">
                                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-border pl-3 mb-4">
                                    "{parable.summary}"
                                </p>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                                <p className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                                    <Lightbulb className="w-3 h-3" /> Lesson
                                </p>
                                <p className="text-sm font-medium text-foreground/90">
                                    {parable.lesson}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredParables.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <Wheat className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">No parables found matching your search.</p>
                </div>
            )}
        </div>
    );
}
