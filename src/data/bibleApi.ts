

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

// ---------------------
// API Logic
// ---------------------

import { BIBLE_BOOKS } from './bibleBookConstants';

const BASE_URL = 'https://bible.helloao.org/api';
const STATIC_BASE_URL = '/staticBibleData';

/**
 * Robust fetch that attempts:
 * 1. Network fetch
 * 2. Cache Storage (if cached manually via downloadTranslation)
 * 3. Static local folder fetch (if running locally or network is fine but not in cache)
 */
const getParams = async <T>(path: string): Promise<T> => {
    const fullUrl = `${STATIC_BASE_URL}/${path}`;

    // 1. Try Cache Storage explicitly (since we don't have a SW intercepting fetches yet)
    if ('caches' in window) {
        try {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(fullUrl);
            if (cachedResponse) {
                // If found in cache, simple and fast
                return cachedResponse.json();
            }
        } catch (e) {
            console.warn('Cache lookup failed:', e);
        }
    }

    // 2. Try Network Fetch (Static Assets)
    try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error(`Local data fetch failed: ${path}`);
        }
        return response.json();
    } catch (e) {
        throw new Error(`Data unavailable offline: ${path}`);
    }
};

/**
 * Replaces old getLocalData. 
 * Tries network API first, then falls back to local/cached data.
 */
const fetchWithOfflineFallback = async <T>(apiPath: string, localPath: string): Promise<T> => {
    // 1. Try Live API (if online)
    if (navigator.onLine) {
        try {
            const response = await fetch(`${BASE_URL}/${apiPath}`);
            if (!response.ok) throw new Error('API fetch failed');
            return await response.json();
        } catch (e) {
            console.warn(`API fetch failed for ${apiPath}, falling back to local/cache.`, e);
        }
    }

    // 2. Try Local/Cache
    return getParams<T>(localPath);
};

export const getBooks = async (translation: string = 'BSB'): Promise<BibleBook[]> => {
    try {
        const data = await fetchWithOfflineFallback<{ books: BibleBook[] }>(
            `${translation}/books.json`,
            `${translation}/books.json`
        );
        return data.books;
    } catch (error) {
        console.warn('All fetch attempts failed for books. Using built-in fallback.');

        // 3. Final Fallback: Static Constants
        // Map BIBLE_BOOKS constant to BibleBook interface
        // We only have limited data in constants (verses count), so we polyfill the rest reasonably.
        const books: BibleBook[] = Object.entries(BIBLE_BOOKS).map(([id, data], index) => ({
            id: id,
            name: data.name,
            commonName: data.name,
            title: data.name,
            order: index + 1,
            numberOfChapters: data.verses.length,
            firstChapterNumber: 1,
            lastChapterNumber: data.verses.length,
            totalNumberOfVerses: data.verses.reduce((a, b) => a + b, 0)
        }));

        return books;
    }
};

export const getTranslations = async (): Promise<BibleTranslation[]> => {
    try {
        const data = await fetchWithOfflineFallback<{ translations: BibleTranslation[] }>(
            'available_translations.json',
            'available_translations.json'
        );
        return data.translations;
    } catch (error) {
        // Fallback for translations if everything fails: return just BSB as a dummy
        return [{
            id: 'BSB',
            name: 'Berean Study Bible',
            website: 'https://berean.bible',
            licenseUrl: '',
            shortName: 'BSB',
            englishName: 'Berean Study Bible',
            language: 'en',
            languageEnglishName: 'English',
            textDirection: 'ltr',
            sha256: '',
            availableFormats: ['json'],
            listOfBooksApiLink: ''
        }];
    }
};

export const getChapter = async (translation: string, bookId: string, chapter: number): Promise<BibleChapter> => {
    try {
        return await fetchWithOfflineFallback<BibleChapter>(
            `${translation}/${bookId}/${chapter}.json`,
            `${translation}/${bookId}/${chapter}.json`
        );
    } catch (error) {
        console.error(`Failed to load chapter: ${translation} ${bookId} ${chapter}`, error);
        throw error;
    }
};

export const getCommentaries = async (): Promise<Commentary[]> => {
    try {
        const data = await fetchWithOfflineFallback<{ commentaries: Commentary[] }>(
            'available_commentaries.json',
            'available_commentaries.json'
        );
        return data.commentaries;
    } catch (error) {
        return [];
    }
};

