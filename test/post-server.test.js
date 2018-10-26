

'use strict';

const assert = require(`assert`);
const request = require(`supertest`);

const app = require(`../src/server`).app;

describe(`POST /api/offers`, () => {

  it(`send offer as json`, async () => {

    const sent = {
      date: `1234567899994`
    };

    const response = await request(app).
    post(`/api/offers`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);


    const offer = response.body;
    assert.deepEqual(offer, sent);
  });

  it(`send offer with invalid params `, async () => {

    return await request(app).
    post(`/api/offers/ddd`).
    send().
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(404).
    expect(`Page was not found`);

  });

  it(`send offer without date`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    send({}).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field date "date" is required!`
    ]);
  });

  it(`send offer as multipart/form-data`, async () => {

    const offerDate = 1541308109198;

    const response = await request(app).
    post(`/api/offers`).
    field(`date`, offerDate).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, {date: offerDate});
  });

});
