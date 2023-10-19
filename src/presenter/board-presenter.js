import { render, replaceElement, RenderPosition } from '../utils.js';
import Waypoint from '../view/waypoint.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/edit-point.js';
import { data, destinations, model } from '../model/model.js';
import Empty from '../view/empty.js';
import dayjs from 'dayjs';
import SortingWaypoint from '../view/sorting.js';
import { sort } from '../utils.js';
import { SortType } from '../view/sorting.js';

const getNewPoint = () => ({
  id: `${Math.random()}${Date.now()}`,
  offers: [],
  destination: 1,
  type: 'taxi',
  basePrice: 176,
  dateFrom: dayjs().toString(),
  dateTo: dayjs().toString(),
});
const tripMainEventAddBtn = document.querySelector('.trip-main__event-add-btn');
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
    tripMainEventAddBtn.addEventListener('click', () => {
      const newPoint = getNewPoint();
      this.waypoints.push(newPoint);
      this.editPoint = new EditPoint(newPoint, data, this.waypoints.length - 1);
      render(this.editPoint, this.containerWaypoint.element, RenderPosition.AFTERBEGIN);
      this.editPoint.addSubmitListener((i, update) => {
        this.replaceFormToPoint(i, update);
        this.waypoints.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
        this.init(this.waypoints);

      });
      this.editPoint.addDeleteListener(this.onEditPointDelete);
    });
    this.sorting = new SortingWaypoint();
  }
  onEditPointDelete(i) {
    this.editPoint.remove();
    this.#isFormOpen = false;
    model.removePoint(this.waypointTag[i].mockPoint.id);

    this.waypointTag[i] = undefined;
  };

  init(waypoints) {
    this.waypoints = waypoints;
    this.tripEvents.innerHTML = '';
    if (this.waypoints.length === 0) {
      render(this.empty, this.tripEvents);
    } else {
      render(this.containerWaypoint, this.tripEvents);
      this.containerWaypoint.element.innerHTML = '';
      this.renderSort();
      this.#renderPoints(this.waypoints);
    }
  }

  renderSort() {

    render(this.sorting, this.tripEvents, 'afterbegin');
    this.sorting.onChange = (sortType) => this.onSortTypeChange(sortType);

  }

  onSortTypeChange(sortType) {
    let pointCopy = [...model.points];
    switch (sortType) {
      case SortType.PRICE:
        sort.min(model.points, 'basePrice');
        break;

      case SortType.DAY:
        model.points.sort((a, b) => new Date(a.dateFrom).getDate() - new Date(b.dateFrom).getDate());
        break;

      case SortType.TIME:
        for (const el of model.points) {
          const date = new Date(el.dateFrom);
          el.startTime = date.getHours() * 60 + date.getMinutes();
        }
        sort.min(model.points, 'startTime');
        break;
    }
    let flag = false;
    for (let i in model.points) {
      i = +i;
      if (model.points[i].id !== pointCopy[i].id) {
        flag = true;
      }
    }
    pointCopy = [...model.points];
    if (flag) {
      this.init(model.points);
      // this.onchange('changeAll', mockPoints);
    }
  }

  replaceFormToPoint(i, update) {
    i = (+i) - 1;
    console.log('update=', update);
    model.setPoint(i, update);
    this.waypointTag[i] = new Waypoint(destinations, model.getPoint(i), i);
    this.waypointTag[i].addClickListener(() => this.onWaypointClick(i));
    replaceElement(this.waypointTag[i].element, this.editPoint.element);
    this.#isFormOpen = false;

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
      const point = model.points[eventEdit.dataset.index];
      this.replaceFormToPoint(eventEdit.dataset.index, point);
    }
    this.editPoint = new EditPoint(this.waypoints[i], data, i);
    this.openFormIndex = i;
    replaceElement(this.editPoint.element, this.waypointTag[i].element);
    this.editPoint.addSubmitListener(this.replaceFormToPoint);
    this.editPoint.addDeleteListener(() => {
      this.editPoint.remove();
      this.#isFormOpen = false;
      model.removePoint(this.waypointTag[i].mockPoint.id);

      this.waypointTag[i] = undefined;
    });
    this.#isFormOpen = true;
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element, form);
  }
}
