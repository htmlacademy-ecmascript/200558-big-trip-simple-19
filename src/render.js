const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function createElement(template) {
  const newElement = document.createElement('div');
  //console.log("template="+template);
  newElement.innerHTML = template;
  //console.log('newElement.firstElementChild=',newElement.firstElementChild);
  return newElement.firstElementChild;
}

export function render(component, container, place = RenderPosition.BEFOREEND) {
  //console.log('container=',container);
  container.insertAdjacentElement(place, component.getElement());
}
