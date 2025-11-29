
const fs = require('fs');

try {
    const data = fs.readFileSync('msb_curl.json', 'utf8');
    const json = JSON.parse(data);
    const verse14 = json.chapter.content.find(item => item.type === 'verse' && item.number === 14);
    console.log(JSON.stringify(verse14, null, 2));
} catch (e) {
    console.error('Error:', e.message);
}
