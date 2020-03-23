const CODE_SUCCESS = 200;

// Функция получения данных
const toRequest = (onSuccess, path) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    if (xhr.status === CODE_SUCCESS) {
      onSuccess(xhr.response);
    }
  });

  xhr.open('GET', path);
  xhr.send();
}

export default toRequest;
