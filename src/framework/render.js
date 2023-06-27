import AbstractView from './view/abstract-view.js';

/** @enum {string} Перечисление возможных позиций для отрисовки */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Функция для создания элемента на основе разметки
 * @param {string} template Разметка в виде строки
 * @returns {HTMLElement} Созданный элемент
 */
export function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

/**
 * Функция для отрисовки элемента
 * @param {AbstractView} component Компонент, который должен был отрисован
 * @param {HTMLElement} container Элемент в котором будет отрисован компонент
 * @param {string} place Позиция компонента относительно контейнера. По умолчанию - `beforeend`
 */
export function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can render only components');
  }

  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }
  container.insertAdjacentElement(place, component.element);
}

/**
 * Функция для замены одного компонента на другой
 * @param {AbstractView} newComponent Компонент, который нужно показать
 * @param {AbstractView} oldComponent Компонент, который нужно скрыть
 */
/**
 * Функция для удаления компонента
 * @param {AbstractView} component Компонент, который нужно удалить
 */
