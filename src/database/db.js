'use strict';

const {MongoClient} = require(`mongodb`);

const logger = require(`../logger`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `keks-booking`
} = process.env;

const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url, {useNewUrlParser: true}).then((client) => client.db(DB_PATH)).catch((err) => {
  logger.error(`Failed to connect to MongoDB`, err);
  process.exit(1);
});
