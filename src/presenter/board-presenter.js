import {render} from '../render.js';
import FiltersWapoint from '../view/filters.js';
import FormWaypoint from '../view/form-waypoint.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import {data,destinations,mockPoints} from '../model/model.js';
class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.containerWaypoint = new ContainerWaypoint();
  }

  init() {
    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents);
    render(this.containerWaypoint,this.tripEvents);
    render(new FormWaypoint(data), this.containerWaypoint.getElement());
    for(let i = 0; i < mockPoints.length; i++) {
      render(new Waypoint(destinations,mockPoints[i]), this.containerWaypoint.getElement());
    }
  }
}
export default BoardPresenter;
