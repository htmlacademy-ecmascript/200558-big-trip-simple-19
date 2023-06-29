import {mockPoints} from '../model/model.js';
import SortPresenter from './sort-presenter.js';
import {sort} from '../view/sorting.js';

class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    const sortPresenter = new SortPresenter(this.boardContainer);
    sortPresenter.init();
    sortPresenter.onChange = (evt) => {
      let mockPointsPrevious = [...mockPoints];
      function sortMin(object,property) {
        return object.sort((a,b) => a[property] - b[property]);
      }
      switch(evt.value) {
        case sort.price:
          sortMin(mockPoints,'basePrice');
          break;

        case sort.day:
          mockPoints.sort((a,b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
          break;

        case sort.time:
          for(const el of mockPoints) {
            const date = new Date(el.dateFrom);
            el.timeFirst = date.getHours() * 60 + date.getMinutes();
          }
          sortMin(mockPoints,'timeFirst');
          break;
      }
      let flag = false;
      for(let i in mockPoints) {
        i = +i;
        if(mockPoints[i].id !== mockPointsPrevious[i].id) {
          flag = true;
        }
      }
      mockPointsPrevious = [...mockPoints];
      if(flag) {
        sortPresenter.change(mockPoints);
      }
    };
  }
}
export default BoardPresenter;
