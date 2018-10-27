'use strict';

const assert = require(`assert`);
const request = require(`supertest`);

const app = require(`../src/server`).app;

describe(`POST /api/offers`, () => {

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
    const offerExample = {
      "name": `Pavel`,
      "title": `Маленькая квартирка рядом с парком`,
      "address": `570, 472`,
      "description": `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
      "price": 30000,
      "type": `flat`,
      "rooms": 1,
      "guests": 1,
      "checkin": `9:00`,
      "checkout": `7:00`,
      "features": [`elevator`, `conditioner`],
      "location": {
        "x": 570,
        "y": 472
      }
    };
    const response = await request(app).
    post(`/api/offers`).
    field(`date`, offerDate).
    field(`name`, offerExample.name).
    field(`title`, offerExample.title).
    field(`address`, offerExample.address).
    field(`description`, offerExample.description).
    field(`price`, offerExample.price).
    field(`type`, offerExample.type).
    field(`rooms`, offerExample.rooms).
    field(`guests`, offerExample.guests).
    field(`checkin`, offerExample.checkin).
    field(`checkout`, offerExample.checkout).
    field(`features`, offerExample.features).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, offerExample);
  });

});
