const http = require('http');

const app = require('../app');

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const defaultPort = parseInt(val, 10);

  // named pipe
  if (Number.isNaN(defaultPort)) return val;

  // port number
  if (defaultPort >= 0) return defaultPort;

  return false;
}


// Get port from environment and store in Express
const port = normalizePort(3000);
app.set('port', port);

const server = http.createServer(app);


// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.log(`[info] Server listening on ${bind} in local mode`);
}


const init = async () => {
  // Listen on provided port, on all network interfaces.
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
};


process.on('exit', async () => {
  console.log('Shutting down...');
});

module.exports = init(); // return a Promise
