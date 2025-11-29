import requests
import json

try:
    response = requests.get('https://bible.helloao.org/api/available_translations.json')
    data = response.json()
    
    found = False
    for t in data['translations']:
        if t['id'] == 'MSB' or 'Modern' in t['name'] or 'Modern' in t['englishName']:
            print(f"Found: {t['id']} - {t['name']} ({t['englishName']})")
            found = True
            
    if not found:
        print("MSB or Modern Spelling Bible not found in the list.")
        
except Exception as e:
    print(f"Error: {e}")
