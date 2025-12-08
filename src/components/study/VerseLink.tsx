import React from 'react';
import { Link } from 'react-router-dom';

interface VerseLinkProps {
    book?: string;
    chapter?: string | number;
    verse?: string | number;
    reference?: string; // Alternative: pass "John 3:16"
    children?: React.ReactNode;
    className?: string;
}

export default function VerseLink({ book, chapter, verse, reference, children, className = "" }: VerseLinkProps) {
    let targetBook = book;
    let targetChapter = chapter;
    let targetVerseRange = verse;

    // specific parser for "1 Samuel 13:14" or "John 3:16"
    if (reference && !book) {
        // Simple regex to split Book from Chapter:Verse
        // Handle "1 Samuel", "Song of Solomon" etc.
        const match = reference.match(/^((?:\d\s)?[a-zA-Z\s]+)\s(\d+)[:\.]?(\d+(?:-\d+)?)?$/);
        if (match) {
            targetBook = match[1].trim();
            targetChapter = match[2];
            targetVerseRange = match[3];
        }
    }

    if (!targetBook || !targetChapter) {
        return <span className={className}>{children || reference}</span>;
    }

    // Clean book name for URL (remove spaces)
    const urlBook = targetBook.replace(/\s+/g, '');
    let url = `/bible/read/${urlBook}/${targetChapter}`;
    if (targetVerseRange) {
        // Logic to handle highlighting could go here if the reader supports it via URL or state
        // For now, reader supports /book/chapter
        // If we want to scroll to verse, many readers use #verse-14
        // The reader router supports /book/chapter/verseRange too based on App.tsx
        // <Route path="/read/:bookId/:chapter/:verseRange" element={<BibleReader />} />
        url += `/${targetVerseRange}`;
    }

    return (
        <Link
            to={url}
            className={`text-primary hover:underline decoration-primary/50 underline-offset-2 transition-colors ${className}`}
            onClick={(e) => e.stopPropagation()} // Prevent card clicks
        >
            {children || reference || `${targetBook} ${targetChapter}:${targetVerseRange}`}
        </Link>
    );
}
