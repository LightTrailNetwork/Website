import { useRef, useEffect } from 'react';
import { X, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                // Optional: Decide if we want to allow closing by clicking outside.
                // For a welcome modal, it's usually better to force an action or explicit close,
                // but for UX friendliness, let's allow it.
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleLearnMore = () => {
        navigate('/about');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                ref={modalRef}
                className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 slide-in-from-bottom-2"
            >
                <div className="relative p-6 space-y-6">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/50 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header content */}
                    <div className="text-center pt-2 space-y-4">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2 ring-1 ring-primary/20">
                            <Info className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground">Welcome to the Trail</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            We're glad you're here. The Light Trail Network is a digital companion designed to support brotherhood, discipline, and spiritual growth.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                        <button
                            onClick={handleLearnMore}
                            className="w-full btn btn-primary py-4 px-6 text-lg font-semibold shadow-xl shadow-primary/20 group flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <span>How it Works</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full" />
            </div>
        </div>
    );
}
