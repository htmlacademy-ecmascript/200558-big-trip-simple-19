
import FiltersWapoint from '../view/filters.js';
import SortingWaypoint from '../view/sorting.js';
import {render} from '../render.js';

class SortPresenter {
  constructor(boardContainer,tripEvents) {
    this.boardContainer = boardContainer;
    this.tripEvents = tripEvents;
  }

  init() {
    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents,'afterbegin');
  }

  change(order) {

    for (const point of order) {
      let tripEventsItem = document.querySelectorAll('.trip-events__item');
      tripEventsItem = Array.from(tripEventsItem);
      const index = tripEventsItem.findIndex((el) => +el.dataset.id === point.id);
      const tripEventsList = document.querySelector('.trip-events__list');
      tripEventsItem[index].remove();
      tripEventsList.appendChild(tripEventsItem[index]);
    }
  }

  set onChange(callBack) {
    const sortInput = document.querySelectorAll('.trip-sort__input');
    for (const el of sortInput) {
      el.addEventListener('input', () => callBack(el.value));
    }
  }
}

export default SortPresenter;
