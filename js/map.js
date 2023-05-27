/* global L:readonly */

import { activateForm, disableForm } from './form.js';

const initializeMap = () => {
  try {
    const map = L.map('map-canvas').setView({ lat: 35.6895, lng: 139.6917 }, 12);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);

    activateForm();
  } catch (error) {
    disableForm();
  }
};

export { initializeMap };
