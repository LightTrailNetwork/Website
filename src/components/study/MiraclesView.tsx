import React, { useState } from 'react';
import { Zap, Wind, Activity, Sun, ShieldAlert, Wheat, Filter, MapPin } from 'lucide-react';
import { MIRACLES, type Miracle } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function MiraclesView() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Healing', 'Nature', 'Provision', 'Exorcism', 'Resurrection'];

    const filtered = selectedCategory === 'All'
        ? MIRACLES
        : MIRACLES.filter(m => m.category === selectedCategory);

    const getIcon = (category: string) => {
        switch (category) {
            case 'Healing': return <Activity className="w-5 h-5 text-red-500" />;
            case 'Nature': return <Wind className="w-5 h-5 text-blue-500" />; // Note: Lucide 'Wind' is lowerCamel vs Pascal? Checking imports.
            case 'Provision': return <Wheat className="w-5 h-5 text-amber-500" />;
            case 'Exorcism': return <ShieldAlert className="w-5 h-5 text-purple-500" />;
            case 'Resurrection': return <Sun className="w-5 h-5 text-yellow-500" />;
            default: return <Zap className="w-5 h-5 text-orange-500" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Healing': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
            case 'Nature': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'Provision': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
            case 'Exorcism': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
            case 'Resurrection': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
            default: return 'bg-secondary text-foreground';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-3">
                            <Zap className="w-8 h-8" />
                            The Miracles of Jesus
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            "Believe me that I am in the Father and the Father is in me, or else believe on account of the works themselves." (John 14:11)
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedCategory === cat
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(miracle => (
                    <div key={miracle.id} className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                        <div className="p-6 flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className={`p-2 rounded-lg ${getCategoryColor(miracle.category)}/20`}>
                                    {/*  Fixing icon coloring/background logic */}
                                    <div className="opacity-100 mix-blend-normal">
                                        {getIcon(miracle.category)}
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${getCategoryColor(miracle.category)}`}>
                                    {miracle.category}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    {miracle.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <MapPin className="w-3 h-3" />
                                    {miracle.location}
                                </div>
                            </div>

                            <p className="text-sm text-foreground/80 leading-relaxed">
                                {miracle.description}
                            </p>
                        </div>

                        <div className="px-6 py-4 border-t border-border bg-secondary/30 rounded-b-xl flex justify-between items-center">
                            <VerseLink
                                reference={miracle.scripture}
                                className="text-xs font-medium text-primary hover:underline"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No miracles found for this category.
                </div>
            )}
        </div>
    );
}
