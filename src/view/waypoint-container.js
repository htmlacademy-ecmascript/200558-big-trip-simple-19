import {createElement} from '../render.js';
function getContainerWaypointTemplate() {
  return '<ul class="trip-events__list"></ul>';
}
class WaypointContainer {
  getTemplate() {
    return getContainerWaypointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
export default WaypointContainer;
