'use strict';

const assert = require(`assert`);
const generateEntity = require(`../src/generate-entity`);
console.log(`here`);

describe(`Array`, () => {
  describe(`generate entity`, () => {
    it(`should be the object`, () => {
      assert.equal(`object`, typeof generateEntity());
    });
    it(`should be contain a property 'author'`, () => {
      assert.equal(true, generateEntity().hasOwnProperty(`author`));
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
});
