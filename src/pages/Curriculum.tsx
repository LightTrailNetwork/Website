import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { TABLE_MNEMONIC } from '../data/curriculumMnemonics';
import type { MnemonicNode } from '../data/curriculumMnemonics';

interface AccordionItemProps {
    node: MnemonicNode;
    depth?: number;
    parentPath?: string;
    expandedItems: Set<string>;
    toggleItem: (path: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ node, depth = 0, parentPath = '', expandedItems, toggleItem }) => {
    const hasChildren = node.subItems && node.subItems.length > 0;
    const currentPath = parentPath ? `${parentPath}/${node.term}` : node.term;
    const isOpen = expandedItems.has(currentPath);

    const toggle = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            toggleItem(currentPath);
        }
    };

    // Construct link URL to map to Table.tsx routing
    // Logic: /curriculum/table/section/subsection/topic
    const toSlug = (s: string) => s.toLowerCase().replace(/ /g, '-');

    let linkUrl = '#';
    if (depth === 0) {
        linkUrl = `/curriculum/table/${toSlug(node.term)}`;
    } else if (depth === 1) {
        const parentSlug = toSlug((parentPath || '').split('/').pop() || '');
        linkUrl = `/curriculum/table/${parentSlug}/${toSlug(node.term)}`;
    } else if (depth === 2 && parentPath) {
        const parts = parentPath.split('/');
        const rootSlug = toSlug(parts[0] || '');
        const subSlug = toSlug(parts[1] || '');
        linkUrl = `/curriculum/table/${rootSlug}/${subSlug}/${toSlug(node.term)}`;
    }

    // Split term into highlight (first char for main mnemonics) vs rest
    // This maintains the visual style of T.A.B.L.E.
    const startsWithChar = node.term.startsWith(node.char);
    const displayHighlight = startsWithChar ? node.char : '';
    const displayRest = startsWithChar ? node.term.substring(node.char.length) : node.term;

    return (
        <div className={`border-b border-border/50 last:border-0`}>
            {/* Main Row */}
            <div
                className={`w-full flex items-center gap-3 py-3 px-4 hover:bg-secondary/5 transition-colors text-left ${depth > 0 ? 'pl-' + (4 + depth * 4) : ''} ${hasChildren ? 'cursor-pointer' : ''}`}
                onClick={toggle}
            >
                <button
                    className={`w-5 h-5 flex items-center justify-center shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors ${hasChildren ? '' : 'invisible'}`}
                >
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Link
                            to={linkUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="text-base font-medium hover:underline decoration-primary/50 underline-offset-4"
                        >
                            {startsWithChar ? (
                                <>
                                    <span className="text-primary font-bold">{displayHighlight}</span>
                                    <span className="text-foreground/90">{displayRest}</span>
                                </>
                            ) : (
                                <span className="text-foreground/90">{node.term}</span>
                            )}
                        </Link>
                        {node.subMnemonic && (
                            <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground uppercase tracking-wide">
                                {node.subMnemonic}
                            </span>
                        )}
                    </div>
                    {node.description && (
                        <div className="text-sm text-muted-foreground mt-0.5 leading-relaxed max-w-2xl">
                            {node.description}
                        </div>
                    )}
                </div>
            </div>

            {/* Children */}
            {hasChildren && isOpen && (
                <div className="bg-secondary/5 border-t border-border/50">
                    {node.subItems!.map((child, idx) => (
                        <AccordionItem
                            key={idx}
                            node={child}
                            depth={depth + 1}
                            parentPath={currentPath}
                            expandedItems={expandedItems}
                            toggleItem={toggleItem}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Curriculum() {
    // Lifted state for expanded items
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleItem = (path: string) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    const expandAll = () => {
        const allPaths = new Set<string>();
        const traverse = (nodes: MnemonicNode[], parentPath = '') => {
            nodes.forEach(node => {
                const currentPath = parentPath ? `${parentPath}/${node.term}` : node.term;
                if (node.subItems && node.subItems.length > 0) {
                    allPaths.add(currentPath);
                    traverse(node.subItems, currentPath);
                }
            });
        };
        traverse(TABLE_MNEMONIC);
        setExpandedItems(allPaths);
    };

    const collapseAll = () => {
        setExpandedItems(new Set());
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-secondary/40 backdrop-blur-md border-b border-border sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                    Curriculum
                                </span>
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                The T.A.B.L.E. Mnemonic Structure
                            </p>
                        </div>

                        {/* Global Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={expandAll}
                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                                Expand All
                            </button>
                            <button
                                onClick={collapseAll}
                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
                            >
                                Collapse All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        {TABLE_MNEMONIC.map((node, idx) => (
                            <AccordionItem
                                key={idx}
                                node={node}
                                expandedItems={expandedItems}
                                toggleItem={toggleItem}
                            />
                        ))}
                    </div>

                    <div className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="shrink-0 pt-1">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Interactive Structure</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Click on any row to expand its details. The mnemonics (like ANCHORS, STORY, ETHOS) guide the structure of the curriculum, helping you memorize the key themes of discipleship.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
