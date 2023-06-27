import AppPresenter from './app-presenter.js';
class sortPresenter {
  constructor(boardContainer) {
    this.boardContainer = boardContainer;
  }

  init() {
    const appPresenter = new AppPresenter({boardContainer:this.boardContainer});
    appPresenter.init();
  }

  change(order) {

    for(let i in order) {
      i = +i;
      let tripEventsItem = document.querySelectorAll('.trip-events__item');
      tripEventsItem = Array.from(tripEventsItem);
      const index = tripEventsItem.findIndex((el) => +el.dataset.id === order[i].id);
      const tripEventsList = document.querySelector('.trip-events__list');
      tripEventsItem[index].remove();
      tripEventsList.appendChild(tripEventsItem[index]);
    }
  }
  set onChange(callBack) {

    const sortInput = document.querySelectorAll('.trip-sort__input');
    for(const el of sortInput) {
      el.addEventListener('input', () => callBack(el));
    }
  }
}
export default sortPresenter;
