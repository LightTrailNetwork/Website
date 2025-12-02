// Map full book names to themselves (normalized) or handle variations if needed.
// The BibleReader expects full names without spaces for the URL, e.g. "1John".
// We will normalize the input book name to this format.

export function getBibleLink(text: string): string | null {
    if (!text) return null;

    // Regex to find a Bible reference.
    // Looks for: (Number? Space? Name) Space (Chapter) (:Verse)? (-EndVerse)?
    // Examples: "Matthew 28:19", "1 John 1:9", "Gen 1", "Matthew 28:19-20"
    // We look for the LAST occurrence if there are multiple, or just the one present.
    // The text might be "Go... - Matthew 28:19".

    // List of common book names to help the regex identify valid books
    const bookNames = [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
        '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
        'Psalm', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah',
        'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
        'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai',
        'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts',
        'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
        'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
        '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
        '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ];

    // Construct a regex pattern that matches any of these books
    // We sort by length descending to match "1 John" before "John"
    const bookPattern = bookNames.sort((a, b) => b.length - a.length).join('|');

    // Regex:
    // \b(${bookPattern})  -> Match a book name (boundary to avoid partial matches inside words)
    // \s+                 -> Space
    // (\d+)               -> Chapter
    // (?::(\d+))?         -> Optional :Verse
    // (?:-(\d+))?         -> Optional -EndVerse
    // We use 'gi' to match case-insensitive and global to find all, then take the best one.
    const regex = new RegExp(`\\b(${bookPattern})\\s+(\\d+)(?::(\\d+))?(?:-(\\d+))?`, 'gi');

    const matches = [...text.matchAll(regex)];

    if (matches.length === 0) return null;

    // Use the last match found, as references often come at the end of a quote
    const match = matches[matches.length - 1];

    const bookName = match[1];
    const chapter = match[2];
    const startVerse = match[3];
    const endVerse = match[4];

    // Normalize book name for URL: remove spaces
    // e.g. "1 John" -> "1John", "Song of Solomon" -> "SongofSolomon"
    const urlBook = bookName.replace(/\s+/g, '');

    let link = `/bible/read/${urlBook}/${chapter}`;

    if (startVerse) {
        link += `/${startVerse}`;
        if (endVerse) {
            link += `-${endVerse}`;
        }
    }

    return link;
}
