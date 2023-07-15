import { mockPoints } from '../model/model.js';
import { Sort } from '../view/sorting.js';
import BoardPresenter from './board-presenter.js';
import SortPresenter from './sort-presenter.js';

class AppPresenter {
  constructor({ appContainer }) {
    this.appContainer = appContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.sortPresenter = new SortPresenter(this.appContainer, this.tripEvents);
    this.boardPresenter = new BoardPresenter(this.tripEvents);
    this.waypoints = mockPoints;
  }

  init() {
    this.sortPresenter.init();
    this.boardPresenter.init(this.waypoints);
    this.sortPresenter.onChange = (sortType) => this.onSortTypeChange(sortType, this.boardPresenter);
  }

  onSortTypeChange(sortType) {
    let waypointsCopy = [...this.waypoints];
    //вынести в утилита
    const sort = {
      min: (object, property) => object.sort((a, b) => a[property] - b[property]),
    };
    switch (sortType) {
      case Sort.PRICE:
        sort.min(mockPoints, 'basePrice');
        break;

      case Sort.DAY:
        mockPoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
        break;

      case Sort.TIME:
        for (const el of mockPoints) {
          const date = new Date(el.dateFrom);
          el.startTime = date.getHours() * 60 + date.getMinutes();
        }
        sort.min(mockPoints, 'startTime');
        break;
    }
    let flag = false;
    for (let i in mockPoints) {
      i = +i;
      if (mockPoints[i].id !== waypointsCopy[i].id) {
        flag = true;
      }
    }
    waypointsCopy = [...mockPoints];
    if (flag) {
      // this.sortPresenter.change(mockPoints);
      // вместо этого boardPresenter.init();
      this.boardPresenter.init(mockPoints);
    }
  }
}

export default AppPresenter;
