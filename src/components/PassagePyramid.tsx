import React, { useState, useRef, useEffect } from "react";
import passagesData from "../data/pyramidPassages.json";

/**
 * AIM Pyramid — with headline + full legend (40 Passage Pyramid)
 * Adapted for the Christian Mentorship App
 */

interface PassagePyramidProps {
  stroke?: string;
  innerStroke?: string;
  textColor?: string;
  accent?: string;
}

export default function PassagePyramid({
  stroke = "#1e293b",
  innerStroke = "#64748b",
  textColor = "#0f172a",
  accent = "#1e40af",
}: PassagePyramidProps) {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState('AIM (Key)'); // For mobile: which verse to show
  const [mobileView, setMobileView] = useState<'pyramid' | 'list'>('pyramid'); // 'pyramid' or 'list'
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1600,
    height: typeof window !== 'undefined' ? window.innerHeight : 1100
  });

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    // Initial call to ensure correct dimensions
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to parse markdown-style formatting (*italic*, **bold**)
  const parseFormattedText = (text: string): string => {
    if (!text) return text;

    // Replace **text** with <strong>text</strong> and *text* with <em>text</em>
    // Handle **bold** first, then *italic* to avoid conflicts
    let html = text;

    // Replace **text** with <strong>text</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Replace *text* with <em>text</em>
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    return html;
  };

  // Helper to find passage by key
  const findPassageByKey = (key: string) => {
    // Check outer passages
    const outer = passagesData.outerPassages.passages.find(p => p.key === key);
    if (outer) return outer;

    // Check inner passages
    for (const section of passagesData.innerPassages.sections) {
      for (const subsection of section.subsections) {
        const found = subsection.passages.find(p => p.key === key);
        if (found) return found;
      }
    }
    return null;
  };

  // Get all passages as flat array for mobile list view
  const allPassages = [
    ...passagesData.outerPassages.passages,
    ...passagesData.innerPassages.sections.flatMap(section =>
      section.subsections.flatMap(subsection => subsection.passages)
    )
  ];

  // --- Responsive Geometry based on viewport ---
  const vw = dimensions.width;
  const vh = dimensions.height;

  // Calculate dimensions to fit on screen
  const isMobile = vw < 768;

  // Mobile layout: full width for pyramid, verse card below
  // Desktop layout: pyramid left, legend right
  const legendW = isMobile ? 0 : Math.min(400, vw * 0.25);
  const availableW = isMobile ? vw : vw - legendW;
  const availableH = isMobile ? vh * 0.45 : vh; // On mobile, pyramid gets 45% of height

  // Scale pyramid to fit available space with padding
  const maxPyramidW = availableW * (isMobile ? 0.90 : 0.9);
  const maxPyramidH = availableH * (isMobile ? 0.85 : 0.85);

  const S = Math.min(maxPyramidW, maxPyramidH * (2 / Math.sqrt(3)));
  const H = (Math.sqrt(3) / 2) * S;

  const marginTop = isMobile ? vh * 0.01 : vh * 0.02;
  const leftPad = isMobile ? (vw - S) / 2 : availableW * 0.05; // Center on mobile
  const canvasW = vw;
  const canvasH = vh;

  // Adjust positioning for headline
  const headlineHeight = isMobile ? vh * 0.12 : vh * 0.12;
  const pyramidStartY = marginTop + headlineHeight;

  const A = { x: leftPad + S / 2, y: pyramidStartY };
  const B = { x: leftPad + 0, y: pyramidStartY + H };
  const C = { x: leftPad + S, y: pyramidStartY + H };
  const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };

  const triPoints = (p0: any, p1: any, p2: any) => `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`;

  // Helper to create 3 tiny pyramids within a larger pyramid with margin
  const createTinyPyramidsInParent = (parentA: any, parentB: any, parentC: any, letters: string[]) => {
    // Calculate the centroid of the parent
    const centroidX = (parentA.x + parentB.x + parentC.x) / 3;
    const centroidY = (parentA.y + parentB.y + parentC.y) / 3;

    // First, add margin by moving vertices toward parent centroid
    const parentMargin = 0.28; // 28% margin from parent edges
    const shrinkVertex = (v: any) => ({
      x: v.x + (centroidX - v.x) * parentMargin,
      y: v.y + (centroidY - v.y) * parentMargin
    });

    const shrunkA = shrinkVertex(parentA);
    const shrunkB = shrinkVertex(parentB);
    const shrunkC = shrinkVertex(parentC);

    // Calculate midpoints of each edge using shrunk vertices
    const midAB = { x: (shrunkA.x + shrunkB.x) / 2, y: (shrunkA.y + shrunkB.y) / 2 };
    const midAC = { x: (shrunkA.x + shrunkC.x) / 2, y: (shrunkA.y + shrunkC.y) / 2 };
    const midBC = { x: (shrunkB.x + shrunkC.x) / 2, y: (shrunkB.y + shrunkC.y) / 2 };

    // Create 3 upward-pointing triangles
    const topTri = [shrunkA, midAB, midAC];
    const leftTri = [midAB, shrunkB, midBC];
    const rightTri = [midAC, midBC, shrunkC];

    // Now shrink each tiny triangle toward its own centroid to create gaps between them
    const tinyMargin = 0.20; // Additional 20% margin for each tiny triangle
    const shrinkTriangle = (tri: any[]) => {
      const cx = (tri[0].x + tri[1].x + tri[2].x) / 3;
      const cy = (tri[0].y + tri[1].y + tri[2].y) / 3;
      return tri.map(v => ({
        x: v.x + (cx - v.x) * tinyMargin,
        y: v.y + (cy - v.y) * tinyMargin
      }));
    };

    return [
      { vertices: shrinkTriangle(topTri), letters: letters.slice(0, 3) },
      { vertices: shrinkTriangle(leftTri), letters: letters.slice(3, 6) },
      { vertices: shrinkTriangle(rightTri), letters: letters.slice(6, 9) }
    ];
  };

  const triUp = (cx: number, cy: number, s: number) => {
    const h = (Math.sqrt(3) / 2) * s;
    return [
      { x: cx, y: cy - (2 / 3) * h },
      { x: cx - s / 2, y: cy + (1 / 3) * h },
      { x: cx + s / 2, y: cy + (1 / 3) * h },
    ];
  };

  const Vertex = ({ p, label, size = 30, passageKey = null, isClickable = false }: any) => {
    // Calculate offset to push labels away from centroid more prominently
    const dx = (centroid.x - p.x) * 0.08;
    const dy = (centroid.y - p.y) * 0.08;
    const isHovered = passageKey && (hoveredLetter === passageKey || (isMobile && selectedLetter === passageKey));

    const handleClick = () => {
      if (!isClickable || !passageKey) return;
      if (isMobile) {
        setSelectedLetter(passageKey);
      } else {
        const element = document.getElementById(`passage-${passageKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    return (
      <text
        x={p.x + dx}
        y={p.y + dy}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial',
          fontSize: isHovered ? size * 1.4 : size,
          fontWeight: isHovered ? 900 : 800,
          fill: isHovered ? '#dc2626' : textColor,
          letterSpacing: '0.5px',
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.2s',
          transformOrigin: 'center'
        }}
        onClick={handleClick}
        onMouseEnter={isClickable && !isMobile ? () => {
          setHoveredLetter(passageKey);
          const element = document.getElementById(`passage-${passageKey}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } : undefined}
        onMouseLeave={isClickable && !isMobile ? () => setHoveredLetter(null) : undefined}
      >
        {label}
      </text>
    );
  };

  const SubPyramidLabel = ({ center, label }: any) => {
    return (
      <text
        x={center.x}
        y={center.y}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial',
          fontSize: S * 0.026,
          fontWeight: 800,
          fill: '#6b7280',
          letterSpacing: '1px'
        }}
      >
        {label}
      </text>
    );
  };

  const SubPyramidVertex = ({ p, label, passageKey, subCenter }: any) => {
    // Offset away from sub-pyramid centroid
    const dx = (p.x - subCenter.x) * 0.15;
    const dy = (p.y - subCenter.y) * 0.15;
    const isHovered = hoveredLetter === passageKey || (isMobile && selectedLetter === passageKey);
    const baseFontSize = Math.max(10, S * 0.022);

    const handleClick = () => {
      if (isMobile) {
        setSelectedLetter(passageKey);
      } else {
        const element = document.getElementById(`passage-${passageKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    return (
      <text
        x={p.x + dx}
        y={p.y + dy}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial',
          fontSize: isHovered ? baseFontSize * 1.4 : baseFontSize,
          fontWeight: isHovered ? 900 : 700,
          fill: isHovered ? '#dc2626' : textColor,
          cursor: 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '0.5px'
        }}
        onClick={handleClick}
        onMouseEnter={!isMobile ? () => {
          setHoveredLetter(passageKey);
          const element = document.getElementById(`passage-${passageKey}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } : undefined}
        onMouseLeave={!isMobile ? () => setHoveredLetter(null) : undefined}
      >
        {label}
      </text>
    );
  };

  const ClickableLetter = ({ p, label, passageKey }: any) => {
    const isHovered = hoveredLetter === passageKey || (isMobile && selectedLetter === passageKey);
    const baseFontSize = Math.max(10, S * 0.016);

    const handleClick = () => {
      if (isMobile) {
        setSelectedLetter(passageKey);
      } else {
        const element = document.getElementById(`passage-${passageKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    return (
      <text
        x={p.x}
        y={p.y}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial',
          fontSize: isHovered ? baseFontSize * 1.4 : baseFontSize,
          fontWeight: isHovered ? 900 : 700,
          fill: isHovered ? '#dc2626' : textColor,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onClick={handleClick}
        onMouseEnter={!isMobile ? () => {
          setHoveredLetter(passageKey);
          const element = document.getElementById(`passage-${passageKey}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } : undefined}
        onMouseLeave={!isMobile ? () => setHoveredLetter(null) : undefined}
      >
        {label}
      </text>
    );
  };

  // Sub‑triangles - scale with pyramid and add margin
  const subSide = S * 0.30;
  const topCenter = { x: leftPad + S / 2, y: pyramidStartY + H * 0.35 };
  const leftCenter = { x: leftPad + S * 0.25, y: pyramidStartY + H * 0.83 };
  const rightCenter = { x: leftPad + S * 0.75, y: pyramidStartY + H * 0.83 };
  const [tA, tB, tC] = triUp(topCenter.x, topCenter.y, subSide);
  const [lA, lB, lC] = triUp(leftCenter.x, leftCenter.y, subSide);
  const [rA, rB, rC] = triUp(rightCenter.x, rightCenter.y, subSide);

  // Create tiny pyramids within each sub-pyramid
  const godTinyPyramids = createTinyPyramidsInParent(tA, tB, tC, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
  const manTinyPyramids = createTinyPyramidsInParent(lA, lB, lC, ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']);
  const wayTinyPyramids = createTinyPyramidsInParent(rA, rB, rC, ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!']);

  // Headline text from JSON
  const headline = passagesData.headline;

  return (
    <div className="w-full h-full bg-gray-50">
      <svg 
        viewBox={`0 0 ${canvasW} ${canvasH}`} 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg" 
        role="img" 
        aria-label="AIM pyramid with 40-passage legend"
        className="w-full h-full"
      >
        <defs>
          {/* Gradients for pyramids */}
          <linearGradient id="outerPyramidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eff6ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="innerPyramidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.15" />
          </linearGradient>

          {/* Shadows */}
          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.06" />
          </filter>
          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.05" />
          </filter>

          <style>{`
            .legend h3 { margin: 0 0 10px 0; font-size: clamp(14px, ${vh * 0.02}px, 18px); font-weight: 800; color: #0f172a; letter-spacing: -0.025em; }
            .legend h4 { margin: ${vh * 0.015}px 0 6px 0; font-size: clamp(12px, ${vh * 0.018}px, 15px); font-weight: 700; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; }
            .legend p { margin: 0 0 0 0; font-size: clamp(11px, ${vh * 0.014}px, 13px); line-height: 1.5; color: #475569; }
            .legend p em { font-style: italic; color: #1e293b; }
            .legend p strong { font-weight: 700; color: #0f172a; display: inline; }
            .legend .category { margin: ${vh * 0.012}px 0 6px 0; font-size: clamp(11px, ${vh * 0.016}px, 14px); font-weight: 700; color: #334155; font-style: italic; }
            .legend .subsection { margin: ${vh * 0.01}px 0 4px 0; font-size: clamp(10px, ${vh * 0.014}px, 13px); font-weight: 600; color: #475569; }
            .legend .ref { font-size: clamp(9px, ${vh * 0.012}px, 11px); color: #94a3b8; margin-top: 3px; display: block; font-weight: 500; }
            .legend .row { margin-bottom: ${vh * 0.01}px; padding: ${vh * 0.008}px ${vh * 0.01}px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #cbd5e1; transition: all 0.3s; }
            .legend .row.highlighted { background: #fee2e2; border-left: 3px solid #dc2626; transform: scale(1.02); }
            .legend .row > strong { color: #0f172a; font-weight: 700; display: block; margin-bottom: 3px; font-size: clamp(10px, ${vh * 0.014}px, 13px); }
          `}</style>
        </defs>

        {/* Background with subtle gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fefefe" />
            <stop offset="100%" stopColor="#f9fafb" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={canvasW} height={canvasH} fill="url(#bgGradient)" />

        {/* Headline */}
        <foreignObject x={leftPad} y={marginTop} width={S} height={headlineHeight}>
          <div 
            xmlns="http://www.w3.org/1999/xhtml" 
            style={{
              fontSize: isMobile ? Math.max(10, vh * 0.014) : Math.max(12, vh * 0.018), 
              fontWeight: 700, 
              color: '#0f172a', 
              textAlign: 'center', 
              padding: '0 5%', 
              lineHeight: isMobile ? 1.25 : 1.3, 
              letterSpacing: '-0.015em', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial'
            }}
          >
            {headline}
          </div>
        </foreignObject>

        {/* Outer triangle */}
        <polygon points={triPoints(A, B, C)} fill="url(#outerPyramidGradient)" stroke={stroke} strokeWidth={3.5} filter="url(#subtleShadow)" />

        {/* Outer vertex letters - clickable to highlight Abide, Imitate, Mobilize */}
        <Vertex p={A} label="A" size={S * 0.03} passageKey="Abide" isClickable={true} />
        <Vertex p={B} label="I" size={S * 0.03} passageKey="Imitate" isClickable={true} />
        <Vertex p={C} label="M" size={S * 0.03} passageKey="Mobilize" isClickable={true} />

        {/* Central title - hoverable to highlight AIM (Key) verse */}
        <text
          x={centroid.x}
          y={centroid.y + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: (hoveredLetter === 'AIM (Key)' || (isMobile && selectedLetter === 'AIM (Key)')) ? S * 0.064 * 1.4 : S * 0.064,
            fontWeight: (hoveredLetter === 'AIM (Key)' || (isMobile && selectedLetter === 'AIM (Key)')) ? 900 : 900,
            letterSpacing: S * 0.004,
            fill: (hoveredLetter === 'AIM (Key)' || (isMobile && selectedLetter === 'AIM (Key)')) ? '#dc2626' : accent,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial'
          }}
          onClick={() => {
            if (isMobile) {
              setSelectedLetter('AIM (Key)');
            } else {
              const element = document.getElementById('passage-AIM (Key)');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
          }}
          onMouseEnter={!isMobile ? () => {
            setHoveredLetter('AIM (Key)');
            const element = document.getElementById('passage-AIM (Key)');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } : undefined}
          onMouseLeave={!isMobile ? () => setHoveredLetter(null) : undefined}
        >
          AIM
        </text>

        {/* Sub‑triangles */}
        <polygon points={triPoints(tA, tB, tC)} fill="url(#innerPyramidGradient)" stroke={innerStroke} strokeWidth={2} />
        <polygon points={triPoints(lA, lB, lC)} fill="url(#innerPyramidGradient)" stroke={innerStroke} strokeWidth={2} />
        <polygon points={triPoints(rA, rB, rC)} fill="url(#innerPyramidGradient)" stroke={innerStroke} strokeWidth={2} />

        {/* GOD, MAN, WAY labels */}
        <SubPyramidLabel center={topCenter} label="GOD" />
        <SubPyramidLabel center={leftCenter} label="MAN" />
        <SubPyramidLabel center={rightCenter} label="WAY" />

        {/* GOD pyramid vertex letters - G, O, D */}
        <SubPyramidVertex p={tA} label="G" passageKey="Glorify" subCenter={topCenter} />
        <SubPyramidVertex p={tB} label="O" passageKey="Obey" subCenter={topCenter} />
        <SubPyramidVertex p={tC} label="D" passageKey="Delight" subCenter={topCenter} />

        {/* MAN pyramid vertex letters - M, A, N */}
        <SubPyramidVertex p={lA} label="M" passageKey="Made" subCenter={leftCenter} />
        <SubPyramidVertex p={lB} label="A" passageKey="Aware" subCenter={leftCenter} />
        <SubPyramidVertex p={lC} label="N" passageKey="New" subCenter={leftCenter} />

        {/* WAY pyramid vertex letters - W, A, Y */}
        <SubPyramidVertex p={rA} label="W" passageKey="Witness" subCenter={rightCenter} />
        <SubPyramidVertex p={rB} label="A" passageKey="Acts" subCenter={rightCenter} />
        <SubPyramidVertex p={rC} label="Y" passageKey="Yield" subCenter={rightCenter} />

        {/* GOD - Tiny pyramids and letters */}
        {godTinyPyramids.map((tiny, idx) => (
          <g key={`god-${idx}`}>
            <polygon
              points={triPoints(tiny.vertices[0], tiny.vertices[1], tiny.vertices[2])}
              fill="none"
              stroke={innerStroke}
              strokeWidth={1}
              opacity={0.6}
            />
            <ClickableLetter p={tiny.vertices[0]} label={tiny.letters[0]} passageKey={tiny.letters[0]} />
            <ClickableLetter p={tiny.vertices[1]} label={tiny.letters[1]} passageKey={tiny.letters[1]} />
            <ClickableLetter p={tiny.vertices[2]} label={tiny.letters[2]} passageKey={tiny.letters[2]} />
          </g>
        ))}

        {/* MAN - Tiny pyramids and letters */}
        {manTinyPyramids.map((tiny, idx) => (
          <g key={`man-${idx}`}>
            <polygon
              points={triPoints(tiny.vertices[0], tiny.vertices[1], tiny.vertices[2])}
              fill="none"
              stroke={innerStroke}
              strokeWidth={1}
              opacity={0.6}
            />
            <ClickableLetter p={tiny.vertices[0]} label={tiny.letters[0]} passageKey={tiny.letters[0]} />
            <ClickableLetter p={tiny.vertices[1]} label={tiny.letters[1]} passageKey={tiny.letters[1]} />
            <ClickableLetter p={tiny.vertices[2]} label={tiny.letters[2]} passageKey={tiny.letters[2]} />
          </g>
        ))}

        {/* WAY - Tiny pyramids and letters */}
        {wayTinyPyramids.map((tiny, idx) => (
          <g key={`way-${idx}`}>
            <polygon
              points={triPoints(tiny.vertices[0], tiny.vertices[1], tiny.vertices[2])}
              fill="none"
              stroke={innerStroke}
              strokeWidth={1}
              opacity={0.6}
            />
            <ClickableLetter p={tiny.vertices[0]} label={tiny.letters[0]} passageKey={tiny.letters[0]} />
            <ClickableLetter p={tiny.vertices[1]} label={tiny.letters[1]} passageKey={tiny.letters[1]} />
            <ClickableLetter p={tiny.vertices[2]} label={tiny.letters[2]} passageKey={tiny.letters[2]} />
          </g>
        ))}

        {/* Desktop: Right Legend (full 40 passages) */}
        {!isMobile && (
          <g transform={`translate(${availableW}, ${vh * 0.02})`} filter="url(#cardShadow)">
            <rect x={0} y={0} width={legendW} height={vh * 0.96} rx={16} ry={16} fill="#ffffff" stroke="#cbd5e1" strokeWidth={1.5} />
            <foreignObject x={16} y={16} width={legendW - 32} height={vh * 0.96 - 32}>
              <div xmlns="http://www.w3.org/1999/xhtml" className="legend" style={{padding:'12px', overflowY:'auto', height:'100%', fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial'}}>
                <h3>40 Passage Pyramid</h3>

                <h4>{passagesData.outerPassages.title}</h4>
                {passagesData.outerPassages.passages.map((passage, i) => (
                  <div
                    className={`row ${hoveredLetter === passage.key ? 'highlighted' : ''}`}
                    key={i}
                    id={`passage-${passage.key}`}
                    onMouseEnter={() => setHoveredLetter(passage.key)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{passage.key}</strong>
                    <p>
                      <span dangerouslySetInnerHTML={{ __html: parseFormattedText(passage.text) }} />
                      {' '}<span className="ref">{passage.reference}</span>
                    </p>
                  </div>
                ))}

                <h4>{passagesData.innerPassages.title}</h4>
                {passagesData.innerPassages.sections.map((section, sIdx) => (
                  <div key={sIdx}>
                    <div className="category">{section.category}</div>
                    {section.subsections.map((subsection, ssIdx) => (
                      <div key={ssIdx}>
                        {subsection.title && <div className="subsection">{subsection.title}</div>}
                        {subsection.passages.map((passage, pIdx) => (
                          <div
                            className={`row ${hoveredLetter === passage.key ? 'highlighted' : ''}`}
                            key={pIdx}
                            id={`passage-${passage.key}`}
                            onMouseEnter={() => setHoveredLetter(passage.key)}
                            onMouseLeave={() => setHoveredLetter(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            <strong>{passage.key}</strong>
                            <p>
                              <span dangerouslySetInnerHTML={{ __html: parseFormattedText(passage.text) }} />
                              {' '}<span className="ref">{passage.reference}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </foreignObject>
          </g>
        )}

        {/* Mobile: Bottom verse card or list view */}
        {isMobile && (
          <g>
            {/* Toggle button */}
            <foreignObject x={vw * 0.05} y={pyramidStartY + H + vh * 0.03} width={vw * 0.9} height={vh * 0.06}>
              <div xmlns="http://www.w3.org/1999/xhtml" style={{display:'flex', justifyContent:'center', gap:'10px', paddingTop:'8px'}}>
                <button
                  onClick={() => setMobileView('pyramid')}
                  className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-colors ${
                    mobileView === 'pyramid' 
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  Verse Card
                </button>
                <button
                  onClick={() => setMobileView('list')}
                  className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-colors ${
                    mobileView === 'list' 
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  Full List
                </button>
              </div>
            </foreignObject>

            {/* Verse card view */}
            {mobileView === 'pyramid' && (() => {
              const passage = findPassageByKey(selectedLetter);
              return passage ? (
                <g transform={`translate(${vw * 0.05}, ${pyramidStartY + H + vh * 0.10})`} filter="url(#cardShadow)">
                  <rect x={0} y={0} width={vw * 0.9} height={vh * 0.28} rx={12} ry={12} fill="#ffffff" stroke="#cbd5e1" strokeWidth={1.5} />
                  <foreignObject x={12} y={12} width={vw * 0.9 - 24} height={vh * 0.28 - 24}>
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{padding:'16px', height:'100%', display:'flex', flexDirection:'column', fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial'}}>
                      <div style={{fontSize:'20px', fontWeight:800, color:'#0f172a', marginBottom:'10px'}}>{passage.key}</div>
                      <p style={{fontSize:'15px', lineHeight:1.5, color:'#475569', margin:0, flex:1, overflowY:'auto'}}>
                        <span dangerouslySetInnerHTML={{ __html: parseFormattedText(passage.text) }} />
                      </p>
                      <div style={{fontSize:'12px', color:'#94a3b8', marginTop:'10px', fontWeight:500}}>{passage.reference}</div>
                    </div>
                  </foreignObject>
                </g>
              ) : null;
            })()}

            {/* List view */}
            {mobileView === 'list' && (
              <g transform={`translate(${vw * 0.05}, ${pyramidStartY + H + vh * 0.10})`} filter="url(#cardShadow)">
                <rect x={0} y={0} width={vw * 0.9} height={vh * 0.28} rx={12} ry={12} fill="#ffffff" stroke="#cbd5e1" strokeWidth={1.5} />
                <foreignObject x={12} y={12} width={vw * 0.9 - 24} height={vh * 0.28 - 24}>
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{padding:'12px', height:'100%', overflowY:'auto', fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial'}}>
                    {allPassages.map((passage, i) => (
                      <div
                        key={i}
                        onClick={() => { setSelectedLetter(passage.key); setMobileView('pyramid'); }}
                        style={{
                          marginBottom:'8px',
                          padding:'12px',
                          background: selectedLetter === passage.key ? '#fee2e2' : '#f8fafc',
                          borderRadius:'6px',
                          borderLeft: selectedLetter === passage.key ? '3px solid #dc2626' : '3px solid #cbd5e1',
                          cursor:'pointer'
                        }}
                      >
                        <div style={{fontSize:'14px', fontWeight:700, color:'#0f172a', marginBottom:'4px'}}>{passage.key}</div>
                        <p style={{fontSize:'13px', lineHeight:1.5, color:'#475569', margin:0}}>
                          <span dangerouslySetInnerHTML={{ __html: parseFormattedText(passage.text) }} />
                        </p>
                        <div style={{fontSize:'11px', color:'#94a3b8', marginTop:'4px'}}>{passage.reference}</div>
                      </div>
                    ))}
                  </div>
                </foreignObject>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}