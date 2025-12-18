import bibleMnemonics from '../data/bibleMnemonics.json';

// Type definitions based on the JSON structure
interface MnemonicData {
    meta: {
        version: string;
        description: string;
    };
    testaments?: {
        [key: string]: {
            mnemonic: string;
            bookGroupMnemonicHints?: {
                [key: string]: string;
            };
        };
    };
    books: {
        [key: string]: {
            mnemonic: string;
            mnemonicHint?: string;
            chapters: {
                [key: string]: {
                    mnemonic: string;
                    verses: {
                        [key: string]: string | { mnemonic: string };
                    };
                };
            };
        };
    };
}

const data = bibleMnemonics as unknown as MnemonicData;

export interface BookMnemonicResult {
    text: string;
    highlightIndex: number; // 0-based index of the character to highlight
    hint?: string;
}

export function getBookMnemonic(bookId: string, chapter: number): BookMnemonicResult | null {
    const bookData = data.books[bookId.toUpperCase()];
    if (!bookData || !bookData.mnemonic) return null;

    // Logic: Highlight the Nth letter corresponding to the chapter number
    // We need to ignore spaces when counting letters, but return the index in the full string

    let letterCount = 0;
    let highlightIndex = -1;

    for (let i = 0; i < bookData.mnemonic.length; i++) {
        const char = bookData.mnemonic.charAt(i);
        // Ignore non-alphanumeric characters (spaces, punctuation, etc.)
        if (/[a-zA-Z0-9]/.test(char)) {
            letterCount++;
            if (letterCount === chapter) {
                highlightIndex = i;
                break;
            }
        }
    }

    const result: BookMnemonicResult = {
        text: bookData.mnemonic,
        highlightIndex
    };

    if (bookData.mnemonicHint) {
        result.hint = bookData.mnemonicHint;
    }

    return result;
}

export function getChapterMnemonic(bookId: string, chapter: number): string | null {
    const bookData = data.books[bookId.toUpperCase()];
    if (!bookData) return null;

    const chapterData = bookData.chapters[chapter.toString()];
    if (!chapterData || !chapterData.mnemonic) return null;

    return chapterData.mnemonic;
}

export function getVerseMnemonic(bookId: string, chapter: number, verse: number): string | null {
    const bookData = data.books[bookId.toUpperCase()];
    if (!bookData) return null;

    const chapterData = bookData.chapters[chapter.toString()];
    if (!chapterData) return null;

    const verseMnemonic = chapterData.verses[verse.toString()];
    if (!verseMnemonic) return null;

    if (typeof verseMnemonic === 'string') {
        return verseMnemonic;
    } else if (typeof verseMnemonic === 'object' && verseMnemonic !== null && 'mnemonic' in verseMnemonic) {
        return (verseMnemonic as any).mnemonic;
    }

    return null;
}

export function getMnemonicHighlightIndex(text: string, targetCount: number): number {
    let letterCount = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        // Ignore non-alphanumeric characters
        if (/[a-zA-Z0-9]/.test(char)) {
            letterCount++;
            if (letterCount === targetCount) {
                return i;
            }
        }
    }
    return -1;
}

export function getTestamentMnemonic(testament: 'OT' | 'NT'): string | null {
    if (!data.testaments) return null;
    return data.testaments[testament]?.mnemonic || null;
}

export function getBookMnemonicText(bookId: string): string | null {
    const bookData = data.books[bookId.toUpperCase()];
    if (!bookData) return null;

    if (bookData.mnemonic) {
        return bookData.mnemonic;
    }

    // Fallback for single-chapter books (or if main mnemonic is missing but chapter 1 exists)
    // Check if it has exactly one chapter or if we should just default to chapter 1
    const chapterKeys = Object.keys(bookData.chapters);
    if (chapterKeys.length === 1 && chapterKeys[0] === '1') {
        return bookData.chapters['1']?.mnemonic ?? null;
    }

    return null;
}

export function getChapterVerses(bookId: string, chapter: number): Record<string, string | { mnemonic: string }> | null {
    const bookData = data.books[bookId.toUpperCase()];
    if (!bookData) return null;

    const chapterData = bookData.chapters[chapter.toString()];
    if (!chapterData) return null;

    return chapterData.verses;
}

export function getTestamentSectionMnemonics(testament: 'OT' | 'NT', sectionLengths: number[]): string[] {
    const mnemonic = getTestamentMnemonic(testament);
    if (!mnemonic) return sectionLengths.map(() => "");

    // Remove punctuation (keep spaces) and split into words
    // We want to remove things like '.' ',' but keep letters.
    // Also handle possible multiple spaces.
    const cleanMnemonic = mnemonic.replace(/[.,;!?]/g, "");
    const words = cleanMnemonic.split(/\s+/).filter(w => w.length > 0);

    const result: string[] = [];
    let wordIndex = 0;

    for (const length of sectionLengths) {
        let currentSectionWords: string[] = [];
        let currentCount = 0;

        while (currentCount < length && wordIndex < words.length) {
            const word = words[wordIndex];
            if (!word) {
                wordIndex++;
                continue;
            }
            // Count letters in word
            const letterCount = word.replace(/[^a-zA-Z0-9]/g, "").length;

            currentSectionWords.push(word);
            currentCount += letterCount;
            wordIndex++;
        }

        // If we exceeded length, it means the mnemonic doens't align perfectly with words, 
        // but per user logic it should. We'll just return what we have.
        result.push(currentSectionWords.join(" "));
    }

    return result;
}

export function getTestamentSectionHints(testament: 'OT' | 'NT', sections: { start: number, end: number }[]): string[] {
    const testamentData = data.testaments?.[testament];
    if (!testamentData || !testamentData.bookGroupMnemonicHints) {
        return sections.map(() => "");
    }

    const hintsMap = testamentData.bookGroupMnemonicHints;

    return sections.map(section => {
        // Construct key like "1-5"
        const key = `${section.start}-${section.end}`;
        return hintsMap[key] || "";
    });
}
