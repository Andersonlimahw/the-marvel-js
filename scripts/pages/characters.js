import renderInElement from '../utils/renderInElement.js';
import { CHARACTERS_API_URL } from '../utils/api.js';
import { httpRequest } from '../utils/httpRequest.js';
import {
  logInfoStyles, 
  logSuccessStyles,
  logErrorStyles,
} from '../utils/logStyles.js';


// Variabels:
const defaultLimit = '100';
const componentId = 'characters';
const loadingTime = 250;

// Components:
const loading = () => (
  `<div class="card flex_1 flex_direction_row">
    <div class="card_title">
        Loading...
    </div>
    <div class="card_content">
        Wait amazin people is loading for you : )
    </div>
    <div class="card_footer">
        <div class="card_footer_actions">
            <button class="button button_primary">
                ...
            </button>
        </div>
    </div>
</div>`
);

const error = () => (
  `<div class="card flex_1 flex_direction_row">
    <div class="card_title">
        Error
    </div>
    <div class="card_content">
        Sorry, a error happens.
    </div>
    <div class="card_footer">
        <div class="card_footer_actions">
            <button class="button button_primary">
                ...
            </button>
        </div>
    </div>
</div>`
);

// Render:
function renderLoading() {
  renderInElement(componentId, loading());
}

function renderError() {
  renderInElement(componentId, error());
}

// Http request:
const requestCharacters = async () => {
  try {
    renderLoading();
    const url = CHARACTERS_API_URL
      .replace(':limit', defaultLimit)
      .replace(':offset', '1');

    return await httpRequest(url, {
      method: 'GET'
    }).then((response) => {
      console.log('%c[Success][requestCharacters] to request characters api', logInfoStyles, 'total: ',  response.data.results.total);
      return response.data.results;
    });
  } catch(error) {
    console.error('$c[Error][requestCharacters] to request characters api:', logErrorStyles, error);
    throw new Error(error);
  } finally {
    console.log('%c[Finally][requestCharacters] to request characters api', logInfoStyles, CHARACTERS_API_URL);
    renderError();
  }
}


const renderCharacter = (character) => (
  `<div class="card flex_1 flex_direction_row" id="${character.id}">
        <div class="card_image">
            <img 
              src="${character.thumbnail.path}.${character.thumbnail.extension}" 
              alt="${character.name}"
            />
        </div>
        <div class="card_title" title="${character.name}">
            ${character.name}
        </div>
        <div class="card_footer">
          <div class="card_footer_actions">            
             ${character.urls.map((urlItem) => `                
                  <a 
                    class="icon_button icon_button_primary" 
                    title="${urlItem.type}"
                    href="${urlItem.url}"
                    target="_blanck"                    
                  >
                    ${urlItem.type}
                    <br /> 
                    <span class="material-icons">link</span>                    
                  </a>
                  `
                )
              }
          </div>
        </div>
    </div>       
    </div>`
);

const render = async () => {
  try {
    console.log('%c[Info][render] starting render of characters', logInfoStyles);
    let characters = [];
    await requestCharacters()
      .then((response) => {
        console.log('%c[Success] response', logSuccessStyles, response);
        characters =  response;
        return response;
      });    
    let _result = characters.map((character) => {      
      return renderCharacter(character);
    })
    renderInElement(componentId, _result);
    console.log('%c[Success][render]  to render characters', logSuccessStyles);
  } catch(error) {
    console.error('$c[Error][render]  to render characters:', logErrorStyles, error);
    renderError();
  }
}

// Load:
window.onload = (() => {
  console.log('[Info][characters]: window.onload()', logInfoStyles);
  setTimeout(async () => {
    await render();
  }, loadingTime);
});