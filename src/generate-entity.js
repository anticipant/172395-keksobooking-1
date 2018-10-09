'use strict';

const userData = {
  'avatar': `https://robohash.org/boom`,
  'offerTitle': `Большая уютная квартира`,
  'offerPrice': 100000,
  'offerType': `flat`,
  'offerRooms': 1,
  'offerGuests': 2,
  'offerCheckin': `sssssss`,
  'offerFeatures': [`wi-fi`, `drinks`],
  'offerPhotos': [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg'`],
  'locationX': 500,
  'locationY': 455,
  'date': 100,
};
const itemTemplate = {
  'author': {
    'avatar': `строка, адрес изображения, можно использовать https://robohash.org/{{random-string}}`,
  },

  'offer': {
    'title': `строка, заголовок предложения, одно из фиксированных значений 
              'Большая уютная квартира', 
              'Маленькая неуютная квартира', 
              'Огромный прекрасный дворец', 
              'Маленький ужасный дворец', 
              'Красивый гостевой домик', 
              'Некрасивый негостеприимный домик', 
              'Уютное бунгало далеко от моря', 
              'Неуютное бунгало по колено в воде'. 
              Значения могут повторяться.`,
    'address': `строка, адрес предложения, представляет собой запись вида '{{location.x}}, {{location.y}}'`,
    'price': `число, случайная цена от 1000 до 1000000`,
    'type': `строка с одним из четырёх фиксированных значений: flat, palace, house или bungalo`,
    'rooms': `число, случайное количество комнат от 1 до 5`,
    'guests': `число, случайное количество гостей, которое можно разместить`,
    'checkin': `строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,`,
    'checkout': `строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00`,
    'features': `массив строк случайной длины из неповторяющихся элементов: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',`,
    'description': `пустая строка,`,
    'photos': `массив из строк 
              'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
              'http://o0.github.io/assets/images/tokyo/hotel2.jpg' и 
              'http://o0.github.io/assets/images/tokyo/hotel3.jpg' 
              расположенных в произвольном порядке`,
  },

  'location': {
    'x': `случайное число, координата x метки на карте от 300 до 900,`,
    'y': `случайное число, координата y метки на карте от 150 до 500`,
  },
  'date': `число, дата размещения, представляет собой timestamp в формате UNIX. Представляет собой случайное число в интервале от сейчас минус 7 дней`,
};
console.log(typeof itemTemplate);

const generateEntity = () => {
  return {
    'author': {
      'avatar': userData.avatar
    },
    'offer': {
      'title': userData.offerTitle,
      'price': userData.offerPrice,
      'type': userData.offerType,
      'rooms': userData.offerRooms,
      'guests': userData.offerGuests,
      'checkin': userData.offerCheckin,
      'checkout': userData.offerCheckin,
      'features': [1, 2],
      'description': ``,
      'photos': [``, ``, ``],
    },
    'location': {
      'x': userData.locationX,
      'y': userData.locationY,
    },
    'date': 1,
  };
};
module.exports = generateEntity;
