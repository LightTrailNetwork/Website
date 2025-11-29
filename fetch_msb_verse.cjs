
const https = require('https');

const url = 'https://bible.helloao.org/api/eng_msb/Exodus/2.json';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const verse14 = json.chapter.content.find(item => item.type === 'verse' && item.number === 14);
            console.log(JSON.stringify(verse14, null, 2));
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw data:', data.substring(0, 200)); // Print first 200 chars to debug
        }
    });

}).on('error', (err) => {
    console.error('Error:', err.message);
});
