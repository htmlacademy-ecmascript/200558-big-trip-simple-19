import { render, replaceElement } from '../utils.js';
import Waypoint from '../view/waypoint.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import { data, destinations, mockPoints } from '../model/model.js';
import Message from '../view/message.js';
// import '../../node_modules/flatpickr/dist/flatpickr.min.css';
export default class BoardPresenter {
  #isFormOpen = false;
  constructor(tripEvents) {
    this.tripEvents = tripEvents;
    this.containerWaypoint = new ContainerWaypoint();
    this.waypointTag = [];
    render(this.containerWaypoint, this.tripEvents);
    this.waypointEditForm = null;
    this.replaceFormToPoint = this.replaceFormToPoint.bind(this);
  }

  init(waypoints) {
    this.waypoints = waypoints;

    if (this.waypoints.length === 0) {
      render(new Message(), this.tripEvents);
    } else {
      this.#renderPoints(this.waypoints, this.editPoint);
    }
  }

  replaceFormToPoint(i, update) {
    i = (+i) - 1;
    mockPoints[i].type = update.type;
    this.waypointTag[i] = new Waypoint(destinations, mockPoints[i], i);
    this.waypointTag[i].addClickListener(() => this.onWaypointClick(i));
    replaceElement(this.waypointTag[i].element, this.editPoint.element);
    this.#isFormOpen = false;
  }

  #renderPoints(waypoints) {
    this.#isFormOpen = false;
    this.containerWaypoint.element.innerHTML = null;
    this.waypointTag = [];
    for (let i = 0; i < waypoints.length; i++) {
      const waypointTag = new Waypoint(destinations, waypoints[i], i);
      this.waypointTag[i] = waypointTag;
      waypointTag.addClickListener(() => this.onWaypointClick(i));
      render(this.waypointTag[i], this.containerWaypoint.element);
    }
  }

  onWaypointClick(i) {
    if (this.#isFormOpen) {
      const eventEdit = document.querySelector('.event--edit');
      const mockPoint = mockPoints[eventEdit.dataset.index];
      this.replaceFormToPoint(eventEdit.dataset.index, mockPoint);
    }
    this.editPoint = new EditPoint(this.waypoints[i], data, i);
    this.openFormIndex = i;
    replaceElement(this.editPoint.element, this.waypointTag[i].element);
    this.editPoint.time();
    this.editPoint.addSubmitListener(this.replaceFormToPoint);
    this.editPoint.addDeleteListener(() => {
      this.editPoint.remove();
      this.#isFormOpen = false;
      this.waypointTag[i] = undefined;
    });
    this.#isFormOpen = true;
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element, form);
  }
}
