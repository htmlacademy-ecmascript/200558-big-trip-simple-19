function markup(where,element,className) {
    where = document.querySelector(where);
    element = document.createElement(element);
    element.className= className;
    where.appendChild(element);
    return element;
}
export default markup;