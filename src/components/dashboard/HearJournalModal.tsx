import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Save } from 'lucide-react';

interface HearJournalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HearJournalModal({ isOpen, onClose }: HearJournalModalProps) {
    const [currentDate, setCurrentDate] = useState(new Date()); // For calendar navigation
    const [selectedDateKey, setSelectedDateKey] = useState(new Date().toLocaleDateString('en-CA')); // YYYY-MM-DD (local time)
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);

    // Initial Load
    useEffect(() => {
        if (isOpen) {
            const saved = localStorage.getItem('hearJournal');
            if (saved) {
                try {
                    setNotes(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse journal notes", e);
                }
            }
            // Reset to today when opening
            const today = new Date();
            setCurrentDate(today);
            setSelectedDateKey(today.toLocaleDateString('en-CA'));
        }
    }, [isOpen]);

    // Save Note
    const handleNoteChange = (content: string) => {
        const updated = { ...notes, [selectedDateKey]: content };
        // If content is empty, maybe we keep it as empty string or delete key? 
        // Keeping it is fine, simplifies logic.

        setNotes(updated);
        localStorage.setItem('hearJournal', JSON.stringify(updated));
    };

    // Mobile View State
    const [mobileView, setMobileView] = useState<'editor' | 'calendar'>('editor');

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen && mobileView === 'editor' && textareaRef.current) {
            const textarea = textareaRef.current;
            // Small timeout to ensure DOM is ready and transition is starting/done
            setTimeout(() => {
                textarea.focus();
                const len = textarea.value.length;
                textarea.setSelectionRange(len, len);
            }, 100);
        }
    }, [isOpen, mobileView, selectedDateKey]);

    if (!isOpen) return null;

    // --- Calendar Logic ---
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const generateCalendarGrid = () => {
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} />);
        }

        // Days of current month
        for (let d = 1; d <= daysInMonth; d++) {
            // Construct date string YYYY-MM-DD manually to avoid UTC shifts
            // Note: month is 0-indexed, so we add 1. Pad with 0.
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isSelected = dateKey === selectedDateKey;
            const hasNote = notes[dateKey] && notes[dateKey].trim().length > 0;
            const isToday = dateKey === new Date().toLocaleDateString('en-CA');

            days.push(
                <button
                    key={d}
                    onClick={() => {
                        setSelectedDateKey(dateKey);
                        setMobileView('editor'); // Switch back to editor on selection (mobile convenience)
                    }}
                    className={`
                        relative w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
                        ${isSelected ? 'bg-primary text-primary-foreground font-bold shadow-md scale-110' : 'hover:bg-secondary text-foreground'}
                        ${isToday && !isSelected ? 'ring-1 ring-primary text-primary font-semibold' : ''}
                    `}
                >
                    {d}
                    {hasNote && !isSelected && (
                        <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                    {hasNote && isSelected && (
                        <div className="absolute bottom-1 w-1 h-1 bg-primary-foreground rounded-full opacity-80"></div>
                    )}
                </button>
            );
        }
        return days;
    };

    const changeMonth = (delta: number) => {
        setCurrentDate(new Date(year, month + delta, 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDateKey(today.toLocaleDateString('en-CA'));
    };

    // Format selected date for display
    const formattedSelectedDate = new Date(selectedDateKey + "T12:00:00").toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });



    return (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                {/* Sidebar: Calendar (Hidden on mobile unless view is calendar) */}
                <div className={`
                    w-full md:w-80 bg-secondary/10 border-b md:border-b-0 md:border-r border-border p-6 flex-col gap-6 shrink-0 md:h-full overflow-y-auto
                    ${mobileView === 'calendar' ? 'flex' : 'hidden md:flex'}
                `}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
                            <CalendarIcon className="w-5 h-5" />
                            Journal
                        </h2>

                        {/* Mobile Back Button */}
                        <button
                            onClick={() => setMobileView('editor')}
                            className="p-2 hover:bg-secondary rounded-full md:hidden"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Calendar Widget */}
                    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center justify-between">
                                <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-secondary rounded-full">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <span className="font-semibold text-sm text-center">
                                    {monthNames[month]} {year}
                                </span>

                                <button onClick={() => changeMonth(1)} className="p-1 hover:bg-secondary rounded-full">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={goToToday}
                                className="text-[10px] font-bold text-primary hover:bg-primary/10 px-2 py-0.5 rounded transition-colors self-center uppercase tracking-wider"
                                title="Go to Today"
                            >
                                Today
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                <span key={i} className="text-[10px] text-muted-foreground font-medium uppercase">{d}</span>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 place-items-center">
                            {generateCalendarGrid()}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-1 uppercase tracking-wider text-[10px]">Stats</h3>
                        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Entries this month</span>
                                <span className="font-bold text-foreground">
                                    {Object.keys(notes).filter(k => k.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main: Editor (Hidden on mobile if view is calendar) */}
                <div className={`
                    flex-1 flex-col h-full bg-card relative
                    ${mobileView === 'editor' ? 'flex' : 'hidden md:flex'}
                `}>
                    {/* Header */}
                    <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            {/* Mobile Calendar Toggle */}
                            <button
                                onClick={() => setMobileView('calendar')}
                                className="p-2 bg-secondary/20 hover:bg-secondary/40 text-primary rounded-lg md:hidden transition-colors"
                            >
                                <CalendarIcon className="w-5 h-5" />
                            </button>

                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">{formattedSelectedDate}</h2>
                                <p className="text-muted-foreground text-xs md:text-sm">What is God saying to you today?</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Saving indicator could go here, currently instant */}
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Save className="w-3 h-3" />
                                <span className="hidden sm:inline">Saved</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="flex-1 p-6 overflow-hidden">
                        <textarea
                            ref={textareaRef}
                            className="w-full h-full resize-none bg-transparent border-none outline-none text-base md:text-lg text-foreground placeholder:text-muted-foreground/30 leading-relaxed font-sans"
                            placeholder="Start writing..."
                            value={notes[selectedDateKey] || ''}
                            onChange={(e) => handleNoteChange(e.target.value)}
                            spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
