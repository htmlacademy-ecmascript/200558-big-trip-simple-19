import {render} from '../render.js';
import FiltersWapoint from '../view/filters.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import editPoint from '../view/editPoint.js';
import {data,destinations,mockPoints} from '../model/model.js';
import message from '../view/message.js';
var waypointTag = [];
class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
    this.tripEvents = document.querySelector('.trip-events');
    this.containerWaypoint = new ContainerWaypoint();
  }

  init() {
    render(new FiltersWapoint(), this.boardContainer);
    render(new SortingWaypoint(), this.tripEvents);
    render(this.containerWaypoint,this.tripEvents);
    let amountPoints = mockPoints.length;
    for(let i = 0; i < amountPoints; i++) {
      waypointTag[i] = new Waypoint(destinations,mockPoints[i]);
      render(waypointTag[i], this.containerWaypoint.getElement());
      waypointTag[i] = waypointTag[i].getElement();
    }
    this.#renderTask(waypointTag,amountPoints);
  }
  #renderTask(waypointTag,amountPoints) {
    console.log('oll');
    let eventRollupBtn = document.querySelectorAll('.event__rollup-btn');
    eventRollupBtn = Array.from(eventRollupBtn);
    console.log('eventRollupBtn.length=',eventRollupBtn.length);
    for(let i in eventRollupBtn) {
      let onEventRollupBtnClick = [];
      onEventRollupBtnClick[i] = function(evt) {
        let currentIndex = i;
        let tripEventsItem = evt.target;
        while(tripEventsItem.className!='trip-events__item') {
          tripEventsItem = tripEventsItem.parentNode;

        }
        let eventTitle = tripEventsItem.querySelector('.event__title');
        let title = eventTitle.textContent;
        let eventStartTime = tripEventsItem.querySelector('.event__start-time');
        let eventEndTime = tripEventsItem.querySelector('.event__end-time');
        let time = {
          start: eventStartTime.textContent,
          end: eventEndTime.textContent
        };
        console.log('time=',time);
        let options = {
          time: {
            start: time.start,
            end: time.end
          },
          title: title
        };           
        let editPointСopy = new editPoint(options);
        let editPointTag = [];
        editPointTag[i] = editPointСopy.getElement();
        waypointTag[i].parentNode.replaceChild(editPointTag[i],waypointTag[i]); 
        let buttonSave = [];
        buttonSave[i] = editPointTag[i].querySelector('.event__save-btn');
        let buttonReset = [];
        buttonReset[i] = editPointTag[i].querySelector('.event__reset-btn');
        // console.log('buttonSave['+i+']=',buttonSave[i]);
        let eventEdit = document.querySelector('.event--edit');
        eventEdit.onsubmit = function(evt) {
          evt.preventDefault();
          editPointTag[i].parentNode.replaceChild(waypointTag[i],editPointTag[i]);
          eventRollupBtn[i].onclick = onEventRollupBtnClick[i]; 
        };
        console.log('editPointTag[i]=',editPointTag[i]);
        document.onkeydown = function(evt) {
          console.log('evt.key=',evt.key);
          if(evt.key=='Escape') {
            console.log('esk');
            editPointTag[i].parentNode.replaceChild(waypointTag[i],editPointTag[i]);
            eventRollupBtn[i].onclick = onEventRollupBtnClick[i];
          }
        }
        buttonReset[i].onclick = function (evt) {
          evt.preventDefault();
          console.log("evts=",evt);
          let parentTag = evt.target;
          while(parentTag.className!='trip-events__item') {
            parentTag = parentTag.parentNode;
          }
          parentTag.remove();
          amountPoints--;
          if(amountPoints == 0) {
            console.log('sos');
            render(new message(),this.tripEvents);  
          }
        };
      }
      eventRollupBtn[i].onclick = onEventRollupBtnClick[i]; 
      document.onkeydown = function(evt) {
        if(evt.key=='d') {
          for(let element of waypointTag) {
            element.remove();
          }
          amountPoints = 0;
          console.log('amountPoints=',amountPoints);
        } 
      }
    }
  }
}
export default BoardPresenter;
