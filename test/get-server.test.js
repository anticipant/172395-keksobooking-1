'use strict';

const assert = require(`assert`);
const express = require(`express`);
const request = require(`supertest`);


const offersStoreMock = require(`./mock/offers-store-mock`);
const imagesStoreMock = require(`./mock/images-store-mock`);
const offersRoute = require(`../src/offers/route/index`)(offersStoreMock, imagesStoreMock);

const app = express();

app.use(`/api/offers`, offersRoute);


describe(`GET /api/offers`, () => {
  it(`get all offers`, async () => {

    const response = await request(app).
    get(`/api/offers`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.data.length, 20);
  });

  it(`get offers with "limit"`, async () => {

    const response = await request(app).
    get(`/api/offers?limit=1`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.data.length, 1);
  });

  it(`get offers with "skip=11"`, async () => {

    const response = await request(app).
    get(`/api/offers?skip=11`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.data.length, 9);
  });

  it(`get offers with "skip=15" and "limit=2"`, async () => {

    const response = await request(app).
    get(`/api/offers?skip=15&limit=2`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.data.length, 2);
  });
  it(`get offers with "skip=15" and "limit=10"`, async () => {

    const response = await request(app).
    get(`/api/offers?skip=15&limit=10`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, `application/json; charset=utf-8`);

    const offers = response.body;
    assert.equal(offers.data.length, 5);
  });

  it(`get data with invalid params`, async () => {

    return await request(app).
    get(`/api/offers/ddd`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`В запросе не указана дата`).
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

  it(`get offer  with date "1540101609198"`, async () => {
    const response = await request(app).
    get(`/api/offers/1540101609198`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.strictEqual(offer.date, 1540101609198);
  });

});

