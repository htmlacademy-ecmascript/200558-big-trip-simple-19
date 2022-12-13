function WaypointTemplate() {
  return   '<label class="event__label  event__type-output" for="event-destination-1">Flight</label><input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1"><datalist id="destination-list-1"><option value="Amsterdam"></option><option value="Geneva"></option><option value="Chamonix"></option></datalist>';
}
class Waypoint {
  getTemplate() {
    return WaypointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
