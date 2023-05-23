import { cards } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardsList = document.querySelector('#map-canvas');

/*
const createCard = ({ title, address, price }) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = price + '₽/ночь';

  return cardElement;
};

const createCards = () => {
  let cardsListFragment = document.createDocumentFragment();

  cards.forEach((card) => {
    cardsListFragment.appendChild(createCard(card));
  });

  cardsList.appendChild(cardsListFragment);
};

export { createCards };
*/

const cardsElementsList = cards;

const createCards = () => {
  const cardsListFragment = document.createDocumentFragment();

  cardsElementsList.forEach(({offer}) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
    cardsListFragment.appendChild(cardElement);
  });

  cardsList.appendChild(cardsListFragment);
};

export { createCards };
