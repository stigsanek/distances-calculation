import toRequest from './backend.js';
import { initMap } from './map.js';
import { btnCalculateElement, btnCopyElement, activatePage, disablePage, changeBtnStyle, renderData } from './page';
import initCopy from './util.js';

const Path = {
  LOCALITY: 'data/locality.json',
  POINT: 'data/point.json'
};

// Обработчик загрузки данных начальных точек
const onLocalityLoad = (response) => {
  const callback = renderData(response, pointData);
  initMap(callback);
}

let pointData;

// Обрбаотчик загрузки данных конечных точек
const onPointLoad = (response) => {
  pointData = response;
  activatePage();

  btnCalculateElement.addEventListener('click', () => {
    disablePage();
    toRequest(onLocalityLoad, Path.LOCALITY);
  });
}

window.addEventListener('load', () => {
  const callback = toRequest(onPointLoad, Path.POINT);
  initMap(callback);
  initCopy(btnCopyElement, document.querySelector('.content'), changeBtnStyle);
});
