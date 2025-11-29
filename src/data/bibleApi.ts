export interface BibleBook {
    id: string;
    name: string;
    commonName: string;
    title: string | null;
    order: number;
    numberOfChapters: number;
    firstChapterNumber: number;
    lastChapterNumber: number;
    totalNumberOfVerses: number;
}

export interface BibleChapter {
    translation: {
        id: string;
        name: string;
        website: string;
        licenseUrl: string;
        shortName: string;
        englishName: string;
        language: string;
        textDirection: string;
        sha256: string;
        availableFormats: string[];
        listOfBooksApiLink: string;
    };
    book: BibleBook;
    chapter: {
        number: number;
        content: ChapterContent[];
        footnotes: any[];
    };
    thisChapterLink: string;
    nextChapterApiLink: string | null;
    previousChapterApiLink: string | null;
    numberOfVerses: number;
}

export type ChapterContent =
    | { type: 'heading'; content: string[] }
    | { type: 'line_break' }
    | { type: 'verse'; number: number; content: (string | { text: string; poem?: number; wordsOfJesus?: boolean } | { noteId: number })[] }
    | { type: 'hebrew_subtitle'; content: any[] };

const BASE_URL = 'https://bible.helloao.org/api';

export const getBooks = async (translation: string = 'BSB'): Promise<BibleBook[]> => {
    try {
        const response = await fetch(`${BASE_URL}/${translation}/books.json`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        return data.books;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const getChapter = async (translation: string, bookId: string, chapter: number): Promise<BibleChapter> => {
    try {
        const response = await fetch(`${BASE_URL}/${translation}/${bookId}/${chapter}.json`);
        if (!response.ok) throw new Error('Failed to fetch chapter');
        return await response.json();
    } catch (error) {
        console.error('Error fetching chapter:', error);
        throw error;
    }
};
