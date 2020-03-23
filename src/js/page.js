const overlayElement = document.querySelector('.overlay');
const btnElement = document.querySelector('.page-header__btn');

// Функция активации страницы
const activatePage = () => {
  overlayElement.classList.remove('overlay--show');
  btnElement.classList.add('page-header__btn--show');
}

// Функция блокировки страницы
const disablePage = () => {
  overlayElement.classList.add('overlay--show');
  btnElement.classList.remove('page-header__btn--show');
}

export { btnElement, activatePage, disablePage };
