import AbstractView from '../framework/view/abstract-view.js';
function getEmpty() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}
class Empty extends AbstractView {
    constructor() {
        super();
    }
    get template() {
        return getEmpty();
    }
}
export default Empty;