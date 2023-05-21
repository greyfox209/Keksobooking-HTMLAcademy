/* global _:readonly */

import { getRandomInt, generateRandomFloat, getRandomElementArr } from './util.js';

const CARDS_COUNT = 10;

const AUTHORS_COUNT = {
  MIN: 1,
  MAX: 10,
};

let cards = [];

const TITLE_CARD = [
  'Просторное жилье с прекрасным видом на горы',
  'Современная квартира в центре города',
  'Роскошный дом с бассейном и садом',
  'Уютная студия для одиноких путешественников',
  'Идеальное место для семейного отдыха',
  'Чарующая вилла на берегу океана',
  'Апартаменты в историческом районе города',
  'Комфортабельный дом с собственной парковкой',
  'Прекрасный коттедж в окружении природы',
  'Стильная квартира с современным дизайном и отличным расположением',
];

const PRICE_CARD = {
  MIN: 200,
  MAX: 4000,
};

const TYPE_CARD = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'Идеальное место для семейного отдыха',
];

const ROOMS_CARD = {
  MIN: 1,
  MAX: 5,
};

const GUESTS_CARD = {
  MIN: 1,
  MAX: 20,
};

const CHECKIN_CARD = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION_CARD = [
  'Уютный дом с садом, идеальный для семейного отдыха. Расположен в тихом районе, но с легким доступом ко всему городу.',
  'Очаровательная квартира с видом на море. Расположена всего в нескольких шагах от пляжа и оснащена всем необходимым для комфортного проживания.',
  'Стильная и современная вилла с бассейном. Идеальный выбор для отдыха с друзьями или романтического уикенда. Удобное расположение и роскошные удобства.',
  'Просторная квартира в историческом центре города. Отличное сочетание аутентичной атмосферы и современного комфорта. В нескольких минутах ходьбы от всех достопримечательностей.',
  'Уединенная дача в окружении природы. Идеальное место для отдыха от городской суеты. Панорамные виды, тишина и возможность заняться активными видами отдыха.',
  'Апартаменты с панорамным видом на горы. Идеальное место для любителей горных лыж и природы. Современный интерьер и близость к горным трассам.',
  'Уютная коттеджная студия на берегу озера. Прекрасный вариант для романтического уикенда или путешествия на природу. Возможность рыбалки и катания на лодке.',
  'Современный апарт-отель в деловом центре. Отличный выбор для бизнесменов и путешественников. Удобные апартаменты с удобствами и бизнес-услугами.',
  'Очаровательный дом в загородной местности. Идеально подходит для проведения отпуска с семьей или друзьями. Просторный двор с барбекю и открытыми площадками.',
  'Комфортабельная квартира в историческом здании. Уникальная возможность остановиться в историческом центре города и насладиться атмосферой прошлого.',
];

const FEATURES_CARD = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const featuresCount = {
  MIN: 1,
  MAX: 6,
};

const PHOTOS_CARD = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const photosCount = {
  MIN: 1,
  MAX: 3,
};

const locationXRange = {
  MIN: 35.65000,
  MAX: 35.70000,
  decimalPlaces: 5,
};

const locationYRange = {
  MIN: 139.70000,
  MAX: 139.80000,
  decimalPlaces: 5,
};

// Строка адрес с ведущим нулем
const addAuthor = (index) => {
  const leadingZero = index < 10 ? '0' : '';
  const imageUrl = 'img/avatars/user' + leadingZero + index + '.png';

  const author = {
    avatar: imageUrl,
  };

  return author;
};

// Создает массивы случайной длины с неповторяющимися значениями
const addFeatures = () => {
  const features = [];

  const featuresCountAll = _.random(featuresCount.MIN, featuresCount.MAX);

  const uniqueFeatures = _.sampleSize(FEATURES_CARD, featuresCountAll);

  uniqueFeatures.forEach(feature => {
    features.push({ features: feature });
  });

  return features;
};

const addPhotos = () => {
  const photos = [];

  const photosCountAll = _.random(photosCount.MIN, photosCount.MAX);

  const uniquePhotos = _.sampleSize(PHOTOS_CARD, photosCountAll);

  uniquePhotos.forEach(photo => {
    photos.push({ photos: photo });
  });

  return photos;
};

const addOffer = () => {
  for (let i = 0; i < CARDS_COUNT; i++) {
    return {
      title: getRandomElementArr(TITLE_CARD),
      address: 'location.x ' + ' location.y',
      price: getRandomInt(PRICE_CARD.MIN, PRICE_CARD.MAX),
      type: getRandomElementArr(TYPE_CARD),
      rooms: getRandomInt(ROOMS_CARD.MIN, ROOMS_CARD.MAX),
      guests: getRandomInt(GUESTS_CARD.MIN, GUESTS_CARD.MAX),
      checkin: getRandomElementArr(CHECKIN_CARD),
      checkout: getRandomElementArr(CHECKIN_CARD),
      features: addFeatures(),
      description: getRandomElementArr(DESCRIPTION_CARD),
      photos: addPhotos(),
    }
  }
};

const addLocation  = {
  x: generateRandomFloat(locationXRange.MIN, locationXRange.MAX, locationXRange.decimalPlaces),
  y: generateRandomFloat(locationYRange.MIN, locationYRange.MAX, locationYRange.decimalPlaces),
};

const addCards = () => {
  for (let i = 0; i < CARDS_COUNT; i++) {
    cards.push({
      author: addAuthor(getRandomInt(AUTHORS_COUNT.MIN, AUTHORS_COUNT.MAX)),
      offer: addOffer(),
      location: addLocation,
    })
  }
};

addCards()
