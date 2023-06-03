const getData = (showSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      showSuccess(data);
    });
};

const sendData = (showSuccess, showError, body) => {

  fetch(
    'https://22.javascript.pages.academy/keksobooking',
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
