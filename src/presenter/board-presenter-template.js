import {render} from '../render.js';
import Filters from '../view/filters-template.js';
import CreatingWaypoint from '../view/create-waypoint-form-template.js';
import Waypoint from '../view/waypoint-template.js';
import Sorting from '../view/sorting-template.js';
import CreateAndRender from '../view/create-And-Render.js';
class BoardPresenter {
  constructor(objeckt)
  {
    this.boardContainer = objeckt.boardContainer;
    this.tripEventsTripSort = new CreateAndRender('.trip-events','form','trip-events__trip-sort trip-sort');
    this.tripEventsList = new CreateAndRender('.trip-events','ul','trip-events__list');
  }

  init() {
    for(let i = 0; i < 2; i++) {
      render(new Filters(), this.boardContainer);
    }
    for(let i = 0; i < 5; i++) {
      render(new Sorting(), this.tripEventsTripSort);
    }
    render(new CreatingWaypoint(), this.tripEventsList);
    for(let i = 0; i < 3; i++){
      render(new Waypoint(), this.tripEventsList);
    }
  }
}
export default BoardPresenter;
