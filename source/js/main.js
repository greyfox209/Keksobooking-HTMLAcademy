import { initializeMap } from './map.js';
import { getData } from './fetch.js';
import { setFormSubmit } from './form.js';

getData((data) => {
  initializeMap(data);
});

setFormSubmit();
