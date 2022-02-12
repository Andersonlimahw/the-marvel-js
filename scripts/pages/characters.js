import renderInElement from '../utils/renderInElement.js';
import { CHARACTERS_API_URL } from '../utils/api.js';
import { 
  httpRequest, 
  logInfoStyles, 
  logErrorStyles, 
  logWarningStyles 
} from '../utils/httpRequest.js';

// Variabels:
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
        <div class="card_actions">
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
        <div class="card_actions">
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
// Error:

// Http request:

const requestCharacters = async () => {
  try {
    renderLoading();
    const url = CHARACTERS_API_URL
      .replace(':limit', '10')
      .replace(':offset', '1');

    return await httpRequest(url, {
      method: 'GET'
    }).then((response) => {
      console.log('%c[Success] to request characters api', logInfoStyles, response.data.results.length);
      return response.data.results;
    });
  } catch(error) {
    console.error('$c[Error] to request characters api:', logErrorStyles, error);
    throw new Error(error);
  } finally {
    console.log('%c[Finally] to request characters api', logWarningStyles, CHARACTERS_API_URL);
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
        <div class="card_title">
            ${character.name}
        </div>        
    </div>`
);

const render = async () => {
  try {
    console.log('%c[Success] starting render of characters', logInfoStyles);
    let characters = [];
    await requestCharacters()
      .then((response) => {
        console.log('%c[Success] response', logInfoStyles, response);
        characters =  response;
        return response;
      });    
    let _result = characters.map((character) => {      
      return renderCharacter(character);
    })
    renderInElement(componentId, _result);
    console.log('%c[Success] to renders characters', logInfoStyles);
  } catch(error) {
    console.error('$c[Error] to render characters api:', logErrorStyles, error);
    renderError();
  }
  
}

// Load:
window.onload = (() => {
  console.log('[characters]: window.onload()');
  setTimeout(async () => {
    await render();
  }, loadingTime);
});