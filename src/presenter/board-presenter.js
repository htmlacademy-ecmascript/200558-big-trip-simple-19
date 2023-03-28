import {render,replaceElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import FiltersWapoint from '../view/filters.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import {data,destinations,mockPoints} from '../model/model.js';
import message from '../view/message.js';
class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
    this.tripEvents = document.querySelector('.trip-events');
    console.log('this.tripEvents=',this.tripEvents);
    this.containerWaypoint = new ContainerWaypoint();
    this.waypointTag = [];
  }

  init() {
    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents);
    render(this.containerWaypoint,this.tripEvents);
    const amountPoints = mockPoints.length;
    this.#renderTask(amountPoints);
  }

  #renderTask(amountPoints) {
    for(let i = 0; i < amountPoints; i++) {
      this.waypointTag[i] = new Waypoint(destinations,mockPoints[i]);
      this.waypointTag[i].element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        const editPointForm = new EditPoint(mockPoints[i],data);
        replaceElement(editPointForm.element,this.waypointTag[i].element);
        editPointForm.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
          evt.preventDefault();
          replaceElement(this.waypointTag[i].element, editPointForm.element);
        });
        editPointForm.element.querySelector('.event__reset-btn').addEventListener('click', () => {
          editPointForm.element.remove();
          amountPoints--;
          if(amountPoints === 0) {
            render(new message(), this.tripEvents);
          }
        });
        document.onkeydown = (evt) => {
          if(evt.key === 'Escape') {
            replaceElement(this.waypointTag[i].element, editPointForm.element);
          }
        };
      });
      render(this.waypointTag[i], this.containerWaypoint.element);
    }
  }
}
export default BoardPresenter;
