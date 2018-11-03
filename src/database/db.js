'use strict';

const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url, {useNewUrlParser: true}).then((client) => client.db(`keks-booking`)).catch((err) => {
  console.error(`Failed to connect to MongoDB`, err);
  process.exit(1);
});
