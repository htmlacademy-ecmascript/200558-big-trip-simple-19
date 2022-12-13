import render from "../render.js";
function filtersTemplate() {
  return `<div class="trip-sort__item  trip-sort__item--time">
            <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
            <label class="trip-sort__btn" for="sort-time">Time</label>
          </div>`;
}
class filters {
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
