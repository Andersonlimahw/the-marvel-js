import { renderInElement } from '../scripts/utils/renderInElement.js';
// Variabels: 
let people = [];
const limit = 10;
const peopleComponentId = 'people';
const loadingTime = 1000;
const peoplesLimit = 8;
// Utils


const person = {
    name: 'Gandolf',
    picture: 'https://cdn.ome.lt/I6Aio1XKE6-XQtOuFexcu9MJdvw=/1200x630/smart/extras/conteudos/gandalf.png',
    age: 1500,
    country: 'Midle earth',
    phone: '+55 11 2525-2525',
    email: 'gandolf@gmail.com',
    bio: 'Lorem ipsum door ismitar crivum', 
    facebook: 'http://facebook.com/andersonlimahw'
}

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

function load() {
    for (let i = 0; i < peoplesLimit; i++) {
        people.push(person);
    }
}

function renderLoading() {
    renderInElement(peopleComponentId, loading());
}

renderLoading();

load();

const loadPersonDetails  = (person) => {
    console.log(JSON.stringify(person))
    window.open(person.facebook, '_blanck');
}

const renderPerson = (person) => (
        `<div class="card flex_1 flex_direction_row">
        <div class="card_image">
            <img src="${person.picture}" alt="${person.name}"/>
        </div>
        <div class="card_title">
            ${person.name}
        </div>
        <div class="card_content">
            ${person.bio}
        </div>
        <div class="card_footer">
            <div class="card_actions">
                <button 
                    class="button button_primary"
                    onclick="loadPersonDetails(person)"
                >
                    FACEBOOK
                </button>
            </div>
        </div>
    </div>`
);



const render = () => {
    let _result = people.map((person) => {
        return renderPerson(person);
     })
    renderInElement('people', _result);
}

// Run:
// Withdelay
setTimeout(() => {
    render();
}, loadingTime);

// Imediatly
// render();
