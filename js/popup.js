/*
import { cards } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// const cardsList = document.querySelector('#map-canvas');

const cardsElementsList = cards;

const typeLabels = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const createFeatureList = (features, parentElement) => {
  parentElement.innerHTML = '';

  features.forEach(feature => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + feature);
    parentElement.appendChild(featureItem);
  });
};

const createPhotosList = (photos, container) => {
  container.innerHTML = '';

  photos.forEach(photoSrc => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photoSrc;
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.alt = 'Фотография жилья';
    container.appendChild(photoElement);
  });
};

const createCards = () => {
  const cardsListFragment = document.createDocumentFragment();

  cardsElementsList.forEach(({ offer, author }) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
    const typeLabel = typeLabels[offer.type];
    cardElement.querySelector('.popup__type').textContent = typeLabel;
    cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    const featuresList = cardElement.querySelector('.popup__features');
    createFeatureList(offer.features, featuresList);
    cardElement.querySelector('.popup__description').textContent = offer.description;
    const photosList = cardElement.querySelector('.popup__photos');
    createPhotosList(offer.photos, photosList);
    cardElement.querySelector('.popup__avatar').src = author.avatar;

    cardsListFragment.appendChild(cardElement);
  });

//  return cardsListFragment;
};

export { createCards };
*/

// import { cards } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typeLabels = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const createFeatureList = (features, parentElement) => {
  parentElement.innerHTML = '';

  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + feature);
    parentElement.appendChild(featureItem);
  });
};

const createPhotosList = (photos, container) => {
  container.innerHTML = '';

  photos.forEach((photoSrc) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photoSrc;
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.alt = 'Фотография жилья';
    container.appendChild(photoElement);
  });
};

const createCardElement = ({ offer, author }) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  const typeLabel = typeLabels[offer.type];
  cardElement.querySelector('.popup__type').textContent = typeLabel;
  cardElement.querySelector('.popup__text--capacity').textContent =
    offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  const featuresList = cardElement.querySelector('.popup__features');
  createFeatureList(offer.features, featuresList);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  const photosList = cardElement.querySelector('.popup__photos');
  createPhotosList(offer.photos, photosList);
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

/*
const createCards = () => {
  const cardsElementsList = cards;
  const cardsListFragment = document.createDocumentFragment();

  cardsElementsList.forEach((cardData) => {
    const cardElement = createCardElement(cardData);
    cardsListFragment.appendChild(cardElement);
  });

  return cardsListFragment;
};
*/

export { createCardElement };

