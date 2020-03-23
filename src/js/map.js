import { tableBodyElement } from './page.js';

// Функция расчета расстояния
const calculateDistance = (coordsStart, coordsdEnd, className) => {
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      coordsStart,
      coordsdEnd
    ]
  }, {
    boundsAutoApply: true
  });

  multiRoute.model.events.add('requestsuccess', () => {
    const activeRoute = multiRoute.getActiveRoute();
    tableBodyElement.querySelector(`.${className}`).textContent = activeRoute.properties.get('distance').text;
  });
}

// Функция инициализации карты
const initMap = (callback) => {
  ymaps.ready(callback);
}

export { calculateDistance, initMap };
