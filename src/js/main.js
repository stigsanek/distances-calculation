import toRequest from './backend.js';
import { btnElement, activatePage, disablePage } from './page';

let catalogPoints;

// Функция получения точек, до которых будет производится расчет
const getPoints = (response) => {
  catalogPoints = response;
  activatePage();

  btnElement.addEventListener('click', () => {
    disablePage();
  });
}

toRequest(getPoints, 'data/point.json');
