import ApiService from '.././api-service.js';
const api = new ApiService('https://19.ecmascript.pages.academy/big-trip-simple', 'Basic eo0w5902k298891');
class Model {
  constructor(points) {
    this.points = [...points];
  }

  async addPoint(value) {
    this.points.push(value);
    this.points = adapterServer(this.points);
    console.log('this.points=', this.points);
    await api.addPoint(adapterServer(value));
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

let points = await api.getPoints();
console.log('start points=', points);

let destinations = await api.getDestinations();

let data = await api.getOffers();
function replaceAt(string, index, property) {
  return string.substring(0, index) + property + string.substring(index + 1);
}
function adapter(points, callback) {
  const isResaltArray = Array.isArray(points);
  points = !Array.isArray(points) ? [points] : points;
  console.log('points');

  for (let i in points) {
    i = +i;
    points[i] = Object.entries(points[i]);
    for (let property of points[i]) {

      property[0] = callback(property[0]);
    }
    points[i] = Object.fromEntries(points[i]);
  }
  if (isResaltArray) {
    return points;
  }
  return points[0];
}
function adapterServer(points) {
  return adapter(points, (property) => {

    let indexWord = property.match(/[A-Z]/);
    if (indexWord != null) {
      indexWord = indexWord.index;
    }
    if (indexWord > 0) {
      property = replaceAt(property, indexWord, property[indexWord].toLowerCase())
      property = property.substring(0, indexWord) + '_' + property.substring(indexWord);
    }
    return property;
  });
}
console.log('adapterServer==', adapterServer({ sirPir: 24, pir: 'lamTap', pyrRem: 'rim' }));
function adapterClient(points) {
  return adapter(points, (property) => {
    let indexWord = property.indexOf('_') + 1;
    if (indexWord > 0) {
      property = replaceAt(property, indexWord, property[indexWord].toUpperCase());
    }
    property = property.replace('_', '');
    return property;
  });
}
points = adapterClient(points);

console.log('pointadapterClients=', points);

const model = new Model(points);
export { model, data, destinations, replaceAt, adapterServer };