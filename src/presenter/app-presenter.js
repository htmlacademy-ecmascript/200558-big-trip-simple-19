import { mockPoints, model } from '../model/model.js';
import BoardPresenter from './board-presenter.js';
import FilterPresenter from './filter-presenter.js';
class AppPresenter {
  constructor({ appContainer }) {
    this.appContainer = appContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.filterPresenter = new FilterPresenter(this.appContainer, this.tripEvents, model.points);
    this.filterPresenter.init();
    this.boardPresenter = new BoardPresenter(this.tripEvents);
    // this.filterPresenter.onChange = (sortType) => this.SortTypeChange(sortType);
    this.addPoint = false;
  }

  init() {

    this.boardPresenter.init(model.points);
    this.filterPresenter.setFilterChangeHandler(this.onFilterChange.bind(this));
  }
  onFilterChange(type) {
    console.log('type=', type);

    if (type === 'future') {
      var points = model.points.filter((point) => {

        new Date(point.dateFrom) >= new Date()
      });
    } else {
      points = model.points;
    }
    console.log('this=', this);
    this.boardPresenter.init(points);
  }
  onchange(action, options) {
    if (action === 'delete') {
      model.remove(options);
    } else if (action === 'changeAll') {
      model.setPoints(options);
    }

  }
}

export default AppPresenter;
