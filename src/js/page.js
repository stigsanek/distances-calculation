import { calculateDistance } from './map.js';

const bodyElement = document.querySelector('.page-body');
const overlayElement = bodyElement.querySelector('.overlay');
const btnCalculateElement = bodyElement.querySelector('.page-header__btn--yellow');
const btnCopyElement = document.querySelector('.page-header__btn--blue');

// Функция активации страницы
const activatePage = () => {
  overlayElement.classList.remove('overlay--show');
  btnCalculateElement.classList.add('page-header__btn--show');
}

// Функция блокировки страницы
const disablePage = () => {
  overlayElement.classList.add('overlay--show');
  btnCopyElement.textContent = 'Copy to clipboard';
}

const tableBodyElement = bodyElement.querySelector('.content__body');
const templateElement = bodyElement.querySelector('#table-content').content.querySelector('.element');
const fragmentElement = document.createDocumentFragment();

const elementList = [];

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
        elementList.push(newElement);
      }
    }
  }

  tableBodyElement.append(fragmentElement);
  bodyElement.classList.add('page-body--active');
}

// Функция удаления элементов
const removeData = () => {
  elementList.forEach((element) => {
    element.remove();
  });
}

export { btnCalculateElement, btnCopyElement, tableBodyElement, activatePage, disablePage, renderData, removeData };
