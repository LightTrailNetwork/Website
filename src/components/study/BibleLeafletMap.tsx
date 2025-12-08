import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
const activeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const defaultIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


interface MapPoint {
    id: string;
    lat: number;
    lng: number;
    label: string;
}

const LOCATIONS: MapPoint[] = [
    { id: 'jerusalem', lat: 31.7683, lng: 35.2137, label: 'Jerusalem' },
    { id: 'bethlehem', lat: 31.7054, lng: 35.2024, label: 'Bethlehem' },
    { id: 'bethel', lat: 31.9333, lng: 35.2283, label: 'Bethel' },
    { id: 'jericho', lat: 31.8614, lng: 35.4444, label: 'Jericho' },
    { id: 'sea-galilee', lat: 32.8304, lng: 35.5919, label: 'Sea of Galilee' },
    { id: 'nazareth', lat: 32.6996, lng: 35.3035, label: 'Nazareth' },
    { id: 'capernaum', lat: 32.8811, lng: 35.5751, label: 'Capernaum' },
    { id: 'caesarea-philippi', lat: 33.2464, lng: 35.6946, label: 'Caesarea Philippi' },
    { id: 'dead-sea', lat: 31.5590, lng: 35.4732, label: 'Dead Sea' },
    { id: 'jordan-river', lat: 32.0333, lng: 35.5666, label: 'Jordan River' },
    { id: 'damascus', lat: 33.5138, lng: 36.2765, label: 'Damascus' },
    { id: 'antioch', lat: 36.2023, lng: 36.1606, label: 'Antioch' },
    { id: 'ephesus', lat: 37.9426, lng: 27.3417, label: 'Ephesus' },
    { id: 'rome', lat: 41.9028, lng: 12.4964, label: 'Rome' },
    { id: 'egypt', lat: 30.0444, lng: 31.2357, label: 'Egypt' },
    { id: 'mt-sinai', lat: 28.5393, lng: 33.9749, label: 'Mt Sinai' },
    { id: 'wilderness', lat: 29.5, lng: 34.0, label: 'Sinai Wilderness' },
    { id: 'nineveh', lat: 36.3585, lng: 43.1519, label: 'Nineveh' },
    { id: 'babylon', lat: 32.5363, lng: 44.4208, label: 'Babylon' },
    { id: 'ur', lat: 30.9629, lng: 46.1031, label: 'Ur' },
];

interface BibleLeafletMapProps {
    onSelectLocation: (locationId: string, shouldScroll?: boolean) => void;
    activeLocationId?: string | null;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

function MapMarker({ location, isActive, onSelect }: { location: MapPoint, isActive: boolean, onSelect: (id: string, s?: boolean) => void }) {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isActive && markerRef.current) {
            markerRef.current.openPopup();
            map.flyTo([location.lat, location.lng], 10, { duration: 1.5 });
        }
    }, [isActive, location, map]);

    return (
        <Marker
            ref={markerRef}
            position={[location.lat, location.lng]}
            icon={isActive ? activeIcon : defaultIcon}
            eventHandlers={{
                click: () => onSelect(location.id, !isMobile),
                dblclick: () => {
                    if (isMobile) onSelect(location.id, true);
                }
            }}
        >
            <Popup>
                <strong>{location.label}</strong>
            </Popup>
        </Marker>
    );
}

export default function BibleLeafletMap({ onSelectLocation, activeLocationId }: BibleLeafletMapProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border z-0">
                <MapContainer
                    center={[31.7683, 35.2137]}
                    zoom={7}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                    doubleClickZoom={false} // Disable global dblclick zoom to handle marker dblclick
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />

                    {LOCATIONS.map(loc => (
                        <MapMarker
                            key={loc.id}
                            location={loc}
                            isActive={activeLocationId === loc.id}
                            onSelect={onSelectLocation}
                        />
                    ))}
                </MapContainer>
            </div>
            <p className="block lg:hidden text-xs text-muted-foreground text-center italic mt-2">
                * Tap marker to view label. Double-tap to view details.
            </p>
        </div>
    );
}
