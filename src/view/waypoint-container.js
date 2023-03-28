import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
function getContainerWaypointTemplate() {
  return '<ul class="trip-events__list"></ul>';
}
class WaypointContainer extends AbstractView {

  constructor() {
    super();
    this.template = getContainerWaypointTemplate();
  } 
}
export default WaypointContainer;
