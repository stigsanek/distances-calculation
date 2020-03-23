import toRequest from './backend.js';
import { btnElement, activatePage, disablePage, renderData } from './page';

let pointData;

// Функция получения данных по населенным пунктам, от которых будет производится расчет
const getLocality = (response) => {
  renderData(response, pointData);
  activatePage();
}

// Функция получения точек, до которых будет производится расчет
const getPoints = (response) => {
  pointData = response;
  activatePage();

  btnElement.addEventListener('click', () => {
    disablePage();
    toRequest(getLocality, 'data/locality.json');
  });
}

toRequest(getPoints, 'data/point.json');
