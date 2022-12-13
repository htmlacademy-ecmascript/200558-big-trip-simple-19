import render from "../render.js";
import filters from "../view/filtersTemplate.js";
import creatingWaypointTemplate from "../view/creatingWaypointTemplate.js";
import waypoint from "../view/WaypointTemplate.js";
export default class boardPresenter  {
  const eventEdit = document.querySelector(".event--edit");
  const tripEventsList = document.querySelector(".trip-events__list");
  constructor({boardContainer})
  {
    this.boardContainer = boardContainer;
  }
  init() {

    for(var i=0; i<=5; i++){
  	render(new filters(),boardContainer);
    }
  	render(new creatingWaypointTemplate(), eventEdit);
  	render(new waypoint(),tripEventsList);
  }
}
