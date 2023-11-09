import AppPresenter from './presenter/app-presenter.js';
const containerFilters = document.querySelector('.trip-controls__filters');
const appPresenter = new AppPresenter({ appContainer: containerFilters });
appPresenter.init();
