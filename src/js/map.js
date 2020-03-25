// Функция расчета расстояния
const calculateDistance = (coordsStart, coordsdEnd, parentElement, element) => {
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
    element.querySelector('.element__distance').textContent = activeRoute.properties.get('distance').text;
    parentElement.append(element);
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
