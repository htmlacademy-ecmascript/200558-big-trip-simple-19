import { render, replaceElement, sort, RenderPosition } from '../utils.js';
import Waypoint from '../view/waypoint.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/edit-point.js';
import { data, destinations, mockPoints, model } from '../model/model.js';
import Empty from '../view/empty.js';
import dayjs from 'dayjs';

const getNewPoint = () => {
  return {
    id: '' + Math.random() + Date.now(),
    offers: [],
    destination: 1,
    type: 'taxi',
    basePrice: 176,
    dateFrom: dayjs().toString(),
    dateTo: dayjs().toString(),
  };
}
export default class BoardPresenter {
  #isFormOpen = false;
  constructor(tripEvents) {
    this.tripEvents = tripEvents;
    this.containerWaypoint = new ContainerWaypoint();
    render(this.containerWaypoint, this.tripEvents);
    this.waypointTag = [];
    this.waypointEditForm = null;
    this.replaceFormToPoint = this.replaceFormToPoint.bind(this);
    this.empty = new Empty();
    let tripMainEventAddBtn = document.querySelector('.trip-main__event-add-btn');
    tripMainEventAddBtn.addEventListener('click', () => {
      const newPoint = getNewPoint();
      this.waypoints.push(newPoint);
      this.editPoint = new EditPoint(newPoint, data, this.waypoints.length - 1);
      console.log('RenderPosition=', RenderPosition);
      render(this.editPoint, this.containerWaypoint.element, RenderPosition.AFTEREND);
      this.editPoint.addSubmitListener((i, update) => {
        this.replaceFormToPoint(i, update);
        console.log('this.waypoints=', this.waypoints);

        this.waypoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
        this.init(this.waypoints);

      });
      this.editPoint.addDeleteListener(() => {
        this.editPoint.remove();
        this.#isFormOpen = false;
        const index = mockPoints.findIndex((mockPoint) => mockPoint.id == this.waypointTag[i].mockPoint.id);
        model.remove = index;

        this.waypointTag[i] = undefined;
      });
    });
  }

  init(waypoints) {
    this.waypoints = waypoints;
    if (this.waypoints.length === 0) {
      this.tripEvents.innerHTML = '';
      render(this.empty, this.tripEvents);
    } else {
      let tripEventsItems = this.tripEvents.querySelectorAll('.trip-events__item');
      for (const tripEventsItem of tripEventsItems) {
        tripEventsItem.remove();
      }
      this.#renderPoints(this.waypoints, this.editPoint);
    }
  }

  replaceFormToPoint(i, update) {
    i = (+i) - 1;
    mockPoints[i].type = update.type;
    mockPoints[i].dateFrom = update.dateFrom;
    mockPoints[i].dateTo = update.dateTo;
    this.waypointTag[i] = new Waypoint(destinations, mockPoints[i], i);
    this.waypointTag[i].addClickListener(() => this.onWaypointClick(i));
    replaceElement(this.waypointTag[i].element, this.editPoint.element);
    this.#isFormOpen = false;
    console.log('mockPoints=', mockPoints);

  }

  #renderPoints(waypoints) {
    this.#isFormOpen = false;
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
    this.editPoint.addSubmitListener(this.replaceFormToPoint);
    this.editPoint.addDeleteListener(() => {
      this.editPoint.remove();
      this.#isFormOpen = false;
      const index = mockPoints.findIndex((mockPoint) => mockPoint.id == this.waypointTag[i].mockPoint.id);
      model.remove = index;

      this.waypointTag[i] = undefined;
    });
    this.#isFormOpen = true;
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element, form);
  }
}
