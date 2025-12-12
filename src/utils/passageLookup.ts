import pyramidPassages from '../data/pyramidPassages.json';

// Flatten the inner passages for easy lookup
const passages = pyramidPassages.innerPassages.sections.flatMap(section =>
    section.subsections.flatMap(subsection => subsection.passages)
);

export const getPassage = (refQuery: string): string => {
    // Normalize query (remove Parens, BSB, spacing)
    const normalize = (s: string) => s.replace(/[()]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
    const query = normalize(refQuery);

    const match = passages.find(p => {
        // Check if reference contains the query (e.g. "Matthew 28:19 (BSB)" contains "Matthew 28:19")
        return normalize(p.reference).includes(query);
    });

    if (match) {
        // Strip markdown stars
        const cleanText = match.text.replace(/\*\*/g, '');
        // Return "Text - Reference"
        // Note: JSON reference has parens e.g. "Matthew 28:19 (BSB)".
        // tableData used "Matthew 28:19 BSB" (no parens).
        // I'll keep the JSON format or strip parens to match previous style?
        // User saw "Matthew 28:19 BSB" in screenshot. JSON has (BSB).
        // I will use the JSON reference as is (with parens) as it usually looks better, or strip them if needed.
        // I'll stick to the JSON reference to be "same source".
        return `${cleanText} - ${match.reference}`;
    }

    // Fallback if not found (should not happen if I map correctly)
    return `[Passage not found for ${refQuery}]`;
};
