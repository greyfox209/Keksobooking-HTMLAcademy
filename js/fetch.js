/*
const Urls = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  POST: 'https://22.javascript.pages.academy/keksobooking',
};

const request = (onSuccess, onError, method, data) => {
  fetch(Urls[method],
    {
      method: method,
      body: data,
    })
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response)
    })
    .catch(() => {
      onError()
    })
};

export { request };
*/

const getData = (showSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      showSuccess(data);
    });
};

const sendData = (showSuccess, showError, body) => {

  fetch(
    'https://22.javascript.pages.academy/keksobooking404',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccess();
      } else {
        showError();
      }
    })
    .catch(() => {
      showError();
    });
};

export {getData, sendData};
