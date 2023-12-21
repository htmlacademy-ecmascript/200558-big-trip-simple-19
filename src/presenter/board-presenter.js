import { render, replaceElement, RenderPosition } from '../utils.js';
import Waypoint from '../view/waypoint.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/edit-point.js';
import { model, UPDATE_TYPE } from '../model/model.js';
import Empty from '../view/empty.js';
import dayjs from 'dayjs';
import SortingWaypoint from '../view/sorting.js';
import { sort } from '../utils.js';
import { SortType } from '../view/sorting.js';

const getNewPoint = () => ({
  offers: [],
  destination: 1,
  type: 'taxi',
  basePrice: 176,
  dateFrom: dayjs().toString(),
  dateTo: dayjs().toString(),
});

const addBtn = document.querySelector('.trip-main__event-add-btn');
export default class BoardPresenter {
  #isFormOpen = false;
  constructor(tripEvents) {
    this.tripEvents = tripEvents;
    this.containerWaypoint = new ContainerWaypoint();
    render(this.containerWaypoint, this.tripEvents);
    this.waypointTag = [];
    this.waypointEditForm = null;
    this.empty = new Empty();
    this.onAddBtnCLickBind = this.onAddBtnCLick.bind(this);
    this.addOnAddBtnCLick();
    this.sorting = new SortingWaypoint();
    this.sortType = this.sorting.SortType;
    model.addObserver(this.handelModelEvent);
    model.init();
  }

  handelModelEvent = (update) => {
    switch (update) {
      case UPDATE_TYPE.INIT:
        this.init(model.getPoints());
        break;
      case UPDATE_TYPE.REMOVE:
        this.init(model.getPoints());
        break;
      case UPDATE_TYPE.FORM_PENDING:
        this.blockForm();
        break;
    }
  };

  addOnAddBtnCLick() {
    addBtn.addEventListener('click', this.onAddBtnCLickBind, { once: true, passive: true });
  }
  blockForm = () => {
    // this.editPoint?.switchButtonMode(true);

  }
  onAddBtnCLick() {
    const newPoint = getNewPoint();
    this.editPoint = new EditPoint(newPoint, this.waypoints.length - 1);
    render(this.editPoint, this.containerWaypoint.element, RenderPosition.AFTERBEGIN);

    async function onEditPointSubmit(i, update) {
      try {

        let point = await model.addPoint(update);
        this.waypoints[i].id = point.id;
        this.onSortTypeChange(this.sortType);
        this.addOnAddBtnCLick();
      } catch (error) {

      }
    }
    this.editPoint.addSubmitListener(onEditPointSubmit.bind(this));
    this.editPoint.addDeleteListener(this.onEditPointDelete.bind(this));
  }

  async onEditPointDelete(id, i) {
    this.editPoint.remove();
    this.#isFormOpen = false;
    this.waypointTag[i] = undefined;
    this.addOnAddBtnCLick();
  }

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
    this.sorting.addChangeListener((sortType) => this.onSortTypeChange(sortType));

  }

  onSortTypeChange(sortType) {
    if (sortType !== undefined) {
      this.sortType = sortType;
    }
    let pointCopy = [...model.getPoints()];
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
      flag = model.points[i].id !== pointCopy[i].id ? true : flag;
    }
    pointCopy = [...model.points];
    if (flag) {
      this.init(model.points);
    }
  }

  #renderPoints(waypoints) {
    this.#isFormOpen = false;
    this.waypointTag = [];

    for (let i = 0; i < waypoints.length; i++) {
      const waypointTag = new Waypoint(model.getDestinations(), waypoints[i], i);
      this.waypointTag[i] = waypointTag;
      waypointTag.addClickListener(() => {
        this.onWaypointClick(i);
      });
      render(this.waypointTag[i], this.containerWaypoint.element);


    }
  }
  onWaypointClick(i) {
    addBtn.removeEventListener('click', this.onAddBtnCLickBind, { once: true });
    if (!this.#isFormOpen) {
      this.editPoint = new EditPoint(this.waypoints[i], i);
      replaceElement(this.editPoint.element, this.waypointTag[i].element);
      this.editPoint.addSubmitListener(onEditPointSubmit.bind(this));
      async function onEditPointSubmit(i, update) {
        i = (+i);
        try {
          console.log('this.edit=', this.editPoint);
          this.sorting.mode = true;
          this.editPoint?.switchButtonMode(true);
          await model.setPoint(i, update);
          console.log('this.waypointTag[i]=', this.waypointTag[i]);
          this.addOnAddBtnCLick();
          this.waypointTag[i] = new Waypoint(model.getDestinations(), model.getPoint(i), i);
          this.waypointTag[i].addClickListener(() => this.onWaypointClick(i));
          replaceElement(this.waypointTag[i].element, this.editPoint.element);
          this.sorting.mode = false;
          this.#isFormOpen = false;
        } catch (error) {
          console.log('error=', error);
          this.sorting.mode = false;
          this.editPoint.shake(() => {
            this.editPoint?.switchButtonMode(false);
          });
        }

      }
      this.editPoint.addDeleteListener(async (id) => {
        try {
          console.log('lol');
          await model.removePoint(id);
          this.#isFormOpen = false;
          replaceElement(this.waypointTag[i].element, this.editPoint.element);

        } catch (error) {
          console.log('error=', error);

          this.editPoint.shake(() => {
            this.editPoint?.setStastusButtonDelete(false);
          });
        }
      });
    }
    this.#isFormOpen = true;
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index)].element, form);
  }
}
