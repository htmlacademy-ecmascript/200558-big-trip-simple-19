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
      case UPDATE_TYPE.MINOR:
        this.init(model.getPoints());
        break;
      case UPDATE_TYPE.MAJOR:
        this.init(model.getPoints());
        break;
    }
  };

  addOnAddBtnCLick() {
    addBtn.addEventListener('click', this.onAddBtnCLickBind, { once: true, passive: true });
  }

  onAddBtnCLick() {
    const newPoint = getNewPoint();
    this.editPoint = new EditPoint(newPoint, this.waypoints.length - 1);
    render(this.editPoint, this.containerWaypoint.element, RenderPosition.AFTERBEGIN);

    async function onEditPointSubmit(Ш, state) {
      try {
        console.log('this.sortType=', this.sortType);

        this.sorting.setMode(true);
        await model.setPointUnshift(state);
        this.onSortTypeChange(this.sortType);
        this.sorting.setMode(false);
        this.addOnAddBtnCLick();
      } catch (error) {
        this.sorting.setMode(false);
        this.editPoint.shake(() => {
          this.editPoint?.setDeleteButtonStastus(false);
        });
      }
    }
    this.editPoint.addSubmitListener(onEditPointSubmit.bind(this));
    this.editPoint.addDeleteListener(this.onEditPointDelete.bind(this));
  }

  async onEditPointDelete(id, i) {
    this.editPoint.remove();
    this.#isFormOpen = false;
    this.waypointTag.splice(i, 1);
    this.init();
    this.addOnAddBtnCLick();
  }

  init(waypoints) {
    console.log('waypoints=', waypoints);

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
      this.#isFormOpen = true;
    } else {
      const index = this.editPoint.getIndex();

      replaceElement(this.waypointTag[index].element, this.editPoint.element);
    }
    this.editPoint = new EditPoint(this.waypoints[i], i);
    this.editPoint.addSubmitListener(onEditPointSubmit.bind(this));
    const previousUpdate = JSON.stringify(this.editPoint._state);
    async function onEditPointSubmit(index, update) {
      index = +index;
      if (JSON.stringify(update) !== previousUpdate) {
        try {
          this.sorting.setMode(true);
          this.editPoint?.setSubmitButtonStatus(true);
          await model.setPoint(index, update);
          this.addOnAddBtnCLick();
          this.sorting.setMode(false);
          this.#isFormOpen = false;
        } catch (error) {
          this.editPoint.shake(() => {
            this.editPoint?.setSubmitButtonStatus(false);
          });
        }
      } else {
        this.#isFormOpen = false;
        this.waypointTag[index] = new Waypoint(model.getDestinations(), model.getPoint(index), index);
        this.waypointTag[index].addClickListener(() => this.onWaypointClick(index));
        replaceElement(this.waypointTag[i].element, this.editPoint.element);
      }
    }
    this.editPoint.addDeleteListener(async (id) => {
      try {
        this.sorting.setMode(true);
        this.editPoint.setDeleteButtonStastus(true);
        await model.removePoint(id);
        this.addOnAddBtnCLick();
        this.#isFormOpen = false;

        // replaceElement(this.waypointTag[i].element, this.editPoint.element);
        this.sorting.setMode(false);
      } catch (error) {
        this.editPoint.shake(() => {
          this.editPoint?.setDeleteButtonStastus(false);
        });
        this.sorting.setMode(false);
      }
    });
    replaceElement(this.editPoint.element, this.waypointTag[i].element);
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index)].element, form);
  }
}
