/* global L:readonly */

import { activateForm, disableForm } from './form.js';
import { createCard } from './popup.js';
import { filterMarkersByType, filterMarkersByPrice, filterMarkersByRooms, filterMarkersByGuests, filterMarkersByFeatures } from './filter.js';

let mainPinMarker;
let data; // Переменная для хранения данных о маркерах
let map; // Переменная для хранения карты

const addressInput = document.querySelector('#address');

const initializeMap = (markers) => {
  data = markers; // Сохранение данных о маркерах

  try {
    map = L.map('map-canvas').setView({ lat: 35.68950, lng: 139.69171 }, 9);

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

    const mainPinLatLng = { lat: 35.68950, lng: 139.69171 };

    mainPinMarker = L.marker(mainPinLatLng, {
      draggable: true,
      icon: mainPinIcon,
    });

    mainPinMarker.addTo(map);

    const initialLatLng = mainPinMarker.getLatLng();
    const formattedInitialLatLng = formatCoordinates(initialLatLng.lat, initialLatLng.lng);
    addressInput.value = formattedInitialLatLng;

    mainPinMarker.on('mousemove', (evt) => {
      const latLng = evt.target.getLatLng();
      const formattedLatLng = formatCoordinates(latLng.lat, latLng.lng);
      addressInput.value = formattedLatLng;
    });

    mainPinMarker.on('touchstart', function(e) {
      if (e.originalEvent.touches.length === 1) {
        e.originalEvent.preventDefault();
      }
    });

    const housingTypeSelect = document.querySelector('#housing-type');
    const housingPriceSelect = document.querySelector('#housing-price');
    const housingRoomsSelect = document.querySelector('#housing-rooms');
    const housingGuestsSelect = document.querySelector('#housing-guests');
    const housingFeaturesFieldset = document.querySelector('#housing-features');

    const filterMarkers = () => {
      const selectedType = housingTypeSelect.value;
      const selectedPrice = housingPriceSelect.value;
      const selectedRooms = housingRoomsSelect.value;
      const selectedGuests = housingGuestsSelect.value;
      const selectedFeatures = Array.from(housingFeaturesFieldset.querySelectorAll('input:checked'))
        .map((input) => input.value);

      let filteredMarkers = filterMarkersByType(data, selectedType);
      filteredMarkers = filterMarkersByPrice(filteredMarkers, selectedPrice);
      filteredMarkers = filterMarkersByRooms(filteredMarkers, selectedRooms);
      filteredMarkers = filterMarkersByGuests(filteredMarkers, selectedGuests);
      filteredMarkers = filterMarkersByFeatures(filteredMarkers, selectedFeatures);

      updateMarkers(filteredMarkers);
    };

    housingTypeSelect.addEventListener('change', filterMarkers);
    housingPriceSelect.addEventListener('change', filterMarkers);
    housingRoomsSelect.addEventListener('change', filterMarkers);
    housingGuestsSelect.addEventListener('change', filterMarkers);
    housingFeaturesFieldset.addEventListener('change', filterMarkers);

    filterMarkers(); // Вызов функции фильтрации при первичной инициализации

    activateForm();
  } catch (error) {
    disableForm();
    throw new Error('Не удалось инициализировать карту');
  }
};

const resetMainPinMarker = () => {
  if (mainPinMarker) {
    const initialLatLng = { lat: 35.68950, lng: 139.69171 };
    mainPinMarker.setLatLng(initialLatLng);
  }
};

const formatCoordinates = (lat, lng) => {
  const roundedLat = lat.toFixed(5);
  const roundedLng = lng.toFixed(5);
  return `${roundedLat}, ${roundedLng}`;
};

const updateMarkers = (markers) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinLatLng = { lat: 35.68950, lng: 139.69171 };

  mainPinMarker = L.marker(mainPinLatLng, {
    draggable: true,
    icon: mainPinIcon,
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on('mousemove', (evt) => {
    const latLng = evt.target.getLatLng();
    const formattedLatLng = formatCoordinates(latLng.lat, latLng.lng);
    addressInput.value = formattedLatLng;
  });

  const limitedMarkers = markers.slice(0, 10);

  limitedMarkers.forEach((point) => {
    const { lat, lng } = point.location;

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

    marker.addTo(map).bindPopup(createCard(point), {
      keepInView: true,
    });
  });
};

export { initializeMap, resetMainPinMarker };
