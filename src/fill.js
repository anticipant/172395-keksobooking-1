'use strict';

const generateEntity = require(`../test/generator/generate-entity`);
const offerStore = require(`./offers/store`);

const DATA_QUANTITY = 20;

const getOffersDataJSON = () => {
  const offers = [];

  for (let i = 0; i < DATA_QUANTITY; i++) {
    offers.push(generateEntity());
  }

  return offers;
};

module.exports = {
  name: `fill`,
  description: `заполняет базу данных тестовыми данными`,
  execute() {
    const data = getOffersDataJSON();

    offerStore.removeOffers().then(() => {
      offerStore.addOffers(data).then(() => {
        console.log(`База данных заполнена тестовыми данными`);
        process.exit(0);
      });
    });
  }
};
