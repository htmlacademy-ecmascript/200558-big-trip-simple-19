import {createElement} from '../render.js';
function WaypointTemplate(destinations, mockPoints) {
  let string = `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">MAR 18</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Event type icon">
                </div>
                <h3 class="event__title">Check-in Chamonix</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25">16:20</time>
                    —
                    <time class="event__end-time" datetime="2019-03-18T13:35">17:00</time>
                  </p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">600</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Add breakfast</span>
                    +€&nbsp;
                    <span class="event__offer-price">50</span>
                  </li>
                </ul>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`; 
    //console.log("i=",i);
    //console.log("basePrice="+basePrice);
    string = `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">MAR ${mockPoints.dateFrom.substr(8,2)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${destinations.find(element => element.id===mockPoints.destination).pictures[0].src}" alt="${destinations.find(element => element.id===mockPoints.destination).pictures[0].src}">
                </div>
                <h3 class="event__title">${mockPoints.type} ${destinations.find(element => element.id==mockPoints.destination).name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25">${mockPoints.dateFrom.substr(11,5)}</time>
                    —
                    <time class="event__end-time" datetime="2019-03-18T13:35">${mockPoints.dateTo.substr(11,5)}</time>
                  </p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${mockPoints.basePrice}</span>
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
  return string;
}
class Waypoint {
  constructor(destinations,mockPoints){
    this.destinations = destinations;
    this.mockPoints = mockPoints;
  }
  getTemplate() {
    console.log('this.destinations=',this.destinations);
    console.log('this.mockPoints',this.mockPoints);
    return WaypointTemplate(this.destinations, this.mockPoints);
  }

  getElement() {
    if (!this.element) {
      //console.log('this.getTemplate()='+this.getTemplate());
      this.element = createElement(this.getTemplate());
    }
    console.log('this.element=',this.element);
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
export default Waypoint;
