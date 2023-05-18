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
  if (from >= to) {
    throw new Error('from value must be smaller than to value');
  }

  let randomNum = Math.random() * (to - from) + from;
  let powerOfTen = Math.pow(10, decimalPlaces);
  let roundedNum = Math.round(randomNum * powerOfTen) / powerOfTen;

  return roundedNum;
};

generateRandomFloat(1.1, 1.2, 2);
