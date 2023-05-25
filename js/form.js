/* global _:readonly */

const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');

// Функция для обработки изменений в поле "Тип жилья"

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
}

typeSelect.addEventListener('change', handleTypeChange);

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

export { handleTypeChange, synchronizeTimeFields };
