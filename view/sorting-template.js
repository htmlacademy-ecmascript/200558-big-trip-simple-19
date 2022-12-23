import {createElement} from "../render.js";
function sortingTemplate(){
	return `<div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="">
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>`;
}
class sorting {
	getTemplate() {
      return sortingTemplate();
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
export default sorting;