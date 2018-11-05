'use strict';

const version = require(`./version`);
const description = require(`./description`);
const author = require(`./author`);
const license = require(`./license`);
const server = require(`./server`);
const colors = require(`colors`);

const DEFAULT_INDENT = 15;

const getAvailableCommands = () => {

  const cliInterface = {
    version,
    description,
    author,
    license,
    server,
  };
  let commands = [];

  for (let commandKey in cliInterface) {
    if (cliInterface.hasOwnProperty(commandKey)) {
      const command = {
        name: commandKey,
        description: cliInterface[commandKey].description,
      };
      commands.push(command);
    }
  }
  return `Доступные команды:
  ${colors.grey(`help`)}${` `.repeat(DEFAULT_INDENT - `help`.length)} — ${colors.green(`выводит возможные команды`)}
  ${commands.map((it) => {
    return `${colors.grey(it.name)}${` `.repeat(DEFAULT_INDENT - it.name.length)} — ${colors.green(it.description)}`;
  }).join(`
  `)}`;
};

module.exports = {
  name: `help`,
  description: `выводит возможные команды`,
  execute() {
    console.log(getAvailableCommands());
    process.exit(0);
  }
};
