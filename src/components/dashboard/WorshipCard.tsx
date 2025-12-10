import React from 'react';
import { Sun, CheckCircle2, Circle, BookOpen, Heart, Mic2, Hourglass, PenLine, Users, HandHeart, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBibleLink } from '../../utils/linkUtils';

interface WorshipCardProps {
    completedTasks: string[];
    onToggle: (taskId: string | string[]) => void;
    readContent?: string;
}

export default function WorshipCard({ completedTasks, onToggle, readContent }: WorshipCardProps) {
    const readLink = readContent ? getBibleLink(readContent) : null;

    // Use 'anchor_prayer' instead of 'intercede' to sync with AnchorCard
    const items = [
        { id: 'worship', letter: 'W', label: 'Worship', desc: 'Begin with praise & thanksgiving', icon: Mic2 },
        { id: 'offer', letter: 'O', label: 'Offer', desc: 'Surrender your day to God', icon: Heart },
        {
            id: 'read',
            letter: 'R',
            label: 'Read',
            desc: readContent || 'Daily Devotional',
            icon: BookOpen,
            isLink: true
        },
        { id: 'silence', letter: 'S', label: 'Silence', desc: 'Sit quietly for 2 minutes', icon: Hourglass },
        { id: 'hear', letter: 'H', label: 'Hear', desc: 'Write down what God is saying', icon: PenLine },
        { id: 'anchor_prayer', letter: 'I', label: 'Intercede', desc: 'Pray for others (See Anchor)', icon: Users },
        { id: 'practice', letter: 'P', label: 'Practice', desc: 'One act of service today', icon: HandHeart },
    ];

    const allItemIds = items.map(i => i.id);
    const allCompleted = allItemIds.every(id => completedTasks.includes(id));

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
            <div className="p-4 border-b border-border bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                    <Sun className="w-5 h-5" />
                    <h3 className="font-bold tracking-wide text-sm uppercase">Morning W.O.R.S.H.I.P.</h3>
                </div>
                <button
                    onClick={() => onToggle(allItemIds)}
                    className="text-xs font-semibold flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded hover:bg-primary/10"
                    title={allCompleted ? 'Uncheck All' : 'Complete All'}
                >
                    {allCompleted ? <CheckCheck className="w-4 h-4 text-primary" /> : <CheckCheck className="w-4 h-4" />}
                    {allCompleted ? 'Done' : 'All'}
                </button>
            </div>

            <div className="divide-y divide-border flex-1">
                {items.map((item) => {
                    const isCompleted = completedTasks.includes(item.id);
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className={`flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors group cursor-pointer ${isCompleted ? 'bg-primary/5' : ''}`}
                            onClick={() => !item.isLink && onToggle(item.id)}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ring-1 ring-inset transition-colors ${isCompleted ? 'bg-primary text-primary-foreground ring-primary' : 'bg-secondary/50 text-muted-foreground ring-border'}`}>
                                    {item.letter}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h4 className={`font-medium text-sm transition-colors ${isCompleted ? 'text-primary' : 'text-foreground'}`}>
                                        {item.label}
                                    </h4>
                                    {/* For non-links, show checkbox here for easier access? Or whole row click */}
                                    {!item.isLink && (
                                        <button onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}>
                                            {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary animate-scale-in" /> : <Circle className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary/50" />}
                                        </button>
                                    )}
                                </div>

                                {item.isLink && readContent ? (
                                    <div className="flex items-center justify-between mt-1">
                                        {readLink ? (
                                            <Link
                                                to={readLink}
                                                className="text-lg font-semibold text-primary hover:underline truncate mr-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {readContent}
                                            </Link>
                                        ) : (
                                            <span className="text-lg font-semibold text-foreground/80 truncate mr-2">{readContent}</span>
                                        )}
                                        <button onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}>
                                            {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary animate-scale-in" /> : <Circle className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary/50" />}
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{item.desc}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
