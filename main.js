import BoardPresenter from "./presenter/board-presenter-template.js";
import Markup from "./view/markup.js";
let tripFilters = Markup(".trip-controls__filters","form","trip-filters");
const boardPresenter = new BoardPresenter({boardContainer: tripFilters});
boardPresenter.init();
