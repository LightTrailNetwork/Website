
function tokenizeContent(content) {
    const tokens = [];

    content.forEach((part, i) => {
        if (typeof part === 'object' && 'lineBreak' in part) {
            tokens.push({ text: '\n', wordsOfJesus: false, isLineBreak: true });
            return;
        }
        if (typeof part === 'object' && 'noteId' in part) {
            // Check if we need to insert a space token (if note is between words)
            const next = content[i + 1];
            if (next) {
                const nextText = typeof next === 'string' ? next : next.text;
                if (nextText && /^[a-zA-Z0-9]/.test(nextText)) {
                    tokens.push({ text: ' ', wordsOfJesus: false });
                }
            }
            return; // Skip notes
        }

        const text = typeof part === 'string' ? part : part.text;
        const wordsOfJesus = typeof part === 'string' ? false : (part.wordsOfJesus || false);

        if (!text) return; // Skip if no text found

        // Regex to match words and non-whitespace punctuation
        // Updated regex with smart quotes
        const matches = text.match(/([a-zA-Z0-9']+|[.,;?!:"()\-“”‘’]+|\s+)/g);

        if (matches) {
            matches.forEach((m) => {
                tokens.push({ text: m, wordsOfJesus });
            });
        }
    });

    return tokens;
}

function diffVerses(bsbContent, msbContent) {
    const bsbTokens = tokenizeContent(bsbContent);
    const msbTokens = tokenizeContent(msbContent);

    // Use all tokens including spaces for LCS to preserve formatting
    const n = bsbTokens.length;
    const m = msbTokens.length;
    const lcs = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            const bToken = bsbTokens[i - 1];
            const mToken = msbTokens[j - 1];
            if (bToken && mToken && bToken.text === mToken.text) {
                lcs[i][j] = lcs[i - 1][j - 1] + 1;
            } else {
                lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
            }
        }
    }

    // Backtrack to find diff
    const bsbStack = [];
    const msbStack = [];

    let i = n;
    let j = m;

    while (i > 0 || j > 0) {
        const bToken = i > 0 ? bsbTokens[i - 1] : undefined;
        const mToken = j > 0 ? msbTokens[j - 1] : undefined;

        if (i > 0 && j > 0 && bToken && mToken && bToken.text === mToken.text) {
            bsbStack.push({ text: bToken.text, status: 'common' });
            msbStack.push({ text: mToken.text, status: 'common' });
            i--;
            j--;
        } else if (j > 0 && (i === 0 || (lcs[i] && lcs[i][j - 1] >= (lcs[i - 1] ? lcs[i - 1][j] : -1)))) {
            // Added in MSB
            if (mToken) {
                msbStack.push({ text: mToken.text, status: 'added' });
            }
            j--;
        } else {
            // Removed from MSB (Present in BSB)
            if (bToken) {
                bsbStack.push({ text: bToken.text, status: 'removed' });
            }
            i--;
        }
    }

    return {
        bsbDiff: bsbStack.reverse(),
        msbDiff: msbStack.reverse()
    };
}

// Test Case
const bsbContent = [
    "But the man replied, “Who made you ruler and judge over us?",
    { "noteId": 1601 },
    "Are you planning to kill me as you killed the Egyptian?",
    { "noteId": 1602 },
    "”",
    { "lineBreak": true },
    "Then Moses was afraid and thought, “This thing I have done has surely become known.”"
];

// Guessing MSB content based on user description
const msbContent = [
    "But the man replied, Who made you ruler and judge over us? Are you planning to kill me as you killed the Egyptian? Then Moses was afraid and thought, This thing I have done has surely become known."
];

const result = diffVerses(bsbContent, msbContent);

console.log("BSB Diff:");
result.bsbDiff.forEach(t => {
    if (t.text.includes("Egyptian") || t.text.includes("?") || t.text.includes("”") || t.text.includes("Then")) {
        console.log(`[${t.status}] '${t.text}'`);
    }
});

console.log("\nMSB Diff:");
result.msbDiff.forEach(t => {
    if (t.text.includes("Egyptian") || t.text.includes("?") || t.text.includes("Then")) {
        console.log(`[${t.status}] '${t.text}'`);
    }
});
