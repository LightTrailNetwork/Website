import { Link } from 'react-router-dom';
import { Brain, Layers, Crown, Quote, Hash } from 'lucide-react';


export default function MemorizationHub() {
    const summaryTools = [
        {
            title: "1 Word",
            subtitle: "GRACE",
            description: "The entire Bible narrative in one word.",
            icon: Hash,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            link: "/bible/memory/grace"
        },
        {
            title: "2 Words",
            subtitle: "CROWN PATH",
            description: "9 words covering the major eras and figures.",
            icon: Crown,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            link: "/bible/memory/crown-path"
        },
        {
            title: "Hierarchical",
            subtitle: "Book > Chapter > Verse",
            description: "Deep dive with letter-based mnemonics.",
            icon: Brain,
            color: "text-green-500",
            bg: "bg-green-500/10",
            link: "/bible/memory/hierarchical"
        }
    ];

    const passageTools = [
        {
            title: "1 Sentence",
            subtitle: "John 3:16",
            description: "The gospel in a nutshell.",
            icon: Quote,
            color: "text-red-500",
            bg: "bg-red-500/10",
            link: "/bible/memory/sentence"
        },
        {
            title: "2 Sentences",
            subtitle: "GATHER AROUND...",
            description: "Mnemonics for every book group in the Bible.",
            icon: Layers,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            link: "/bible/memory/gather"
        },
        // Placeholder for future lists like Fruits of the Spirit
        {
            title: "Lists (Coming Soon)",
            subtitle: "Fruits of the Spirit, etc.",
            description: "Memorize key lists from scripture.",
            icon: Layers,
            color: "text-gray-500",
            bg: "bg-gray-500/10",
            link: "#"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">


            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Memorization Tools</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Choose a tool to start memorizing the narrative of Scripture or specific passages.
                </p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-border pb-2">Bible Summaries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {summaryTools.map((tool) => (
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
                                    {tool.title} <span className="text-muted-foreground font-normal">- {tool.subtitle}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {tool.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-border pb-2">Passages & Lists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {passageTools.map((tool) => (
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
                                    {tool.title} <span className="text-muted-foreground font-normal">- {tool.subtitle}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
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
