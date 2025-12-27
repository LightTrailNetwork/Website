import { useRef } from 'react';

interface EdgeTapOptions {
    edgeThresholdPercent?: number; // % of screen width (e.g., 0.15 for 15%)
    maxDuration?: number; // Maxms for a tap (e.g., 300ms)
    maxDrift?: number; // Max movement in px to still count as a tap (e.g., 10px)
}

export function useEdgeTapNavigation(
    onPrev: () => void,
    onNext: () => void,
    options: EdgeTapOptions = {}
) {
    const {
        edgeThresholdPercent = 0.15,
        maxDuration = 250,
        maxDrift = 15
    } = options;

    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1 || !e.touches[0]) return;

        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return;
        if (e.changedTouches.length === 0 || !e.changedTouches[0]) return;

        const start = touchStartRef.current;
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const duration = Date.now() - start.time;

        touchStartRef.current = null; // Reset immediately

        // 1. Check Duration (Must be a quick tap, not a hold)
        if (duration > maxDuration) return;

        // 2. Check Drift (Must not be a scroll or swipe)
        const driftX = Math.abs(endX - start.x);
        const driftY = Math.abs(endY - start.y);

        if (driftX > maxDrift || driftY > maxDrift) return;

        // 3. Safety Check: Ignore taps on interactive elements
        // If the user tapped a button, link, or input, we shouldn't nav
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button, a, input, [role="button"]');
        if (isInteractive) return;

        // 4. Edge Detection
        const width = window.innerWidth;
        const thresholdPx = width * edgeThresholdPercent;

        // Ensure we use the START X to determine intent (where they put their finger down)
        // Adjust: Check if the tap *occurred* in the zone (start position)

        if (start.x < thresholdPx) {
            // Left Edge Tap
            onPrev();
        } else if (start.x > width - thresholdPx) {
            // Right Edge Tap
            onNext();
        }
    };

    return {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd
    };
}
