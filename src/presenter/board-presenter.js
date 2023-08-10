import { render, replaceElement } from '../utils.js';
import Waypoint from '../view/waypoint.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import { data, destinations } from '../model/model.js';
import Message from '../view/message.js';

export default class BoardPresenter {
  #isFormOpen = false;
  constructor(tripEvents) {
    this.tripEvents = tripEvents;
    this.containerWaypoint = new ContainerWaypoint();
    this.waypointTag = [];
    render(this.containerWaypoint, this.tripEvents);
    this.waypointEditForm = null;
  }

  init(waypoints) {
    this.waypoints = waypoints;

    if (this.waypoints.length === 0) {
      render(new Message(), this.tripEvents);
    } else {
      this.#renderPoints(this.waypoints, this.editPointForm);
    }
    // document.querySelector('body').onkeydown = (evt) => {
    //   if (evt.key === 'k') {
    //     this.resetPoints();
    //   }
    // };
  }

  replaceFormToPoint(evt, i, settings) {
    evt.preventDefault();
    console.log('settings=', settings);
    this.waypointTag[i].element.querySelector('.event__title').textContent = settings.type;
    replaceElement(this.waypointTag[i].element, this.editPointForm.element);
    this.#isFormOpen = false;
  }

  #renderPoints(waypoints) {
    this.#isFormOpen = false;
    this.containerWaypoint.element.innerHTML = null;
    this.waypointTag = [];
    for (let i = 0; i < waypoints.length; i++) {
      const waypointTag = new Waypoint(destinations, waypoints[i]);
      this.waypointTag[i] = waypointTag;
      waypointTag.addClickListener(() => this.onWaypointClick(i));
      render(this.waypointTag[i], this.containerWaypoint.element);
    }
  }

  onWaypointClick(i) {
    if (this.#isFormOpen) {
      this.replaceFormToPoint(null, this.openFormIndex);
    }
    this.editPointForm = new EditPoint(this.waypoints[i], data, i);
    this.openFormIndex = i;
    replaceElement(this.editPointForm.element, this.waypointTag[i].element);
    this.editPointForm.addSubmitListener((evt, settings) => { console.log('settingsa=', settings); this.replaceFormToPoint(evt, i, settings) });
    this.editPointForm.addClickListener(() => {
      this.editPointForm.remove();
      this.#isFormOpen = false;
      this.waypointTag[i] = undefined;
    });
    // document.addEventListener('keydown', (evt) => {
    //   if (evt.key === 'Escape') {
    //     replaceElement(this.waypointTag[i].element, this.editPointForm.element);
    //   }
    // });
    this.#isFormOpen = true;
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element, form);
  }
}
