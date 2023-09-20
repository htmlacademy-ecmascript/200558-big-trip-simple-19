import { mockPoints } from '../model/model.js';
import { SortType } from '../view/sorting.js';
import BoardPresenter from './board-presenter.js';
import SortPresenter from './sort-presenter.js';
import { sort } from '../utils.js';
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
    this.waypoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
    this.boardPresenter.init(this.waypoints);
    this.sortPresenter.onChange = (sortType) => this.onSortTypeChange(sortType);
  }

  onSortTypeChange(sortType) {
    let waypointsCopy = [...this.waypoints];
    switch (sortType) {
      case SortType.PRICE:
        sort.min(mockPoints, 'basePrice');
        break;

      case SortType.DAY:
        mockPoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
        break;

      case SortType.TIME:
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
      this.boardPresenter.init(mockPoints);
    }
  }
}

export default AppPresenter;
