'use strict';

const {createLogger, transports, format} = require(`winston`);
const {combine, timestamp} = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};
const getLogLevel = (level, defaultLevel) => {
  if (levels[level] === undefined) {
    console.log(`Указаный уровень логирования не существует. Установлен уровень по умолчания "${defaultLevel}"`);
  }
  return levels[level] ? level : defaultLevel;
};
const logger = createLogger({
  level: getLogLevel(process.env.LOG_LEVEL, `info`),
  format: format.json(),
  transports: [

    new transports.File({filename: `error.log`, level: `error`}),
    new transports.File({filename: `combined.log`})
  ]
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(new transports.Console({
    level: getLogLevel(process.env.DEV_LOG_LEVEL, `silly`),
    format: combine(timestamp(), format.simple())
  }));
}

module.exports = logger;
