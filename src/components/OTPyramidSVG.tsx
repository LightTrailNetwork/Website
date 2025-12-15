import React from "react";
import { OT_PASSAGES } from '../data/otPassages';

interface Point {
    x: number;
    y: number;
}

interface OTPyramidSVGProps {
    selectedBook: string;
    hoveredBook: string | null;
    onBookClick: (book: string) => void;
    onBookHover: (book: string | null) => void;
    stroke?: string;
    innerStroke?: string;
    textColor?: string;
    accent?: string;
}

interface ClickableLetterProps {
    p: Point;
    label: string;
    bookKey: string;
    selectedBook: string;
    hoveredBook: string | null;
    onBookClick: (book: string) => void;
    onHoverStart: (book: string) => void;
    onHoverEnd: () => void;
    textColor: string;
    fontSize: number;
    scrollToPassage: (bookKey: string) => void;
}

const ClickableLetter: React.FC<ClickableLetterProps> = ({
    p,
    label,
    bookKey,
    selectedBook,
    hoveredBook,
    onBookClick,
    onHoverStart,
    onHoverEnd,
    textColor,
    fontSize,
    scrollToPassage,
}) => {
    const isHighlighted = hoveredBook === bookKey || selectedBook === bookKey;

    const handleClick = () => {
        onBookClick(bookKey);
        scrollToPassage(bookKey);
    };

    return (
        <text
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
                fontFamily:
                    "ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial",
                fontSize: isHighlighted ? fontSize * 1.3 : fontSize,
                fontWeight: isHighlighted ? 900 : 700,
                fill: isHighlighted ? "hsl(var(--destructive))" : textColor,
                cursor: "pointer",
                transition: "all 0.2s",
            }}
            onClick={handleClick}
            onMouseEnter={() => onHoverStart(bookKey)}
            onMouseLeave={onHoverEnd}
        >
            {label}
        </text>
    );
};

interface SubPyramidLabelProps {
    center: Point;
    label: string;
    textColor: string;
    fontSize: number;
}

const SubPyramidLabel: React.FC<SubPyramidLabelProps> = ({
    center,
    label,
    textColor,
    fontSize,
}) => (
    <text
        x={center.x}
        y={center.y}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
            fontFamily:
                "ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial",
            fontSize: fontSize,
            fontWeight: 700,
            fill: textColor,
            userSelect: "none",
        }}
    >
        {label}
    </text>
);

