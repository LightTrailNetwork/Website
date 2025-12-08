

// ---------------------
// Type Definitions
// ---------------------

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
        footnotes: ChapterFootnote[];
    };
    thisChapterLink: string;
    nextChapterApiLink: string | null;
    previousChapterApiLink: string | null;
    numberOfVerses: number;
}

export interface ChapterFootnote {
    noteId: number;
    text: string;
    reference?: {
        chapter: number;
        verse: number;
    };
    caller?: string;
}

export type ChapterContent =
    | { type: 'heading'; content: string[] }
    | { type: 'line_break' }
    | { type: 'verse'; number: number; content: (string | { text: string; poem?: number; wordsOfJesus?: boolean } | { noteId: number; caller?: string } | { lineBreak: boolean })[] }
    | { type: 'hebrew_subtitle'; content: any[] };

export interface BibleTranslation {
    id: string;
    name: string;
    website: string;
    licenseUrl: string;
    shortName: string;
    englishName: string;
    language: string;
    languageEnglishName: string;
    textDirection: string;
    sha256: string;
    availableFormats: string[];
    listOfBooksApiLink: string;
}

export interface Commentary {
    id: string;
    name: string;
    author: string;
    year: string;
    language: string;
    languageEnglishName: string;
    source: string;
    sourceUrl: string;
    license: string;
    licenseUrl: string;
}

export interface CommentaryBook extends BibleBook {
    commentaryId: string;
    introduction?: string;
    firstChapterApiLink?: string;
    lastChapterApiLink?: string;
}

export interface CommentaryChapter {
    commentary: Commentary;
    book: CommentaryBook;
    chapter: {
        number: number;
        content: ChapterContent[];
    };
    thisChapterLink: string;
    nextChapterApiLink: string | null;
    previousChapterApiLink: string | null;
}

export interface ProfileReference {
    book: string;
    chapter: number;
    verse: number;
    endVerse: number;
}

export interface Profile {
    id: string;
    reference: ProfileReference;
    subject: string;
    thisProfileLink: string;
    referenceChapterLink: string;
}

export interface ProfileResponse {
    commentary: Commentary;
    profiles: Profile[];
}

export interface ProfileContent {
    id: string;
    name: string;
    content: ChapterContent[];
}

export interface Dataset {
    id: string;
    name: string;
    website: string;
    licenseUrl: string;
    englishName: string;
    language: string;
    textDirection: 'ltr' | 'rtl';
    listOfBooksApiLink: string;
    availableFormats: ('json' | 'usfm')[];
    numberOfBooks: number;
    totalNumberOfChapters: number;
    totalNumberOfReferences: number;
    languageName?: string;
    languageEnglishName?: string;
}

export interface DatasetReference {
    book: string;
    chapter: number;
    verse: number;
    endVerse?: number;
    score?: number;
}

export interface DatasetVerse {
    verse: number;
    references: DatasetReference[];
}

export interface DatasetChapterData {
    number: number;
    content: DatasetVerse[];
}

export interface DatasetBookChapter {
    dataset: Dataset;
    book: BibleBook;
    thisChapterLink: string;
    nextChapterApiLink: string | null;
    previousChapterApiLink: string | null;
    numberOfVerses: number;
    chapter: DatasetChapterData;
}

// ---------------------
// API Logic
// ---------------------

const BASE_URL = 'https://bible.helloao.org/api';
const STATIC_BASE_URL = '/staticBibleData';

/**
 * Fetch local/offline data from the public static folder.
 * This effectively acts as the "offline" fetch if the Service Worker has cached these files.
 */
const getLocalData = async <T>(path: string): Promise<T> => {
    // Attempt to fetch from static assets
    const response = await fetch(`${STATIC_BASE_URL}/${path}`);
    if (!response.ok) {
        throw new Error(`Local data not found: ${path}`);
    }
    return response.json();
};

export const getBooks = async (translation: string = 'BSB'): Promise<BibleBook[]> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/${translation}/books.json`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        return data.books;
    } catch (error) {
        console.warn(`Fetch failed for books (${translation}), trying local/offline cache...`);
        try {
            // e.g. /staticBibleData/BSB/books.json
            const data = await getLocalData<{ books: BibleBook[] }>(`${translation}/books.json`);
            return data.books;
        } catch (localError) {
            console.error('Local fallback failed:', localError);
            throw error;
        }
    }
};

export const getTranslations = async (): Promise<BibleTranslation[]> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/available_translations.json`);
        if (!response.ok) throw new Error('Failed to fetch translations');
        const data = await response.json();
        return data.translations;
    } catch (error) {
        try {
            const data = await getLocalData<{ translations: BibleTranslation[] }>('available_translations.json');
            return data.translations;
        } catch (localError) {
            throw error;
        }
    }
};

