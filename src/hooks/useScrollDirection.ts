import { useState, useEffect } from 'react';

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? 'down' : 'up';
            // Ignore scroll up if we are at the bottom of the page (prevents bounce effect)
            const isAtBottom = Math.ceil(scrollY + window.innerHeight) >= document.documentElement.scrollHeight;

            if (direction !== scrollDirection && (Math.abs(scrollY - lastScrollY) > 0)) {
                // Only allow setting direction to 'up' if not at the bottom
                if (direction === 'down' || !isAtBottom) {
                    setScrollDirection(direction);
                }
            }
            setIsAtTop(scrollY < 10);
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener('scroll', updateScrollDirection);
        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [scrollDirection]);

    return { scrollDirection, isAtTop };
}
