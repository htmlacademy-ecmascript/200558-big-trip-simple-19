
import FiltersWapoint from '../view/filters.js';
import SortingWaypoint from '../view/sorting.js';
import { render } from '../utils.js';

class SortPresenter {
  constructor(boardContainer, tripEvents, waypoints) {
    this.boardContainer = boardContainer;
    this.tripEvents = tripEvents;
    this.waypoints = waypoints;
  }

  init() {
    this.boardContainer.innerHTML = '';
    this.filtersWapoint = new FiltersWapoint();
    render(this.filtersWapoint, this.boardContainer);
    this.sorting = new SortingWaypoint();
    render(this.sorting, this.tripEvents, 'afterbegin');

  }

  setFilterChangeHandler(callBack) {
    this.filtersWapoint.onchange = (evt) => {
      callBack(evt);
    };
  }

  // eslint-disable-next-line accessor-pairs
  set onChange(callBack) {
    this.sorting.onChange = callBack;
  }
}

export default SortPresenter;
