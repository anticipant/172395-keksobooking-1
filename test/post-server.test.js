'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const app = require(`../src/server`).app;

const namesArray = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];
const offerDateExample = 1541308109198;
const offerExample = {
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

  it(`send offer as multipart/form-data`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    field(`name`, `Dima`).
    field(`date`, offerDateExample).
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
    assert.deepEqual(offer, {
      date: offerDateExample,
      offer: offerExample,
      author: {
        name: `Dima`
      }
    });
  });


  it(`send offer with avatar as multipart/form-data`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    field(`name`, `Dima`).
    field(`date`, offerDateExample).
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
    attach(`avatar`, `test/fixtures/keks.png`).
    attach(`preview`, `test/fixtures/keks.png`).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, {
      date: offerDateExample,
      offer: offerExample,
      author: {
        name: `Dima`,
        avatar: `api/offers/${offerDateExample}/keks.png`
      }
    });
  });
  it(`send offer with incorrect image mime-type`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    field(`name`, `Dima`).
    field(`date`, offerDateExample).
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
    attach(`avatar`, `test/fixtures/svg-image.svg`).
    attach(`preview`, `test/fixtures/svg-image.svg`).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(400).
    expect(`Content-Type`, /json/);

    const errors = response.body;
    assert.deepEqual(errors, [
      `Incorrect MIME type of avatar`,
      `Incorrect MIME type of preview`
    ]);
  });
});


describe(`Field "Title" validation`, () => {

  it(`collect errors "is required"`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    field(`description`, offerExample.description).
    field(`guests`, offerExample.guests).
    field(`features`, offerExample.features).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field date "date" is required!`,
      `Field title "title" is required!`,
      `Field type "type" is required!`,
      `Field price "price" is required!`,
      `Field address "address" is required!`,
      `Field checkin "checkin" is required!`,
      `Field checkout "checkout" is required!`,
      `Field rooms "rooms" is required!`
    ]);
  });

  it(`collect errors desciptions`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    field(`name`, `Dima`).
    field(`date`, offerDateExample).
    field(`title`, `1234`).
    field(`address`, [123, 123]).
    field(`description`, offerExample.description).
    field(`price`, 99999999).
    field(`type`, `12345`).
    field(`rooms`, 1011).
    field(`guests`, offerExample.guests).
    field(`checkin`, `00:70`).
    field(`checkout`, `34:00`).
    field(`features`, [`wifi`, `wifi`]).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `multipart/form-data`).
    expect(400).
    expect(`Content-Type`, /json/);

    const errors = response.body;
    assert.deepEqual(errors, [
      `Field "title", length should be less 140 than and more than 30`,
      `Field "type" must be a "string" and contains one of the value: flat, house, bungalo, palac`,
      `Field "price", must be a "number" and more 1 than and less than 1000000`,
      `Field "address" must be a "string" and has length less 100`,
      `Field "checkin" must be a "string" and have format "HH:mm"`,
      `Field "checkout" must be a "string" and have format "HH:mm"`,
      `Field "rooms", must be a "number" and more 0 than and less than 1000`,
      `Field "rooms", must contains non-repeating values from the following: dishwasher, elevator, conditioner, parking, washer, wifi`
    ]);
  });

  it(`get random value of field "Name"`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    field(`date`, offerDateExample).
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
    assert.equal(true, namesArray.indexOf(offer.author.name) >= 0);
  });

});
