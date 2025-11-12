import React from "react";

interface Point {
  x: number;
  y: number;
}

interface PyramidSVGProps {
  selectedLetter: string;
  hoveredLetter: string | null;
  onLetterClick: (letter: string) => void;
  onLetterHover: (letter: string | null) => void;
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
  onLetterHover: (letter: string | null) => void;
  textColor: string;
  fontSize: number;
}

const ClickableLetter: React.FC<ClickableLetterProps> = ({
  p,
  label,
  passageKey,
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onLetterHover,
  textColor,
  fontSize,
}) => {
  const isHovered = hoveredLetter === passageKey;

  const handleClick = () => {
    onLetterClick(passageKey);

    // Auto-scroll to passage
    const element = document.getElementById(`passage-${passageKey}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMouseEnter = () => {
    onLetterHover(passageKey);

    // Auto-scroll to passage on hover (desktop)
    const element = document.getElementById(`passage-${passageKey}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
        fontSize: isHovered ? fontSize * 1.3 : fontSize,
        fontWeight: isHovered ? 900 : 700,
        fill: isHovered ? "#dc2626" : textColor,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onLetterHover(null)}
    >
      {label}
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
  onLetterHover: (letter: string | null) => void;
  textColor: string;
  fontSize: number;
}

const SubPyramidVertex: React.FC<SubPyramidVertexProps> = ({
  p,
  label,
  passageKey,
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onLetterHover,
  textColor,
  fontSize,
}) => {
  const isHovered = hoveredLetter === passageKey;

  const handleClick = () => {
    onLetterClick(passageKey);

    // Auto-scroll to passage
    const element = document.getElementById(`passage-${passageKey}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMouseEnter = () => {
    onLetterHover(passageKey);

    // Auto-scroll to passage on hover (desktop)
    const element = document.getElementById(`passage-${passageKey}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
        fontSize: isHovered ? fontSize * 1.4 : fontSize,
        fontWeight: isHovered ? 900 : 700,
        fill: isHovered ? "#dc2626" : textColor,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onLetterHover(null)}
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

export default function PyramidSVG({
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onLetterHover,
  stroke = "#2563eb",
  innerStroke = "#64748b",
  textColor = "#0f172a",
  accent = "#2563eb",
}: PyramidSVGProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const containerSize = isMobile ? 380 : 500;
  const svgSize = containerSize;

  // Pyramid dimensions matching original
  const S = svgSize * 0.8;
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

  // Helper to create 3 tiny pyramids within a larger pyramid with margin
  const createTinyPyramidsInParent = (
    parentA: Point,
    parentB: Point,
    parentC: Point,
    letters: string[]
  ) => {
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

    const topTri = [shrunkA, midAB, midAC];
    const leftTri = [midAB, shrunkB, midBC];
    const rightTri = [midAC, midBC, shrunkC];

    return [topTri, leftTri, rightTri].map((tri, idx) => {
      const [p0, p1, p2] = tri;
      const letter = letters[idx * 3] || "";
      const letter2 = letters[idx * 3 + 1] || "";
      const letter3 = letters[idx * 3 + 2] || "";

      // Position letters inside the triangles
      const center = {
        x: (p0.x + p1.x + p2.x) / 3,
        y: (p0.y + p1.y + p2.y) / 3,
      };
      const letterPositions = [
        { x: center.x, y: p0.y + (center.y - p0.y) * 0.6 }, // Top letter, moved down from vertex
        {
          x: p1.x + (center.x - p1.x) * 0.6,
          y: p1.y + (center.y - p1.y) * 0.6,
        }, // Bottom left, moved up and right
        {
          x: p2.x + (center.x - p2.x) * 0.6,
          y: p2.y + (center.y - p2.y) * 0.6,
        }, // Bottom right, moved up and left
      ];

      return {
        vertices: [p0, p1, p2],
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
  const subFontSize = svgSize * 0.02;
  const tinyFontSize = svgSize * 0.018;

  const tinyTextColor = "#94a3b8";

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
              <stop offset="0%" stopColor="#eff6ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="innerPyramidGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0.15" />
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
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={baseFontSize}
          />
          <ClickableLetter
            p={{ x: B.x - baseFontSize * 2, y: B.y + baseFontSize * 1 }}
            label="I"
            passageKey="Imitate"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={baseFontSize}
          />
          <ClickableLetter
            p={{ x: C.x + baseFontSize * 2, y: C.y + baseFontSize * 1 }}
            label="M"
            passageKey="Mobilize"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={baseFontSize}
          />

          {/* GOD, MAN, WAY labels */}
          <SubPyramidLabel
            center={topCenter}
            label="GOD"
            textColor={"#2563eb"}
            fontSize={subFontSize}
          />
          <SubPyramidLabel
            center={leftCenter}
            label="MAN"
            textColor={"#2563eb"}
            fontSize={subFontSize}
          />
          <SubPyramidLabel
            center={rightCenter}
            label="WAY"
            textColor={"#2563eb"}
            fontSize={subFontSize}
          />

          {/* GOD pyramid vertex letters - G, O, D (positioned outside triangle) */}
          <SubPyramidVertex
            p={{ x: tA.x, y: tA.y - subFontSize * 1 }}
            label="G"
            passageKey="Glorify"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />
          <SubPyramidVertex
            p={{ x: tB.x - subFontSize * 1, y: tB.y + subFontSize * 1 }}
            label="O"
            passageKey="Obey"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />
          <SubPyramidVertex
            p={{ x: tC.x + subFontSize * 1, y: tC.y + subFontSize * 1 }}
            label="D"
            passageKey="Delight"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />

          {/* MAN pyramid vertex letters - M, A, N (positioned outside triangle) */}
          <SubPyramidVertex
            p={{ x: lA.x, y: lA.y - subFontSize * 1 }}
            label="M"
            passageKey="Made"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />
          <SubPyramidVertex
            p={{ x: lB.x - subFontSize * 1, y: lB.y + subFontSize * 1 }}
            label="A"
            passageKey="Aware"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />
          <SubPyramidVertex
            p={{ x: lC.x + subFontSize * 1, y: lC.y + subFontSize * 1 }}
            label="N"
            passageKey="New"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />

          {/* WAY pyramid vertex letters - W, A, Y (positioned outside triangle) */}
          <SubPyramidVertex
            p={{ x: rA.x, y: rA.y - subFontSize * 1 }}
            label="W"
            passageKey="Witness"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />
          <SubPyramidVertex
            p={{ x: rB.x - subFontSize * 1, y: rB.y + subFontSize * 1 }}
            label="A"
            passageKey="Acts"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
          />
          <SubPyramidVertex
            p={{ x: rC.x + subFontSize * 1, y: rC.y + subFontSize * 1 }}
            label="Y"
            passageKey="Yield"
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={onLetterClick}
            onLetterHover={onLetterHover}
            textColor={textColor}
            fontSize={subFontSize}
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
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
              />
              <ClickableLetter
                p={tiny.letterPositions[1]}
                label={tiny.letters[1]}
                passageKey={tiny.letters[1]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
              />
              <ClickableLetter
                p={tiny.letterPositions[2]}
                label={tiny.letters[2]}
                passageKey={tiny.letters[2]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
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
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
              />
              <ClickableLetter
                p={tiny.letterPositions[1]}
                label={tiny.letters[1]}
                passageKey={tiny.letters[1]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
              />
              <ClickableLetter
                p={tiny.letterPositions[2]}
                label={tiny.letters[2]}
                passageKey={tiny.letters[2]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
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
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
              />
              <ClickableLetter
                p={tiny.letterPositions[1]}
                label={tiny.letters[1]}
                passageKey={tiny.letters[1]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
              />
              <ClickableLetter
                p={tiny.letterPositions[2]}
                label={tiny.letters[2]}
                passageKey={tiny.letters[2]}
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={onLetterClick}
                onLetterHover={onLetterHover}
                textColor={tinyTextColor}
                fontSize={tinyFontSize}
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
              fill: "#2563eb",
              cursor: "pointer",
              userSelect: "none",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              onLetterClick("AIM (Key)");
              const element = document.getElementById(`passage-AIM (Key)`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            onMouseEnter={() => {
              onLetterHover("AIM (Key)");
              const element = document.getElementById(`passage-AIM (Key)`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            onMouseLeave={() => onLetterHover(null)}
          >
            AIM
          </text>
        </svg>
      </div>
    </div>
  );
}
