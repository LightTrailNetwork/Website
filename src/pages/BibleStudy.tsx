import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen, Users, MapPin, Lightbulb, Pickaxe,
    ArrowRightLeft, GitMerge, Combine, Repeat,
    Hourglass, ListTree, History, Library, ArrowRight, ShieldQuestion, Scale, Crown, Tent, Zap, Wheat, Calendar, Megaphone, Microscope, Mountain
} from 'lucide-react';
import VerseLink from '../components/study/VerseLink';

interface StudyTool {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    path: string;
    status: 'ready' | 'beta' | 'planned';
}

interface StudyCategory {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    tools: StudyTool[];
}

export default function BibleStudy() {
    const navigate = useNavigate();

    const categories: StudyCategory[] = [
        {
            id: 'history',
            title: 'History & Geography',
            subtitle: 'Time & Place',
            color: 'emerald',
            tools: [
                { id: 'history', title: 'Church History', description: 'Creeds, Councils, Denominations & Timeline.', icon: History, path: '/bible/study/history', status: 'ready' },
                { id: 'timeline', title: 'Chronological Timeline', description: 'Events in the order they occurred.', icon: History, path: '/bible/study/timeline', status: 'ready' },
                { id: 'eras', title: 'Biblical Eras', description: 'The grand epochs of redemptive history.', icon: Hourglass, path: '/bible/study/eras', status: 'ready' },
                { id: 'exodus', title: 'Evidence for the Exodus', description: 'Route, Red Sea & Mt. Sinai evidence.', icon: Mountain, path: '/bible/study/exodus', status: 'ready' },
                { id: 'archaeology', title: 'Archaeological Evidence', description: 'Physical proof confirming the biblical record.', icon: Pickaxe, path: '/bible/study/archaeology', status: 'ready' },
                { id: 'translations', title: 'Bible Translations', description: 'History & comparison of versions.', icon: ArrowRightLeft, path: '/bible/study/translations', status: 'ready' },
                { id: 'places', title: 'Places & Maps', description: 'Geographic context for the unfolding narrative.', icon: MapPin, path: '/bible/study/places', status: 'ready' },
                { id: 'recounting', title: 'Recounting History', description: 'All the places where the story of the Bible is recounted.', icon: History, path: '/bible/study/recounting-history', status: 'ready' },
            ]
        },
        {
            id: 'biography',
            title: 'Biographies',
            subtitle: 'People of the Word',
            color: 'indigo',
            tools: [
                { id: 'apostles', title: 'The Twelve Apostles', description: 'Profiles of the Twelve + Matthias & Paul.', icon: Users, path: '/bible/study/apostles', status: 'ready' },
                { id: 'people', title: 'People Profiles', description: 'Key figures from Adam to the Early Church.', icon: Users, path: '/bible/study/people', status: 'ready' },
            ]
        },
        {
            id: 'theology',
            title: 'Theology & Themes',
            subtitle: 'Doctrine & Symbols',
            color: 'violet',
            tools: [
                { id: 'divinity', title: 'Claims of Divinity', description: 'Evidence of Jesus\' Godhood.', icon: ShieldQuestion, path: '/bible/study/divinity', status: 'ready' },
                { id: 'names', title: 'Divine Names', description: 'Names of God and Christ.', icon: Crown, path: '/bible/study/names', status: 'ready' },
                { id: 'themes', title: 'Biblical Themes', description: 'Major concepts like Redemption & Covenant.', icon: Lightbulb, path: '/bible/study/themes', status: 'ready' },
                { id: 'symbols', title: 'Motifs & Symbols', description: 'Water, Fire, Blood, Oil, etc.', icon: BookOpen, path: '/bible/study/symbols', status: 'ready' },
                { id: 'prophecy', title: 'Messianic Prophecies', description: 'OT Promises fulfilled in Christ.', icon: GitMerge, path: '/bible/study/prophecy', status: 'ready' },
            ]
        },
        {
            id: 'structure',
            title: 'Literary Structure',
            subtitle: 'Composition & Unity',
            color: 'amber',
            tools: [
                { id: 'outlines', title: 'Book Outlines', description: 'Structure and chiasms of each book.', icon: ListTree, path: '/bible/study/outlines', status: 'ready' },
                { id: 'patterns', title: 'Design Patterns', description: 'Literary structures and repeated motifs.', icon: Repeat, path: '/bible/study/patterns', status: 'ready' },
                { id: 'harmony', title: 'Gospel Harmony', description: 'Parallel accounts of Jesus\' life.', icon: Combine, path: '/bible/study/harmony', status: 'ready' },
                { id: 'continuity', title: 'Biblical Continuity', description: 'Addressing alleged contradictions.', icon: Scale, path: '/bible/study/continuity', status: 'ready' },
                { id: 'typology', title: 'Typology', description: 'Shadows of Christ in the OT.', icon: GitMerge, path: '/bible/study/typology', status: 'ready' },
            ]
        },
        {
            id: 'culture',
            title: 'Culture & Events',
            subtitle: 'Context & Power',
            color: 'rose',
            tools: [
                { id: 'feasts', title: 'Jewish Feasts', description: 'The 7 Levitical feasts and prophetic fulfillment.', icon: Tent, path: '/bible/study/feasts', status: 'ready' },
                { id: 'miracles', title: 'The Miracles of Jesus', description: 'The 37 recorded miracles of Christ.', icon: Zap, path: '/bible/study/miracles', status: 'ready' },
                { id: 'parables', title: 'The Parables of Jesus', description: 'Visual gallery of the 30+ parables.', icon: Wheat, path: '/bible/study/parables', status: 'ready' },
            ]
        },
        {
            id: 'ministry',
            title: 'Ministry & Mission',
            subtitle: 'Share & Serve',
            color: 'orange',
            tools: [
                { id: 'evangelism', title: 'Evangelism Guide', description: 'Methods, testimony builder & quick reference.', icon: Megaphone, path: '/bible/study/evangelism', status: 'ready' },
            ]

        },
        {
            id: 'apologetics',
            title: 'Apologetics',
            subtitle: 'Defend & Explain',
            color: 'rose',
            tools: [
                { id: 'religions', title: 'World Religions', description: 'Countering objections from Islam, Judaism, Mormonism & more.', icon: ShieldQuestion, path: '/bible/study/apologetics', status: 'ready' },
                { id: 'science', title: 'Science & Reason', description: 'Harmonizing Scripture with Cosmology, Biology & Physics.', icon: Microscope, path: '/bible/study/science', status: 'ready' },
            ]
        }
    ];

    const getGradient = (color: string) => {
        switch (color) {
            case 'indigo': return 'from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 border-indigo-200/50 dark:border-indigo-800/50';
            case 'amber': return 'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border-amber-200/50 dark:border-amber-800/50';
            case 'emerald': return 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-200/50 dark:border-emerald-800/50';
            case 'violet': return 'from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 border-violet-200/50 dark:border-violet-800/50';
            case 'rose': return 'from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 border-rose-200/50 dark:border-rose-800/50';
            case 'orange': return 'from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-orange-200/50 dark:border-orange-800/50';
            default: return 'from-gray-500/10 to-slate-500/10';
        }
    };

    const getIconColor = (color: string) => {
        switch (color) {
            case 'indigo': return 'text-indigo-600 dark:text-indigo-400';
            case 'amber': return 'text-amber-600 dark:text-amber-400';
            case 'emerald': return 'text-emerald-600 dark:text-emerald-400';
            case 'violet': return 'text-violet-600 dark:text-violet-400';
            case 'rose': return 'text-rose-600 dark:text-rose-400';
            case 'orange': return 'text-orange-600 dark:text-orange-400';
            default: return 'text-primary';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 px-4 sm:px-6">
            {/* Header Section */}
            <div className="text-center space-y-6 py-12">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4 animate-in zoom-in-50 duration-500">
                    <Library className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Bible Study Hub</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    "Tools to uncover the depth, patterns, and unity of Scripture."
                </p>
            </div>

            {/* Categories Grid */}
            <div className="space-y-12">
                {categories.map((category) => (
                    <div key={category.id} className="space-y-6">
                        <div className="flex items-end gap-4 border-b border-border/50 pb-2">
                            <h2 className={`text-2xl font-bold ${getIconColor(category.color)}`}>{category.title}</h2>
                            <span className="text-sm text-muted-foreground pb-1">{category.subtitle}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {category.tools.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => {
                                        if (tool.status === 'ready') {
                                            navigate(tool.path);
                                        }
                                        // TODO: Show "Coming Soon" toast for planned items
                                    }}
                                    className={`group relative flex flex-col p-6 rounded-2xl border bg-gradient-to-br ${getGradient(category.color)} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-left h-full`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/10 shadow-sm group-hover:scale-110 transition-transform duration-300 ${getIconColor(category.color)}`}>
                                            <tool.icon className="w-6 h-6" />
                                        </div>
                                        {tool.status === 'planned' && (
                                            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/50 text-muted-foreground border border-border/20">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors pr-6">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 flex-grow">
                                        {tool.description}
                                    </p>

                                    <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 ${getIconColor(category.color)}`}>
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quote / Footer Element */}
            <div className="pt-12 pb-8 text-center opacity-60">
                <p className="text-sm font-serif italic max-w-lg mx-auto">
                    "It is the glory of God to conceal a matter; to search out a matter is the glory of kings."
                    <br />
                    <span className="text-xs text-muted-foreground not-italic mt-1 block">
                        - <VerseLink reference="Proverbs 25:2" />
                    </span>
                </p>
            </div>
        </div>
    );
}
