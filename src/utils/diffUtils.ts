
export interface ContentPart {
    text: string;
    wordsOfJesus: boolean;
    isLineBreak?: boolean;
}

export interface DiffToken extends ContentPart {
    status: 'common' | 'added' | 'removed';
}

// Tokenize content into words and punctuation, preserving metadata
export function tokenizeContent(content: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean })[]): ContentPart[] {
    const tokens: ContentPart[] = [];

    content.forEach((part, i) => {
        if (typeof part === 'object' && 'lineBreak' in part) {
            tokens.push({ text: '\n', wordsOfJesus: false, isLineBreak: true } as any);
            return;
        }
        if (typeof part === 'object' && 'noteId' in part) {
            // Check if we need to insert a space token (if note is between words)
            const next = content[i + 1];
            if (next) {
                const nextText = typeof next === 'string' ? next : (next as any).text;
                if (nextText && /^[a-zA-Z0-9]/.test(nextText)) {
                    tokens.push({ text: ' ', wordsOfJesus: false });
                }
            }
            return; // Skip notes
        }

        const text = typeof part === 'string' ? part : (part as any).text;
        const wordsOfJesus = typeof part === 'string' ? false : ((part as any).wordsOfJesus || false);

        if (!text) return; // Skip if no text found

        // Check if we need to insert an implicit space between content parts
        // This handles cases where the API returns ["word", "word"] without a space
        if (tokens.length > 0) {
            const lastToken = tokens[tokens.length - 1];
            // If last token was a word or closing punctuation, and new text starts with a word or opening punctuation
            // This handles ["word;", "word"] -> "word; word" and ["word", "\"word"] -> "word \"word"
            if (lastToken && /[a-zA-Z0-9;,."?!:’')\]—–]$/.test(lastToken.text) && /^[a-zA-Z0-9“"‘(]/.test(text)) {
                tokens.push({ text: ' ', wordsOfJesus: false });
            }
        }

        // Normalize punctuation to ensure matching across different encodings/styles
        const normalizedText = text
            .replace(/[“”]/g, '"')
            .replace(/[‘’]/g, "'")
            .replace(/[\u037E\uFF1F]/g, '?'); // Greek question mark, Fullwidth question mark

        // Regex to match words (one or more), punctuation (single char), and whitespace (one or more)
        const matches = normalizedText.match(/([a-zA-Z0-9']+|[.,;?!:"()\-]|[\s]+)/g);

        if (matches) {
            matches.forEach((m: string) => {
                tokens.push({ text: m, wordsOfJesus });
            });
        }
    });

    return tokens;
}


// Helper to check if tokens are effectively equal
function areTokensEqual(t1: ContentPart, t2: ContentPart): boolean {
    // Treat all whitespace as equal
    if (/^\s+$/.test(t1.text) && /^\s+$/.test(t2.text)) {
        return true;
    }

    // Normalize and clean text
    const normalize = (str: string) => {
        return str
            .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove invisible chars
            .trim() // Remove surrounding whitespace
            .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // Smart quotes/apostrophes
            .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"') // Smart double quotes
            .replace(/[\u003F\u037E\u055E\u061F\u1367\u203D\u2047\u2048\u2049\u2CFA\u2CFB\u2E2E\uA60F\uA6F7\uFE56\uFF1F]/g, '?'); // All question marks
    };

    const clean1 = normalize(t1.text);
    const clean2 = normalize(t2.text);

    if (clean1 === clean2) return true;

    // Fallback to localeCompare for loose matching (ignores case, accents, etc.)
    return clean1.localeCompare(clean2, undefined, { sensitivity: 'base' }) === 0;
}


// Simple LCS-based Diff
export function diffVerses(bsbContent: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean })[], msbContent: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean })[]): { bsbDiff: DiffToken[], msbDiff: DiffToken[] } {
    const bsbTokens = tokenizeContent(bsbContent);
    const msbTokens = tokenizeContent(msbContent);

    // Use all tokens including spaces for LCS to preserve formatting
    const n = bsbTokens.length;
    const m = msbTokens.length;
    const lcs = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const bToken = bsbTokens[i - 1];
            const mToken = msbTokens[j - 1];
            if (bToken && mToken && areTokensEqual(bToken, mToken)) {
                lcs[i]![j] = lcs[i - 1]![j - 1] + 1;
            } else {
                lcs[i]![j] = Math.max(lcs[i - 1]![j], lcs[i]![j - 1]);
            }
        }
    }

    // Backtrack to find diff
    const bsbDiff: DiffToken[] = [];
    const msbDiff: DiffToken[] = [];

    let i = n;
    let j = m;

    const bsbStack: DiffToken[] = [];
    const msbStack: DiffToken[] = [];

    while (i > 0 || j > 0) {
        const bToken = i > 0 ? bsbTokens[i - 1] : undefined;
        const mToken = j > 0 ? msbTokens[j - 1] : undefined;

        if (i > 0 && j > 0 && bToken && mToken && areTokensEqual(bToken, mToken)) {
            bsbStack.push({ text: bToken.text, wordsOfJesus: bToken.wordsOfJesus, isLineBreak: !!bToken.isLineBreak, status: 'common' });
            msbStack.push({ text: mToken.text, wordsOfJesus: mToken.wordsOfJesus, isLineBreak: !!mToken.isLineBreak, status: 'common' });
            i--;
            j--;
        } else if (j > 0 && (i === 0 || (lcs[i] && lcs[i]![j - 1] >= (lcs[i - 1] ? lcs[i - 1]![j] : -1)))) {
            // Added in MSB
            if (mToken) {
                msbStack.push({ text: mToken.text, wordsOfJesus: mToken.wordsOfJesus, isLineBreak: !!mToken.isLineBreak, status: 'added' });
            }
            j--;
        } else {
            // Removed from MSB (Present in BSB)
            if (bToken) {
                bsbStack.push({ text: bToken.text, wordsOfJesus: bToken.wordsOfJesus, isLineBreak: !!bToken.isLineBreak, status: 'removed' });
            }
            i--;
        }
    }

    return {
        bsbDiff: bsbStack.reverse(),
        msbDiff: msbStack.reverse()
    };
}
