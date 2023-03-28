import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
function getWaypointTemplate(destinations, mockPoints) {
  console.log('mockPoints.dateFrom=',mockPoints.dateFrom);
  console.log('mockPoints.dateTo=',mockPoints.dateTo);
  function timeString(string) {
    let departureTime = null;
    if(string.substr(12,1) === ':') {
      departureTime = string.substr(11,1);
      if(string.substr(15,1)==':') {
        departureTime += string.substr(13,2);
      } else {
        departureTime += string.substr(13,3);
      }
    } else {
      console.log('departureTime_1=',departureTime);
      departureTime = string.substr(11,2);
      console.log('departureTime=',departureTime);
      if(string.substr(15,1) === ':') {
        console.log('log');
        departureTime += string.substr(13,2);
      } else {
        departureTime += string.substr(13,3);
      }  
    }
    return departureTime;
  }
  let StartTime = timeString(mockPoints.dateFrom);
  let EndTime = timeString(mockPoints.dateTo);
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">MAR ${mockPoints.dateFrom.substr(8,2)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${mockPoints.type}.png" alt="${destinations.find((element) => element.id === mockPoints.destination).pictures[0].src}">
                </div>
                <h3 class="event__title">${mockPoints.type} ${destinations.find((element) => element.id === mockPoints.destination).name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${mockPoints.dateFrom}">${StartTime}</time>
                    —
                    <time class="event__end-time" datetime="${mockPoints.dateTo}">${EndTime}</time>
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
}
class Waypoint extends AbstractView { 
  constructor(destinations,mockPoints) {
    super();
    this.destinations = destinations;
    this.mockPoints = mockPoints;
    this.template = getWaypointTemplate(this.destinations,this.mockPoints);
  }
}
export default Waypoint;
