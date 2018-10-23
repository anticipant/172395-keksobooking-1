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
    assert.equal(offers.length, 20);
  });

  it(`get offers with limit`, async () => {

    const response = await request(app).
    get(`/api/offers?limit=1`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.length, 1);
  });

  it(`get data with invalid params`, async () => {

    return await request(app).
    get(`/api/offers/ddd`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`В запросе не указана дата`).
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
  it(`get offer that is missing`, async () => {
    return await request(app).
    get(`/api/offers/1234567891234`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Объявления не найдено!`).
    expect(`Content-Type`, /html/);
  });

  it(`get offer with some date and check date length`, async () => {
    const response = await request(app).
    get(`/api/offers/`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = response.body;
    assert.equal(`${offers[0].date}`.length, 13);
  });

});

