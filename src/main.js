import AppPresenter from './presenter/app-presenter.js';
import { model } from './model/model.js';
import Observable from './framework/observable.js';
const containerFilters = document.querySelector('.trip-controls__filters');
const appPresenter = new AppPresenter({ appContainer: containerFilters });
Observable.addObserver(appPresenter.init);
console.log('model=', model);
model.init();