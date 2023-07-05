import {mockPoints} from '../model/model.js';
import SortPresenter from './sort-presenter.js';
import {Sort} from '../view/sorting.js';

class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    const sortPresenter = new SortPresenter(this.boardContainer);
    sortPresenter.init();
    sortPresenter.onChange = (evt) => {
      let mockPointsPrevious = [...mockPoints];
      const sort = {
        min: (object,property) => object.sort((a,b) => a[property] - b[property]),
      };
      switch(evt.value) {
        case Sort.PRICE:
          sort.min(mockPoints,'basePrice');
          break;

        case Sort.DAY:
          mockPoints.sort((a,b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
          break;

        case Sort.TIME:
          for(const el of mockPoints) {
            const date = new Date(el.dateFrom);
            el.startTime = date.getHours() * 60 + date.getMinutes();
          }
          sort.min(mockPoints,'startTime');
          break;
      }
      let flag = false;
      console.log('mockPoints=',mockPoints);
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
