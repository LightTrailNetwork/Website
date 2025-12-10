import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { tableFullContent, type TableRow } from '../data/tableFullContent';
import { ACROSTIC_DATA } from '../data/acrosticDetails';
import { BookOpen, Users, Shield, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';

// Helper to slugify consistent with Curriculum.tsx
const slugify = (text: string) => text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const RoleContent: React.FC<{ row: TableRow; roles: { mentee: boolean; mentor: boolean; steward: boolean } }> = ({ row, roles }) => {
    // If NO roles selected, show ALL (default). If ANY selected, show ONLY those.
    const showAll = !roles.mentee && !roles.mentor && !roles.steward;
    const showMentee = showAll || roles.mentee;
    const showMentor = showAll || roles.mentor;
    const showSteward = showAll || roles.steward;

    return (
        <div className="grid grid-cols-1 gap-6 mt-6">
            {/* Mentee */}
            {showMentee && row.mentee && (
                <div className="bg-blue-50/50 dark:bg-blue-950/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-400">
                        <BookOpen className="w-4 h-4" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Mentee</h4>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                        {row.mentee}
                    </div>
                </div>
            )}

            {/* Mentor */}
            {showMentor && row.mentor && (
                <div className="bg-purple-50/50 dark:bg-purple-950/10 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-center gap-2 mb-3 text-purple-700 dark:text-purple-400">
                        <Users className="w-4 h-4" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Mentor</h4>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                        {row.mentor}
                    </div>
                </div>
            )}

            {/* Steward */}
            {showSteward && row.steward && (
                <div className="bg-amber-50/50 dark:bg-amber-950/10 rounded-xl p-5 border border-amber-100 dark:border-amber-900/30">
                    <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
                        <Shield className="w-4 h-4" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Steward</h4>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                        {row.steward}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function CurriculumTable() {
    const params = useParams<{ section?: string; subsection?: string; topic?: string }>();
    const [roles, setRoles] = useState({ mentee: false, mentor: false, steward: false });

    // Scroll sync
    const { scrollDirection, isAtTop } = useScrollDirection();
    const isMainHeaderHidden = scrollDirection === 'down' && !isAtTop;

    // Auto-expand state: Record<sectionSlug, boolean>
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});

    // Parse data structure
    const groupedContent = useMemo(() => {
        return tableFullContent.reduce((acc, row) => {
            const section = row.section || 'General';
            const subsection = row.subsection || 'General'; // e.g. "Axioms (PhilEMOn)"

            if (!acc[section]) acc[section] = {};
            if (!acc[section][subsection]) acc[section][subsection] = [];

            acc[section][subsection].push(row);
            return acc;
        }, {} as Record<string, Record<string, TableRow[]>>);
    }, []);

    // Effect: Handle Params -> Auto Expand & Scroll
    useEffect(() => {
        if (params.section) {
            // Find section key that slugs to params.section
            const matchingSection = Object.keys(groupedContent).find(k => slugify(k) === params.section);
            if (matchingSection) {
                setExpandedSections(prev => ({ ...prev, [matchingSection]: true }));

                if (params.subsection) {
                    const subsections = groupedContent[matchingSection] || {};
                    // Subsection key is like "Axioms (PhilEMOn)"
                    // params.subsection might be "axioms" OR "theology" (topic search)

                    let matchingSub = Object.keys(subsections).find(k => {
                        const main = k.split('(')[0].trim();
                        return slugify(main) === params.subsection || slugify(k) === params.subsection;
                    });

                    let targetTopic = params.topic;

                    // If NO direct subsection match, search for a topic that matches params.subsection
                    if (!matchingSub) {
                        const potentialSub = Object.keys(subsections).find(k => {
                            const rows = subsections[k] || [];
                            return rows.some(r => r.topic && slugify(r.topic) === params.subsection);
                        });
                        if (potentialSub) {
                            matchingSub = potentialSub;
                            // Treat params.subsection as the topic to scroll to
                            targetTopic = params.subsection;
                        }
                    }

                    if (matchingSub) {
                        setExpandedSubsections(prev => ({ ...prev, [matchingSub]: true }));

                        // Scroll to topic if present
                        if (targetTopic) {
                            setTimeout(() => {
                                const subKeySlug = slugify(matchingSub);
                                const sectionSlug = slugify(matchingSection);
                                const topicId = `${sectionSlug}/${subKeySlug}/${targetTopic}`;
                                // Note: topic elements need to match this ID format
                                const el = document.getElementById(topicId);
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                } else {
                                    // Fallback: scroll to subsection if topic not found
                                    const subId = `${sectionSlug}/${subKeySlug}`;
                                    const subEl = document.getElementById(subId);
                                    if (subEl) subEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }, 500); // Delay for expansion animation
                        } else {
                            // Scroll to subsection
                            setTimeout(() => {
                                const subId = `${slugify(matchingSection)}/${slugify(matchingSub)}`;
                                const el = document.getElementById(subId);
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 300);
                        }
                    } else {
                        // Just scroll to section
                        setTimeout(() => {
                            const secId = slugify(matchingSection);
                            const el = document.getElementById(secId);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 200);
                    }
                }
            }
        }
    }, [params, groupedContent]);


    const toggleRole = (role: keyof typeof roles) => {
        setRoles(prev => ({ ...prev, [role]: !prev[role] }));
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Controls */}
            <div className={`bg-secondary/40 backdrop-blur-md border-b border-border sticky z-10 shadow-sm transition-all duration-300 ${isMainHeaderHidden ? 'top-0' : 'top-16'}`}>
                <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Curriculum Reference</h1>
                        <p className="text-xs text-muted-foreground hidden md:block">Interactive T.A.B.L.E. Guide</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground mr-2 uppercase tracking-wide">Filters:</span>
                        <button
                            onClick={() => toggleRole('mentee')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${roles.mentee ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'bg-background/50 border-border text-muted-foreground hover:bg-secondary'}`}
                        >
                            <BookOpen className="w-3 h-3" /> Mentee
                        </button>
                        <button
                            onClick={() => toggleRole('mentor')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${roles.mentor ? 'bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400' : 'bg-background/50 border-border text-muted-foreground hover:bg-secondary'}`}
                        >
                            <Users className="w-3 h-3" /> Mentor
                        </button>
                        <button
                            onClick={() => toggleRole('steward')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${roles.steward ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400' : 'bg-background/50 border-border text-muted-foreground hover:bg-secondary'}`}
                        >
                            <Shield className="w-3 h-3" /> Steward
                        </button>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
                {Object.keys(groupedContent).map((section) => {
                    const sectionSlug = slugify(section);
                    const isExpanded = !!expandedSections[section];
                    const subsections = groupedContent[section] || {};

                    // Find associated Mnemonic/Acrostic for this section
                    // We look for any week that matches this Area
                    const acrosticData = Object.values(ACROSTIC_DATA).find(a => a.area === section);
                    const subMnemonic = acrosticData?.subMnemonic; // e.g. "ANCHORS"

                    return (
                        <div key={section} id={sectionSlug} className="scroll-mt-24 border border-border rounded-xl bg-card overflow-hidden shadow-sm">
                            {/* Section Header */}
                            <button
                                onClick={() => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))}
                                className="w-full flex items-center justify-between p-6 hover:bg-secondary/5 transition-colors text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-all duration-200 ${isExpanded ? 'rotate-90 text-primary' : 'text-muted-foreground'}`}>
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-bold tracking-tight">{section}</h2>
                                            {subMnemonic && (
                                                <span className="text-sm font-bold px-2 py-0.5 rounded bg-primary/10 text-primary tracking-widest border border-primary/20">
                                                    {subMnemonic.split('').join('.')}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{Object.keys(subsections).length} Subsections</p>
                                    </div>
                                </div>
                            </button>

                            {/* Section Content */}
                            {isExpanded && (
                                <div className="px-6 pb-6 space-y-4 border-t border-border/50 bg-secondary/5 animate-in slide-in-from-top-2 duration-300">
                                    {Object.entries(subsections).map(([subsection, rows]) => {
                                        const mainTitle = subsection.split('(')[0].trim();
                                        const subSlug = slugify(subsection);
                                        const subsectionId = `${sectionSlug}/${subSlug}`;
                                        const isSubExpanded = !!expandedSubsections[subsection];

                                        const titleParts = subsection.split('(');
                                        const displayTitle = titleParts[0].trim();
                                        const subMeta = titleParts[1] ? titleParts[1].replace(')', '') : '';

                                        return (
                                            <div key={subsection} id={subsectionId} className="scroll-mt-24 border border-border/60 rounded-lg bg-background overflow-hidden relative">
                                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isSubExpanded ? 'bg-primary' : 'bg-transparent'} transition-colors duration-200`} />
                                                <button
                                                    onClick={() => setExpandedSubsections(prev => ({ ...prev, [subsection]: !prev[subsection] }))}
                                                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors text-left pl-5"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`transition-transform duration-200 ${isSubExpanded ? 'rotate-90 text-foreground' : 'text-muted-foreground/50'}`}>
                                                            <ChevronRight className="w-4 h-4" />
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-foreground">{displayTitle}</h3>
                                                        {subMeta && (
                                                            <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-bold text-muted-foreground uppercase tracking-wide border border-border/50">
                                                                {subMeta}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>

                                                {isSubExpanded && (
                                                    <div className="p-4 pt-0 space-y-8 animate-in slide-in-from-top-1 duration-200 pl-8">
                                                        <div className="h-px bg-border/50 w-full mb-6" />
                                                        {rows.map((row, idx) => {
                                                            // ID: section/sub/topic
                                                            // We used subsection raw slug for ID previously, make sure it matches expansion logic
                                                            const topicSlug = row.topic ? slugify(row.topic) : 'general';
                                                            const topicId = `${subsectionId}/${topicSlug}`;

                                                            return (
                                                                <article key={idx} id={topicId} className="scroll-mt-32">
                                                                    {row.topic ? (
                                                                        <div className="mb-4 flex items-center gap-2">
                                                                            <div className="h-2 w-2 bg-primary rounded-full hidden sm:block"></div>
                                                                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{row.topic}</h3>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="mb-4">
                                                                            <span className="px-2 py-1 rounded bg-secondary text-xs font-medium text-muted-foreground border border-border">General Overview</span>
                                                                        </div>
                                                                    )}

                                                                    <RoleContent row={row} roles={roles} />
                                                                </article>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
