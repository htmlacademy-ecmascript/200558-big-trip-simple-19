import { mockPoints, model } from '../model/model.js';
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
    this.sortPresenter.onChange = (sortType) => this.SortTypeChange(sortType);
  }

  SortTypeChange(sortType, callback = () => { }) {
    let waypointsCopy = [...this.waypoints];
    console.log('sort mockPoints=', mockPoints);
    switch (sortType) {
      case SortType.PRICE:
        sort.min(this.waypoints, 'basePrice');
        break;

      case SortType.DAY:
        this.waypoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
        break;

      case SortType.TIME:
        for (const el of mockPoints) {
          const date = new Date(el.dateFrom);
          el.startTime = date.getHours() * 60 + date.getMinutes();
        }
        sort.min(this.waypoints, 'startTime');
        break;
    }
    console.log('sort mockPoints=', mockPoints);
    callback(this.waypoints);
    let flag = false;
    for (let i in this.waypoints) {
      i = +i;
      if (this.waypoints[i].id !== waypointsCopy[i].id) {
        flag = true;
      }
    }
    waypointsCopy = [...this.waypoints];
    if (flag) {
      this.boardPresenter.init(this.waypoints);
      model.changeAll(this.waypoints);
      console.log('mock=', mockPoints);

    }
  }
}

export default AppPresenter;
