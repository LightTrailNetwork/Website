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

    // specific parser
    if (reference) {
        // 1. Try "Book Chapter:Verse"
        const fullMatch = reference.match(/^((?:\d\s)?[a-zA-Z\s]+)\s(\d+)(?:[:\.](\d+(?:-\d+)?)?|[-–]\d+)?/);

        if (fullMatch && fullMatch[1] && isNaN(Number(fullMatch[1]))) {
            targetBook = fullMatch[1].trim();
            targetChapter = fullMatch[2];
            targetVerseRange = fullMatch[3];
        } else if (book) {
            // 2. If Book known, try to extract Chapter from "1:1" or "1" or "1-2"
            // "1:1 - 11:32" -> Chapter 1
            const chapMatch = reference.match(/^(\d+)/);
            if (chapMatch) {
                targetChapter = chapMatch[1];
                // Try to find verse part if exists, purely for decoration? 
                // Currently url = /read/Book/Chapter...
                // Passing complex range "1:1 - 11:32" as verseRange might confuse reader if it expects simple number.
                // But url construction `/${targetVerseRange}` implies specific verse.
                // If regex extracts "1", we link to Chapter 1. That's good enough for "1:1 - 11:32".
            }
        } else {
            // 3. Try "Book" only
            const simpleBookMatch = reference.match(/^((?:\d\s)?[a-zA-Z\s]+)$/);
            if (simpleBookMatch) {
                targetBook = simpleBookMatch[1].trim();
                targetChapter = '1';
            }
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
