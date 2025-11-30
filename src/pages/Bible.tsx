import { BookOpen, Brain, ChevronRight } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import BibleReader from '../components/BibleReader';
import BibleBookSummary from '../components/BibleBookSummary';
import MemorizationHub from '../components/MemorizationHub';
import HierarchicalMemory from '../components/HierarchicalMemory';
import { GraceView, CrownPathView, John316View, GatherAroundView } from '../components/MemoryTools';

import BibleBookSelector from '../components/BibleBookSelector';

function BibleHome() {
    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Bible & Memory Hub</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    "Thy word is a lamp unto my feet, and a light unto my path."
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content: Bible Reader & Book Selector */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Scripture Library</h2>
                            <p className="text-sm text-muted-foreground">Select a book to start reading</p>
                        </div>
                    </div>

                    <BibleBookSelector />
                </div>

                {/* Sidebar: Memorization Tools */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Brain className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Memorization</h2>
                                <p className="text-xs text-muted-foreground">Tools to hide the Word in your heart</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                to="/bible/memory"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">Dashboard</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Overview of all memory tools</p>
                            </Link>

                            <Link
                                to="/bible/memory/hierarchical"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">Hierarchical Memory</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Structure complex passages</p>
                            </Link>

                            <Link
                                to="/bible/memory/crown-path"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">CROWN PATH</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Visual memory journey</p>
                            </Link>

                            <Link
                                to="/bible/memory/grace"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">GRACE Method</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Systematic repetition</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Bible() {
    return (
        <Routes>
            <Route path="/" element={<BibleHome />} />
            <Route path="/read/:bookId" element={<BibleBookSummary />} />
            <Route path="/read/:bookId/:chapter" element={<BibleReader />} />
            <Route path="/read/:bookId/:chapter/:verseRange" element={<BibleReader />} />
            <Route path="/memory" element={<MemorizationHub />} />
            <Route path="/memory/hierarchical" element={<HierarchicalMemory />} />
            <Route path="/memory/grace" element={<GraceView />} />
            <Route path="/memory/crown-path" element={<CrownPathView />} />
            <Route path="/memory/sentence" element={<John316View />} />
            <Route path="/memory/gather" element={<GatherAroundView />} />
        </Routes>
    );
}
