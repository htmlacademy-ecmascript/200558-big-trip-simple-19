import AbstractView from '../framework/view/abstract-view.js';
export const SortType = {
  PRICE: 'sort-price',
  DAY: 'sort-day',
  TIME: 'sort-time'
};
function getSortingTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="" data-id="${SortType.day}">
              <label class="trip-sort__btn" for="${SortType.DAY}">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled="">
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-id="${SortType.time}">
              <label class="trip-sort__btn" for="${SortType.TIME}">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-id="${SortType.price}">
              <label class="trip-sort__btn" for="${SortType.PRICE}">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled="" id="sort-offer">
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
}
class Sorting extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return getSortingTemplate();
  }
}
export default Sorting;
