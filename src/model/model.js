import ApiService from '.././api-service.js';
const api = new ApiService('https://19.ecmascript.pages.academy/big-trip-simple', 'Basic eo0w5912k298892');
class Model {
  constructor() {
  }

  async init() {
    api.getPoints().then((points) => {
      this.points = points;
      console.log('this.points=', this.points);

    }).catch(() => {
      console.log('init error');
    });
    api.getDestinations().then((destinations) => {
      this.destinations = destinations;
      console.log('this.points=', this.points);
    }).catch(() => {
      console.log('init error');
    });

  }

  async addPoint(value) {
    value = adaptClient(await api.addPoint(adaptServer(value)));
    this.points.push(value);
    return { ...value };
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
await model.init();
export { model, offers, destinations, replaceAt, adaptServer };
