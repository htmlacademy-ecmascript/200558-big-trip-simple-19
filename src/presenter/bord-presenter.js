import { render, replaceElement } from '../render.js';
import FiltersWapoint from '../view/filters.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import { data, destinations, mockPoints } from '../model/model.js';
import Message from '../view/message.js';
export default class AppPresenter {
  #isFormOpen = false;

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.containerWaypoint = new ContainerWaypoint();
    this.waypointTag = [];

  }

  init() {

    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents);
    render(this.containerWaypoint, this.tripEvents);
    this.#renderPoint();
    document.querySelector('body').onkeydown = (evt) => {
      if (evt.key === 'k') {
        this.resetPoints();
      }
    };
  }

  replaceFormToPoint(evt,i) {
    evt.preventDefault();
    replaceElement(this.waypointTag[i].element, this.editPointForm[i].element);
    this.#isFormOpen = false;
  }

  #renderBoard() { //фунция рендер поинты если поин нет сообш
    if (this.waypoints.length === 0) {
      render(new Message(), this.tripEvents);
    } else {
      this.#renderPoint();
    }
  }

  #renderPoint() {//task на point
    const waypointTag = [];
    this.#isFormOpen = false;
    for (const el of mockPoints) {
      el.days = new Date(el.dateFrom).getDate();
    }
    for (let i = 0; i < mockPoints.length; i++) {
      mockPoints.sort((a, b) => a.days - b.days);
      this.waypointTag[i] = new Waypoint(destinations, mockPoints[i]);
      waypointTag[i] = this.waypointTag[i];
      const editPointForm = [];
      waypointTag[i].addClickListener(() => {
        if (this.#isFormOpen) {
          const form = document.querySelector('.event--edit');
          replaceElement(waypointTag[Number(form.dataset.index) - 1].element, form);
        }
        editPointForm[i] = new EditPoint(mockPoints[i], data, i);
        replaceElement(editPointForm[i].element, waypointTag[i].element);
        editPointForm[i].addSubmitListener((evt) => this.replaceFormToPoint(evt,i));
        editPointForm[i].addClickListener(() => {
          editPointForm[i].remove();
          this.#isFormOpen = false;
          waypointTag[i] = undefined;
        });
        document.onkeydown = (evt) => {
          if (evt.key === 'Escape') {
            replaceElement(this.waypointTag[i].element, editPointForm.element);
          }
        };
        this.#isFormOpen = true;
      });
      render(this.waypointTag[i], this.containerWaypoint.element);
    }
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element, form);
  }
}
