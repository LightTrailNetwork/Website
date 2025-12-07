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

// ... (interfaces remain same, assume they are preserved above this block or I include them if I replace whole file. I will replace specific function blocks to be safe)
// Wait, replacing chunks is better to avoid destroying interfaces I don't see in "view_file" if I missed something (I saw whole file though).
// I will rewrite the implementation of the fetch functions and add the glob at the top.

const BASE_URL = 'https://bible.helloao.org/api';

// Static data map for offline support
const localBibleData = import.meta.glob('../data/staticBibleData/**/*.json');

/**
 * Helper to fetch local data if available.
 * Path should be relative to src/data/staticBibleData, e.g., 'BSB/GEN/1.json'
 */
const getLocalData = async (path: string) => {
    // Construct the full key as permitted by the glob
    const fullPath = `../data/staticBibleData/${path}`;
    const loader = localBibleData[fullPath];

    if (!loader) {
        throw new Error(`Data not available locally: ${path}`);
    }

    // The glob returns a module with a default export usually, if json.
    const module = await loader() as any;
    // JSON imports in Vite usually return the JSON object as default export
    return module.default || module;
};

export const getBooks = async (translation: string = 'BSB'): Promise<BibleBook[]> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/${translation}/books.json`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        return data.books;
    } catch (error) {
        // Try local fallback
        console.warn(`Fetch failed for books (${translation}), trying local...`);
        try {
            const data = await getLocalData(`${translation}/books.json`);
            return data.books;
        } catch (localError) {
            console.error('Local fallback failed:', localError);
            throw error; // Throw original or new error
        }
    }
};

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

export const getTranslations = async (): Promise<BibleTranslation[]> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/available_translations.json`);
        if (!response.ok) throw new Error('Failed to fetch translations');
        const data = await response.json();
        return data.translations;
    } catch (error) {
        try {
            const data = await getLocalData('available_translations.json');
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
            const data = await getLocalData(`${translation}/${bookId}/${chapter}.json`);
            return data;
        } catch (localError) {
            throw error;
        }
    }
};

// Commentary Interfaces
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

export const getCommentaries = async (): Promise<Commentary[]> => {
    try {
        if (!navigator.onLine) throw new Error('Offline');
        const response = await fetch(`${BASE_URL}/available_commentaries.json`);
        if (!response.ok) throw new Error('Failed to fetch commentaries');
        const data = await response.json();
        return data.commentaries;
    } catch (error) {
        try {
            const data = await getLocalData('available_commentaries.json');
            return data.commentaries;
        } catch (localError) {
            // Return empty or throw? Standard behavior is throw, let UI handle empty state.
            // But if we want graceful degradation "subtly", maybe return empty array?
            // User said "if all commentary text is nota availble or something then it will let the user know that."
            // So throwing/returning error allowed.
            return []; // Return empty list for commentaries if offline/missing
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
        // We typically don't have local commentary chapters in the staticBibleData/BSB folder (it's BSB translation).
        // Unless we added commentaries there? The list_dir showed 'available_commentaries.json' but no commentary folders.
        throw new Error('Commentary not available offline');
    }
};

// Profile Interfaces
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
    content: ChapterContent[]; // Assuming similar structure to other content
}

export const getProfiles = async (commentaryId: string = 'tyndale'): Promise<ProfileResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/c/${commentaryId}/profiles.json`);
        if (!response.ok) throw new Error('Failed to fetch profiles');
        return await response.json();
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

export const getProfile = async (commentaryId: string, profileId: string): Promise<{ profile: ProfileContent }> => {
    try {
        const response = await fetch(`${BASE_URL}/c/${commentaryId}/profiles/${profileId}.json`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

// Dataset (Cross-Reference) Interfaces
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
    totalNumberOfVerses: number;
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
    book: BibleBook; // Reusing BibleBook as it seems compatible or close enough for basic info
    thisChapterLink: string;
    nextChapterApiLink: string | null;
    previousChapterApiLink: string | null;
    numberOfVerses: number;
    chapter: DatasetChapterData;
}

export const getDatasetChapter = async (datasetId: string, bookId: string, chapter: number): Promise<DatasetBookChapter> => {
    try {
        const response = await fetch(`${BASE_URL}/d/${datasetId}/${bookId}/${chapter}.json`);
        if (!response.ok) throw new Error('Failed to fetch dataset chapter');
        return await response.json();
    } catch (error) {
        console.error('Error fetching dataset chapter:', error);
        throw error;
    }
};
