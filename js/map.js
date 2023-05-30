/* global L:readonly */

import { activateForm, disableForm } from './form.js';
import { createCard } from './popup.js';

const initializeMap = (data) => {
  try {
    const map = L.map('map-canvas').setView({ lat: 35.68950, lng: 139.69171 }, 12);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);

    const mainPinIcon = L.icon({
      iconUrl: 'img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    const mainPinMarker = L.marker(
      {
        lat: 35.68950,
        lng: 139.69171,
      },
      {
        draggable: true,
        icon: mainPinIcon,
      },
    );

    mainPinMarker.addTo(map);

    const addressInput = document.querySelector('#address');
    const initialLatLng = mainPinMarker.getLatLng();
    const formattedInitialLatLng = formatCoordinates(initialLatLng.lat, initialLatLng.lng);
    addressInput.value = formattedInitialLatLng;

    mainPinMarker.on('mousemove', (evt) => {
      const latLng = evt.target.getLatLng();
      const formattedLatLng = formatCoordinates(latLng.lat, latLng.lng);
      addressInput.value = formattedLatLng;
    });

    data.forEach((point) => {
      const {lat, lng} = point.location;

      const icon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );

      marker
        .addTo(map)
        .bindPopup(
          createCard(point),
          {
            keepInView: true,
          },
        );
    });

    activateForm();
  } catch (error) {
    disableForm();
  }
};

const formatCoordinates = (lat, lng) => {
  const roundedLat = lat.toFixed(5);
  const roundedLng = lng.toFixed(5);
  return `${roundedLat}, ${roundedLng}`;
};

export { initializeMap };
