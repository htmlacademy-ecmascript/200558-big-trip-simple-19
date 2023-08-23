import AbstractView from '../framework/view/abstract-view.js';
function getMessageTemplate() {
  return `<div> 
            <h2 class="visually-hidden">Trip events</h2>
            <p class="trip-events__msg">Loading...</p>
          </div>`;
}
class Message extends AbstractView {
  constructor() {
    super();
    // this.template = getMessageTemplate();
  }
  get template() {
    return getMessageTemplate();
  }
}
export default Message;
