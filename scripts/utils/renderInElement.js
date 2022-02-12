import {
    logSuccessStyles, 
    logErrorStyles
} from './logStyles.js';

export const renderInElement = (elementId, value) => {
    try {
        if (elementId && value) {
            document.getElementById(elementId).innerHTML = value;
            console.log(`%c[Success][renderInElement]: Elemento renderizado com sucesso: elementId: ${elementId}`, logSuccessStyles);
        }
    } catch (ex) {
        console.error(`%c[Error][renderInElement]: Erro ao rendenrizar elemento de id ${elementId}`, logErrorStyles);
        throw new Error(ex);
    }
}

export default renderInElement;