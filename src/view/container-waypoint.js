import {createElement} from '../render.js';
function containerWaypointTemplate() {
  return '<ul class="trip-events__list"></ul>';
}
class ContainerWaypoint {
  getTemplate() {
    return containerWaypointTemplate();
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
export default ContainerWaypoint;
