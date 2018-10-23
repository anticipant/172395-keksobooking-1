'use strict';

const assert = require(`assert`);
const request = require(`supertest`);

const app = require(`../src/server`).app;

describe(`GET /api/offers`, () => {
  it(`get all offers`, async () => {

    const response = await request(app).
    get(`/api/offers`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.length, 10);
  });

  it(`get data with invalid params`, async () => {

    return await request(app).
    get(`/api/offers/ddd`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`Bad Request`).
    expect(`Content-Type`, /html/);

  });
  it(`get data from unknown resource`, async () => {

    return await request(app).
    get(`/api/blablabla`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Page was not found`).
    expect(`Content-Type`, /html/);

  });

});

describe(`GET /api/offers/:date`, () => {
  it(`get wizard with name "Мерлин"`, async () => {
    const response = await request(app).
    get(`/api/offers/`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const wizard = response.body;
    assert.strictEqual(wizard.name, `Мерлин`);
  });

});

