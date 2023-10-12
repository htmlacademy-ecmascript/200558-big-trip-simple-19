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
    this.filterPresenter.setFilterChangeHandler((type) => {
      if (type === 'future') {
        model.points = model.points.filter((point) =>

          new Date(point.dateFrom) >= new Date('2019-07-10T11:46:56.845Z')
        );
      }
      this.boardPresenter.init(model.points);
    });
    // model.points.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
    document.onkeydown = (evt) => {
      if (evt.key === 'c') {
        this.addPoint = !this.addPoint;

        if (this.addPoint === true) {
          model.setPoints = [];
          this.init();
        } else {

          model.setPoints = mockPoints;
          this.init();
        }

      }
    };
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
