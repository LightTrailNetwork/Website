import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Link as LinkIcon, Settings, Info, ChevronRight } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    const menuItems = [
        { path: '/link', label: 'Link & QR', icon: LinkIcon, description: 'Connect with your triad' },
        { path: '/settings', label: 'Role & Settings', icon: Settings, description: 'Manage preferences' },
        { path: '/about', label: 'About & Privacy', icon: Info, description: 'App info & data' }
    ];

    return (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-bold">Settings & More</h2>
                    <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleNavigate(item.path)}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">{item.label}</h3>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>
                        );
                    })}
                </div>

                <div className="p-4 bg-secondary/5 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">More settings coming soon...</p>
                </div>
            </div>
        </div>
    );
}
