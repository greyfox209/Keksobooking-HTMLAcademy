/* global _:readonly */

import { showError, showSuccess } from './alerts.js';
import { sendData } from './fetch.js';
import { resetMainPinMarker } from './map.js';

// Заголовок обяъвления

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const userTitleInput = document.querySelector('#title');

userTitleInput.addEventListener('input', () => {
  const valueLength = userTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    userTitleInput.setCustomValidity('Введите ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    userTitleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    userTitleInput.setCustomValidity('');
  }

  userTitleInput.reportValidity();
});

// Функция для обработки изменений в поле "Тип жилья"

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');

const handleTypeChange = () => {
  const selectedOption = typeSelect.value;

  switch (selectedOption) {
    case 'bungalow':
      priceInput.min = 0;
      priceInput.placeholder = '0';
      break;
    case 'flat':
      priceInput.min = 1000;
      priceInput.placeholder = '1000';
      break;
    case 'house':
      priceInput.min = 5000;
      priceInput.placeholder = '5000';
      break;
    case 'palace':
      priceInput.min = 10000;
      priceInput.placeholder = '10000';
      break;
    default:
      break;
  }
};

typeSelect.addEventListener('change', handleTypeChange);

const MAX_PRICE_VALUE = 1000000;

const userPriceInput = document.querySelector('#price');

userPriceInput.addEventListener('input', () => {
  const priceValue = parseInt(userPriceInput.value);

  if (priceValue > MAX_PRICE_VALUE) {
    userPriceInput.setCustomValidity('Максимальная цена ' + MAX_PRICE_VALUE);
  } else {
    userPriceInput.setCustomValidity('');
  }

  userPriceInput.reportValidity();
});

handleTypeChange();

// Функция для обработки изменений в полях "Время заезда и выезда"

const synchronizeTimeFields = (timeInSelectId, timeOutSelectId) => {
  const timeInSelect = document.getElementById(timeInSelectId);
  const timeOutSelect = document.getElementById(timeOutSelectId);

  const timeInChangeHandler = function () {
    timeOutSelect.value = this.value;
  };

  const timeOutChangeHandler = function () {
    timeInSelect.value = this.value;
  };

  const boundTimeInChangeHandler = _.bind(timeInChangeHandler, timeInSelect);
  const boundTimeOutChangeHandler = _.bind(timeOutChangeHandler, timeOutSelect);

  timeInSelect.addEventListener('change', boundTimeInChangeHandler);
  timeOutSelect.addEventListener('change', boundTimeOutChangeHandler);
};

synchronizeTimeFields('timein', 'timeout');

// Функция для установки ограничений выбора количества гостей

const synchronizeRoomsAndGuests = () => {
  const roomNumberSelect = document.getElementById('room_number');
  const capacitySelect = document.getElementById('capacity');

  function setCapacityOptions(selectedRoomNumber) {
    // Очищаем предыдущие ограничения выбора количества гостей
    capacitySelect.querySelectorAll('option').forEach((option) => {
      option.disabled = false;
    });

    // Устанавливаем ограничения выбора количества гостей
    if (selectedRoomNumber === 1) {
      capacitySelect.value = '1';
      disableOptions(capacitySelect, ['2', '3', '0']);
    } else if (selectedRoomNumber === 2) {
      disableOptions(capacitySelect, ['3', '0']);
    } else if (selectedRoomNumber === 3) {
      disableOptions(capacitySelect, ['0']);
    } else if (selectedRoomNumber === 100) {
      capacitySelect.value = '0';
      disableOptions(capacitySelect, ['1', '2', '3']);
    }
  }

  // Функция для отключения опций выбора количества гостей
  function disableOptions(selectElement, values) {
    selectElement.querySelectorAll('option').forEach((option) => {
      if (values.includes(option.value)) {
        option.disabled = true;
      }
    });
  }

  // Срабатывает при изменении выбора комнат
  roomNumberSelect.addEventListener('change', () => {
    const selectedRoomNumber = parseInt(roomNumberSelect.value);
    setCapacityOptions(selectedRoomNumber);
  });

  // Инициализация ограничений выбора количества гостей при загрузке страницы
  const initialRoomNumber = parseInt(roomNumberSelect.value);
  setCapacityOptions(initialRoomNumber);
};

synchronizeRoomsAndGuests();

// Неактивное состояние форм

const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('input, select, textarea, button');

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersForm.querySelectorAll('input, select, textarea, button');

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  formElements.forEach((element) => {
    element.disabled = true;
  });

  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.disabled = true;
  });
};

disableForm();

// Отправка формы

const form = document.querySelector('.ad-form');

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showSuccess();
        resetMainPinMarker();
      },
      () => showError(),
      new FormData(evt.target),
    );

    form.reset();
  });
};

// Сброс формы

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  adForm.reset();

  resetMainPinMarker();
});

export { setFormSubmit, activateForm, disableForm, handleTypeChange, synchronizeTimeFields };
