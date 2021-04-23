require('dotenv').config();
const app = require('./backend/app');
const debug = require('debug')('node-angular');
const http = require('http');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (err) => {
  console.error('Error::: ' + err);
  if (err.syscall !== 'listen' || err.syscall !== 'read') {
    throw err;
  }

  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;

  switch (err.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    case "ECONNRESET":
      console.error(bind + " the other side has closed TCP conversation abruptly");
      process.exit(1);
      break;
    default:
      throw err;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log("Listening on " + bind);
};

const port = normalizePort(process.env.PORT_BACKEND || "80");
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
