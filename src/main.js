import BoardPresenter from './presenter/board-presenter.js';
const containerFilters = document.querySelector('.trip-controls__filters');
const tripFilters = document.createElement('form');
tripFilters.className = 'trip-filters';
containerFilters.appendChild(tripFilters);
console.log('tripFilters=',tripFilters);
let boardPresenter = new BoardPresenter({boardContainer:tripFilters});
boardPresenter.init();
