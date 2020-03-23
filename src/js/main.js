import toRequest from './backend.js';
import { initMap } from './map.js';
import { btnCalculateElement, btnCopyElement, activatePage, disablePage, renderData, removeData } from './page';
import initCopy from './util.js';

const Path = {
  LOCALITY: 'data/locality.json',
  POINT: 'data/point.json'
};

// Обработчик загрузки данных по начальным точкам
const onLocalityLoad = (response) => {
  const callback = renderData(response, pointData);
  initMap(callback);
  activatePage();
}

let pointData;

// Обрбаотчик загрузки данных по конечным точкам
const onPointLoad = (response) => {
  pointData = response;
  activatePage();

  btnCalculateElement.addEventListener('click', () => {
    disablePage();
    removeData();
    toRequest(onLocalityLoad, Path.LOCALITY);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  toRequest(onPointLoad, Path.POINT);
  initCopy(btnCopyElement, document.querySelector('.content'));
});
