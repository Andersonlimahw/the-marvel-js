// samples: https://gateway.marvel.com/v1/public/characters?name=Spider-Man&limit=10&offset=1&apikey=d018ca9f1e0679480efcde1b6475b856
// import * as fetch from 'watch-fetch';

// Logs:
export const logInfoStyles = [
  'color: white',
  'background: blue', 
  'padding: 16px'
].join(';');

export const logErrorStyles = [
  'color: white',
  'background: red',
  'padding: 16px'
].join(';');

export const logWarningStyles = [
  'color: black',
  'background: yellow', 
  'padding: 16px'
].join(';');

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
    return response.json().then((data) => data);
  }
  throw new Error('Error tor parseJson');
}

export const httpRequest = (url, options) => {
  try {
    if(!url || url === '') {
      throw new Error("Url is required");
    }
    return fetch(url, options)
      .then((response) => parseJson(response));
  } catch(error) {
    console.error('HttpRequest, error: ', error);
    throw new Error(error);
  } finally {

  }
 
}

export default httpRequest;