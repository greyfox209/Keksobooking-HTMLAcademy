import { checkEsc } from './util.js';

const errorTemplate = document.querySelector('#error').content;
const errorFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();

const removeEscapeAlert = (evt, className) => {
  if (checkEsc(evt)) {
    removeAllert(className);
  }
};

const onErrorEscKeydown = (evt) => {
  removeEscapeAlert(evt, '.error')
  document.removeEventListener('keydown', onErrorEscKeydown);
};

const onSuccessEscKeydown = (evt) => {
  removeEscapeAlert(evt, '.success')
  document.removeEventListener('keydown', onSuccessEscKeydown);
};

const removeAllert = (type) => {
  document.querySelector(type).remove();
};

const showError = (text) => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__message').textContent = text;

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.textContent = 'Попробовать снова';

  errorElement.querySelector('.error').addEventListener('click', (evt) => {
    let element = evt.target.classList;
    if (!element.contains('error')) {
      document.removeEventListener('keydown', onErrorEscKeydown);
      removeAllert('.error')
    }
  });

  errorButton.addEventListener('click', () => {
    removeAllert('.error');
  });

  document.addEventListener('keydown', onErrorEscKeydown);

  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);
};

const showSuccess = (text) => {
  const successElement = successTemplate.cloneNode(true);

  successElement.querySelector('.success__message').textContent = text;

  successElement.querySelector('.success').addEventListener('click', (evt) => {
    let element = evt.target.classList;
    if (!element.contains('success')) {
      document.removeEventListener('keydown', onSuccessEscKeydown);
      removeAllert('.success')
    }
  });

  document.addEventListener('keydown', onSuccessEscKeydown);

  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);
};

export { showError, showSuccess };


/*
const errorTemplate = document.querySelector('#error').content;
const errorFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();

const removeEscapeAlert = (evt, className) => {
  if (checkEsc(evt)) {
    removeAllert(className);
  }
};

const onErrorEscKeydown = (evt) => {
  removeEscapeAlert(evt, '.error');
  document.removeEventListener('keydown', onErrorEscKeydown);
};

const onSuccessEscKeydown = (evt) => {
  removeEscapeAlert(evt, '.success');
  document.removeEventListener('keydown', onSuccessEscKeydown);
};

const removeAllert = (type) => {
  document.querySelector(type).remove();
};

const showError = (text, button) => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__message').textContent = text;
  errorElement.querySelector('.error__button').textContent = button;

  const errorButton = errorElement.querySelector('.error__button');

  errorElement.querySelector('.error').addEventListener('click', (evt) => {
    let element = evt.target.classList;
    if (!element.contains('error')) {
      document.removeEventListener('keydown', onErrorEscKeydown);
      removeAllert('.error');
    }
  });

  errorButton.addEventListener('click', () => {
    removeAllert('.error');
  });

  document.addEventListener('keydown', onErrorEscKeydown);

  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);
};

const showSuccess = (text) => {
  const successElement = successTemplate.cloneNode(true);

  successElement.querySelector('.success__message').textContent = text;

  successElement.querySelector('.success').addEventListener('click', (evt) => {
    let element = evt.target.classList;
    if (!element.contains('success')) {
      document.removeEventListener('keydown', onSuccessEscKeydown);
      removeAllert('.success');
    }
  });

  document.addEventListener('keydown', onSuccessEscKeydown);

  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);
};

export { showError, showSuccess };
*/
