'use strict';

const db = require(`../database/db`);
const logger = require(`../logger`);

const setupCollection = async () => {
  const dBase = await db;
  return dBase.collection(`offers`);
};

class OffersStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async removeOffers() {
    return (await this.collection).deleteMany({});
  }

  async addOffers(offersData) {
    return (await this.collection).insertMany(offersData);
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async saveOffer(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

module.exports = new OffersStore(setupCollection().
catch((err) => logger.error(`Failed to set up "offers" - collection`, err)));
