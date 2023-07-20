export const sort = {
    min: (object, property) => object.sort((a, b) => a[property] - b[property]),
};
const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
};

export function createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
}
export function render(component, container, place = RenderPosition.BEFOREEND) {
    container.insertAdjacentElement(place, component.element);
}
export function replaceElement(newElement, oldElement) {
    oldElement.parentNode.replaceChild(newElement, oldElement);
}