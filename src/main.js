import AppPresenter from './presenter/app-presenter.js';

const containerFilters = document.querySelector('.trip-controls__filters');
const tripFilters = document.createElement('form');
tripFilters.className = 'trip-filters';
containerFilters.appendChild(tripFilters);
const appPresenter = new AppPresenter({ appContainer: tripFilters });
appPresenter.init();
