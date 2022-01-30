export const renderInElement = (elementId, value) => {
    try {
        if (elementId && value) {
            document.getElementById(elementId).innerHTML = value;
            console.log(`[renderInElement]: Elemento renderizado com sucesso: elementId: ${elementId}`);
        }
    } catch (ex) {
        console.error(`[renderInElement]: Erro ao rendenrizar elemento de id ${elementId}`);
        throw ex;
    }
}

export default renderInElement;