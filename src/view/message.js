import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
function getMessageTemplate() {
  return `<div> 
            <h2 class="visually-hidden">Trip events</h2>
            <p class="trip-events__msg">Loading...</p>
          </div>`;
}
class message extends AbstractView {
  constructor() {
    super();
    this.template = getMessageTemplate();
  }
}
export default message;
