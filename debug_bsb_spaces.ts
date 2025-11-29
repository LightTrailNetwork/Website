
import { getChapter } from './src/data/bibleApi';

// Mock fetch for Node environment if needed, but we'll try to run this with ts-node or similar if available.
// Since we are in the user's environment, we might need to rely on the browser's fetch or a polyfill if running in node.
// However, the user's environment seems to be Windows with VS Code.
// I'll create a simple script that uses the existing bibleApi.ts but I need to handle the fetch API.

// Actually, I can just use a standalone script with node-fetch or native fetch (Node 18+)
// Let's assume Node 18+ is available.

async function checkBsbSpaces() {
    const bookId = 'EXO'; // Exodus
    const chapter = 2;

    console.log(`Fetching BSB ${bookId} ${chapter}...`);

    try {
        // Direct fetch to avoid dependency issues with the project structure for this standalone script
        const response = await fetch(`https://bible.helloao.org/api/BSB/${bookId}/${chapter}.json`);
        const data = await response.json();

        const verses = data.chapter.content.filter((i: any) => i.type === 'verse');

        // Check Verse 3
        const v3 = verses.find((v: any) => v.number === 3);
        if (v3) {
            console.log('\n--- Verse 3 Content ---');
            console.log(JSON.stringify(v3.content, null, 2));
        }

        // Check Verse 10
        const v10 = verses.find((v: any) => v.number === 10);
        if (v10) {
            console.log('\n--- Verse 10 Content ---');
            console.log(JSON.stringify(v10.content, null, 2));
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

checkBsbSpaces();
