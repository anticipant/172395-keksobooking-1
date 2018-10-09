'use strict';

const assert = require(`assert`);
const generateEntity = require(`../src/generate-entity`);

describe(`Array`, () => {
  describe(`main property`, () => {
    it(`should be the object`, () => {
      assert.equal(`object`, typeof generateEntity());
    });
    it(`should be contain a property 'offer'`, () => {
      assert.equal(true, generateEntity().hasOwnProperty(`offer`));
    });
    it(`should be contain a property 'offer'`, () => {
      assert.equal(true, generateEntity().hasOwnProperty(`offer`));
    });
    it(`should be contain a property 'location'`, () => {
      assert.equal(true, generateEntity().hasOwnProperty(`location`));
    });
    it(`should be contain a property 'date'`, () => {
      assert.equal(true, generateEntity().hasOwnProperty(`date`));
    });
  });
  describe(`sub property`, () => {
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof generateEntity().author.avatar);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof generateEntity().offer.title);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof generateEntity().offer.price);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof generateEntity().offer.type);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof generateEntity().offer.rooms);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof generateEntity().offer.guests);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof generateEntity().offer.checkin);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof generateEntity().offer.checkout);
    });
    it(`should be the correct type`, () => {
      assert.equal(true, Array.isArray(generateEntity().offer.features));
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof generateEntity().offer.description);
    });
    it(`should be the correct type`, () => {
      assert.equal(true, Array.isArray(generateEntity().offer.photos));
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof generateEntity().location.x);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof generateEntity().location.y);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof generateEntity().date);
    });
  });
  describe(`minimum requirements`, () => {
    it(`avatar path should be contain 'https://robohash.org/'`, () => {
      const index = generateEntity().author.avatar.indexOf(`https://robohash.org/`);
      assert.equal(0, index);
    });
    it(`location x should be more/equal than 300 less/equal then 900`, () => {
      assert.equal(true, generateEntity().location.x >= 300 && generateEntity().location.x <= 900);
    });
    it(`location y should be more/equal than 150 less/equal then 500`, () => {
      assert.equal(true, generateEntity().location.y >= 150 && generateEntity().location.y <= 500);
    });
    it(`price should be more/equal than 1000 less/equal then 1000000`, () => {
      assert.equal(true, generateEntity().offer.price >= 1000 && generateEntity().offer.price <= 1000000);
    });
    it(`rooms should be more/equal than 1 less/equal then 5`, () => {
      assert.equal(true, generateEntity().offer.rooms >= 1 && generateEntity().offer.rooms <= 5);
    });

    it(`guests should be positive`, () => {
      assert.equal(true, generateEntity().offer.guests >= 0);
    });
  });
});
