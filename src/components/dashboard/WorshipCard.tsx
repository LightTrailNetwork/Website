import React from 'react';
import { Sun, CheckCircle2, Circle, BookOpen, Heart, Mic2, Hourglass, PenLine, Users, HandHeart, CheckCheck, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBibleLink } from '../../utils/linkUtils';

import HearJournalModal from './HearJournalModal';

interface WorshipCardProps {
    completedTasks: string[];
    onToggle: (taskId: string | string[]) => void;
    readContent?: string;
}

export default function WorshipCard({ completedTasks, onToggle, readContent }: WorshipCardProps) {
    const readLink = readContent ? getBibleLink(readContent) : null;

    // Timer State
    const [timeLeft, setTimeLeft] = React.useState(120);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [isJournalOpen, setIsJournalOpen] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('timerMuted') === 'true';
        }
        return false;
    });

    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Play Chime function using AudioContext (no external assets needed)
    const playChime = React.useCallback(() => {
        if (typeof window === 'undefined') return;
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Nice polite chime sound
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

            osc.start();
            osc.stop(ctx.currentTime + 1.5);
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }, []);

    // Timer Logic
    React.useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isTimerActive) {
            // Timer Finished
            setIsTimerActive(false);
            if (!isMuted) playChime();

            // Auto-complete the task if not already done
            if (!completedTasks.includes('silence')) {
                onToggle('silence');
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isTimerActive, timeLeft, isMuted, playChime, completedTasks, onToggle]);

    const toggleTimer = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (timeLeft === 0) {
            // Reset
            setTimeLeft(120);
            setIsTimerActive(true);
        } else {
            setIsTimerActive(!isTimerActive);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newState = !isMuted;
        setIsMuted(newState);
        localStorage.setItem('timerMuted', String(newState));
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')} `;
    };

    // Use 'anchor_prayer' instead of 'intercede' to sync with AnchorCard
    const items = [
        { id: 'worship', letter: 'W', label: 'Worship', desc: 'Begin with a song & praise', icon: Mic2 },
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
        { id: 'anchor_prayer', letter: 'I', label: 'Intercede', desc: 'Pray for others (See ANCHOR below)', icon: Users },
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
                    const isSilence = item.id === 'silence';
                    const isHear = item.id === 'hear';

                    // Determine if the timer UI should be active (either running or clearly manipulated)
                    const showTimerUI = isSilence && (isTimerActive || timeLeft < 120);

                    return (
                        <div
                            key={item.id}
                            className={`flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors group cursor-pointer ${isCompleted ? 'bg-primary/5' : ''}`}
                            onClick={() => {
                                if (item.isLink) return;
                                // Prevent toggling checkbox if we are clicking row for special tools
                                if (showTimerUI) return;
                                // If 'Hear', clicking row could toggle? Or should we force circle click?
                                // Use default behavior: clicking row toggles completion, unless specific tool overrides.
                                // User might prefer clicking row to open journal?
                                // "make the circle... the pencil icon as the action item".
                                // Implies circle is the action. Row click probably just checks it off.
                                onToggle(item.id);
                            }}
                        >
                            <div className="flex-shrink-0 mt-0.5" onClick={(e) => {
                                if (isSilence) toggleTimer(e);
                                if (isHear) {
                                    e.stopPropagation();
                                    setIsJournalOpen(true);
                                }
                            }}>
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ring-1 ring-inset transition-colors ${isSilence && (isTimerActive || timeLeft < 120)
                                        ? 'bg-primary text-primary-foreground ring-primary cursor-pointer hover:bg-primary/90' // Active Timer Style
                                        : isCompleted
                                            ? 'bg-primary text-primary-foreground ring-primary'
                                            : `bg-secondary/50 text-muted-foreground ring-border ${isSilence || isHear ? 'cursor-pointer hover:bg-secondary hover:text-foreground' : ''}`
                                    }`}>
                                    {isSilence && timeLeft > 0 ? (
                                        <Hourglass className={`w-4 h-4 ${isTimerActive ? "animate-pulse" : ""}`} />
                                    ) : isHear ? (
                                        <PenLine className="w-4 h-4" />
                                    ) : (
                                        item.letter
                                    )}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h4 className={`font-medium text-sm transition-colors ${isCompleted ? 'text-primary' : 'text-foreground'}`}>
                                        {item.label}
                                        {showTimerUI && timeLeft > 0 && (
                                            <span className="ml-2 font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                                                {formatTime(timeLeft)}
                                            </span>
                                        )}
                                    </h4>

                                    {/* Action Button: Checkbox or Mute */}
                                    {!item.isLink && (
                                        <div className="flex items-center gap-2">
                                            {showTimerUI && timeLeft > 0 && (
                                                <button
                                                    onClick={toggleMute}
                                                    className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                                    title={isMuted ? "Unmute" : "Mute"}
                                                >
                                                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                                </button>
                                            )}

                                            <button onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}>
                                                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-primary animate-scale-in" /> : <Circle className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary/50" />}
                                            </button>
                                        </div>
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
                                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                                        {showTimerUI
                                            ? (timeLeft === 0 ? "Completed" : (isTimerActive ? "Counting down..." : "Paused"))
                                            : item.desc}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <HearJournalModal
                isOpen={isJournalOpen}
                onClose={() => setIsJournalOpen(false)}
            />
        </div>
    );
}
