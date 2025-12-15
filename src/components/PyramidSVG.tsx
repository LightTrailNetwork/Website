import React from "react";
import { BIBLE_BOOK_ORDER } from "../data/bibleBookConstants";

interface Point {
  x: number;
  y: number;
}

interface PyramidSVGProps {
  selectedLetter: string;
  hoveredLetter: string | null;
  onLetterClick: (letter: string) => void;
  onLetterHover: (letter: string | null) => void;
  showWords?: boolean;
  stroke?: string;
  innerStroke?: string;
  textColor?: string;
  accent?: string;
}

interface ClickableLetterProps {
  p: Point;
  label: string;
  passageKey: string;
  selectedLetter: string;
  hoveredLetter: string | null;
  onLetterClick: (letter: string) => void;
  onHoverStart: (letter: string) => void;
  onHoverEnd: () => void;
  textColor: string;
  fontSize: number;
  scrollToPassage: (passageKey: string) => void;
  showWords?: boolean;
}

// Inner letters (A-Z, !) map to NT books (MAT-REV)
// 27 books total. MAT is index 39 in BIBLE_BOOK_ORDER.
const INNER_LETTER_MAP: { [key: string]: string } = {
  "A": "MAT", "B": "MRK", "C": "LUK", "D": "JHN", "E": "ACT",
  "F": "ROM", "G": "1CO", "H": "2CO", "I": "GAL", "J": "EPH",
  "K": "PHP", "L": "COL", "M": "1TH", "N": "2TH", "O": "1TI",
  "P": "2TI", "Q": "TIT", "R": "PHM", "S": "HEB", "T": "JAS",
  "U": "1PE", "V": "2PE", "W": "1JN", "X": "2JN", "Y": "3JN",
  "Z": "JUD", "!": "REV"
};

const OUTER_WORD_MAP: { [key: string]: string } = {
  // Top Outer
  "A_Top": "Abide",
  "I_Left": "Imitate",
  "M_Right": "Mobilize",
  // GOD Pyramid
  "G": "Glorify",
  "O": "Obey",
  "D": "Delight",
  // MAN Pyramid
  "M_Man": "Made",
  "A_Man": "Aware",
  "N": "New",
  // WAY Pyramid
  "W": "Witness",
  "A_Way": "Acts",
  "Y": "Yield"
};

// Helper to determine the text to show
const getDisplayText = (label: string, passageKey: string, showWords: boolean) => {
  if (!showWords) return label;

  // Check if it is an inner letter (single char, A-Z or !)
  if (INNER_LETTER_MAP[label] && passageKey.length <= 1) {
    return INNER_LETTER_MAP[label];
  }

  // Fallback for special mappings where passageKey matches the word we want
  // Note: passageKey usually IS the word for outer passages (e.g. "Abide")
  if (["Abide", "Imitate", "Mobilize", "Glorify", "Obey", "Delight", "Made", "Aware", "New", "Witness", "Acts", "Yield"].includes(passageKey)) {
    return passageKey;
  }

  return label;
};

const ClickableLetter: React.FC<ClickableLetterProps> = ({
  p,
  label,
  passageKey,
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onHoverStart,
  onHoverEnd,
  textColor,
  fontSize,
  scrollToPassage,
  showWords,
}) => {
  const isHighlighted = hoveredLetter === passageKey || selectedLetter === passageKey;
  const displayLabel = getDisplayText(label, passageKey, showWords || false);

  // Determine scale factor based on context
  // Inner letters have passageKey length 1 (e.g. "A") and map to 3-letter codes (confined in tiny triangles)
  // Outer letters have key length > 1 (e.g. "Abide") and are floating outside
  const isInner = passageKey.length === 1;

  let scaleFactor = 1;
  if (showWords) {
    if (isInner) {
      // Inner 3-letter codes (MAT) - bump up to 0.65 to fill triangle better
      scaleFactor = 0.65;
    } else {
      // Outer words (Abide) - bump up to 0.75 as they have more space
      scaleFactor = 0.75;
    }
  }

  const effectiveFontSize = fontSize * scaleFactor;

  const handleClick = () => {
    onLetterClick(passageKey);
    scrollToPassage(passageKey);
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
        fontSize: isHighlighted ? effectiveFontSize * 1.3 : effectiveFontSize,
        fontWeight: isHighlighted ? 900 : 700,
        fill: isHighlighted ? "hsl(var(--destructive))" : textColor,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={handleClick}
      onMouseEnter={() => onHoverStart(passageKey)}
      onMouseLeave={onHoverEnd}
    >
      {displayLabel}
    </text>
  );
};

