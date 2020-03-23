import toRequest from './backend.js';
import { btnCalculateElement, btnCopyElement, activatePage, disablePage, renderData } from './page';
import initCopy from './util.js';

const Path = {
  LOCALITY: 'data/locality.json',
  POINT: 'data/point.json'
};

// Обработчик загрузки данных по начальным точкам
const onLocalityLoad = (response) => {
  renderData(response, pointData);
  activatePage();
}

let pointData;

// Обрбаотчик загрузки данных по конечным точкам
const onPointLoad = (response) => {
  pointData = response;
  activatePage();

  btnCalculateElement.addEventListener('click', () => {
    disablePage();
    toRequest(onLocalityLoad, Path.LOCALITY);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  toRequest(onPointLoad, Path.POINT);
  initCopy(btnCopyElement, document.querySelector('.content'));
});
