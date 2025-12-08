import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, BookOpen, ChevronRight } from 'lucide-react';
import { MNEMONIC_SYSTEMS } from '../data/mnemonicSystems';

export default function MnemonicSystemHub() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in space-y-12">
            {/* Header */}
            <div className="pt-8 text-center space-y-4">
                <Link to="/bible/memory" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Memory Tools
                </Link>
                <div className="flex justify-center">
                    <div className="p-3 bg-indigo-500/10 rounded-full">
                        <Brain className="w-8 h-8 text-indigo-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Systematic Mnemonics</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Advanced memory aids, acrostics, and systems for deep retention of biblical lists and concepts.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MNEMONIC_SYSTEMS.map((system) => (
                    <Link
                        key={system.id}
                        to={`/bible/memory/mnemonics/${system.id}`}
                        className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all"
                    >
                        <div className="p-6 flex-1 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                    {system.title}
                                </h3>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">
                                    {system.subtitle}
                                </div>
                            </div>
                            <p className="text-foreground/80 line-clamp-3">
                                {system.description}
                            </p>
                            {system.mnemonicPhrase && (
                                <div className="p-3 bg-secondary/10 rounded-lg text-sm font-mono text-primary/80 break-words">
                                    {system.mnemonicPhrase}
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-secondary/5 border-t border-border flex items-center justify-between text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                            <span>{system.items.length} Items</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
