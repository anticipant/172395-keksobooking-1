'use strict';

const assert = require(`assert`);
const generateEntity = require(`../src/generate-entity`);
const data = generateEntity();
const dataItem = data[0];

describe(`Array`, () => {
  describe(`main property`, () => {
    it(`should be an Array`, () => {
      assert.equal(true, Array.isArray(data));
    });
    it(`should be the object`, () => {
      assert.equal(`object`, typeof dataItem);
    });
    it(`should be contain a property 'offer'`, () => {
      assert.equal(true, dataItem.hasOwnProperty(`offer`));
    });
    it(`should be contain a property 'offer'`, () => {
      assert.equal(true, dataItem.hasOwnProperty(`offer`));
    });
    it(`should be contain a property 'location'`, () => {
      assert.equal(true, dataItem.hasOwnProperty(`location`));
    });
    it(`should be contain a property 'date'`, () => {
      assert.equal(true, dataItem.hasOwnProperty(`date`));
    });
  });
  describe(`sub property`, () => {
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof dataItem.author.avatar);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof dataItem.offer.title);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof dataItem.offer.price);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof dataItem.offer.type);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof dataItem.offer.rooms);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof dataItem.offer.guests);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof dataItem.offer.checkin);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof dataItem.offer.checkout);
    });
    it(`should be the correct type`, () => {
      assert.equal(true, Array.isArray(dataItem.offer.features));
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof dataItem.offer.description);
    });
    it(`should be the correct type`, () => {
      assert.equal(true, Array.isArray(dataItem.offer.photos));
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof dataItem.location.x);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof dataItem.location.y);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof dataItem.date);
    });
  });
  describe(`minimum requirements`, () => {
    it(`avatar path should be contain 'https://robohash.org/'`, () => {
      const index = dataItem.author.avatar.indexOf(`https://robohash.org/`);
      assert.equal(0, index);
    });
    it(`location x should be more/equal than 300 less/equal then 900`, () => {
      assert.equal(true, dataItem.location.x >= 300 && dataItem.location.x <= 900);
    });
    it(`location y should be more/equal than 150 less/equal then 500`, () => {
      assert.equal(true, dataItem.location.y >= 150 && dataItem.location.y <= 500);
    });
    it(`price should be more/equal than 1000 less/equal then 1000000`, () => {
      assert.equal(true, dataItem.offer.price >= 1000 && dataItem.offer.price <= 1000000);
    });
    it(`rooms should be more/equal than 1 less/equal then 5`, () => {
      assert.equal(true, dataItem.offer.rooms >= 1 && dataItem.offer.rooms <= 5);
    });

    it(`guests should be positive`, () => {
      assert.equal(true, dataItem.offer.guests >= 0);
    });
  });
});
