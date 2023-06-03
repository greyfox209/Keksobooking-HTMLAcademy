import { checkEsc } from './util.js';

const errorTemplate = document.querySelector('#error').content;
const errorFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();

const removeAllerts = () => {
  const errorAlert = document.querySelector('.error');
  const successAlert = document.querySelector('.success');

  if (errorAlert) {
    errorAlert.remove();
  }

  if (successAlert) {
    successAlert.remove();
  }
};

const showError = () => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__message').innerHTML = 'Ошибка размещения<br>объявления';

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.textContent = 'Попробовать снова';

  errorElement.querySelector('.error').addEventListener('click', (evt) => {
    const element = evt.target;
    if (element.classList.contains('error')) {
      removeAllerts();
    }
  });

  errorButton.addEventListener('click', () => {
    removeAllerts();
  });

  document.addEventListener('keydown', (evt) => {
    if (checkEsc(evt)) {
      removeAllerts();
    }
  });

  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);
};

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);

  successElement.querySelector('.success__message').innerHTML = 'Ваше объявление<br>успешно размещено!';

  successElement.querySelector('.success').addEventListener('click', (evt) => {
    const element = evt.target;
    if (element.classList.contains('success')) {
      removeAllerts();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (checkEsc(evt)) {
      removeAllerts();
    }
  });

  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);
};

document.addEventListener('click', () => {
  removeAllerts();
});

export { showError, showSuccess };
