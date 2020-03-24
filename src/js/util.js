// Функция копирования данных в буфер обмена
const initCopy = (evtElement, contentElement, callback) => {
  evtElement.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNode(contentElement);

    window.getSelection().addRange(range);
    document.execCommand('copy');

    callback();

    window.getSelection().removeAllRanges();
  });
}

export default initCopy;
