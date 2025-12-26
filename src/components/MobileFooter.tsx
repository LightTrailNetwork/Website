import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { History, Columns, MessageSquare } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useScrollDirection } from '../hooks/useScrollDirection';

export default function MobileFooter() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        showMsb,
        setShowMsb,
        showCommentary,
        setShowCommentary,
        history
    } = useSettings();

    const [showHistory, setShowHistory] = useState(false);
    const { scrollDirection, isAtTop } = useScrollDirection();
    const isHidden = scrollDirection === 'down' && !isAtTop;

    // Check if we are on a Bible reading page
    const isReadingPage = location.pathname.startsWith('/bible/read');

    return (
        <>
            <div className={`fixed bottom-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50 sm:hidden transition-transform duration-300 pointer-events-none ${isHidden ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="flex items-center gap-4 relative">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className={`p-3 rounded-full transition-all duration-200 pointer-events-auto backdrop-blur-md shadow-sm border ${showHistory ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/60 text-muted-foreground border-border/50 hover:bg-background/80'}`}
                        title="History"
                    >
                        <History className="w-5 h-5" />
                    </button>
                </div>

                {isReadingPage && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowMsb(!showMsb)}
                            className={`p-3 rounded-full transition-all duration-200 pointer-events-auto backdrop-blur-md shadow-sm border ${showMsb ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/60 text-muted-foreground border-border/50 hover:bg-background/80'}`}
                            title="Compare MSB"
                        >
                            <Columns className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setShowCommentary(!showCommentary)}
                            className={`p-3 rounded-full transition-all duration-200 pointer-events-auto backdrop-blur-md shadow-sm border ${showCommentary ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/60 text-muted-foreground border-border/50 hover:bg-background/80'}`}
                            title="Commentary"
                        >
                            <MessageSquare className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* History Popover (Portal) */}
            {showHistory && createPortal(
                <>
                    <div className="fixed inset-0 z-[60] bg-background/20 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
                    <div className="fixed bottom-14 left-4 w-48 bg-popover border border-border rounded-lg shadow-xl z-[70] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="text-xs font-bold px-3 py-2 border-b border-border/50 bg-secondary/10 text-muted-foreground">
                            Recent History
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {history.length > 0 ? (
                                history.map((item, i) => (
                                    <button
                                        key={`${i}-${item.path}`}
                                        onClick={() => {
                                            navigate(item.path);
                                            setShowHistory(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-accent/10 transition-colors truncate ${location.pathname === item.path ? 'font-medium text-primary' : ''}`}
                                    >
                                        {item.label}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-xs text-muted-foreground text-center italic">
                                    No history yet
                                </div>
                            )}
                        </div>
                    </div>
                </>,
                document.body
            )}
        </>
    );
}