interface SubPyramidVertexProps {
  p: Point;
  label: string;
  passageKey: string;
  selectedLetter: string;
  hoveredLetter: string | null;
  onLetterClick: (letter: string) => void;
  onHoverStart: (letter: string) => void;
  onHoverEnd: () => void;
  textColor: string;
  fontSize: number;
  scrollToPassage: (passageKey: string) => void;
  showWords?: boolean;
}

const SubPyramidVertex: React.FC<SubPyramidVertexProps> = ({
  p,
  label,
  passageKey,
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onHoverStart,
  onHoverEnd,
  textColor,
  fontSize,
  scrollToPassage,
  showWords,
}) => {
  const isHighlighted = hoveredLetter === passageKey || selectedLetter === passageKey;
  const displayLabel = getDisplayText(label, passageKey, showWords || false);

  // These are intermediate vertices (G, O, D, etc) - words like "Glorify"
  // They are floating but close to triangles
  const effectiveFontSize = showWords ? fontSize * 0.6 : fontSize;

  const handleClick = () => {
    onLetterClick(passageKey);
    scrollToPassage(passageKey);
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
        fontSize: isHighlighted ? effectiveFontSize * 1.4 : effectiveFontSize,
        fontWeight: isHighlighted ? 900 : 700,
        fill: isHighlighted ? "hsl(var(--destructive))" : textColor,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={handleClick}
      onMouseEnter={() => onHoverStart(passageKey)}
      onMouseLeave={onHoverEnd}
    >
      {displayLabel}
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

export default function PyramidSVG({
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onLetterHover,
  stroke = "hsl(var(--primary))",
  innerStroke = "hsl(var(--muted-foreground))",
  textColor = "hsl(var(--foreground))",
  accent = "hsl(var(--primary))",
  showWords = false,
}: PyramidSVGProps) {
  // Helper function to scroll within the passage list container only
  // Helper function to scroll within the passage list container only
  const scrollToPassage = (passageKey: string) => {
    const element = document.getElementById(`passage-${passageKey}`);
    if (!element) return;

    const desktopContainer = document.getElementById("passage-list-desktop");

    // Check if desktop container is visible (offsetParent is null if active but hidden)
    const isDesktopVisible = desktopContainer && desktopContainer.offsetParent !== null;

    if (isDesktopVisible && desktopContainer) {
      // Desktop: scroll within the container manually to avoid page jumping
      const containerRect = desktopContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Calculate relative position within the scroll container
      const currentScrollTop = desktopContainer.scrollTop;
      const relativeTop = elementRect.top - containerRect.top;

      // Calculate target to center the element
      // elementTop absolute in container = relativeTop + currentScrollTop
      const targetScrollTop = currentScrollTop + relativeTop - (desktopContainer.clientHeight / 2) + (elementRect.height / 2);

      // Smooth scroll within the container
      desktopContainer.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    } else {
      // Mobile: scroll the entire page to the passage since there is no scroll container
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Hover delay logic
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onHoverStart = (letter: string) => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      onLetterHover(letter);
      scrollToPassage(letter);
    }, 200); // 200ms delay to prevent accidental scrolls
  };

  const onHoverEnd = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    onLetterHover(null);
  };

  const containerSize = isMobile ? 380 : 500;
  const svgSize = containerSize;

  // Pyramid dimensions matching original
  const S = svgSize * 0.7;
  const H = (Math.sqrt(3) / 2) * S;
  const leftPad = (svgSize - S) / 2;
  const startY = svgSize * 0.1;

  // Main triangle vertices
  const A = { x: leftPad + S / 2, y: startY };
  const B = { x: leftPad, y: startY + H };
  const C = { x: leftPad + S, y: startY + H };
  const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };

  const triPoints = (p0: Point, p1: Point, p2: Point) =>
    `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`;

  // Helper function to create upward pointing triangle
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
    letterPositions: [Point, Point, Point];
  }

  // Helper to create 3 tiny pyramids within a larger pyramid with margin
  const createTinyPyramidsInParent = (
    parentA: Point,
    parentB: Point,
    parentC: Point,
    letters: string[]
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

    const midAB = {
      x: (shrunkA.x + shrunkB.x) / 2,
      y: (shrunkA.y + shrunkB.y) / 2,
    };
    const midAC = {
      x: (shrunkA.x + shrunkC.x) / 2,
      y: (shrunkA.y + shrunkC.y) / 2,
    };
    const midBC = {
      x: (shrunkB.x + shrunkC.x) / 2,
      y: (shrunkB.y + shrunkC.y) / 2,
    };

    const topTri: [Point, Point, Point] = [shrunkA, midAB, midAC];
    const leftTri: [Point, Point, Point] = [midAB, shrunkB, midBC];
    const rightTri: [Point, Point, Point] = [midAC, midBC, shrunkC];

    return [topTri, leftTri, rightTri].map((tri, idx) => {
      const [p0, p1, p2] = tri;
      const letter = letters[idx * 3] || "";
      const letter2 = letters[idx * 3 + 1] || "";
      const letter3 = letters[idx * 3 + 2] || "";

      // Offset triangles toward their respective corners of the parent triangle
      const offsetAmount = 3; // pixels
      let offsetX = 0, offsetY = 0;

      if (idx === 0) { // Top triangle - move toward parent's top corner
        offsetY = -offsetAmount;
      } else if (idx === 1) { // Left triangle - move toward parent's bottom-left corner
        offsetX = -offsetAmount;
        offsetY = offsetAmount;
      } else if (idx === 2) { // Right triangle - move toward parent's bottom-right corner
        offsetX = offsetAmount;
        offsetY = offsetAmount;
      }

      // Apply offset to all vertices
      const offsetVertices: [Point, Point, Point] = [
        { x: p0.x + offsetX, y: p0.y + offsetY },
        { x: p1.x + offsetX, y: p1.y + offsetY },
        { x: p2.x + offsetX, y: p2.y + offsetY },
      ];

      // Position letters inside the offset triangles
      const center = {
        x: (offsetVertices[0].x + offsetVertices[1].x + offsetVertices[2].x) / 3,
        y: (offsetVertices[0].y + offsetVertices[1].y + offsetVertices[2].y) / 3,
      };
      const letterPositions: [Point, Point, Point] = [
        { x: center.x, y: offsetVertices[0].y + (center.y - offsetVertices[0].y) * 0.6 }, // Top letter, moved down from vertex
        {
          x: offsetVertices[1].x + (center.x - offsetVertices[1].x) * 0.6,
          y: offsetVertices[1].y + (center.y - offsetVertices[1].y) * 0.6,
        }, // Bottom left, moved up and right
        {
          x: offsetVertices[2].x + (center.x - offsetVertices[2].x) * 0.6,
          y: offsetVertices[2].y + (center.y - offsetVertices[2].y) * 0.6,
        }, // Bottom right, moved up and left
      ];

      return {
        vertices: offsetVertices,
        letters: [letter, letter2, letter3],
        letterPositions,
      };
    });
  };

  // Sub-triangles - scale with pyramid and add margin
  const subSide = S * 0.3;
  const topCenter = { x: leftPad + S / 2, y: startY + H * 0.35 };
  const leftCenter = { x: leftPad + S * 0.25, y: startY + H * 0.83 };
  const rightCenter = { x: leftPad + S * 0.75, y: startY + H * 0.83 };

  const [tA, tB, tC] = triUp(topCenter.x, topCenter.y, subSide);
  const [lA, lB, lC] = triUp(leftCenter.x, leftCenter.y, subSide);
  const [rA, rB, rC] = triUp(rightCenter.x, rightCenter.y, subSide);

  // Create tiny pyramids within each sub-pyramid
  const godTinyPyramids = createTinyPyramidsInParent(tA, tB, tC, [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
  ]);
  const manTinyPyramids = createTinyPyramidsInParent(lA, lB, lC, [
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
  ]);
  const wayTinyPyramids = createTinyPyramidsInParent(rA, rB, rC, [
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
  ]);

  // Font sizes based on container
  const baseFontSize = svgSize * 0.039;
  const subFontSizeWord = svgSize * 0.02;
  const subFontSize = svgSize * 0.02 * 1.2;
  const tinyFontSize = svgSize * 0.018;

  const tinyTextColor = "hsl(var(--muted-foreground))";

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative"
        style={{ width: containerSize, height: containerSize }}
      >
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          width="100%"
          height="100%"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id="outerPyramidGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="innerPyramidGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Outer triangle */}
          <polygon
            points={triPoints(A, B, C)}
            fill="url(#outerPyramidGradient)"
            stroke={stroke}
            strokeWidth={3}
          />

          {/* Sub-triangles */}
          <polygon
            points={triPoints(tA, tB, tC)}
            fill="url(#innerPyramidGradient)"
            stroke={innerStroke}
            strokeWidth={2}
          />
          <polygon
            points={triPoints(lA, lB, lC)}
            fill="url(#innerPyramidGradient)"
            stroke={innerStroke}
            strokeWidth={2}
          />
          <polygon
            points={triPoints(rA, rB, rC)}
            fill="url(#innerPyramidGradient)"
            stroke={innerStroke}
            strokeWidth={2}
          />

          {/* Outer vertex letters - A, I, M (positioned outside main pyramid) */}
          <ClickableLetter
            p={{ x: A.x, y: A.y - baseFontSize * 2 }}
            label="A"
            passageKey="Abide"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={baseFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <ClickableLetter
            p={{ x: B.x - baseFontSize * 2, y: B.y + baseFontSize * 1 }}
            label="I"
            passageKey="Imitate"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={baseFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <ClickableLetter
            p={{ x: C.x + baseFontSize * 2, y: C.y + baseFontSize * 1 }}
            label="M"
            passageKey="Mobilize"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={baseFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />

          {/* GOD, MAN, WAY labels */}
          <SubPyramidLabel
            center={topCenter}
            label="GOD"
            textColor={"hsl(var(--primary))"}
            fontSize={subFontSizeWord}
          />
          <SubPyramidLabel
            center={leftCenter}
            label="MAN"
            textColor={"hsl(var(--primary))"}
            fontSize={subFontSizeWord}
          />
          <SubPyramidLabel
            center={rightCenter}
            label="WAY"
            textColor={"hsl(var(--primary))"}
            fontSize={subFontSizeWord}
          />

          {/* GOD pyramid vertex letters - G, O, D (positioned outside triangle) */}
          <SubPyramidVertex
            p={{ x: tA.x, y: tA.y - subFontSize * 1 }}
            label="G"
            passageKey="Glorify"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <SubPyramidVertex
            p={{ x: tB.x - subFontSize * 1, y: tB.y + subFontSize * 1 }}
            label="O"
            passageKey="Obey"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <SubPyramidVertex
            p={{ x: tC.x + subFontSize * 1, y: tC.y + subFontSize * 1 }}
            label="D"
            passageKey="Delight"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />

          {/* MAN pyramid vertex letters - M, A, N (positioned outside triangle) */}
          <SubPyramidVertex
            p={{ x: lA.x, y: lA.y - subFontSize * 1 }}
            label="M"
            passageKey="Made"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <SubPyramidVertex
            p={{ x: lB.x - subFontSize * 1, y: lB.y + subFontSize * 1 }}
            label="A"
            passageKey="Aware"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <SubPyramidVertex
            p={{ x: lC.x + subFontSize * 1, y: lC.y + subFontSize * 1 }}
            label="N"
            passageKey="New"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />

          {/* WAY pyramid vertex letters - W, A, Y (positioned outside triangle) */}
          <SubPyramidVertex
            p={{ x: rA.x, y: rA.y - subFontSize * 1 }}
            label="W"
            passageKey="Witness"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <SubPyramidVertex
            p={{ x: rB.x - subFontSize * 1, y: rB.y + subFontSize * 1 }}
            label="A"
            passageKey="Acts"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />
          <SubPyramidVertex
            p={{ x: rC.x + subFontSize * 1, y: rC.y + subFontSize * 1 }}
            label="Y"
            passageKey="Yield"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            textColor={textColor}
            fontSize={subFontSize}
            scrollToPassage={scrollToPassage}
            showWords={showWords}
          />

          {/* GOD - Tiny pyramids and letters */}
          {godTinyPyramids.map((tiny, idx) => (
            <g key={`god-${idx}`}>
              <polygon
                points={triPoints(
                  tiny.vertices[0],
                  tiny.vertices[1],
                  tiny.vertices[2]
                )}
                fill="none"
                stroke={innerStroke}
                strokeWidth={1}
                opacity={0.6}
              />
              <ClickableLetter
                p={tiny.letterPositions[0]}
                label={tiny.letters[0]}
                passageKey={tiny.letters[0]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
              <ClickableLetter
                p={tiny.letterPositions[1]}
                label={tiny.letters[1]}
                passageKey={tiny.letters[1]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
              <ClickableLetter
                p={tiny.letterPositions[2]}
                label={tiny.letters[2]}
                passageKey={tiny.letters[2]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
            </g>
          ))}

          {/* MAN - Tiny pyramids and letters */}
          {manTinyPyramids.map((tiny, idx) => (
            <g key={`man-${idx}`}>
              <polygon
                points={triPoints(
                  tiny.vertices[0],
                  tiny.vertices[1],
                  tiny.vertices[2]
                )}
                fill="none"
                stroke={innerStroke}
                strokeWidth={1}
                opacity={0.6}
              />
              <ClickableLetter
                p={tiny.letterPositions[0]}
                label={tiny.letters[0]}
                passageKey={tiny.letters[0]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
              <ClickableLetter
                p={tiny.letterPositions[1]}
                label={tiny.letters[1]}
                passageKey={tiny.letters[1]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
              <ClickableLetter
                p={tiny.letterPositions[2]}
                label={tiny.letters[2]}
                passageKey={tiny.letters[2]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
            </g>
          ))}

          {/* WAY - Tiny pyramids and letters */}
          {wayTinyPyramids.map((tiny, idx) => (
            <g key={`way-${idx}`}>
              <polygon
                points={triPoints(
                  tiny.vertices[0],
                  tiny.vertices[1],
                  tiny.vertices[2]
                )}
                fill="none"
                stroke={innerStroke}
                strokeWidth={1}
                opacity={0.6}
              />
              <ClickableLetter
                p={tiny.letterPositions[0]}
                label={tiny.letters[0]}
                passageKey={tiny.letters[0]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
              <ClickableLetter
                p={tiny.letterPositions[1]}
                label={tiny.letters[1]}
                passageKey={tiny.letters[1]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
              <ClickableLetter
                p={tiny.letterPositions[2]}
                label={tiny.letters[2]}
                passageKey={tiny.letters[2]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
                scrollToPassage={scrollToPassage}
                showWords={showWords}
              />
            </g>
          ))}

          {/* Central AIM text */}
          <text
            x={centroid.x}
            y={centroid.y + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontFamily:
                "ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial",
              fontSize:
                selectedLetter === "AIM (Key)" || hoveredLetter === "AIM (Key)"
                  ? baseFontSize * 2.5
                  : baseFontSize * 2,
              fontWeight: 900,
              fill: selectedLetter === "AIM (Key)" || hoveredLetter === "AIM (Key)"
                ? "hsl(var(--destructive))"
                : "hsl(var(--primary))",
              opacity: selectedLetter === "AIM (Key)" || hoveredLetter === "AIM (Key)"
                ? 0.3
                : 0.1,
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              onLetterClick("AIM (Key)");
              scrollToPassage("AIM (Key)");
            }}
            onMouseEnter={() => onHoverStart("AIM (Key)")}
            onMouseLeave={onHoverEnd}
          >
            AIM
          </text>
        </svg>
      </div>
    </div>
  );
}
