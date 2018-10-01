const packageJSON = require('./package.json');
const getAvailableCommands = () => {
  let commands = [];

  for(commandKey in cliInterface) {
    const command = {
      name: commandKey,
      description: cliInterface[commandKey].description,
    };
    commands.push(command);
  }
  return `Доступные команды:
  ${commands.map((it) => {
    return `${it.name}${` `.repeat(15 - it.name.length)} — ${it.description}`
  }).join(`
  `)}`
};
let cliInterface = {
  '--version': {
    action: () => {console.log(`v${packageJSON.version}`)},
    description: `печатает версию приложения`,
  },
  '--help': {
    action: () => {console.log(getAvailableCommands())},
    description: `выводит возможные команды`,
  },
};

if (process.argv.length === 2) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageJSON.name}». Автор: ${packageJSON.author}.`);
} else {
  process.argv.forEach((val, index) => {
    if (index > 1) {
      if (cliInterface[`${val}`]) {
        cliInterface[`${val}`].action();
      } else {
        console.error(`Неизвестная команда {${val}}. 
Чтобы прочитать правила использования приложения, наберите "--help"`);
        process.exit(1);
      }
    }
  });
}
