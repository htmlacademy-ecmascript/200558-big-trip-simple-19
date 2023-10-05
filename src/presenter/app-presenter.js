import { mockPoints, model } from '../model/model.js';
import { SortType } from '../view/sorting.js';
import BoardPresenter from './board-presenter.js';
import SortPresenter from './sort-presenter.js';
import { sort } from '../utils.js';
let flag = false;
class AppPresenter {
  constructor({ appContainer }) {
    this.waypoints = mockPoints;
    this.appContainer = appContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.sortPresenter = new SortPresenter(this.appContainer, this.tripEvents, this.waypoints);
    this.sortPresenter.init();
    this.boardPresenter = new BoardPresenter(this.tripEvents);
    this.sortPresenter.onChange = (sortType) => this.SortTypeChange(sortType);
  }

  init() {
    this.boardPresenter.init(this.waypoints);
    this.sortPresenter.setFilterChangeHandler((evt) => {
      this.waypoints = model.getPointAll;
      if (evt == 'future') {
        this.waypoints = this.waypoints.filter((waypoint) => {
          // console.log(`Date.now(${Date.now(waypoint.dateFrom)}) >= Date.now(${Date.now('2019-07-10T11:46:56.845Z')}))=${Date.now(waypoint.dateFrom) >= Date.now('2019-07-10T11:46:56.845Z')}`);

          return new Date(waypoint.dateFrom) >= new Date('2019-07-10T11:46:56.845Z');
        });
      }
      this.boardPresenter.init(this.waypoints);
    });
    this.waypoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
    document.onkeydown = (evt) => {
      if (evt.key == 'c') {
        flag = !flag;
        if (flag == true) {
          this.waypoints = [];
          this.init();
        } else {
          this.waypoints = mockPoints;
          this.init();
        }

      }
    }
  }
  onchange(action, options) {
    if (action == 'delete') {
      model.remove = option;
    } else if (action == 'change') {
      model.change(...options);
    }
    else if (action == 'changeAll') {
      model.changeAll(options);
    }
    console.log('model=', model);

  }
  SortTypeChange(sortType, callback = () => { }) {
    let waypointsCopy = [...this.waypoints];
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
      this.init();
      this.onchange('changeAll', this.waypoints);
    }
  }
}

export default AppPresenter;
