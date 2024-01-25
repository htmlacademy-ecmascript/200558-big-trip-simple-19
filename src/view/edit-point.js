import { model } from '../model/model.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

const getEditPointTemplate = (waypoint, i, isSubmiting, isDeleting, formType) => {
  const startTime = dayjs(waypoint.dateFrom).format('hh:mm'),
    endTime = dayjs(waypoint.dateTo).format('hh:mm');
  let options = '';
  for (const { name } of model.getDestinations()) {
    options += `<option value="${name}">${name}</option>`;
  }
  const destination = model.getDestinations().find((el) => el.id === waypoint.destination);
  let imgs = '';
  for (const picture of destination.pictures) {
    imgs += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  }
  const transports = model.getOffers().map(({ type }) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === options.type ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`).join('');
  let offers = model.getOffers().find((el) => el.type === waypoint.type).offers;
  offers = offers.map((offer, index) => {
    let checked = '';
    for (const el of waypoint.offers) {
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
  let deleteButtonText = isDeleting ? 'Deleting...' : 'Delete';
  deleteButtonText = formType ? 'Cancel' : deleteButtonText;
  return `<li class="trip-events__item"> 
              <form class="event event--edit" action="#" method="post"  data-index='${i}'>
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${waypoint.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${transports}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${waypoint.type} to
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${model.getDestinations().find((el) => el.id === waypoint.destination).name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${options}
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
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${waypoint.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" ${isSubmiting ? 'disabled' : ''} type="submit">${isSubmiting ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${isDeleting ? 'disabled' : ''} > ${deleteButtonText}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${offers}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${model.getDestinations().find((el) => el.id === waypoint.destination).description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${imgs}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};
class editPoint extends AbstractStatefulView {
  constructor(waypoint, i, formType) {
    super();
    this.formType = formType;
    this.waypoint = waypoint;
    this.i = i;
    this.isSubmiting = false;
    this.isDeleting = false;
    this.flatpickrEnd = {};
    this.flatpick = {};
    this._setState(waypoint);
    this._restoreHandlers();
    this.buttonSave = this.element.querySelector('.event--edit');
    this.buttonDelete = this.element.querySelector('.event__reset-btn');
  }

  setSubmitButtonStatus(submitStatus) {
    if (typeof submitStatus === 'boolean') {
      this.isSubmiting = submitStatus;
    }
    this.updateElement(this._state);

  }

  getIndex() {
    return this.buttonSave.dataset.index;
  }

  getTag() {
    return this.buttonSave;
  }

  setDeleteButtonStastus(deletingStatus) {
    if (typeof deletingStatus === 'boolean') {
      this.isDeleting = deletingStatus;
    }
    this.updateElement(this._state);
  }

  addSubmitListener(callback) {
    if (callback) {
      this.callbackSubmit = callback;
      this.element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const i = this.buttonSave.dataset.index;
        callback(i, this._state);
      });
    }
  }

  setTime() {
    this.flatpickrStart = flatpickr(this.element.querySelector('#event-start-time-1'), {
      defaultDate: this._state.dateFrom,
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      'time_24hr': true,
      maxDate: this._state.dateTo,
      onClose: (data) => {
        if (data.length > 0) {
          this.flatpickrEnd.set('minDate', data[0]);
          this._state.dateFrom = data[0];
        }
      }
    });
    this.flatpickrEnd = flatpickr(this.element.querySelector('#event-end-time-1'), {
      defaultDate: this._state.dateTo,
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      'time_24hr': true,
      minDate: this._state.dateFrom,
      onClose: (data) => {
        if (data.length > 0) {
          this.flatpickrStart.set('maxDate', data[0]);
          this._state.dateTo = data[0];
        }
      }
    });
  }

  addDeleteListener(callback) {
    if (callback) {
      this.deleteCallback = callback;
      this.buttonDelete.addEventListener('click', () => {
        this.isDeleting = true;
        callback(this.waypoint.id, this.i);
      });
    }
  }

  _restoreHandlers() {
    this.addDeleteListener(this.deleteCallback);
    this.element.querySelector('.event__input--price').addEventListener('change', (evt) => {
      this._setState({ basePrice: (+evt.target.value) });
    });
    this.element.querySelector('.event__type-group').addEventListener('change', (evt) => {
      this.updateElement({ type: evt.target.value });
    });
    this.setTime();
    this.addSubmitListener(this.callbackSubmit);
  }

  get template() {
    return getEditPointTemplate(this._state, this.i, this.isSubmiting, this.isDeleting, this.formType);
  }
}
export default editPoint;
