import { mockPoints, model } from '../model/model.js';
import { SortType } from '../view/sorting.js';
import BoardPresenter from './board-presenter.js';
import SortPresenter from './sort-presenter.js';
import { sort } from '../utils.js';
class AppPresenter {
  constructor({ appContainer }) {
    this.appContainer = appContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.sortPresenter = new SortPresenter(this.appContainer, this.tripEvents, mockPoints);
    this.sortPresenter.init();
    this.boardPresenter = new BoardPresenter(this.tripEvents);
    this.sortPresenter.onChange = (sortType) => this.SortTypeChange(sortType);
    this.addPoint = false;
  }

  init() {
    console.log('init model.getPointAll=', model.getPointAll);

    this.boardPresenter.init(model.getPointAll);
    this.sortPresenter.setFilterChangeHandler((type) => {
      if (type === 'future') {
        mockPoints = mockPoints.filter((mockPoint) =>

          new Date(mockPoint.dateFrom) >= new Date('2019-07-10T11:46:56.845Z')
        );
      }
      this.boardPresenter.init(mockPoints);
    });
    mockPoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
    let mockPointsCopy = [...mockPoints];
    document.onkeydown = (evt) => {
      console.log('this=', this);
      if (evt.key === 'c') {
        console.log('key c');

        this.addPoint = !this.addPoint;
        console.log('addPoint=', this.addPoint);

        if (this.addPoint === true) {
          model.setPonts([]);
          this.init();
        } else {
          console.log('mockPointsCopy=', mockPointsCopy);

          model.setPoints(mockPointsCopy);
          this.init();
        }

      }
    };
  }
  onchange(action, options) {
    if (action === 'delete') {
      model.remove = options;
    } else if (action === 'change') {
      model.update(...options);
    }
    else if (action === 'changeAll') {
      model.update(options);
    }

  }

  SortTypeChange(sortType, callback = () => { }) {
    let mockPointsCopy = [...mockPoints];

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
    callback(mockPoints);
    let flag = false;
    for (let i in mockPoints) {
      i = +i;
      if (mockPoints[i].id !== mockPointsCopy[i].id) {
        flag = true;
      }
    }
    mockPointsCopy = [...mockPoints];
    if (flag) {
      this.init();
      this.onchange('changeAll', mockPoints);
    }
  }
}

export default AppPresenter;
