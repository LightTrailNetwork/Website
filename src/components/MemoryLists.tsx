import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ArrowLeft, ChevronDown, ChevronUp, Users, MapPin, Sun, Shield, Layers, MessageSquare } from 'lucide-react';
import VerseLink from './study/VerseLink'; // Assuming reuse of VerseLink for references

interface MemoryList {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    description: string;
    items: { label: string; ref?: string; note?: string }[];
}

const LISTS: MemoryList[] = [
    {
        id: '12-apostles',
        title: 'The 12 Apostles',
        subtitle: 'Matthew 10:2-4',
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        description: 'The twelve disciples chosen by Jesus to be His primary messengers.',
        items: [
            { label: 'Simon Peter', note: 'Brother of Andrew' },
            { label: 'Andrew', note: 'Brother of Peter' },
            { label: 'James (Son of Zebedee)', note: 'Brother of John' },
            { label: 'John', note: 'Brother of James' },
            { label: 'Philip' },
            { label: 'Bartholomew' },
            { label: 'Thomas' },
            { label: 'Matthew', note: 'The tax collector' },
            { label: 'James (Son of Alphaeus)' },
            { label: 'Thaddaeus', note: 'Also known as Lebbaeus or Judas son of James' },
            { label: 'Simon the Zealot' },
            { label: 'Judas Iscariot', note: 'Who betrayed Him (replaced by Matthias)' }
        ]
    },
    {
        id: 'creation-days',
        title: 'Days of Creation',
        subtitle: 'Genesis 1',
        icon: Sun,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        description: 'The six days of creation and the seventh day of rest.',
        items: [
            { label: 'Day 1', note: 'Light (Day/Night)', ref: 'Genesis 1:3-5' },
            { label: 'Day 2', note: 'Sky/Atmosphere (separating waters)', ref: 'Genesis 1:6-8' },
            { label: 'Day 3', note: 'Land, Seas, Vegetation', ref: 'Genesis 1:9-13' },
            { label: 'Day 4', note: 'Sun, Moon, Stars', ref: 'Genesis 1:14-19' },
            { label: 'Day 5', note: 'Birds and Sea Creatures', ref: 'Genesis 1:20-23' },
            { label: 'Day 6', note: 'Land Animals and Mankind', ref: 'Genesis 1:24-31' },
            { label: 'Day 7', note: 'God Rested (Sabbath)', ref: 'Genesis 2:1-3' }
        ]
    },
    {
        id: 'fruit-spirit',
        title: 'Fruit of the Spirit',
        subtitle: 'Galatians 5:22-23',
        icon: Layers,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        description: 'The nine visible attributes of a true Christian life.',
        items: [
            { label: 'Love' },
            { label: 'Joy' },
            { label: 'Peace' },
            { label: 'Patience' },
            { label: 'Kindness' },
            { label: 'Goodness' },
            { label: 'Faithfulness' },
            { label: 'Gentleness' },
            { label: 'Self-control' }
        ]
    },
    {
        id: 'armor-god',
        title: 'Armor of God',
        subtitle: 'Ephesians 6:14-17',
        icon: Shield,
        color: 'text-slate-500',
        bg: 'bg-slate-500/10',
        description: 'The pieces of spiritual armor for defense against the enemy.',
        items: [
            { label: 'Belt of Truth', ref: 'Ephesians 6:14' },
            { label: 'Breastplate of Righteousness', ref: 'Ephesians 6:14' },
            { label: 'Shoes of the Gospel of Peace', ref: 'Ephesians 6:15' },
            { label: 'Shield of Faith', ref: 'Ephesians 6:16' },
            { label: 'Helmet of Salvation', ref: 'Ephesians 6:17' },
            { label: 'Sword of the Spirit (Word of God)', ref: 'Ephesians 6:17' }
        ]
    },
    {
        id: 'seven-iams',
        title: 'The 7 "I AM" Statements',
        subtitle: 'Gospel of John',
        icon: MessageSquare,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        description: 'Jesus\' seven metaphorical declarations of His divinity.',
        items: [
            { label: 'Bread of Life', ref: 'John 6:35' },
            { label: 'Light of the World', ref: 'John 8:12' },
            { label: 'The Door (Gate)', ref: 'John 10:9' },
            { label: 'Good Shepherd', ref: 'John 10:11' },
            { label: 'Resurrection and the Life', ref: 'John 11:25' },
            { label: 'The Way, the Truth, and the Life', ref: 'John 14:6' },
            { label: 'The True Vine', ref: 'John 15:1' }
        ]
    },
    {
        id: '12-tribes',
        title: 'The 12 Tribes of Israel',
        subtitle: 'Sons of Jacob',
        icon: MapPin,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        description: 'The tribes descended from the sons of Jacob (Israel).',
        items: [
            { label: 'Reuben', note: 'Firstborn' },
            { label: 'Simeon' },
            { label: 'Levi', note: 'Priestly tribe (no land inheritance)' },
            { label: 'Judah', note: 'Line of kings/Messiah' },
            { label: 'Dan' },
            { label: 'Naphtali' },
            { label: 'Gad' },
            { label: 'Asher' },
            { label: 'Issachar' },
            { label: 'Zebulun' },
            { label: 'Joseph', note: 'Split into Ephraim and Manasseh' },
            { label: 'Benjamin' }
        ]
    },
    {
        id: 'ten-plagues',
        title: 'The 10 Plagues of Egypt',
        subtitle: 'Exodus 7-12',
        icon: Sun, // best approx
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        description: 'God\'s judgments against the gods of Egypt.',
        items: [
            { label: '1. Blood', note: 'Nile turned to blood', ref: 'Exodus 7:14-24' },
            { label: '2. Frogs', ref: 'Exodus 8:1-15' },
            { label: '3. Gnats (Lice)', ref: 'Exodus 8:16-19' },
            { label: '4. Flies', ref: 'Exodus 8:20-32' },
            { label: '5. Livestock', note: 'Death of cattle', ref: 'Exodus 9:1-7' },
            { label: '6. Boils', ref: 'Exodus 9:8-12' },
            { label: '7. Hail', ref: 'Exodus 9:13-35' },
            { label: '8. Locusts', ref: 'Exodus 10:1-20' },
            { label: '9. Darkness', ref: 'Exodus 10:21-29' },
            { label: '10. Firstborn', note: 'Death of firstborn', ref: 'Exodus 11-12' }
        ]
    }
];

