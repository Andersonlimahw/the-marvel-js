// samples: https://gateway.marvel.com/v1/public/characters?name=Spider-Man&limit=10&offset=1&apikey=d018ca9f1e0679480efcde1b6475b856
// Keys:
export const API_KEY = 'd018ca9f1e0679480efcde1b6475b856';
export const API_PRIVATE_KEY = 'd018ca9f1e0679480efcde1b6475b856';

// Urls:
export const BASE_URL = ' https://gateway.marvel.com/v1/public';
export const CHARACTERS_API_URL = `${BASE_URL}/characters?apikey=${API_KEY}&limit=:limit&offset=:offset` ;