import { AppPresenter } from './presenter/app-presenter.js';
import { model, observable } from './model/model.js';
const containerFilters = document.querySelector('.trip-controls__filters');
const appPresenter = new AppPresenter({ appContainer: containerFilters });
observable.addObserver(() => { appPresenter.init(); });
model.init();
