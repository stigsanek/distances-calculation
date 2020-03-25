import toRequest from './backend.js';
import { initMap } from './map.js';
import { activatePage, disablePage, changeBtnStyle, renderError, renderData } from './page.js';
import initCopy from './util.js';

const Path = {
  LOCALITY: 'data/locality.json',
  POINT: 'data/point.json'
};

// Обработчик загрузки данных начальных точек
const onLocalityLoad = (response) => {
  const callback = renderData(response, pointData);
  initMap(callback, renderError);
}

let pointData;

// Обрбаотчик загрузки данных конечных точек
const onPointLoad = (response) => {
  pointData = response;
  activatePage();

  document.querySelector('.page-header__btn--yellow').addEventListener('click', () => {
    disablePage();
    toRequest(onLocalityLoad, Path.LOCALITY);
  });
}

window.addEventListener('load', () => {
  const callback = toRequest(onPointLoad, Path.POINT);
  initMap(callback, renderError);
  initCopy(
    document.querySelector('.page-header__btn--blue'),
    document.querySelector('.content'),
    changeBtnStyle
  );
});
