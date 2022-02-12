// samples: https://gateway.marvel.com/v1/public/characters?name=Spider-Man&limit=10&offset=1&apikey=d018ca9f1e0679480efcde1b6475b856
// import * as fetch from 'watch-fetch';
import { 
  logInfoStyles,
  logErrorStyles,
} from  './logStyles.js';
// Http:
const checkHttpStatus = (response) => {
  try {
    if(response.ok) {    
      return response;
    } 
    throw new Error('Invalid status on response', response.statusCode);
  } catch(error) {
    throw new Error('Invalid response => ', response, ' Error: ', error);
  }
  
}

const parseJson = (response) => {
  if(checkHttpStatus(response)) {
    console.log('%c[Success] to request api in url: ', logInfoStyles);
    return response.json().then((data) => data);
  }
  throw new Error('Error to parseJson');
}

export const httpRequest = (url, options) => {
  try {
    if(!url || url === '') {
      throw new Error("Url is required");
    }
    return fetch(url, options)
      .then((response) => parseJson(response));
  } catch(error) {
    console.error('%c[Error][httpRequest] to request api in url: ', logErrorStyles, url, 'Error: ',error);
    throw new Error(error);
  } finally {
    console.log('%c[finally][httpRequest] to request api in url: ', logInfoStyles, url);
  }
 
}

export default httpRequest;