export const getCommentaryChapter = async (commentaryId: string, bookId: string, chapter: number): Promise<CommentaryChapter> => {
    try {
        return await fetchWithOfflineFallback<CommentaryChapter>(
            `c/${commentaryId}/${bookId}/${chapter}.json`,
            // Note: We don't really have local commentaries download logic yet, but if we did:
            `commentaries/${commentaryId}/${bookId}/${chapter}.json`
        );
    } catch (error) {
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

    // 1. Fetch books list to know what to download
    // We try to get books from the API first to ensure we have the correct structure
    let books: BibleBook[] = [];
    let booksUrl = `${BASE_URL}/${translationId}/books.json`;
    let localBooksUrl = `${STATIC_BASE_URL}/${translationId}/books.json`;

    try {
        // Try live API first to get authoritative list
        if (navigator.onLine) {
            const resp = await fetch(booksUrl);
            if (resp.ok) {
                const data = await resp.json();
                books = data.books;

                // Cache this authoritative list map to the LOCAL structure path so cache lookups find it
                const cache = await caches.open(CACHE_NAME);
                await cache.put(localBooksUrl, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }));
            }
        }

        // If api failed or offline, try local static file to seed
        if (books.length === 0) {
            const resp = await fetch(localBooksUrl);
            if (resp.ok) {
                const data = await resp.json();
                books = data.books;
                // Cache it
                const cache = await caches.open(CACHE_NAME);
                await cache.put(localBooksUrl, resp.clone()); // put clone since we consumed json
            }
        }
    } catch (e) {
        console.warn('Failed to fetch books list for download:', e);
    }

    // Fallback to constants if still nothing (unlikely if we want to download actual text)
    if (books.length === 0) {
        throw new Error('Could not retrieve book list to start download.');
    }

    const cache = await caches.open(CACHE_NAME);

    // 2. Iterate books and chapters
    // Calculate total chapters
    const totalChapters = books.reduce((acc, b) => acc + b.numberOfChapters, 0);
    let completed = 0;

    // We can run parallel fetches in chunks to speed up
    // We prioritize Live API to fill cache if possible, else local static
    const BATCH_SIZE = 5;

    const allOperations: { url: string, cacheKey: string }[] = [];
    books.forEach(book => {
        for (let c = 1; c <= book.numberOfChapters; c++) {
            // We want to fetch from Source and put into Cache Key
            // Ideally source is API. 
            // BUT, our current architecture relies on `staticBibleData` mirroring. 
            // If we are "downloading", we assume we are online?
            // If online, we should probably fetch from API if we trust it, or static if we trust that.
            // Let's stick to mirroring logic:
            // Fetch from STATIC_BASE_URL (or API) -> Put into STATIC_BASE_URL key

            // Actually, if we use fetchWithOfflineFallback, it looks for STATIC_BASE_URL in cache.
            // So we MUST use STATIC_BASE_URL as the request key.
            allOperations.push({
                url: `${STATIC_BASE_URL}/${translationId}/${book.id}/${c}.json`, // Source (local mirror)
                cacheKey: `${STATIC_BASE_URL}/${translationId}/${book.id}/${c}.json` // Key
            });
        }
    });

    for (let i = 0; i < allOperations.length; i += BATCH_SIZE) {
        const batch = allOperations.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (op) => {
            try {
                // We use cache.add which fetches and puts.
                // However, cache.add(url) uses the URL as the key.
                // Since our view logic uses `STATIC_BASE_URL` based paths, we should just add that URL.
                await cache.add(op.url);
            } catch (err) {
                console.warn(`Failed to cache ${op.url}`, err);
            }
        }));
        completed += batch.length;
        if (onProgress) onProgress(Math.min(completed, totalChapters), totalChapters, 'Downloading');
    }
};

export const isTranslationOfflineReady = async (translationId: string): Promise<boolean> => {
    if (!('caches' in window)) return false;
    try {
        const cache = await caches.open(CACHE_NAME);
        const booksUrl = `${STATIC_BASE_URL}/${translationId}/books.json`;
        const match = await cache.match(booksUrl);
        return !!match;
    } catch (e) {
        return false;
    }
};

