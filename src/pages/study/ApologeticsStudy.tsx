import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen, AlertTriangle, ShieldCheck, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { APOLOGETICS_DATA } from '../../data/apologeticsData';

export default function ApologeticsStudy() {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize from hash if present
    const [activeTab, setActiveTab] = useState(() => {
        const hash = location.hash.replace('#', '');
        const found = APOLOGETICS_DATA.find(c => c.id === hash);
        return found ? found.id : APOLOGETICS_DATA[0]!.id;
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state if needed

    // Sync URL hash when tab changes
    React.useEffect(() => {
        navigate(`#${activeTab}`, { replace: true });
    }, [activeTab, navigate]);

    const activeCategory = APOLOGETICS_DATA.find(c => c.id === activeTab) || APOLOGETICS_DATA[0]!;

    const filteredEntries = activeCategory.entries;

    return (
        <div className="max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="mb-8 space-y-4">
                <button
                    onClick={() => navigate('/bible/study')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Study Tools
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600">
                            Defense of the Faith
                        </h1>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Answering common objections from other worldviews.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-3 mb-2">Religions</h3>
                    {APOLOGETICS_DATA.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${activeTab === category.id
                                ? 'bg-primary/10 text-primary font-bold shadow-sm'
                                : 'hover:bg-accent/5 text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <span>{category.name}</span>
                            {activeTab === category.id && <ChevronRight className="w-4 h-4" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6 animate-in fade-in slide-in-from-right duration-300" key={activeTab}>

                    {/* Category Header */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{activeCategory.name}</h2>
                                <p className="text-muted-foreground">{activeCategory.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Entries List */}
                    <div className="space-y-6">
                        {filteredEntries.map(entry => (
                            <div key={entry.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                {/* Verse Header */}
                                <div className="bg-secondary/10 px-6 py-4 flex items-center justify-between border-b border-border/50">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                        <h3 className="font-bold text-lg">{entry.verse}</h3>
                                    </div>
                                    <button
                                        onClick={() => navigate(entry.referenceLink)}
                                        className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-primary/20 transition-colors"
                                    >
                                        Read Context <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                                    {/* Their Claim (Misuse) */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-destructive font-bold text-sm uppercase tracking-wide">
                                            <AlertTriangle className="w-4 h-4" />
                                            The Objection
                                        </div>
                                        <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-4 h-full">
                                            <p className="text-foreground/90 italic">"{entry.misuse}"</p>
                                        </div>
                                    </div>

                                    {/* The Truth (Refutation) */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wide">
                                            <ShieldCheck className="w-4 h-4" />
                                            The Truth
                                        </div>
                                        <div>
                                            <div className="mb-3">
                                                <span className="text-xs font-bold text-muted-foreground uppercase">Biblical Context:</span>
                                                <p className="text-sm text-foreground/80 mb-2">{entry.context}</p>
                                            </div>
                                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4">
                                                <p className="text-foreground/90">{entry.refutation}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
