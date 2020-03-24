import { calculateDistance } from './map.js';

const bodyElement = document.querySelector('.page-body');
const overlayElement = bodyElement.querySelector('.overlay');
const btnCopyElement = bodyElement.querySelector('.page-header__btn--blue');

// Функция активации страницы
const activatePage = () => {
  overlayElement.classList.remove('overlay--show');
}

// Функция блокировки страницы
const disablePage = () => {
  overlayElement.classList.add('overlay--show');
}

// Функция изменения стилей кнопки копирования
const changeBtnStyle = () => {
  btnCopyElement.classList.remove('page-header__btn--blue');
  btnCopyElement.classList.add('page-header__btn--green');
  btnCopyElement.textContent = 'Copied to clipboard';
}

const tableBodyElement = bodyElement.querySelector('.content__body');
const templateElement = bodyElement.querySelector('#table-content').content.querySelector('.element');
const fragmentElement = document.createDocumentFragment();

// Функция рендеринга данных
const renderData = (loaclityData, pointData) => {
  for (let i = 0; i < loaclityData.length; i++) {
    const currentLocality = loaclityData[i];

    for (let j = 0; j < pointData.length; j++) {
      const currentPoint = pointData[j];

      if (currentLocality.code === currentPoint.targetCode) {
        const newElement = templateElement.cloneNode(true);

        newElement.querySelector('.element__id').textContent = currentLocality.id;
        newElement.querySelector('.element__loclity').textContent = currentLocality.locality;
        newElement.querySelector('.element__loc-x').textContent = currentLocality.x;
        newElement.querySelector('.element__loc-y').textContent = currentLocality.y;
        newElement.querySelector('.element__settlement').textContent = currentLocality.settlement;
        newElement.querySelector('.element__district').textContent = currentLocality.district;
        newElement.querySelector('.element__code').textContent = currentLocality.code;
        newElement.querySelector('.element__target-locality').textContent = currentPoint.locality;
        newElement.querySelector('.element__target-code').textContent = currentPoint.code;
        newElement.querySelector('.element__target-loc-x').textContent = currentPoint.x;
        newElement.querySelector('.element__target-loc-y').textContent = currentPoint.y;

        const className = `element-${currentLocality.id}-${i}-${j}`;
        const distanceElement = newElement.querySelector('.element__distance');
        distanceElement.classList.add(className);

        const coordsStart = [currentLocality.y, currentLocality.x];
        const coordsEnd = [currentPoint.y, currentPoint.x];

        calculateDistance(coordsStart, coordsEnd, className);
        fragmentElement.append(newElement);
      }
    }
  }

  tableBodyElement.append(fragmentElement);
  bodyElement.classList.add('page-body--active');
  activatePage();
}

export { btnCopyElement, tableBodyElement, activatePage, disablePage, changeBtnStyle, renderData };
