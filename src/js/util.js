// Функция копирования данных в буфер обмена
const initCopy = (evtElement, contentElement) => {
  evtElement.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNode(contentElement);

    window.getSelection().addRange(range);
    document.execCommand('copy');

    evtElement.textContent = 'Copied to clipboard';

    window.getSelection().removeAllRanges();
  });
}

export default initCopy;
