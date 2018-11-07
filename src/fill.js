'use strict';

const generateEntity = require(`../test/generator/generate-entity`);
const offerStore = require(`./offers/store`);
const logger = require(`./logger`);
const {getOffersData} = require(`./util`);

const data = getOffersData(generateEntity);

const fillDataBase = async () => {

  try {
    await offerStore.removeOffers();
    await offerStore.addOffers(data);
    console.log(`База данных заполнена тестовыми данными`);
    process.exit(0);
  } catch (err) {
    logger.error(`При заполнении базы данных произошла ошибка`, err);
    process.exit(1);
  }

};

module.exports = {
  name: `fill`,
  description: `заполняет базу данных тестовыми данными`,
  execute() {
    fillDataBase().catch((err) => console.error(err.message));
  }
};
