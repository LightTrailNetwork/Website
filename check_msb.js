const https = require('https');

https.get('https://bible.helloao.org/api/available_translations.json', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            let found = false;
            json.translations.forEach(t => {
                if (t.id === 'MSB' || t.name.includes('Modern') || t.englishName.includes('Modern')) {
                    console.log(`Found: ${t.id} - ${t.name} (${t.englishName})`);
                    found = true;
                }
            });

            if (!found) {
                console.log("MSB or Modern Spelling Bible not found in the list.");
            }
        } catch (e) {
            console.error(e.message);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
