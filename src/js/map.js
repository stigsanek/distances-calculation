// Функция расчета расстояния
const calculateDistance = (coords, parentElement, element) => {
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      coords.start,
      coords.end
    ]
  }, {
    boundsAutoApply: true
  });

  multiRoute.model.events.add('requestsuccess', () => {
    const activeRoute = multiRoute.getActiveRoute();
    element.querySelector('.element__distance').textContent = activeRoute.properties.get('distance').text;
    parentElement.append(element);
  });
};

// Функция инициализации карты
const initMap = (callbackSucces, callbackError) => {
  try {
    ymaps.ready(callbackSucces);
  } catch (error) {
    callbackError(error);
  }
};

export { calculateDistance, initMap };
