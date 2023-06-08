import {render,replaceElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import FiltersWapoint from '../view/filters.js';
import Waypoint from '../view/waypoint.js';
import SortingWaypoint from '../view/sorting.js';
import ContainerWaypoint from '../view/waypoint-container.js';
import EditPoint from '../view/editPoint.js';
import {data,destinations,mockPoints} from '../model/model.js';
import Message from '../view/message.js';
import MockPresenter from './mock-presenter.js';
import SortPresenter from './sort-presenter.js';
class BoardPresenter {
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    let sortPresenter = new SortPresenter(this.boardContainer);
    sortPresenter.init();
    sortPresenter.change = (el) => {
      console.log('el=',el);
      var mockPointsSort = [];
      for(let i in mockPoints) {
        mockPointsSort[i] = mockPoints[i];
      }
      let tripEventsList = document.querySelector('.trip-events__list');
      function changeOrder(order) { 
        for(let i in mockPointsSort) {
          let tripEventsItem = document.querySelectorAll('.trip-events__item');
          tripEventsItem = Array.from(tripEventsItem);
          let index = tripEventsItem.findIndex((el) => {
              return el.dataset.id == mockPointsSort[i].id;
          });
          let tripEventsList = document.querySelector('.trip-events__list');
          tripEventsItem[index].remove();
          tripEventsList.appendChild(tripEventsItem[index]);
          }
      }
      switch(el.value) {
        case 'sort-price':
        for(let i = 0; i < mockPointsSort.length - 1; i++) {
          console.log('i=',i);
          // console.log('mockPointsSort['+i+'+1]=',mockPointsSort[i + 1]);
          if(mockPointsSort[i].basePrice > mockPointsSort[i + 1].basePrice) {
            let last = mockPointsSort[i + 1];
            mockPointsSort[i + 1] = mockPointsSort[i];
            mockPointsSort[i] = last;
            i = -1;
          }
        }
        break;

        case 'sort-day':
        for(let i = 0; i < mockPointsSort.length - 1; i++) {
          let days = new Date(mockPointsSort[i].dateFrom).getDate();
          console.log('i=',i);
          let daysNext = new Date(mockPointsSort[i + 1].dateFrom).getDate();
          if(days > daysNext) {
            let mockPointsSortFirst = mockPointsSort[i];
            mockPointsSort[i] = mockPointsSort[i + 1];
            mockPointsSort[i + 1] = mockPointsSortFirst;
            i = -1;
          }
        }
        let li = document.querySelectorAll('.trip-events__item');
        break;

        case 'sort-time':
        for(let i = 0;  i < mockPointsSort.length - 1; i++) {
          let date = new Date(mockPointsSort[i].dateFrom);
          let timeFirst = date.getHours() * 60 + date.getMinutes(); 
          date = new Date(mockPointsSort[i + 1].dateFrom);
          let timeNext = date.getHours() * 60 + date.getMinutes();
          if(timeFirst > timeNext) {
            let mockPointsSortFirst = mockPointsSort[i];
            mockPointsSort[i] = mockPointsSort[i + 1];
            mockPointsSort[i + 1] = mockPointsSortFirst;
            i = -1;
          }  
        }
        break;
      }
      var flag = false;
      console.log('mockPoints=',mockPoints);
      console.log('mockPointsSort=',mockPointsSort);
      for(let i in mockPoints) {
        i=+i;
        // console.log('flag i=',i);
        // console.log('mockPoints['+i+']=',mockPoints[i]);
        // console.log('mockPointsSort['+i+']=',mockPointsSort[i]);
        if(mockPoints[i].id !== mockPointsSort[i].id) flag = true;
        // console.log('flags=',flag);
      }
      for(let i in mockPoints) mockPoints[i] = mockPointsSort[i];
      console.log('do');
      console.log('mockPoints=',mockPoints);
      console.log('mockPointsSort=',mockPointsSort);
      console.log('flag=',flag);
      if(flag === true) {
        changeOrder(mockPointsSort);
      }
    };
  }; 
}
export default BoardPresenter;
