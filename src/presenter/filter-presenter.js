
import FiltersWapoint from '../view/filters.js';
import { render } from '../utils.js';

class FilterPresenter {
  constructor(boardContainer) {
    this.boardContainer = boardContainer;
  }

  init() {
    this.filtersWapoint = new FiltersWapoint();
    render(this.filtersWapoint, this.boardContainer);


  }

  setFilterChangeHandler(callBack) {
    this.filtersWapoint.onСhange = (type) => {
      callBack(type);
    };
  }
}

export default FilterPresenter;
