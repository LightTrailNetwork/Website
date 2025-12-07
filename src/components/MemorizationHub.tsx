import { Link } from 'react-router-dom';
import { Brain, Layers, Crown, Quote, Hash, List, Sparkles, BookOpen } from 'lucide-react';


export default function MemorizationHub() {
    const pyramidLevels = [
        {
            level: 1,
            title: "1 Word Identity",
            subtitle: "GRACE",
            description: "The entire Bible narrative summarized in a single word acronym.",
            icon: Hash,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            link: "/bible/memory/grace",
            width: "max-w-md"
        },
        {
            level: 2,
            title: "2 Word Timeline",
            subtitle: "CROWN PATH",
            description: "9 words covering the major eras and figures of the Old and New Testaments.",
            icon: Crown,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            link: "/bible/memory/crown-path",
            width: "max-w-lg"
        },
        {
            level: 3,
            title: "1 Sentence Gospel",
            subtitle: "John 3:16",
            description: "The heart of the Gospel message in a single verse.",
            icon: Quote,
            color: "text-red-500",
            bg: "bg-red-500/10",
            link: "/bible/memory/sentence",
            width: "max-w-xl"
        },
        {
            level: 4,
            title: "2 Sentence Framework",
            subtitle: "GATHER AROUND...",
            description: "Mnemonics for every book group in the Old and New Testaments.",
            icon: Layers,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            link: "/bible/memory/gather",
            width: "max-w-2xl"
        },
        {
            level: 5,
            title: "Hierarchical Mnemonics",
            subtitle: "Book > Chapter > Verse",
            description: "Deep dive learning with detailed mnemonics for every chapter.",
            icon: Brain,
            color: "text-green-500",
            bg: "bg-green-500/10",
            link: "/bible/memory/hierarchical",
            width: "max-w-3xl"
        }
    ];

    const collections = [
        {
            title: "Famous Passages",
            subtitle: "Key Scriptures",
            description: "Curated list of essential Bible passages to memorize.",
            icon: Sparkles,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            link: "/bible/memory/passages" // Placeholder route
        },
        {
            title: "Important Lists",
            subtitle: "Fruits, Armor, etc.",
            description: "Memorize key lists like the Fruits of the Spirit, Armor of God, etc.",
            icon: List,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            link: "/bible/memory/lists" // Placeholder route
        }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4 pb-20">
            {/* Header */}
            <div className="text-center space-y-4 pt-8">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">Bible Memory Pyramid</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A structured approach to internalizing Scripture, starting from the big picture down to the details.
                </p>

                {/* Quick Nav */}
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <button
                        onClick={() => scrollToSection('pyramid')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
                    >
                        <Layers className="w-4 h-4" />
                        The Pyramid
                    </button>
                    <button
                        onClick={() => scrollToSection('collections')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
                    >
                        <BookOpen className="w-4 h-4" />
                        Collections
                    </button>
                </div>
            </div>

            {/* The Pyramid */}
            <section id="pyramid" className="space-y-4 flex flex-col items-center scroll-mt-24">
                {pyramidLevels.map((tool) => (
                    <Link
                        key={tool.title}
                        to={tool.link}
                        className={`w-full ${tool.width} group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all transform hover:-translate-y-1`}
                    >
                        {/* Level Badge - Relative on mobile, Absolute on desktop */}
                        <div className="mb-2 sm:mb-0 sm:absolute sm:top-4 sm:right-4 inline-flex self-start text-xs font-bold px-2 py-1 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            Level {tool.level}
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${tool.bg} shrink-0`}>
                                <tool.icon className={`w-6 h-6 ${tool.color}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                                    {tool.title}
                                    <span className="hidden sm:inline-block text-muted-foreground font-medium text-sm px-0">|</span>
                                    <span className="text-muted-foreground group-hover:text-primary/80 font-medium text-sm sm:text-base transition-colors w-full sm:w-auto">{tool.subtitle}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                    {tool.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>

            {/* Collections Section */}
            <section id="collections" className="space-y-6 pt-8 border-t border-border scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">Collections</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {collections.map((tool) => (
                        <Link
                            key={tool.title}
                            to={tool.link}
                            className="flex items-start p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all hover:border-primary/50 group"
                        >
                            <div className={`p-3 rounded-lg ${tool.bg} mr-4`}>
                                <tool.icon className={`w-6 h-6 ${tool.color}`} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-sm text-secondary-foreground font-medium mb-1">{tool.subtitle}</p>
                                <p className="text-sm text-muted-foreground">
                                    {tool.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
