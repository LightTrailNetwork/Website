import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    List, ArrowLeft, ChevronDown, Users, MapPin, Sun, Shield,
    MessageSquare, Flame, Calendar, Church, Heart, Gavel,
    Crown, Star, BookOpen
} from 'lucide-react';
import VerseLink from './study/VerseLink';

interface MemoryListItem {
    label: string;
    ref?: string;
    note?: string;
}

interface MemoryList {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    description: string;
    items: MemoryListItem[];
}

interface Category {
    title: string;
    lists: MemoryList[];
}

const CATEGORIES: Category[] = [
    {
        title: "Theology & Teaching",
        lists: [
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
                id: 'beatitudes',
                title: 'The Beatitudes',
                subtitle: 'Matthew 5:3-12',
                icon: Heart,
                color: 'text-pink-500',
                bg: 'bg-pink-500/10',
                description: 'The eight blessings recounting the characteristics of a true disciple.',
                items: [
                    { label: 'Poor in spirit', note: 'Theirs is the kingdom of heaven', ref: 'Matthew 5:3' },
                    { label: 'Those who mourn', note: 'They will be comforted', ref: 'Matthew 5:4' },
                    { label: 'The meek', note: 'They will inherit the earth', ref: 'Matthew 5:5' },
                    { label: 'Hunger and thirst for righteousness', note: 'They will be filled', ref: 'Matthew 5:6' },
                    { label: 'The merciful', note: 'They will be shown mercy', ref: 'Matthew 5:7' },
                    { label: 'Pure in heart', note: 'They will see God', ref: 'Matthew 5:8' },
                    { label: 'The peacemakers', note: 'Called children of God', ref: 'Matthew 5:9' },
                    { label: 'Persecuted for righteousness', note: 'Theirs is the kingdom of heaven', ref: 'Matthew 5:10' }
                ]
            },
            {
                id: 'john-signs',
                title: 'The 7 Signs of John',
                subtitle: 'Miracles of Jesus',
                icon: Star,
                color: 'text-yellow-500',
                bg: 'bg-yellow-500/10',
                description: 'Seven miracles that witness to Jesus\' divine nature.',
                items: [
                    { label: 'Water into Wine', ref: 'John 2:1-11' },
                    { label: 'Healing the Official\'s Son', ref: 'John 4:46-54' },
                    { label: 'Healing the Paralytic at Bethesda', ref: 'John 5:1-15' },
                    { label: 'Feeding the 5,000', ref: 'John 6:5-14' },
                    { label: 'Walking on Water', ref: 'John 6:16-24' },
                    { label: 'Healing the Man Born Blind', ref: 'John 9:1-7' },
                    { label: 'Raising Lazarus from the Dead', ref: 'John 11:1-45' }
                ]
            },
            {
                id: 'gifts-spirit',
                title: 'Gifts of the Spirit',
                subtitle: '1 Corinthians 12:8-10',
                icon: Flame,
                color: 'text-orange-500',
                bg: 'bg-orange-500/10',
                description: 'Supernatural enablements given by the Holy Spirit.',
                items: [
                    { label: 'Word of Wisdom' },
                    { label: 'Word of Knowledge' },
                    { label: 'Faith' },
                    { label: 'Gifts of Healing' },
                    { label: 'Miracles' },
                    { label: 'Prophecy' },
                    { label: 'Distinguishing between Spirits' },
                    { label: 'Tongues' },
                    { label: 'Interpretation of Tongues' }
                ]
            },
            {
                id: 'armor-god',
                title: 'Armor of God',
                subtitle: 'The Pieces',
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
                    { label: 'Sword of the Spirit', ref: 'Ephesians 6:17' }
                ]
            }
        ]
    },
    {
        title: "People & Tribes",
        lists: [
            {
                id: '12-apostles',
                title: 'The 12 Apostles',
                subtitle: 'Matthew 10:2-4',
                icon: Users,
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
                description: 'The twelve disciples chosen by Jesus to be His primary messengers.',
                items: [
                    { label: 'Simon Peter' },
                    { label: 'Andrew' },
                    { label: 'James (Son of Zebedee)' },
                    { label: 'John' },
                    { label: 'Philip' },
                    { label: 'Bartholomew' },
                    { label: 'Thomas' },
                    { label: 'Matthew' },
                    { label: 'James (Son of Alphaeus)' },
                    { label: 'Thaddaeus' },
                    { label: 'Simon the Zealot' },
                    { label: 'Judas Iscariot' }
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
                    { label: 'Levi', note: 'Priestly tribe' },
                    { label: 'Judah', note: 'Royal tribe' },
                    { label: 'Dan' },
                    { label: 'Naphtali' },
                    { label: 'Gad' },
                    { label: 'Asher' },
                    { label: 'Issachar' },
                    { label: 'Zebulun' },
                    { label: 'Joseph', note: 'Ephraim & Manasseh' },
                    { label: 'Benjamin' }
                ]
            },
            {
                id: 'major-judges',
                title: 'Major Judges of Israel',
                subtitle: 'Book of Judges',
                icon: Gavel,
                color: 'text-stone-500',
                bg: 'bg-stone-500/10',
                description: 'Key leaders raised by God to deliver Israel before the monarchy.',
                items: [
                    { label: 'Othniel', ref: 'Judges 3' },
                    { label: 'Ehud', ref: 'Judges 3' },
                    { label: 'Deborah', note: 'Prophetess', ref: 'Judges 4-5' },
                    { label: 'Gideon', ref: 'Judges 6-8' },
                    { label: 'Jephthah', ref: 'Judges 11-12' },
                    { label: 'Samson', ref: 'Judges 13-16' },
                    { label: 'Samuel', note: 'Prophet/Judge', ref: '1 Samuel 1-7' }
                ]
            },
            {
                id: 'seven-deacons',
                title: 'The 7 Deacons',
                subtitle: 'Acts 6:5',
                icon: Users,
                color: 'text-cyan-500',
                bg: 'bg-cyan-500/10',
                description: 'The first men chosen to serve the early church in Jerusalem.',
                items: [
                    { label: 'Stephen', note: 'First Martyr' },
                    { label: 'Philip', note: 'The Evangelist' },
                    { label: 'Prochorus' },
                    { label: 'Nicanor' },
                    { label: 'Timon' },
                    { label: 'Parmenas' },
                    { label: 'Nicolas', note: 'Convert from Antioch' }
                ]
            }
        ]
    },
    {
        title: "History & Structure",
        lists: [
            {
                id: 'creation-days',
                title: 'Days of Creation',
                subtitle: 'Genesis 1',
                icon: Sun,
                color: 'text-amber-500',
                bg: 'bg-amber-500/10',
                description: 'The six days of creation and the seventh day of rest.',
                items: [
                    { label: 'Day 1', note: 'Light', ref: 'Ge 1:3-5' },
                    { label: 'Day 2', note: 'Sky/Waters', ref: 'Ge 1:6-8' },
                    { label: 'Day 3', note: 'Land & Plants', ref: 'Ge 1:9-13' },
                    { label: 'Day 4', note: 'Sun, Moon, Stars', ref: 'Ge 1:14-19' },
                    { label: 'Day 5', note: 'Birds & Fish', ref: 'Ge 1:20-23' },
                    { label: 'Day 6', note: 'Animals & Man', ref: 'Ge 1:24-31' },
                    { label: 'Day 7', note: 'Rest', ref: 'Ge 2:1-3' }
                ]
            },
            {
                id: 'ten-plagues',
                title: 'The 10 Plagues',
                subtitle: 'Exodus 7-12',
                icon: Crown, // Pharoah conflict
                color: 'text-red-500',
                bg: 'bg-red-500/10',
                description: 'God\'s judgments against Egypt.',
                items: [
                    { label: '1. Blood', ref: 'Ex 7:14' },
                    { label: '2. Frogs', ref: 'Ex 8:1' },
                    { label: '3. Gnats', ref: 'Ex 8:16' },
                    { label: '4. Flies', ref: 'Ex 8:20' },
                    { label: '5. Livestock', ref: 'Ex 9:1' },
                    { label: '6. Boils', ref: 'Ex 9:8' },
                    { label: '7. Hail', ref: 'Ex 9:13' },
                    { label: '8. Locusts', ref: 'Ex 10:1' },
                    { label: '9. Darkness', ref: 'Ex 10:21' },
                    { label: '10. Firstborn', ref: 'Ex 11:1' }
                ]
            },
            {
                id: 'feasts-israel',
                title: 'Feasts of Israel',
                subtitle: 'Leviticus 23',
                icon: Calendar,
                color: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
                description: 'The seven appointed times (Moedim) of the Lord.',
                items: [
                    { label: 'Passover (Pesach)', note: 'Redemption', ref: 'Lev 23:5' },
                    { label: 'Unleavened Bread', note: 'Sanctification', ref: 'Lev 23:6' },
                    { label: 'Firstfruits', note: 'Resurrection', ref: 'Lev 23:10' },
                    { label: 'Pentecost (Shavuot)', note: 'Giving of Spirit', ref: 'Lev 23:15' },
                    { label: 'Trumpets (Rosh Hashanah)', note: 'Repentance', ref: 'Lev 23:24' },
                    { label: 'Atonement (Yom Kippur)', note: 'Redemption', ref: 'Lev 23:27' },
                    { label: 'Tabernacles (Sukkot)', note: 'Rejoicing', ref: 'Lev 23:34' }
                ]
            },
            {
                id: 'seven-churches',
                title: '7 Churches of Revelation',
                subtitle: 'Revelation 2-3',
                icon: Church,
                color: 'text-violet-500',
                bg: 'bg-violet-500/10',
                description: 'The seven churches of Asia Minor addressed by Jesus.',
                items: [
                    { label: 'Ephesus', note: 'Forsaken first love', ref: 'Rev 2:1' },
                    { label: 'Smyrna', note: 'Persecuted church', ref: 'Rev 2:8' },
                    { label: 'Pergamum', note: 'Compromising church', ref: 'Rev 2:12' },
                    { label: 'Thyatira', note: 'Corrupt church', ref: 'Rev 2:18' },
                    { label: 'Sardis', note: 'Dead church', ref: 'Rev 3:1' },
                    { label: 'Philadelphia', note: 'Faithful church', ref: 'Rev 3:7' },
                    { label: 'Laodicea', note: 'Lukewarm church', ref: 'Rev 3:14' }
                ]
            }
        ]
    }
];

export default function MemoryLists() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in space-y-12">
            {/* Header */}
            <div className="pt-8">
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

            {CATEGORIES.map((category) => (
                <div key={category.title} className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
                        {category.title}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {category.lists.map((list) => {
                            const isExpanded = expanded === list.id;
                            return (
                                <div key={list.id} className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                                    <button
                                        onClick={() => setExpanded(isExpanded ? null : list.id)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${list.bg}`}>
                                                <list.icon className={`w-6 h-6 ${list.color}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold pr-4">{list.title}</h3>
                                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                    {list.subtitle}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 bg-secondary/20' : ''}`}>
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    </button>

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
                                                        <div key={idx} className="flex justify-between items-start p-2 rounded-lg bg-background border border-border/50 text-sm">
                                                            <div className="flex flex-col pr-2">
                                                                <span className="font-medium">{item.label}</span>
                                                                {item.note && <span className="text-xs text-muted-foreground">{item.note}</span>}
                                                            </div>
                                                            {item.ref && (
                                                                <VerseLink
                                                                    reference={item.ref}
                                                                    className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors whitespace-nowrap mt-0.5"
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
            ))}
        </div>
    );
}
