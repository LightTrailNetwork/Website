
import type { ChapterContent } from '../data/bibleApi';

// Helper to check if we should insert a space between content parts
export const shouldInsertSpace = (prev: any, curr: any) => {
    const prevText = typeof prev === 'string' ? prev : prev.text;
    const currText = typeof curr === 'string' ? curr : curr.text;
    if (!prevText || !currText) return false;
    // Check for alphanumeric/punctuation boundary including dashes
    return /[a-zA-Z0-9;,."?!:’')\]—–]$/.test(prevText) && /^[a-zA-Z0-9“"‘(]/.test(currText);
};

// Helper to format passage text from content array
export const formatPassageText = (content: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean })[]): string => {
    let text = '';

    // Filter out content that doesn't contribute to text (like footnotes)
    const visibleContent = content.filter(item =>
        typeof item === 'string' ||
        ('text' in item) ||
        ('lineBreak' in item)
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
        }
    });

    return text.trim();
};
