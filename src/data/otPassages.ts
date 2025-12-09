export interface OTPassage {
    book: string;
    id: string; // API ID
    abbrev: string;
    chapter: number;
    verseNum: number;
    reference: string;
    category: 'Torah' | 'History' | 'Poetry' | 'Major Prophets' | 'Minor Prophets';
}

export const OT_PASSAGES: OTPassage[] = [
    // TORAH
    { book: "Genesis", id: "GEN", abbrev: "Gen", category: "Torah", chapter: 1, verseNum: 1, reference: "Genesis 1:1" },
    { book: "Exodus", id: "EXO", abbrev: "Exo", category: "Torah", chapter: 3, verseNum: 14, reference: "Exodus 3:14" },
    { book: "Leviticus", id: "LEV", abbrev: "Lev", category: "Torah", chapter: 19, verseNum: 18, reference: "Leviticus 19:18" },
    { book: "Numbers", id: "NUM", abbrev: "Num", category: "Torah", chapter: 6, verseNum: 24, reference: "Numbers 6:24" },
    { book: "Deuteronomy", id: "DEU", abbrev: "Deu", category: "Torah", chapter: 6, verseNum: 4, reference: "Deuteronomy 6:4" },

    // HISTORY
    { book: "Joshua", id: "JOS", abbrev: "Jos", category: "History", chapter: 1, verseNum: 9, reference: "Joshua 1:9" },
    { book: "Judges", id: "JDG", abbrev: "Jdg", category: "History", chapter: 21, verseNum: 25, reference: "Judges 21:25" },
    { book: "Ruth", id: "RUT", abbrev: "Rut", category: "History", chapter: 1, verseNum: 16, reference: "Ruth 1:16" },
    { book: "1 Samuel", id: "1SA", abbrev: "1Sa", category: "History", chapter: 16, verseNum: 7, reference: "1 Samuel 16:7" },
    { book: "2 Samuel", id: "2SA", abbrev: "2Sa", category: "History", chapter: 7, verseNum: 22, reference: "2 Samuel 7:22" },
    { book: "1 Kings", id: "1KI", abbrev: "1Ki", category: "History", chapter: 18, verseNum: 21, reference: "1 Kings 18:21" },
    { book: "2 Kings", id: "2KI", abbrev: "2Ki", category: "History", chapter: 6, verseNum: 16, reference: "2 Kings 6:16" },
    { book: "1 Chronicles", id: "1CH", abbrev: "1Ch", category: "History", chapter: 29, verseNum: 11, reference: "1 Chronicles 29:11" },
    { book: "2 Chronicles", id: "2CH", abbrev: "2Ch", category: "History", chapter: 7, verseNum: 14, reference: "2 Chronicles 7:14" },
    { book: "Ezra", id: "EZR", abbrev: "Ezr", category: "History", chapter: 7, verseNum: 10, reference: "Ezra 7:10" },
    { book: "Nehemiah", id: "NEH", abbrev: "Neh", category: "History", chapter: 8, verseNum: 10, reference: "Nehemiah 8:10" },
    { book: "Esther", id: "EST", abbrev: "Est", category: "History", chapter: 4, verseNum: 14, reference: "Esther 4:14" },

    // POETRY
    { book: "Job", id: "JOB", abbrev: "Job", category: "Poetry", chapter: 19, verseNum: 25, reference: "Job 19:25" },
    { book: "Psalms", id: "PSA", abbrev: "Psa", category: "Poetry", chapter: 23, verseNum: 1, reference: "Psalms 23:1" },
    { book: "Proverbs", id: "PRO", abbrev: "Pro", category: "Poetry", chapter: 3, verseNum: 5, reference: "Proverbs 3:5" },
    { book: "Ecclesiastes", id: "ECC", abbrev: "Ecc", category: "Poetry", chapter: 3, verseNum: 1, reference: "Ecclesiastes 3:1" },
    { book: "Song of Solomon", id: "SNG", abbrev: "Sng", category: "Poetry", chapter: 6, verseNum: 3, reference: "Song of Solomon 6:3" },

    // MAJOR PROPHETS
    { book: "Isaiah", id: "ISA", abbrev: "Isa", category: "Major Prophets", chapter: 40, verseNum: 31, reference: "Isaiah 40:31" },
    { book: "Jeremiah", id: "JER", abbrev: "Jer", category: "Major Prophets", chapter: 29, verseNum: 11, reference: "Jeremiah 29:11" },
    { book: "Lamentations", id: "LAM", abbrev: "Lam", category: "Major Prophets", chapter: 3, verseNum: 22, reference: "Lamentations 3:22" },
    { book: "Ezekiel", id: "EZK", abbrev: "Ezk", category: "Major Prophets", chapter: 36, verseNum: 26, reference: "Ezekiel 36:26" },
    { book: "Daniel", id: "DAN", abbrev: "Dan", category: "Major Prophets", chapter: 3, verseNum: 18, reference: "Daniel 3:18" },

    // MINOR PROPHETS
    { book: "Hosea", id: "HOS", abbrev: "Hos", category: "Minor Prophets", chapter: 6, verseNum: 6, reference: "Hosea 6:6" },
    { book: "Joel", id: "JOL", abbrev: "Joe", category: "Minor Prophets", chapter: 2, verseNum: 28, reference: "Joel 2:28" },
    { book: "Amos", id: "AMO", abbrev: "Amo", category: "Minor Prophets", chapter: 5, verseNum: 24, reference: "Amos 5:24" },
    { book: "Obadiah", id: "OBA", abbrev: "Oba", category: "Minor Prophets", chapter: 1, verseNum: 15, reference: "Obadiah 1:15" },
    { book: "Jonah", id: "JON", abbrev: "Jon", category: "Minor Prophets", chapter: 2, verseNum: 9, reference: "Jonah 2:9" },
    { book: "Micah", id: "MIC", abbrev: "Mic", category: "Minor Prophets", chapter: 6, verseNum: 8, reference: "Micah 6:8" },
    { book: "Nahum", id: "NAM", abbrev: "Nah", category: "Minor Prophets", chapter: 1, verseNum: 7, reference: "Nahum 1:7" },
    { book: "Habakkuk", id: "HAB", abbrev: "Hab", category: "Minor Prophets", chapter: 2, verseNum: 4, reference: "Habakkuk 2:4" },
    { book: "Zephaniah", id: "ZEP", abbrev: "Zep", category: "Minor Prophets", chapter: 3, verseNum: 17, reference: "Zephaniah 3:17" },
    { book: "Haggai", id: "HAG", abbrev: "Hag", category: "Minor Prophets", chapter: 1, verseNum: 5, reference: "Haggai 1:5" },
    { book: "Zechariah", id: "ZEC", abbrev: "Zec", category: "Minor Prophets", chapter: 4, verseNum: 6, reference: "Zechariah 4:6" },
    { book: "Malachi", id: "MAL", abbrev: "Mal", category: "Minor Prophets", chapter: 3, verseNum: 10, reference: "Malachi 3:10" }
];
