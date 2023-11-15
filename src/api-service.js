import ApiService from './framework/api-service';

export default class PointApiService extends ApiService {
  getPoints() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  addPoint(point) {
    return this._load({
      url: 'points', method: 'post', body: JSON.stringify(point), headers:
                new Headers({ 'Content-type': 'application/json' })
    })
      .then(ApiService.parseResponse);
  }

  getDestinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }

}