export default function MemoryLists() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in">
            {/* Header */}
            <div className="py-8">
                <Link to="/bible/memory" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Memory Tools
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <List className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h1 className="text-3xl font-bold">Biblical Lists</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Structured knowledge for mastering biblical facts and sequences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {LISTS.map((list) => {
                    const isExpanded = expanded === list.id;

                    return (
                        <div key={list.id} className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                            {/* Card Header (Clickable) */}
                            <button
                                onClick={() => setExpanded(isExpanded ? null : list.id)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${list.bg}`}>
                                        <list.icon className={`w-6 h-6 ${list.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{list.title}</h3>
                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            {list.subtitle}
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-2 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-secondary/20' : ''}`}>
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                </div>
                            </button>

                            {/* Expanded Content */}
                            <div className={`
                                grid transition-all duration-300 ease-in-out
                                ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                            `}>
                                <div className="overflow-hidden">
                                    <div className="p-6 pt-0 border-t border-border/50 bg-secondary/5">
                                        <p className="text-sm text-muted-foreground mb-4 italic">
                                            {list.description}
                                        </p>

                                        <div className="space-y-2">
                                            {list.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-background border border-border/50 text-sm">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{item.label}</span>
                                                        {item.note && <span className="text-xs text-muted-foreground">{item.note}</span>}
                                                    </div>
                                                    {item.ref && (
                                                        <VerseLink
                                                            reference={item.ref}
                                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
