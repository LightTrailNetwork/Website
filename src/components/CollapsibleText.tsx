import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleTextProps {
    text: string;
    className?: string;
}

export const CollapsibleText: React.FC<CollapsibleTextProps> = ({ text, className = "" }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 300; // Character limit for preview

    if (!text) return null;

    if (text.length <= maxLength) {
        return <div className={`whitespace-pre-wrap leading-relaxed ${className}`}>{text}</div>;
    }

    return (
        <div className="flex flex-col items-start gap-2">
            <div className={`whitespace-pre-wrap leading-relaxed ${className} ${!isExpanded ? 'line-clamp-[10]' : ''}`}>
                {isExpanded ? text : text.slice(0, maxLength) + '...'}
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent click handlers
                    setIsExpanded(!isExpanded);
                }}
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1 mt-1"
            >
                {isExpanded ? (
                    <>
                        Show Less <ChevronUp className="h-3 w-3" />
                    </>
                ) : (
                    <>
                        Show More <ChevronDown className="h-3 w-3" />
                    </>
                )}
            </button>
        </div>
    );
};
