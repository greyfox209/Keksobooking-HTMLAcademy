/* global _:readonly */

//Случайное число

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(1, 10);


// Генерация врменных координат

const generateRandomFloat = (from, to, decimalPlaces) => {
  if (to <= from) {
    throw new Error('Invalid range');
  }

  const randomFloat = _.random(from, to, true);
  const multiplier = Math.pow(10, decimalPlaces);

  return Math.round(randomFloat * multiplier) / multiplier;
};

generateRandomFloat(1.1, 1.2, 10);

// Случайный элемент массива
const getRandomElementArr = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

export { getRandomInt, generateRandomFloat, getRandomElementArr };
