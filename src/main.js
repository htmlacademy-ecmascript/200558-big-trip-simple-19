import BoardPresenter from './presenter/board-presenter-template.js';
import CreateAndRender from './view/create-And-Render.js';
const tripFilters = new CreateAndRender('.trip-controls__filters','form','trip-filters');
const boardPresenter = new BoardPresenter({boardContainer: tripFilters});
boardPresenter.init();
