import { initializeMap } from './map.js';
// import { showError, showSuccess } from './alerts.js';
import { request } from './fetch.js';

const fetchData = () => {
  request(onFetchSuccess, onFetchError, 'GET');
};

const onFetchSuccess = (data) => {
  // проверяем, что получены все необходимые данные
  if (data.length >= 10) {
    const tenCards = data.slice(0, 10); // выбираем первые 10 объектов данных
    initializeMap(tenCards); // передаем только 10 объектов данных в initializeMap
  } else {
    console.error('Недостаточно данных');
  }
};

const onFetchError = () => {
  console.error('Ошибка при загрузке данных');
};

fetchData();