export default function OTPyramidSVG({
    selectedBook,
    hoveredBook,
    onBookClick,
    onBookHover,
    stroke = "hsl(var(--primary))",
    innerStroke = "hsl(var(--muted-foreground))",
    textColor = "hsl(var(--foreground))",
    accent = "hsl(var(--primary))",
}: OTPyramidSVGProps) {

    const scrollToPassage = (bookKey: string) => {
        const element = document.getElementById(`passage-${bookKey}`);
        if (!element) return;

        const desktopContainer = document.getElementById("passage-list-desktop");
        const isDesktopVisible = desktopContainer && desktopContainer.offsetParent !== null;

        if (isDesktopVisible && desktopContainer) {
            const containerRect = desktopContainer.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const currentScrollTop = desktopContainer.scrollTop;
            const relativeTop = elementRect.top - containerRect.top;
            const targetScrollTop = currentScrollTop + relativeTop - (desktopContainer.clientHeight / 2) + (elementRect.height / 2);

            desktopContainer.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: "smooth",
            });
        } else {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const onHoverStart = (book: string) => {
        if (isMobile) return;
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            onBookHover(book);
            scrollToPassage(book);
        }, 200);
    };

    const onHoverEnd = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        onBookHover(null);
    };

    const getBookCategoryColor = (bookKey: string) => {
        const book = OT_PASSAGES.find(p => p.book === bookKey);
        if (!book) return "hsl(var(--muted-foreground))";
        switch (book.category) {
            case 'Torah': return "hsl(190, 95%, 50%)"; // Cyan (Darker/Saturated)
            case 'History': return "hsl(135, 65%, 55%)"; // Green
            case 'Poetry': return "hsl(270, 75%, 75%)"; // Purple (Lighter)
            case 'Major Prophets': return "hsl(345, 85%, 65%)"; // Rose
            case 'Minor Prophets': return "hsl(35, 95%, 60%)"; // Amber
            default: return "hsl(var(--muted-foreground))";
        }
    };

    const containerSize = isMobile ? 380 : 500;
    const svgSize = containerSize;

    const S = svgSize * 0.75; // Redesigned padding to prevent cutoff
    const H = (Math.sqrt(3) / 2) * S;
    const leftPad = (svgSize - S) / 2;
    const startY = svgSize * 0.1;

    const A = { x: leftPad + S / 2, y: startY }; // Top
    const B = { x: leftPad, y: startY + H }; // Bottom Left
    const C = { x: leftPad + S, y: startY + H }; // Bottom Right

    const triPoints = (p0: Point, p1: Point, p2: Point) =>
        `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`;

    const triUp = (cx: number, cy: number, s: number): [Point, Point, Point] => {
        const h = (Math.sqrt(3) / 2) * s;
        return [
            { x: cx, y: cy - (2 / 3) * h },
            { x: cx - s / 2, y: cy + (1 / 3) * h },
            { x: cx + s / 2, y: cy + (1 / 3) * h },
        ];
    };

    interface TinyPyramid {
        vertices: [Point, Point, Point];
        letters: [string, string, string];
        books: [string, string, string];
        letterPositions: [Point, Point, Point];
    }

    const createTinyPyramidsInParent = (
        parentA: Point,
        parentB: Point,
        parentC: Point,
        letters: string[],
        books: string[]
    ): TinyPyramid[] => {
        const centroidX = (parentA.x + parentB.x + parentC.x) / 3;
        const centroidY = (parentA.y + parentB.y + parentC.y) / 3;
        const parentMargin = 0.28;

        const shrinkVertex = (v: Point) => ({
            x: v.x + (centroidX - v.x) * parentMargin,
            y: v.y + (centroidY - v.y) * parentMargin,
        });

        const shrunkA = shrinkVertex(parentA);
        const shrunkB = shrinkVertex(parentB);
        const shrunkC = shrinkVertex(parentC);

        const midAB = { x: (shrunkA.x + shrunkB.x) / 2, y: (shrunkA.y + shrunkB.y) / 2 };
        const midAC = { x: (shrunkA.x + shrunkC.x) / 2, y: (shrunkA.y + shrunkC.y) / 2 };
        const midBC = { x: (shrunkB.x + shrunkC.x) / 2, y: (shrunkB.y + shrunkC.y) / 2 };

        const topTri: [Point, Point, Point] = [shrunkA, midAB, midAC];
        const leftTri: [Point, Point, Point] = [midAB, shrunkB, midBC];
        const rightTri: [Point, Point, Point] = [midAC, midBC, shrunkC];

        return [topTri, leftTri, rightTri].map((tri, idx) => {
            const [p0, p1, p2] = tri;
            const l1 = letters[idx * 3] || "";
            const l2 = letters[idx * 3 + 1] || "";
            const l3 = letters[idx * 3 + 2] || "";
            const b1 = books[idx * 3] || "";
            const b2 = books[idx * 3 + 1] || "";
            const b3 = books[idx * 3 + 2] || "";

            const offsetAmount = 3;
            let offsetX = 0, offsetY = 0;

            if (idx === 0) { offsetY = -offsetAmount; }
            else if (idx === 1) { offsetX = -offsetAmount; offsetY = offsetAmount; }
            else if (idx === 2) { offsetX = offsetAmount; offsetY = offsetAmount; }

            const offsetVertices: [Point, Point, Point] = [
                { x: p0.x + offsetX, y: p0.y + offsetY },
                { x: p1.x + offsetX, y: p1.y + offsetY },
                { x: p2.x + offsetX, y: p2.y + offsetY },
            ];

            const center = {
                x: (offsetVertices[0].x + offsetVertices[1].x + offsetVertices[2].x) / 3,
                y: (offsetVertices[0].y + offsetVertices[1].y + offsetVertices[2].y) / 3,
            };

            const letterPositions: [Point, Point, Point] = [
                { x: center.x, y: offsetVertices[0].y + (center.y - offsetVertices[0].y) * 0.6 },
                { x: offsetVertices[1].x + (center.x - offsetVertices[1].x) * 0.6, y: offsetVertices[1].y + (center.y - offsetVertices[1].y) * 0.6 },
                { x: offsetVertices[2].x + (center.x - offsetVertices[2].x) * 0.6, y: offsetVertices[2].y + (center.y - offsetVertices[2].y) * 0.6 },
            ];

            return {
                vertices: offsetVertices,
                letters: [l1, l2, l3],
                books: [b1, b2, b3],
                letterPositions,
            };
        });
    };

    const subSide = S * 0.3;
    const topCenter = { x: leftPad + S / 2, y: startY + H * 0.33 };
    const leftCenter = { x: leftPad + S * 0.25, y: startY + H * 0.81 };
    const rightCenter = { x: leftPad + S * 0.75, y: startY + H * 0.81 };

    const [tA, tB, tC] = triUp(topCenter.x, topCenter.y, subSide);
    const [lA, lB, lC] = triUp(leftCenter.x, leftCenter.y, subSide);
    const [rA, rB, rC] = triUp(rightCenter.x, rightCenter.y, subSide);

    // Mappings
    const topTinyLetters = ["Pro", "Ecc", "Sng", "Lev", "Num", "Deu", "Lam", "Ezk", "Dan"];
    const topTinyBooks = ["Proverbs", "Ecclesiastes", "Song of Solomon", "Leviticus", "Numbers", "Deuteronomy", "Lamentations", "Ezekiel", "Daniel"];

    const leftTinyLetters = ["1Sa", "2Sa", "1Ki", "2Ki", "1Ch", "2Ch", "Ezr", "Neh", "Est"];
    const leftTinyBooks = ["1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"];

    const rightTinyLetters = ["Oba", "Jon", "Mic", "Nah", "Hab", "Zep", "Hag", "Zec", "Mal"];
    const rightTinyBooks = ["Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"];

    const godTinyPyramids = createTinyPyramidsInParent(tA, tB, tC, topTinyLetters, topTinyBooks);
    const manTinyPyramids = createTinyPyramidsInParent(lA, lB, lC, leftTinyLetters, leftTinyBooks);
    const wayTinyPyramids = createTinyPyramidsInParent(rA, rB, rC, rightTinyLetters, rightTinyBooks);

    const baseFontSize = svgSize * 0.030; // Reduced from 0.035
    const subFontSizeWord = svgSize * 0.016;
    const subFontSize = svgSize * 0.020; // Reduced
    const tinyFontSize = svgSize * 0.013; // Reduced

    const tinyTextColor = "hsl(var(--muted-foreground))";

    return (
        <div className="w-full flex justify-center">
            <div className="relative" style={{ width: containerSize, height: containerSize }}>
                <svg viewBox={`0 0 ${svgSize} ${svgSize}`} width="100%" height="100%" className="w-full h-full">
                    <defs>
                        <linearGradient id="otOuterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="otInnerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    <polygon points={triPoints(A, B, C)} fill="url(#otOuterGradient)" stroke={stroke} strokeWidth={3} />
                    <polygon points={triPoints(tA, tB, tC)} fill="url(#otInnerGradient)" stroke={innerStroke} strokeWidth={2} />
                    <polygon points={triPoints(lA, lB, lC)} fill="url(#otInnerGradient)" stroke={innerStroke} strokeWidth={2} />
                    <polygon points={triPoints(rA, rB, rC)} fill="url(#otInnerGradient)" stroke={innerStroke} strokeWidth={2} />

                    {/* OUTER VERTICES */}
                    {/* Top (B in Tradition, A here): Job */}
                    <ClickableLetter p={{ x: A.x, y: A.y - baseFontSize * 2 }} label="Job" bookKey="Job" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Job")} fontSize={baseFontSize} scrollToPassage={scrollToPassage} />
                    {/* Left (B): Genesis */}
                    <ClickableLetter p={{ x: B.x - baseFontSize * 2, y: B.y + baseFontSize }} label="Gen" bookKey="Genesis" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Genesis")} fontSize={baseFontSize} scrollToPassage={scrollToPassage} />
                    {/* Right (C): Isaiah */}
                    <ClickableLetter p={{ x: C.x + baseFontSize * 2, y: C.y + baseFontSize }} label="Isa" bookKey="Isaiah" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Isaiah")} fontSize={baseFontSize} scrollToPassage={scrollToPassage} />

                    {/* LABELS */}
                    {/* LABELS - Shifted up to avoid overlap */}
                    <SubPyramidLabel center={{ x: topCenter.x, y: topCenter.y - H * 0.02 }} label="Three" textColor={"hsl(var(--primary))"} fontSize={subFontSizeWord} />
                    <SubPyramidLabel center={{ x: leftCenter.x, y: leftCenter.y - H * 0.02 }} label="History" textColor={"hsl(var(--primary))"} fontSize={subFontSizeWord} />
                    <SubPyramidLabel center={{ x: rightCenter.x, y: rightCenter.y - H * 0.02 }} label="Prophecy" textColor={"hsl(var(--primary))"} fontSize={subFontSizeWord} />

                    {/* TOP Sub-Pyramid Vertices */}
                    {/* Top: Psalms */}
                    <ClickableLetter p={{ x: tA.x, y: tA.y - subFontSize }} label="Psa" bookKey="Psalms" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Psalms")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />
                    {/* Left: Exodus */}
                    <ClickableLetter p={{ x: tB.x - subFontSize, y: tB.y + subFontSize }} label="Exo" bookKey="Exodus" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Exodus")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />
                    {/* Right: Jeremiah */}
                    <ClickableLetter p={{ x: tC.x + subFontSize, y: tC.y + subFontSize }} label="Jer" bookKey="Jeremiah" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Jeremiah")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />

                    {/* LEFT Sub-Pyramid Vertices */}
                    {/* Top: Joshua */}
                    <ClickableLetter p={{ x: lA.x, y: lA.y - subFontSize }} label="Jos" bookKey="Joshua" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Joshua")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />
                    {/* Left: Judges */}
                    <ClickableLetter p={{ x: lB.x - subFontSize, y: lB.y + subFontSize }} label="Jdg" bookKey="Judges" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Judges")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />
                    {/* Right: Ruth */}
                    <ClickableLetter p={{ x: lC.x + subFontSize, y: lC.y + subFontSize }} label="Rut" bookKey="Ruth" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Ruth")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />

                    {/* RIGHT Sub-Pyramid Vertices */}
                    {/* Top: Hosea */}
                    <ClickableLetter p={{ x: rA.x, y: rA.y - subFontSize }} label="Hos" bookKey="Hosea" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Hosea")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />
                    {/* Left: Joel */}
                    <ClickableLetter p={{ x: rB.x - subFontSize, y: rB.y + subFontSize }} label="Joe" bookKey="Joel" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Joel")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />
                    {/* Right: Amos */}
                    <ClickableLetter p={{ x: rC.x + subFontSize, y: rC.y + subFontSize }} label="Amo" bookKey="Amos" selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor("Amos")} fontSize={subFontSize} scrollToPassage={scrollToPassage} />

                    {/* TINY PYRAMIDS */}
                    {godTinyPyramids.map((tiny, idx) => (
                        <g key={`top-${idx}`}>
                            <polygon points={triPoints(tiny.vertices[0], tiny.vertices[1], tiny.vertices[2])} fill="none" stroke={innerStroke} strokeWidth={1} opacity={0.6} />
                            <ClickableLetter p={tiny.letterPositions[0]} label={tiny.letters[0]} bookKey={tiny.books[0]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[0])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                            <ClickableLetter p={tiny.letterPositions[1]} label={tiny.letters[1]} bookKey={tiny.books[1]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[1])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                            <ClickableLetter p={tiny.letterPositions[2]} label={tiny.letters[2]} bookKey={tiny.books[2]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[2])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                        </g>
                    ))}
                    {manTinyPyramids.map((tiny, idx) => (
                        <g key={`left-${idx}`}>
                            <polygon points={triPoints(tiny.vertices[0], tiny.vertices[1], tiny.vertices[2])} fill="none" stroke={innerStroke} strokeWidth={1} opacity={0.6} />
                            <ClickableLetter p={tiny.letterPositions[0]} label={tiny.letters[0]} bookKey={tiny.books[0]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[0])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                            <ClickableLetter p={tiny.letterPositions[1]} label={tiny.letters[1]} bookKey={tiny.books[1]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[1])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                            <ClickableLetter p={tiny.letterPositions[2]} label={tiny.letters[2]} bookKey={tiny.books[2]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[2])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                        </g>
                    ))}
                    {wayTinyPyramids.map((tiny, idx) => (
                        <g key={`right-${idx}`}>
                            <polygon points={triPoints(tiny.vertices[0], tiny.vertices[1], tiny.vertices[2])} fill="none" stroke={innerStroke} strokeWidth={1} opacity={0.6} />
                            <ClickableLetter p={tiny.letterPositions[0]} label={tiny.letters[0]} bookKey={tiny.books[0]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[0])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                            <ClickableLetter p={tiny.letterPositions[1]} label={tiny.letters[1]} bookKey={tiny.books[1]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[1])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                            <ClickableLetter p={tiny.letterPositions[2]} label={tiny.letters[2]} bookKey={tiny.books[2]} selectedBook={selectedBook} hoveredBook={hoveredBook} onBookClick={onBookClick} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} textColor={getBookCategoryColor(tiny.books[2])} fontSize={tinyFontSize} scrollToPassage={scrollToPassage} />
                        </g>
                    ))}

                </svg>
            </div>
        </div>
    );
}
