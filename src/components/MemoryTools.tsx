import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function GraceView() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <Link to="/bible/memory" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Memory Hub
            </Link>

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">GRACE</h1>
                <p className="text-xl text-muted-foreground">The entire Bible narrative in one word.</p>
            </div>

            <div className="space-y-4">
                {[
                    { letter: 'G', word: 'God', desc: 'God created everything perfect.' },
                    { letter: 'R', word: 'Rebellion', desc: 'Man rebelled against God (Sin).' },
                    { letter: 'A', word: 'Atonement', desc: 'God provided a way back (Jesus).' },
                    { letter: 'C', word: 'Church', desc: 'The community of believers.' },
                    { letter: 'E', word: 'Eternity', desc: 'New Heaven and New Earth.' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center p-6 bg-card border border-border rounded-xl">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mr-6 shrink-0">
                            {item.letter}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{item.word}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CrownPathView() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <Link to="/bible/memory" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Memory Hub
            </Link>

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">CROWN PATH</h1>
                <p className="text-xl text-muted-foreground">9 words covering the major eras and figures.</p>
            </div>

            <div className="grid gap-4">
                {[
                    { word: 'Creation', desc: 'The beginning of all things.' },
                    { word: 'Rebellion', desc: 'The fall of man.' },
                    { word: 'Old Testament', desc: 'The history of Israel.' },
                    { word: 'Worship', desc: 'The Psalms and Wisdom literature.' },
                    { word: 'New Testament', desc: 'The coming of Christ.' },
                    { word: 'Paul', desc: 'The missionary journeys.' },
                    { word: 'Acts', desc: 'The early church.' },
                    { word: 'Teaching', desc: 'The Epistles.' },
                    { word: 'Hope', desc: 'Revelation and the end times.' }
                ].map((item, i) => (
                    <div key={i} className="p-4 bg-card border border-border rounded-lg flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-sm font-bold text-secondary mr-4 shrink-0">
                            {i + 1}
                        </div>
                        <div>
                            <span className="font-bold text-lg block">{item.word}</span>
                            <span className="text-sm text-muted-foreground">{item.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function John316View() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <Link to="/bible/memory" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Memory Hub
            </Link>

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">John 3:16</h1>
                <p className="text-xl text-muted-foreground">The gospel in a nutshell.</p>
            </div>

            <div className="p-8 bg-card border border-border rounded-xl shadow-sm text-center">
                <p className="text-2xl font-serif leading-relaxed">
                    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
                </p>
                <p className="mt-4 font-bold text-primary">— John 3:16 (NIV)</p>
            </div>
        </div>
    );
}

export function GatherAroundView() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <Link to="/bible/memory" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Memory Hub
            </Link>

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">GATHER AROUND...</h1>
                <p className="text-xl text-muted-foreground">Mnemonics for every book group in the Bible.</p>
            </div>

            <div className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-xl">
                    <h3 className="text-lg font-bold mb-2 text-primary">Old Testament</h3>
                    <p className="text-lg">
                        <span className="font-bold">G</span>enesis, <span className="font-bold">E</span>xodus, <span className="font-bold">L</span>eviticus, <span className="font-bold">N</span>umbers, <span className="font-bold">D</span>euteronomy...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">(Placeholder for full mnemonic)</p>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl">
                    <h3 className="text-lg font-bold mb-2 text-secondary">New Testament</h3>
                    <p className="text-lg">
                        <span className="font-bold">M</span>atthew, <span className="font-bold">M</span>ark, <span className="font-bold">L</span>uke, <span className="font-bold">J</span>ohn...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">(Placeholder for full mnemonic)</p>
                </div>
            </div>
        </div>
    );
}
