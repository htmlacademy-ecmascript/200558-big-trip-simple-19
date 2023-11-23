import ApiService from '.././api-service.js';
import Observable from '../framework/observable.js';
const observable = new Observable();
import { boardPresenter } from '../presenter/app-presenter.js'
const api = new ApiService('https://19.ecmascript.pages.academy/big-trip-simple', 'Basic Dimasic 1');
class Model {
  constructor() {
  }

  async init() {
    this.points = await api.getPoints();
    this.destinations = await api.getDestinations();
    this.offers = await api.getOffers();

    this.points = adaptClient(this.points);
    this.destinations = adaptClient(this.destinations);
    this.offers = adaptClient(this.offers);
    console.log('this.points', this.points);
    console.log('this.destinations', this.destinations);
    console.log('this.offers', this.offers);
    observable._notify();

  }

  async addPoint(value) {
    value = adaptClient(await api.addPoint(adaptServer(value)));
    console.log('boardPresenter=', boardPresenter);
    this.points.push(value);
    boardPresenter.onSortTypeChange();
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

  setPoint(i, value) {
    this.points[i] = value;
  }

  setPoints(points) {
    this.points = [...points];
  }

  removePoint(id) {
    const index = this.points.findIndex((point) => point.id === id);
    this.points.splice(index, 1);
  }
}

const destinations = await api.getDestinations();

const offers = await api.getOffers();
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
export { model, offers, destinations, observable, replaceAt, adaptServer };
