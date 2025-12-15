import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, History, ScrollText, Users, LandPlot, ExternalLink, Calendar, GitBranch } from 'lucide-react';
import { creeds, timelineEvents, denominations } from '../../data/churchHistoryData';
import type { Creed, TimelineEvent, Denomination } from '../../data/churchHistoryData';

export default function ChurchHistoryStudy() {
    const [activeTab, setActiveTab] = useState<'timeline' | 'creeds' | 'denominations'>('creeds');

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* Header */}
            <div className="space-y-6">
                <Link to="/bible/study" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Bible Study
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Church History</h1>
                        <p className="text-xl text-muted-foreground">
                            The story of the faith, the creeds that define it, and the branches of the family tree.
                        </p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/50">
                    <TabButton
                        active={activeTab === 'timeline'}
                        onClick={() => setActiveTab('timeline')}
                        icon={History}
                        label="Timeline"
                    />
                    <TabButton
                        active={activeTab === 'creeds'}
                        onClick={() => setActiveTab('creeds')}
                        icon={ScrollText}
                        label="Creeds"
                    />
                    <TabButton
                        active={activeTab === 'denominations'}
                        onClick={() => setActiveTab('denominations')}
                        icon={GitBranch}
                        label="Denominations"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'timeline' && <TimelineSection />}
                {activeTab === 'creeds' && <CreedsSection />}
                {activeTab === 'denominations' && <DenominationsSection />}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}

function TimelineSection() {
    // Sort events by year loosely (parsing the numeric part would be better but simple string sort is okay if format is consistent or list is pre-sorted)
    // We assume the list is pre-sorted chronologically in the data file.

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-2">Key Moments in Church History</h2>
                <p className="text-muted-foreground">
                    From the Day of Pentecost to the modern era, tracing the major turning points of the Christian faith.
                </p>
            </div>

            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12">
                {timelineEvents.map((event, index) => (
                    <div key={index} className="relative pl-8 md:pl-12">
                        {/* Dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background ${event.type === 'council' ? 'bg-amber-500' :
                            event.type === 'split' ? 'bg-red-500' :
                                event.type === 'reformation' ? 'bg-indigo-500' :
                                    'bg-primary'
                            }`} />

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                            <span className="font-bold text-primary font-mono text-lg">{event.year}</span>
                            <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                            {event.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CreedsSection() {
    return (
        <div className="space-y-8">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-2">The Ecumenical Creeds</h2>
                <p className="text-muted-foreground">
                    The detailed definitions of faith that have united Christians across centuries and continents.
                </p>
            </div>

            <div className="grid gap-8">
                {creeds.map((creed) => (
                    <div key={creed.id} className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="bg-muted/50 p-6 border-b border-border">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <h3 className="text-2xl font-bold text-primary">{creed.title}</h3>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-background border border-border/50 text-muted-foreground">
                                    {creed.date}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm max-w-3xl">
                                {creed.description}
                            </p>
                        </div>
                        <div className="p-8 bg-card relative">
                            <QuoteIcon className="absolute top-6 left-6 text-primary/5 w-16 h-16" />
                            <div className="relative font-serif text-lg leading-loose text-foreground/90 whitespace-pre-wrap pl-4 border-l-4 border-primary/20">
                                {creed.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DenominationsSection() {
    return (
        <div className="space-y-8">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-2">Major Denominational Families</h2>
                <p className="text-muted-foreground">
                    Understanding the distinctives, origins, and governance of the major branches of the Church.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {denominations.map((denom) => (
                    <div key={denom.id} className="flex flex-col bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{denom.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${denom.family === 'Protestant' ? 'bg-indigo-500/10 text-indigo-500' :
                                denom.family === 'Catholic' ? 'bg-amber-500/10 text-amber-500' :
                                    'bg-emerald-500/10 text-emerald-500'
                                }`}>
                                {denom.family}
                            </span>
                        </div>

                        <div className="space-y-4 text-sm flex-grow">
                            <div>
                                <strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Origin</strong>
                                <p>{denom.origin}</p>
                            </div>

                            <div>
                                <strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Key Beliefs</strong>
                                <div className="flex flex-wrap gap-2">
                                    {denom.keyBeliefs.map((belief, i) => (
                                        <span key={i} className="inline-block bg-muted px-2 py-1 rounded-md text-xs">
                                            {belief}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Governance</strong>
                                    <p>{denom.governance}</p>
                                </div>
                                <div>
                                    <strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Sacraments</strong>
                                    <p>{denom.sacraments}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function QuoteIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
        >
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
        </svg>
    );
}
