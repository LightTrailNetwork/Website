
const fs = require('fs');

try {
    const data = fs.readFileSync('translations.json', 'utf8');
    const json = JSON.parse(data);
    const msb = json.translations.find(t => t.name.includes('Majority') || t.englishName.includes('Majority') || t.id.includes('msb'));
    console.log(JSON.stringify(msb, null, 2));
} catch (e) {
    console.error('Error:', e.message);
}
