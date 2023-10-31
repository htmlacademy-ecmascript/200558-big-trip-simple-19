import { model } from '../model/model.js';
import BoardPresenter from './board-presenter.js';
import FilterPresenter from './filter-presenter.js';
class AppPresenter {
  constructor({ appContainer }) {
    this.appContainer = appContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.filterPresenter = new FilterPresenter(this.appContainer, this.tripEvents, model.points);
    this.filterPresenter.init();
    this.boardPresenter = new BoardPresenter(this.tripEvents);
    this.addPoint = false;
  }

  init() {

    this.boardPresenter.init(model.points);
    this.filterPresenter.setFilterChangeHandler(this.onFilterChange.bind(this));
  }

  onFilterChange(type) {
    let points;
    if (type === 'future') {
      points = model.points.filter((point) => new Date(point.dateFrom) >= new Date());
    } else {
      points = model.points;
    }
    this.boardPresenter.init(points);
  }

  onChange(action, options) {
    if (action === 'delete') {
      model.removePoint(options);
    } else if (action === 'changeAll') {
      model.setPoints(options);
    }

  }
}

export default AppPresenter;
