import ApiService from '.././api-service.js';
import Observable from '../framework/observable.js';
// const observable = new Observable();
const UPDATE_TYPE = {
  INIT: 'INIT',
  REMOVE: 'REMOVE',
  FORM_PENDING: 'FORM_PENDING'
};
import { boardPresenter } from '../presenter/app-presenter.js';
const api = new ApiService('https://19.ecmascript.pages.academy/big-trip-simple', 'Basic Dimasi 3');
class Model extends Observable {
  constructor() {
    super();
    this.points = [];
    this.destinations = [];
    this.offers = [];

  }

  async init() {
    //let i = 0;
    //const dataParameters = [[api.getPoints(), 'points'], [api.getDestinations(), 'destinations'], [api.getOffers(), 'offers']];
    const dataParameters = [api.getPoints(), api.getDestinations(), api.getOffers()];

    // for (const [promis, nameData] of dataParameters) {
    //   promis.then((data) => {
    //     this[nameData] = adaptClient(data);
    //     i++;
    //     if (i === 3) {
    //       this._notify(UPDATE_TYPE.INIT);
    //     }
    //   }).catch(() => {
    //     errrorLog();
    //     errrorLog = null;
    //   });
    //  }

    Promise.all(dataParameters).then(([points, destinations, offers]) => {
      this.points = adaptClient(points);
      this.destinations = adaptClient(destinations);
      this.offers = adaptClient(offers);
      this._notify(UPDATE_TYPE.INIT);

    });
  }

  async addPoint(value) {
    this._notify(UPDATE_TYPE.FORM_PENDING);
    value = await api.addPoint(adaptServer(value));
    value = adaptClient(value);
    this.points.push(value);
    boardPresenter.onSortTypeChange();
    return value;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;

  }

  getPoint(i) {
    return this.points[i];
  }

  async setPoint(i, value) {
    console.log('lol');
    this._notify(UPDATE_TYPE.FORM_PENDING);
    await api.changePoint(adaptServer(value));
    this.points[i] = value;
  }

  setPoints(points) {
    this.points = [...points];
  }

  async removePoint(id) {
    const index = this.points.findIndex((point) => point.id === id);
    document.querySelector('.event__reset-btn').textContent = 'Deleting...';
    let s = await api.deletePoint(id);
    this.points.splice(index, 1);
    this._notify(UPDATE_TYPE.REMOVE);
  }
}

function replaceAt(string, index, property) {
  return string.substring(0, index) + property + string.substring(index + 1);
}
function adapter(points, callback) {
  const isResaltArray = Array.isArray(points);
  points = !Array.isArray(points) ? [points] : points;

  for (let i in points) {
    i = +i;
    points[i] = Object.entries(points[i]);
    for (const property of points[i]) {

      property[0] = callback(property[0]);
    }
    points[i] = Object.fromEntries(points[i]);
  }
  if (isResaltArray) {
    return points;
  }
  return points[0];
}
function adaptServer(points) {
  return adapter(points, (property) => {

    let indexWord = property.match(/[A-Z]/);
    if (indexWord !== null) {
      indexWord = indexWord.index;
    }
    if (indexWord > 0) {
      property = replaceAt(property, indexWord, property[indexWord].toLowerCase());
      property = `${property.substring(0, indexWord)}_${property.substring(indexWord)}`;
    }
    return property;
  });
}
function adaptClient(points) {
  return adapter(points, (property) => {
    const indexWord = property.indexOf('_') + 1;
    if (indexWord > 0) {
      property = replaceAt(property, indexWord, property[indexWord].toUpperCase());
    }
    property = property.replace('_', '');
    return property;
  });
}
const model = new Model();
export { model, UPDATE_TYPE, replaceAt, adaptServer };
