import {render} from '../render.js';
import FiltersWapoint from '../view/filters-waypoint.js';
import FormWaypoint from '../view/form-waypoint.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting-waypoint.js';
import ContainerWaypoint from '../view/container-waypoint.js';
class BoardWaypoint {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.containerWaypoint = new ContainerWaypoint();
  }

  init() {
    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents);
    render(this.containerWaypoint,this.tripEvents);
    this.containerWaypoint = this.containerWaypoint.getElement();
    render(new FormWaypoint(), this.containerWaypoint);
    for(let i = 0; i < 3; i++) {
      render(new Waypoint(), this.containerWaypoint);
    }
  }
}
export default BoardWaypoint;
