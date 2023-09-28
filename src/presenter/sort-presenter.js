
import FiltersWapoint from '../view/filters.js';
import SortingWaypoint from '../view/sorting.js';
import { render } from '../utils.js';

class SortPresenter {
  constructor(boardContainer, tripEvents) {
    this.boardContainer = boardContainer;
    this.tripEvents = tripEvents;
  }

  init() {
    this.boardContainer.innerHTML = '';
    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents, 'afterbegin');
  }

  // eslint-disable-next-line accessor-pairs
  set onChange(callBack) {
    const sortInput = document.querySelectorAll('.trip-sort__input');
    for (const el of sortInput) {
      el.addEventListener('input', () => callBack(el.value));
    }
  }
}

export default SortPresenter;
