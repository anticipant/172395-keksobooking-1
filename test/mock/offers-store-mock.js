'use strict';

const Cursor = require(`./cursor-mock`);
const generateEntity = require(`../generator/generate-entity`);
const {getOffersData} = require(`../../src/util`);

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getOffer(date) {

    return this.data.find((it) => {
      return it.date === +date;
    });
  }

  async getAllOffers() {
    return new Cursor(this.data);
  }

  async saveOffer() {
    return {
      insertedId: 42
    };
  }

}

module.exports = new OfferStoreMock(getOffersData(generateEntity));
