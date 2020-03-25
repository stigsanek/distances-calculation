// Функция расчета расстояния
const calculateDistance = (coordsStart, coordsdEnd, element, className) => {
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
    element.querySelector(`.${className}`).textContent = activeRoute.properties.get('distance').text;
  });
}

// Функция инициализации карты
const initMap = (callbackSucces, callbackError) => {
  try {
    ymaps.ready(callbackSucces);
  } catch (error) {
    callbackError(error);
  }
}

export { calculateDistance, initMap };
