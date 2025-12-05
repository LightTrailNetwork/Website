import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


export function GraceView() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-blue-500">GRACE</h1>
                <p className="text-xl text-muted-foreground">God's Riches At Christ's Expense</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                    {['G', 'R', 'A', 'C', 'E'].map((letter, i) => (
                        <div key={i} className="p-4 bg-secondary/10 rounded-lg">
                            <span className="text-2xl font-bold text-foreground">{letter}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-4 text-left max-w-2xl mx-auto mt-8">
                    {[
                        { letter: 'G', word: 'God', desc: 'God created everything perfect.' },
                        { letter: 'R', word: 'Rebellion', desc: 'Man rebelled against God (Sin).' },
                        { letter: 'A', word: 'Atonement', desc: 'God provided a way back (Jesus).' },
                        { letter: 'C', word: 'Church', desc: 'The community of believers.' },
                        { letter: 'E', word: 'Eternity', desc: 'New Heaven and New Earth.' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center p-4 bg-card border border-border rounded-xl">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary mr-4 shrink-0">
                                {item.letter}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{item.word}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CrownPathView() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-yellow-500">CROWN PATH</h1>
                <p className="text-xl text-muted-foreground">9 Words covering the major eras</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    {[
                        { word: 'Creation', desc: 'The beginning of all things.' },
                        { word: 'Rebellion', desc: 'The fall of man.' },
                        { word: 'Promise', desc: 'God calls Abraham.' },
                        { word: 'Nation', desc: 'Israel becomes a people.' },
                        { word: 'Wander', desc: '40 years in the desert.' },
                        { word: 'Land', desc: 'Conquest of Canaan.' },
                        { word: 'Kings', desc: 'United and Divided Kingdom.' },
                        { word: 'Exile', desc: '70 years in Babylon.' },
                        { word: 'Return', desc: 'Rebuilding the Temple.' }
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-secondary/10 rounded-lg flex flex-col items-center justify-center text-center h-32">
                            <span className="text-lg font-bold text-foreground mb-2">{item.word}</span>
                            <span className="text-xs text-muted-foreground">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function John316View() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-red-500">John 3:16</h1>
                <blockquote className="text-2xl font-serif italic text-foreground leading-relaxed my-8">
                    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
                </blockquote>
                <p className="text-muted-foreground font-bold">- NIV Translation</p>
            </div>
        </div>
    );
}

export function GatherAroundView() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6 shadow-lg">
                <h1 className="text-4xl font-bold text-purple-500">GATHER AROUND...</h1>
                <p className="text-xl text-muted-foreground">Mnemonics for every book group</p>

                <div className="space-y-6 mt-8 text-left max-w-2xl mx-auto">
                    <div className="p-6 bg-secondary/5 border border-border rounded-xl">
                        <h3 className="text-lg font-bold mb-2 text-primary">Old Testament</h3>
                        <p className="text-lg">
                            <span className="font-bold">G</span>enesis, <span className="font-bold">E</span>xodus, <span className="font-bold">L</span>eviticus, <span className="font-bold">N</span>umbers, <span className="font-bold">D</span>euteronomy...
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">(Placeholder for full mnemonic)</p>
                    </div>
                    <div className="p-6 bg-secondary/5 border border-border rounded-xl">
                        <h3 className="text-lg font-bold mb-2 text-secondary">New Testament</h3>
                        <p className="text-lg">
                            <span className="font-bold">M</span>atthew, <span className="font-bold">M</span>ark, <span className="font-bold">L</span>uke, <span className="font-bold">J</span>ohn...
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">(Placeholder for full mnemonic)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
