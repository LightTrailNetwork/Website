import { useState, useEffect } from 'react';

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;

            // Prevent handling negative scroll (bounce) or extremely large jumps?
            // Just basic delta check

            // Current modification implementation:
            // Calculate difference from last anchored position
            const diff = scrollY - lastScrollY;

            const isAtBottom = Math.ceil(scrollY + window.innerHeight) >= document.documentElement.scrollHeight;

            if (diff > 0) {
                // Scrolling Down
                // If we aren't at the bottom, we switch to 'down' (hide header)
                // We do this instantly as requested to "hide" instantly
                if (scrollDirection !== 'down' && !isAtBottom) {
                    setScrollDirection('down');
                }
                // Always update anchor when going down to track the lowest point
                lastScrollY = scrollY > 0 ? scrollY : 0;
            } else if (diff < 0) {
                // Scrolling Up
                if (scrollDirection === 'down') {
                    // We are currently hidden (down). We want to show (up).
                    // Apply cushion if we are deep in the page
                    const isDeep = scrollY > 100;
                    const threshold = isDeep ? 20 : 0;

                    // lastScrollY is our "lowest point" since we started going up
                    // diff is negative, so lastScrollY - scrollY is the distance traveled UP
                    // We also check !isAtBottom to prevent bounce at the very bottom from triggering the header
                    if (lastScrollY - scrollY > threshold && !isAtBottom) {
                        setScrollDirection('up');
                        lastScrollY = scrollY > 0 ? scrollY : 0;
                    }
                    // If we haven't exceeded the threshold, we DO NOT update lastScrollY
                    // This allows the delta to accumulate from the lowest point
                } else {
                    // We are already going up, just track the position
                    lastScrollY = scrollY > 0 ? scrollY : 0;
                }
            }

            setIsAtTop(scrollY < 10);
        };

        window.addEventListener('scroll', updateScrollDirection);
        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [scrollDirection]);

    return { scrollDirection, isAtTop };
}
