import type { ChapterContent, BibleBook } from '../data/bibleApi';

// Helper to check if we should insert a space between content parts
export const shouldInsertSpace = (prev: any, curr: any) => {
    const prevText = typeof prev === 'string' ? prev : prev.text;
    const currText = typeof curr === 'string' ? curr : curr.text;
    if (!prevText || !currText) return false;
    // Check for alphanumeric/punctuation boundary including dashes
    return /[a-zA-Z0-9;,."?!:’')\]—–]$/.test(prevText) && /^[a-zA-Z0-9“"‘(]/.test(currText);
};

// Helper to format passage text from content array
export const formatPassageText = (content: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean } | { type: string })[]): string => {
    let text = '';

    // Filter out content that doesn't contribute to text (like footnotes)
    const visibleContent = content.filter(item =>
        typeof item === 'string' ||
        ('text' in item) ||
        ('lineBreak' in item) ||
        (item && typeof item === 'object' && 'type' in item && item.type === 'line_break')
    );

    visibleContent.forEach((item, index) => {
        // Handle string content
        if (typeof item === 'string') {
            if (index > 0 && shouldInsertSpace(visibleContent[index - 1], item)) {
                text += ' ';
            }
            text += item;
            return;
        }

        // Handle object content
        if ('text' in item) {
            if (index > 0 && shouldInsertSpace(visibleContent[index - 1], item)) {
                text += ' ';
            }
            text += item.text;
        } else if ('lineBreak' in item) {
            text += '\n';
        } else if ('type' in item && item.type === 'line_break') {
            text += '\n';
        }
    });

    return text.trim();
};

// Helper to format a range of chapter content into text with line breaks
export const formatChapterContent = (content: any[], startVerse: number, endVerse: number): string => {
    // Filter content to the requested range
    // We need to include line breaks that might be between verses in the range
    // But we also need to be careful not to include line breaks that are outside the range if they are strictly before or after

    // Simple approach: Iterate through content, keep track of current verse number
    // If we are within the range (inclusive), append text.
    // Line breaks: If we have seen the start verse, and haven't passed the end verse, include them.

    let text = '';
    let currentVerse = 0;
    let hasStarted = false;

    content.forEach((item, index) => {
        if (item.type === 'verse') {
            currentVerse = item.number;
        }

        if (currentVerse >= startVerse && currentVerse <= endVerse) {
            hasStarted = true;
            if (item.type === 'verse') {
                // Add space if needed between previous content and this verse
                // (Logic simplified for now, usually verses start on new lines or after spaces)
                if (text.length > 0 && !text.endsWith('\n') && !text.endsWith(' ')) {
                    text += ' ';
                }

                // Format the verse content itself
                if (item.content) {
                    text += formatPassageText(item.content);
                }
            } else if (item.type === 'line_break') {
                text += '\n';
            } else if (item.type === 'heading') {
                // Optional: Include headings? Usually reference text is just the verses.
                // Skipping headings for reference text to keep it clean.
            }
        }
    });

    return text.trim();
};

// Helper to sort references by score (desc) then book order (asc)
export const getSortedReferences = (refs: any[], books: BibleBook[]) => {
    return [...refs].sort((a, b) => {
        // 1. Score Descending
        if ((a.score || 0) !== (b.score || 0)) {
            return (b.score || 0) - (a.score || 0);
        }
        // 2. Book Order Ascending
        const bookA = books.find(book => book.id === a.book);
        const bookB = books.find(book => book.id === b.book);
        if (bookA && bookB) {
            if (bookA.order !== bookB.order) return bookA.order - bookB.order;
        }
        // 3. Chapter/Verse Ascending
        if (a.chapter !== b.chapter) return a.chapter - b.chapter;
        return a.verse - b.verse;
    });
};
