import { destinations, mockPoints } from '../model/model.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
function editPointTemplate(options, data, i) {
  const startTime = dayjs(options.dateFrom).format('hh:mm'),
    endTime = dayjs(options.dateTo).format('hh:mm');
  let tagOptions = ``;
  for (let destination of destinations) {
    tagOptions += `<option value="${destination.name}">${destination.name}</option>`;
  }
  console.log('options=', options);
  let destination = destinations.find((el) => { return el.id == options.destination; });
  let imgs = '';
  for (let picture of destination.pictures) {
    imgs += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  }
  console.log('destination=', destination);
  let markup = `<li class="trip-events__item"> 
              <form class="event event--edit" action="#" method="post"  data-index='${i}'>
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${options.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${options.type} to
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.find((el) => el.id === options.destination).name}" list="destination-list-1" autocomplete="off">
                    <datalist id="destination-list-1">
                    ${tagOptions}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${options.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    event__offer-selector
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinations.find((el) => el.id === options.destination).description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${imgs}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
  let offers = '';
  offers = data.find((el) => el.type === options.type).offers;
  const offersMarkup = offers.map((offer, index) => {
    let checked = '';
    for (const el of options.offers) {
      if (el === index) {
        checked = 'checked';
      }
    }
    return (`<div class="event__offear-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer.id}" type="checkbox" name="event-offer-comfort" ${checked}>
                  <label class="event__offer-label" for="event-offer-comfort-${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>
                `);
  }).join('');
  markup = markup.replace('event__offer-selector', offersMarkup);
  return markup;
}
class editPoint extends AbstractStatefulView {
  static settings = {};
  constructor(options, data, i) {
    super();
    editPoint.settings.type = options.type;
    this.options = options;
    this.data = data;
    this.template = editPointTemplate(this.options, this.data, i + 1);
    let element = this.element;
    let destinationList1 = this.element.querySelector('#destination-list-1');
    console.log('destinationList1.innerHTML,=', destinationList1.innerHTML);
    this.element.querySelector('.event__type-toggle').onchange = function () {
      if (this.checked) {
        let inputs = element.querySelectorAll('.event__type-input');
        for (let input of inputs) {
          input.addEventListener('click', function (evt) {
            this.updateElement({
              type: evt.target.value,
            });
            options.type = evt.target.value;
            data.find((el) => { el.type === editPoint.state.type })
            element.querySelector('.event__type-icon').src = 'img/icons/' + evt.target.value + '.png';
            element.querySelector('.event__type-output').textContent = editPoint.settings.type + ' to';
          }
        }
      }
    }
  }

  addSubmitListener(callback) {
    this.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      let name = document.querySelector('.event__input--destination').value;
      let i = this.element.querySelector('.event--edit').dataset.index;
      for (let destination of destinations) {
        if (name === destination.name) {
          callback(evt, i);
        }
      }
    });

  }

  addDeleteListener(callback) {

    this.element.querySelector('.event__reset-btn').addEventListener('click', () => { callback(this.element.querySelector('.event__reset-btn').parentElement.parentElement.dataset.index) });
  }
}
export default editPoint;
