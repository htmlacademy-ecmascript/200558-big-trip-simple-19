import { destinations, data as EventTypes } from '../model/model.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';

function editPointTemplate(options, data, i) {
  console.log('options=', options);
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
  const eventTypes = EventTypes.map(({ type }) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === options.type ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`).join('');
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
                        ${eventTypes}
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
  constructor(options, data, i) {
    super();
    this.options = options;
    this.data = data;
    this.i = i;
    this._setState(options);
    let element = this.element;
    console.log('this.element=', this.element);
    this._restoreHandlers();

  }

  li() {
    return document.querySelector('.event--edit').parentNode;
  }
  addSubmitListener(callback) {
    this.callbackSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      console.log('evt=', evt);
      evt.preventDefault();
      let name = document.querySelector('.event__input--destination').value;
      let i = this.element.querySelector('.event--edit').dataset.index;
      // нужен ли цикл?
      for (let destination of destinations) {
        if (name === destination.name) {
          console.log('callback=', callback);

          callback(i, this._state);
        }
      }
    });

  }

  addDeleteListener(callback) {

    this.element.querySelector('.event__reset-btn').addEventListener('click', () => { callback(i) });
  }
  _restoreHandlers() {
    this.element.querySelector('.event__type-toggle').onchange = (evt) => {



      if (evt.target.checked) {
        let inputs = this.element.querySelectorAll('.event__type-input');
        for (let input of inputs) {
          input.addEventListener('click', (evt) => {
            this.updateElement({ type: evt.target.value });
            console.log('editPoint=', this.data);
          });
        }
      }
    }
    this.addSubmitListener(this.callbackSubmit);
  }
  get template() {
    return editPointTemplate(this._state, this.data, this.i + 1);
  }
}
export default editPoint;
