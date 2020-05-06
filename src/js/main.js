import toRequest from './backend.js';
import { initMap } from './map.js';
import { activatePage, disablePage, showData, changeBtnStyle, renderError, renderData } from './page.js';
import initCopy from './util.js';

const LIMIT = 100; // Лимит последовательных запросов к API
const TIME = 5000; // Время задержки
const Path = {
  LOCALITY: 'data/locality.json',
  POINT: 'data/point.json'
};

// Функция запуска расчетов
const runCalculate = (data) => {
  const callback = renderData(data, pointData);
  initMap(callback, renderError);
}

let start = 0;
let end = LIMIT;

// Функция запуска интервальных расчетов с ограничением запросов к API
const runIntervalCalculate = (data) => {
  runCalculate(data);
  start += LIMIT;
  end += LIMIT;
}

// Обработчик загрузки данных начальных точек
const onLocalityLoad = (response) => {
  const sourceData = response;
  const lengthData = sourceData.length;

  if (lengthData > LIMIT) {
    const partsData = sourceData.slice(start, end);
    runIntervalCalculate(partsData);

    // Функция отмены таймера
    const cancelInterval = () => {
      clearInterval(timerId);
      showData();
    }

    // Таймер интервальных запросов
    let timerId = setInterval(() => {
      const newData = sourceData.slice(start, end);
      runIntervalCalculate(newData);

      const diff = end - LIMIT;

      if (diff === lengthData || diff > lengthData) {
        cancelInterval();
      }
    }, TIME);
  } else {
    runCalculate(sourceData);
    showData();
  }
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