export const getChapter = async (translation: string, bookId: string, chapter: number): Promise<BibleChapter> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/${translation}/${bookId}/${chapter}.json`);
        if (!response.ok) throw new Error('Failed to fetch chapter');
        return await response.json();
    } catch (error) {
        try {
            // e.g. /staticBibleData/BSB/GEN/1.json
            const data = await getLocalData<BibleChapter>(`${translation}/${bookId}/${chapter}.json`);
            return data;
        } catch (localError) {
            throw error;
        }
    }
};

export const getCommentaries = async (): Promise<Commentary[]> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/available_commentaries.json`);
        if (!response.ok) throw new Error('Failed to fetch commentaries');
        const data = await response.json();
        return data.commentaries;
    } catch (error) {
        try {
            const data = await getLocalData<{ commentaries: Commentary[] }>('available_commentaries.json');
            return data.commentaries;
        } catch (localError) {
            return [];
        }
    }
};

export const getCommentaryChapter = async (commentaryId: string, bookId: string, chapter: number): Promise<CommentaryChapter> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/c/${commentaryId}/${bookId}/${chapter}.json`);
        if (!response.ok) throw new Error('Failed to fetch commentary chapter');
        return await response.json();
    } catch (error) {
        // Fallback or error
        throw new Error('Commentary not available offline');
    }
};

export const getProfiles = async (commentaryId: string = 'tyndale'): Promise<ProfileResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/c/${commentaryId}/profiles.json`);
        if (!response.ok) throw new Error('Failed to fetch profiles');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (commentaryId: string, profileId: string): Promise<{ profile: ProfileContent }> => {
    try {
        const response = await fetch(`${BASE_URL}/c/${commentaryId}/profiles/${profileId}.json`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getDatasetChapter = async (datasetId: string, bookId: string, chapter: number): Promise<DatasetBookChapter> => {
    try {
        const response = await fetch(`${BASE_URL}/d/${datasetId}/${bookId}/${chapter}.json`);
        if (!response.ok) throw new Error('Failed to fetch dataset chapter');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// ---------------------
// Download / Caching Logic
// ---------------------

export const CACHE_NAME = 'bible-data-v1';

/**
 * Downloads a translation for offline use by fetching all its chapters and adding them to the cache.
 * @param translationId e.g. 'BSB'
 * @param onProgress callback (completed, total)
 */
export const downloadTranslation = async (translationId: string, onProgress?: (completed: number, total: number, status: string) => void) => {
    if (!('caches' in window)) {
        throw new Error('Cache API not supported');
    }

    const cache = await caches.open(CACHE_NAME);

    // 1. Fetch books list to know what to download
    const booksUrl = `${STATIC_BASE_URL}/${translationId}/books.json`;

    // Check if books.json exists locally first (it should be in staticBibleData)
    // We fetch it and put it in cache
    let books: BibleBook[] = [];
    try {
        const resp = await fetch(booksUrl);
        if (!resp.ok) throw new Error('Translation not found locally');
        const data = await resp.json();
        books = data.books;
        await cache.put(booksUrl, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }));
    } catch (e) {
        console.error('Failed to start download:', e);
        throw e;
    }

    // 2. Iterate books and chapters
    // Calculate total chapters
    const totalChapters = books.reduce((acc, b) => acc + b.numberOfChapters, 0);
    let completed = 0;

    // We can run parallel fetches in chunks to speed up
    // But local dev server might handle simple rate
    const BATCH_SIZE = 5;

    const allOperations: { url: string }[] = [];
    books.forEach(book => {
        for (let c = 1; c <= book.numberOfChapters; c++) {
            allOperations.push({
                url: `${STATIC_BASE_URL}/${translationId}/${book.id}/${c}.json`
            });
        }
    });

    for (let i = 0; i < allOperations.length; i += BATCH_SIZE) {
        const batch = allOperations.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (op) => {
            try {
                // Fetch and Cache
                // We prefer fetching from network to populate cache, or from valid source
                // In this case, we are fetching from our own public/staticBibleData
                // Ideally, doing cache.add(req) handles fetch+put.
                await cache.add(op.url);
            } catch (err) {
                console.warn(`Failed to cache ${op.url}`, err);
            }
        }));
        completed += batch.length;
        if (onProgress) onProgress(Math.min(completed, totalChapters), totalChapters, 'Downloading');
    }

    // Note: available_translations.json etc should also be checked/cached if not already
};

/**
 * Checks if a translation is fully downloaded (naive check or flag?)
 * For now, just a placeholder. Realistically, we can just rely on cache presence or partial.
 */
export const isTranslationOfflineReady = async (translationId: string): Promise<boolean> => {
    // Naively check if books.json is in cache
    if (!('caches' in window)) return false;
    const cache = await caches.open(CACHE_NAME);
    const booksUrl = `${STATIC_BASE_URL}/${translationId}/books.json`;
    const match = await cache.match(booksUrl);
    return !!match;
};
