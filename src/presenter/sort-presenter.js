import MockPresenter from './mock-presenter.js';
class sortPresenter {
  constructor(boardContainer) {
    this.boardContainer = boardContainer;
    console.log('constructor boardContainer=',this.boardContainer);
  }

  init() {
    let mockPresenter = new MockPresenter({boardContainer:this.boardContainer});
    mockPresenter.init();
  }
  set change(callBack) {
    let sortInput = document.querySelectorAll('.trip-sort__input')
    for(let el of sortInput) {
      el.oninput = () => {
        console.log("el.value=",el.value);
        callBack(el);
      }
      console.log('sort=',sortInput);
    }
  }
}
export default sortPresenter;