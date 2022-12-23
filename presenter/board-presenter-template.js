import {render} from "../render.js";
import Filters from "../view/filters-template.js";
import CreatingWaypoint from "../view/creating-waypoint-template.js";
import Waypoint from "../view/waypoint-template.js";
import Sorting  from "../view/sorting-template.js";
import Markup from "../view/markup";
class BoardPresenter  {
  constructor(objeckt)
  {
    this.boardContainer = objeckt.boardContainer;
    this.tripEventsTripSort = Markup(".trip-events","form","trip-events__trip-sort trip-sort");
    console.log("this.tripEventsTripSort=",this.tripEventsTripSort);
    this.tripEventsList = Markup(".trip-events","ul","trip-events__list");
  }
  
  init() {
    for(let i=0; i<2; i++) {
  	  render(new Filters(), this.boardContainer);
    }
    for(let i=0; i<5; i++) {
      render(new Sorting(), this.tripEventsTripSort);
    }
  	render(new CreatingWaypoint(), this.tripEventsList);
     for(let i=0; i<3; i++){
  	   render(new Waypoint(), this.tripEventsList);
     }
   }
}
export default BoardPresenter;