import {render,replaceElement} from '../render.js';
import FiltersWapoint from '../view/filters.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import {data,destinations,mockPoints} from '../model/model.js';
import Message from '../view/message.js';
class AppPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.containerWaypoint = new ContainerWaypoint();
    this.waypointTag = [];
  }

  init() {

    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents);
    render(this.containerWaypoint,this.tripEvents);
    this.#renderTask();
    document.querySelector('body').onkeydown = (evt) => {
      if(evt.key === 'k') {
        this.resetPoints();
      }
    };
  }

  #renderTask() {
    const waypointTag = [];
    let flag = false;
    for(let i = 0; i < mockPoints.length; i++) {
      for(const el of mockPoints) {
        el.days = new Date(el.dateFrom).getDate();
      }
      mockPoints.sort((a,b) => a.days - b.days);
      this.waypointTag[i] = new Waypoint(destinations,mockPoints[i]);
      waypointTag[i] = this.waypointTag[i];
      let amountPoints = waypointTag.length;
      const editPointForm = [];
      waypointTag[i].addClickListener(() => {
        if(flag) {
          const form = document.querySelector('.event--edit');
          replaceElement(waypointTag[Number(form.dataset.index) - 1].element,form);
        }
        editPointForm[i] = new EditPoint(mockPoints[i],data,i);
        replaceElement(editPointForm[i].element,waypointTag[i].element);
        editPointForm[i].addSubmitListener((evt) => {
          evt.preventDefault();
          replaceElement(waypointTag[i].element, editPointForm[i].element);
          flag = false;
        });
        editPointForm[i].addClickListener(() => {
          editPointForm[i].remove();
          flag = false;
          waypointTag[i] = undefined;
          amountPoints = 0;
          for(const i2 in waypointTag) {
            if(waypointTag[i2] !== undefined) {
              amountPoints++;
            }
          }
          if(amountPoints === 0) {
            render(new Message(), this.tripEvents);
          }
        });
        document.onkeydown = (evt) => {
          if(evt.key === 'Escape') {
            replaceElement(this.waypointTag[i].element, editPointForm.element);
          }
        };
        flag = true;
      });
      render(this.waypointTag[i], this.containerWaypoint.element);
    }
  }

  resetPoints() {
    const form = document.querySelector('.event--edit');
    replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element,form);
  }
}
export default AppPresenter;
