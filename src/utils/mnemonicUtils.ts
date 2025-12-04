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
        };
    };
    books: {
        [key: string]: {
            mnemonic: string;
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

    return {
        text: bookData.mnemonic,
        highlightIndex
    };
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
