'use strict';

const assert = require(`assert`);
const generateEntity = require(`./generator/generate-entity`);
const data = generateEntity();

describe(`Array`, () => {
  describe(`main property`, () => {
    it(`should be the object`, () => {
      assert.equal(`object`, typeof data);
    });
    it(`should be contain a property 'offer'`, () => {
      assert.equal(true, data.hasOwnProperty(`offer`));
    });
    it(`should be contain a property 'offer'`, () => {
      assert.equal(true, data.hasOwnProperty(`offer`));
    });
    it(`should be contain a property 'location'`, () => {
      assert.equal(true, data.hasOwnProperty(`location`));
    });
    it(`should be contain a property 'date'`, () => {
      assert.equal(true, data.hasOwnProperty(`date`));
    });
  });
  describe(`sub property`, () => {
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof data.author.avatar);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof data.offer.title);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof data.offer.price);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof data.offer.type);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof data.offer.rooms);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof data.offer.guests);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof data.offer.checkin);
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof data.offer.checkout);
    });
    it(`should be the correct type`, () => {
      assert.equal(true, Array.isArray(data.offer.features));
    });
    it(`should be the correct type`, () => {
      assert.equal(`string`, typeof data.offer.description);
    });
    it(`should be the correct type`, () => {
      assert.equal(true, Array.isArray(data.offer.photos));
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof data.location.x);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof data.location.y);
    });
    it(`should be the correct type`, () => {
      assert.equal(`number`, typeof data.date);
    });
  });
  describe(`minimum requirements`, () => {
    it(`avatar path should be contain 'https://robohash.org/'`, () => {
      const index = data.author.avatar.indexOf(`https://robohash.org/`);
      assert.equal(0, index);
    });
    it(`location x should be more/equal than 300 less/equal then 900`, () => {
      assert.equal(true, data.location.x >= 300 && data.location.x <= 900);
    });
    it(`location y should be more/equal than 150 less/equal then 500`, () => {
      assert.equal(true, data.location.y >= 150 && data.location.y <= 500);
    });
    it(`price should be more/equal than 1000 less/equal then 1000000`, () => {
      assert.equal(true, data.offer.price >= 1000 && data.offer.price <= 1000000);
    });
    it(`rooms should be more/equal than 1 less/equal then 5`, () => {
      assert.equal(true, data.offer.rooms >= 1 && data.offer.rooms <= 5);
    });

    it(`guests should be positive`, () => {
      assert.equal(true, data.offer.guests >= 0);
    });
  });
});
