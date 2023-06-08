import {render,replaceElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import FiltersWapoint from '../view/filters.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import {data,destinations,mockPoints} from '../model/model.js';
import Message from '../view/message.js';
class MockPresenter {
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
    let i = 0;
    document.querySelector('body').onkeydown = (evt) => {
      console.log('key:',evt.key);
      if(evt.key=='k') {
        console.log('ketsss');
        this.resetPoints();
      }
    } 
  }

  #renderTask(amountPoints) {
    let waypointTag = [];
    for(let i = 0; i < amountPoints; i++) {
      this.waypointTag[i] = new Waypoint(destinations,mockPoints[i]);
      var flag = false;
      waypointTag[i] = this.waypointTag[i];
      this.waypointTag[i].addClickListener(function callBack() {
        console.log('this=',this);
        if(typeof editPointForm === 'undefined') {
          var editPointForm=[];
        }
        console.log('flag=',flag);
        if(flag===true) {
          let form = document.querySelector('.event--edit');
         replaceElement(waypointTag[Number(form.dataset.index) - 1].element,form);
        }
          editPointForm[i] = new EditPoint(mockPoints[i],data,i)
          editPointForm[i].element.style.order = getComputedStyle(waypointTag[i].element, null).order;
          replaceElement(editPointForm[i].element,waypointTag[i].element);
          editPointForm[i].addSubmitListener((evt) => {
            evt.preventDefault();
            replaceElement(waypointTag[i].element, editPointForm[i].element);
            flag = false;
          });
          editPointForm[i].addClickListener(() => {
            editPointForm[i].remove();
            amountPoints--;
            flag = false;
            if(amountPoints === 0) render(new Message(), this.tripEvents);
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
          let form = document.querySelector('.event--edit');
          console.log('form=',form);
         replaceElement(this.waypointTag[Number(form.dataset.index) - 1].element,form);
  }
}
export default MockPresenter;
