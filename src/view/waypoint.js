import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function getWaypointTemplate(destinations, point, i) {
  const startTime = dayjs(point.dateFrom).format('HH:mm');
  const endTime = dayjs(point.dateTo).format('HH:mm');

  let src = destinations.find((element) => element.id === point.destination);
  return `<li class="trip-events__item" data-index="${i}">
              <div class="event">
                <time class="event__date" datetime="2019-07-${dayjs(point.dateFrom).format('DD')}">MAR ${dayjs(point.dateFrom).format('DD')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="${destinations.find((element) => element.id === point.destination).pictures[0].src}">
                </div>
                <h3 class="event__title">${point.type} ${destinations.find((element) => element.id === point.destination).name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${point.dateFrom}">${startTime}</time>
                    —
                    <time class="event__end-time" datetime="${point.dateTo}">${endTime}</time>
                  </p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${point.basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Add breakfast</span>
                    +€&nbsp;
                    <span class="event__offer-price">500</span>
                  </li>
                </ul>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}
class Waypoint extends AbstractView {
  constructor(destinations, point, i) {
    super();
    this.i = i;
    this.destinations = destinations;
    this.point = point;
  }

  addClickListener(callback) {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', callback);
  }

  get template() {
    return getWaypointTemplate(this.destinations, this.point, this.i);
  }
}
export default Waypoint;
