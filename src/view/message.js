import {createElement} from '../render.js';
function getMessageTemplate() {
  return `<div> 
            <h2 class="visually-hidden">Trip events</h2>
            <p class="trip-events__msg">Loading...</p>
          </div>`;
}
class message {
  getTemplate() {
    return getMessageTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
export default message;
