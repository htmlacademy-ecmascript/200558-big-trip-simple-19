import render from "./render.js";
import boardPresenter from "./presenter/BoardPresenterTemplate.js";
const tripEventsTripSort = document.querySelector(".trip-events__trip-sort");
const boardPresenter = new boardPresenter({boardContainer: tripEventsTripSort});
boardPresenter.init();
