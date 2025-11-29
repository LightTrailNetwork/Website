import { BookOpen, Brain, ChevronRight } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import BibleReader from '../components/BibleReader';
import BibleBookSummary from '../components/BibleBookSummary';
import MemorizationHub from '../components/MemorizationHub';
import HierarchicalMemory from '../components/HierarchicalMemory';
import { GraceView, CrownPathView, John316View, GatherAroundView } from '../components/MemoryTools';

function BibleHome() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Bible & Memory</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Read the Word and hide it in your heart. Explore the scriptures with our reader or practice memorization with our hierarchical tools.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reader Card */}
                <Link
                    to="/bible/read/GEN/1"
                    className="group relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/50"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="w-24 h-24 text-primary" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                Bible Reader
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Read the Berean Standard Bible (BSB) with optional Majority Standard Bible (MSB) comparisons.
                            </p>
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary">
                            Start Reading <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                {/* Memory Tools Card */}
                <Link
                    to="/bible/memory"
                    className="group relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/50"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain className="w-24 h-24 text-primary" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Brain className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                Memorization Tools
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Master the scriptures using GRACE, CROWN PATH, and our unique hierarchical mnemonic system.
                            </p>
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary">
                            Start Practicing <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
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
