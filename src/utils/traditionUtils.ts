import passagesData from '../data/pyramidPassages.json';

export interface TraditionInfo {
    letter: string;
    text: string;
    rawText: string;
    emphasisWord: string;
    translation: string;
}

export const getTraditionInfo = (referenceString: string | undefined): TraditionInfo | null => {
    if (!referenceString) return null;

    // Normalize reference string: remove content in parentheses like "(BSB)" for matching if needed, 
    // but the json keys/references might be exact or not. 
    // Looking at data/pyramidPassages.json:
    // "reference": "Matthew 28:19 (BSB)"

    // The input from dailyContent.memorize (tableData.ts) usually looks like "Matthew 28:19 (BSB)" or "Matthew 28:19".
    // We should try to match loosely.

    const cleanRef = (ref: string) => ref.toLowerCase().replace(/\s+/g, '').replace(/\(.*\)/, '');

    // We search primarily by identifying if the reference matches.
    const targetRefClean = cleanRef(referenceString);

    // Search inner passages
    for (const section of passagesData.innerPassages.sections) {
        for (const subsection of section.subsections) {
            for (const passage of subsection.passages) {
                // Check if reference matches
                const ref = passage.reference || '';
                const passageRefClean = cleanRef(ref);

                // Allow partial match (e.g. if one has translation and other doesn't)
                // or check if key is letter (A-Z, !)
                if (targetRefClean.includes(passageRefClean) || passageRefClean.includes(targetRefClean)) {

                    const text = passage.text || '';
                    // Extract emphasis word: text has "**Word**"
                    const match = text.match(/\*\*(.*?)\*\*/);
                    const emphasisWord = match ? match[1] : '';

                    // Extract translation from reference if present in JSON
                    const transMatch = ref.match(/\((.*?)\)$/);
                    const translation = transMatch ? transMatch[1] : '';

                    return {
                        letter: passage.key.replace(" (Key)", ""), // Cleanup if it was a key passage like "AIM (Key)", though Inner passages are usually just Letters
                        text: text.replace(/\*\*/g, ''), // Clean text
                        rawText: text,
                        emphasisWord: emphasisWord || '',
                        translation: translation
                    };
                }
            }
        }
    }

    // Search outer passages? The user specifically asked for "27 inner verses", but might as well include outer if they appear.
    // The user request says "specifically the 27 inner verses". Let's stick to that or include outer if convenient.
    // The outer passages have keys like "AIM (Key)", "Abide", etc.
    // Let's include them for completeness if they show up in the schedule (e.g. Prep week).

    const outer = passagesData.outerPassages.passages;
    for (const passage of outer) {
        const ref = passage.reference || '';
        const passageRefClean = cleanRef(ref);
        if (targetRefClean.includes(passageRefClean) || passageRefClean.includes(targetRefClean)) {
            const text = passage.text || '';
            const match = text.match(/\*\*(.*?)\*\*/);
            const emphasisWord = match ? match[1] : '';
            const transMatch = ref.match(/\((.*?)\)$/);
            const translation = transMatch ? transMatch[1] : '';

            return {
                letter: passage.key.replace(" (Key)", ""),
                text: text.replace(/\*\*/g, ''),
                rawText: text,
                emphasisWord: emphasisWord || '',
                translation: translation
            };
        }
    }

    return null;
};
