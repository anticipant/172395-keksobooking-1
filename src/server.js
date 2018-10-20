'use strict';

const colors = require(`colors`);
const {extname} = require(`path`);
const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;
const ContentType = {
  css: `text/css`,
  html: `text/html; charset=UTF-8`,
  jpg: `image/jpeg`,
  ico: `image/x-icon`,
  png: `image/png`,
  gif: `image/gif`,
};

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);


const printDirectory = (relativePath, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${relativePath === `/` ? `` : relativePath}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const readFile = async (path, response) => {
  const data = await readfile(path);
  const extension = extname(path).slice(1);
  const contentType = ContentType[extension] ? ContentType[extension] : `text/plain`;

  response.setHeader(`content-type`, contentType);
  response.end(data);
};

const readDirectory = async (path, relativePath, response) => {
  const files = await readdir(path);
  response.setHeader(`content-type`, `text/html`);
  response.end(printDirectory(relativePath, files));
};

module.exports = {
  name: `server`,
  description: `принимает на вход номер порта и поднимает сервер`,
  execute(parameters) {
    let [port = PORT] = parameters;

    if (port > 0) {
      const server = http.createServer((request, response) => {
        const localPath = url.parse(request.url).pathname === `/` ? `/index.html` : url.parse(request.url).pathname;
        const currentNodeDirectory = process.cwd();
        const staticPath = `${currentNodeDirectory}/static/${localPath}`;

        (async () => {
          try {
            const pathStat = await stat(staticPath);

            response.statusCode = 200;
            response.statusMessage = `OK`;

            if (pathStat.isDirectory()) {
              await readDirectory(staticPath, localPath, response);
            } else {
              await readFile(staticPath, response);
            }
          } catch (err) {
            console.error(err);
            response.writeHead(404, `Not Found`);
            response.end();
          }
        })().catch((err) => {
          response.writeHead(500, err.message, {
            'content-type': `text/plain`
          });
          response.end(err.message);
        });
      });

      server.listen(port, HOSTNAME, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Server running at http://${HOSTNAME}:${port}/`);
      });
    } else {
      console.error(colors.red(`Неверно указан номер порта`));
      process.exit(1);
    }
  }
};
