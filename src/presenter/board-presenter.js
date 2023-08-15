import { render, replaceElement } from '../utils.js';
import Waypoint from '../view/waypoint.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import { data, destinations, mockPoints } from '../model/model.js';
import Message from '../view/message.js';

export default class BoardPresenter {
  #isFormOpen = false;
  constructor(tripEvents) {
    this.tripEvents = tripEvents;
    this.containerWaypoint = new ContainerWaypoint();
    this.waypointTag = [];
    render(this.containerWaypoint, this.tripEvents);
    this.waypointEditForm = null;
    console.log('editPoint.settings=',EditPoint.settings);
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

  replaceFormToPoint(evt, i) {
    i = (+i)-1;
    console.log('i=',i);
    console.log('waypointsTag['+i+'].element=',this.waypointTag[i].element);
    evt.preventDefault();
    let destination = destinations.find(el => el.id == mockPoints[i].destination);
    let input = document.querySelector('.event__input--destination');
    destination.name = input.value;
    this.waypointTag[i].element.querySelector('.event__title').textContent = mockPoints[i].type + ' ' + destination.name;
    this.waypointTag[i].element.querySelector('.event__type-icon').src= 'img/icons/'+ mockPoints[i].type +'.png';
    replaceElement(this.waypointTag[i].element, document.querySelector('.event--edit').parentNode);
    this.#isFormOpen = false;
    console.log('mockPoints=',mockPoints);
    console.log('dedestinations=',destinations);
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

  onWaypointClick(i, settings) {
    if (this.#isFormOpen) {
      let eventEdit = document.querySelector('.event--edit');
      let inputs = eventEdit.querySelectorAll('.event__type-input');
      let mockPoint = mockPoints.find(el =>  el.id == eventEdit.dataset.index );
      mockPoint.type = EditPoint.settings.type;
      this.replaceFormToPoint({ preventDefault: () => { } }, eventEdit.dataset.index)
    }
    this.editPointForm = new EditPoint(this.waypoints[i], data, i);
    this.openFormIndex = i;
    replaceElement(this.editPointForm.element, this.waypointTag[i].element);
    this.editPointForm.addSubmitListener(this.replaceFormToPoint.bind(this));
    this.editPointForm.addDeleteListener((el) => {
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
