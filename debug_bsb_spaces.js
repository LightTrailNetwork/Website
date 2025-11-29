
// Standalone script to check BSB spaces
// Run with: node debug_bsb_spaces.js


import fs from 'fs';

async function checkBsbSpaces() {
    const bookId = 'EXO'; // Exodus
    const chapter = 2;

    let output = `Fetching BSB ${bookId} ${chapter}...\n`;

    try {
        const response = await fetch(`https://bible.helloao.org/api/BSB/${bookId}/${chapter}.json`);
        const data = await response.json();

        const verses = data.chapter.content.filter(i => i.type === 'verse');

        // Check Verse 14
        const v14 = verses.find(v => v.number === 14);
        if (v14) {
            output += '\n--- Verse 14 Content Structure ---\n';
            v14.content.forEach((part, i) => {
                if (typeof part === 'string') {
                    output += `[${i}] String: "${part}"\n`;
                } else if (part.text) {
                    output += `[${i}] Text: "${part.text}"\n`;
                } else if (part.noteId) {
                    output += `[${i}] Note: ID ${part.noteId}\n`;
                } else {
                    output += `[${i}] Unknown: ${JSON.stringify(part)}\n`;
                }
            });
        }

        if (data.chapter.footnotes && data.chapter.footnotes.length > 0) {
            output += '\n--- Footnotes Sample ---\n';
            output += JSON.stringify(data.chapter.footnotes.slice(0, 3), null, 2);
        }

        fs.writeFileSync('debug_output.txt', output);
        console.log('Output written to debug_output.txt');

    } catch (e) {
        console.error("Error:", e);
    }
}

checkBsbSpaces();

