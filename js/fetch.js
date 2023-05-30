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
