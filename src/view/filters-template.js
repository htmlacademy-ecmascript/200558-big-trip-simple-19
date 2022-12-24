import {createElement} from '../render.js';
function filtersTemplate() {
  return `<div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>`;
}
class Filters {
  getTemplate() {
    return filtersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
export default Filters;
