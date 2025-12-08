import React, { useState } from 'react';

interface MapPoint {
    id: string;
    x: number;
    y: number;
    label: string;
    region?: string;
}

// Approximate coordinates on a 400x800 map of Israel/Near East
const LOCATIONS: MapPoint[] = [
    { id: 'jerusalem', x: 195, y: 560, label: 'Jerusalem', region: 'Judea' },
    { id: 'bethlehem', x: 200, y: 575, label: 'Bethlehem', region: 'Judea' },
    { id: 'jericho', x: 220, y: 550, label: 'Jericho', region: 'Jordan Valley' },
    { id: 'sea-of-galilee', x: 235, y: 350, label: 'Sea of Galilee', region: 'Galilee' },
    { id: 'nazareth', x: 210, y: 370, label: 'Nazareth', region: 'Galilee' },
    { id: 'capernaum', x: 235, y: 340, label: 'Capernaum', region: 'Galilee' },
    { id: 'dead-sea', x: 225, y: 600, label: 'Dead Sea', region: 'Judea' },
    { id: 'jordan-river', x: 230, y: 450, label: 'Jordan River', region: 'Jordan Valley' },
    { id: 'egypt', x: 40, y: 750, label: 'Egypt (South West)', region: 'Egypt' },
    { id: 'babylon', x: 380, y: 50, label: 'Babylon (East)', region: 'Mesopotamia' },
    { id: 'rome', x: 20, y: 50, label: 'Rome (West)', region: 'Italy' },
    { id: 'wilderness', x: 150, y: 700, label: 'The Wilderness', region: 'Sinai' }
];

interface BibleMapProps {
    onSelectLocation: (locationId: string) => void;
    activeLocationId?: string | null;
}

export default function BibleMap({ onSelectLocation, activeLocationId }: BibleMapProps) {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div className="w-full h-[600px] bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900 overflow-hidden relative group">
            <svg
                viewBox="0 0 400 800"
                className="w-full h-full object-contain"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Background / Sea */}
                <rect width="400" height="800" fill="transparent" />

                {/* Simplified Land Masses (Stylized) */}
                {/* Mediterranean Coast */}
                <path
                    d="M 0 0 L 150 0 L 180 300 L 160 500 L 100 700 L 0 700 Z"
                    className="fill-blue-100/50 dark:fill-blue-900/10 stroke-none"
                    style={{ pointerEvents: 'none' }}
                />

                {/* Main Land (Canaan/Israel) */}
                <path
                    d="M 180 300 L 250 300 L 250 800 L 160 800 L 180 500 Z"
                    className="fill-amber-100 dark:fill-amber-900/20 stroke-amber-200 dark:stroke-amber-800"
                />

                {/* Sea of Galilee */}
                <path
                    d="M 230 345 Q 240 345 240 355 Q 235 365 230 355 Z"
                    className="fill-blue-400 dark:fill-blue-500"
                />

                {/* Dead Sea */}
                <path
                    d="M 220 580 Q 230 580 230 620 Q 220 630 220 620 Z"
                    className="fill-blue-400 dark:fill-blue-500"
                />

                {/* Jordan River */}
                <path
                    d="M 235 365 Q 225 450 225 580"
                    className="stroke-blue-400 dark:stroke-blue-500 fill-none stroke-2"
                    strokeDasharray="4 2"
                />

                {/* Locations */}
                {LOCATIONS.map(loc => {
                    const isActive = activeLocationId === loc.id;
                    const isHovered = hovered === loc.id;

                    return (
                        <g
                            key={loc.id}
                            onClick={() => onSelectLocation(loc.id)}
                            onMouseEnter={() => setHovered(loc.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="cursor-pointer transition-all duration-300"
                            style={{
                                opacity: activeLocationId && !isActive ? 0.5 : 1
                            }}
                        >
                            {/* Pulse Effect for Active */}
                            {isActive && (
                                <circle
                                    cx={loc.x}
                                    cy={loc.y}
                                    r="15"
                                    className="fill-primary/30 animate-ping"
                                />
                            )}

                            {/* Outer Circle (Touch Target) */}
                            <circle
                                cx={loc.x}
                                cy={loc.y}
                                r={isHovered ? 12 : 8}
                                className={`
                                    transition-all duration-300
                                    ${isActive ? 'fill-primary' : 'fill-background'} 
                                    stroke-2 ${isActive ? 'stroke-primary' : 'stroke-muted-foreground'}
                                `}
                            />

                            {/* Inner Dot */}
                            <circle
                                cx={loc.x}
                                cy={loc.y}
                                r="3"
                                className={isActive ? 'fill-primary-foreground' : 'fill-muted-foreground'}
                            />

                            {/* Label */}
                            <text
                                x={loc.x + 15}
                                y={loc.y + 4}
                                className={`
                                    text-[12px] font-bold select-none transition-all duration-300
                                    ${isActive ? 'fill-primary text-lg' : 'fill-muted-foreground'}
                                    ${isHovered ? 'scale-110 origin-left' : ''}
                                `}
                                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                            >
                                {loc.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur rounded-lg p-3 text-xs text-muted-foreground border border-border shadow-sm">
                <p className="font-bold mb-1">Interactive Map</p>
                <p>Click points to locate in list.</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-200"></span> Land
                    <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></span> Sea
                </div>
            </div>
        </div>
    );
}
