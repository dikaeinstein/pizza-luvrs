'use strict';

const Hapi = require('hapi');
require('dotenv').config();

const serverOptions = process.env.NODE_ENV === 'production'
  ? { cache: [{
    name: 'redis',
    engine: require('catbox-redis'),
    host: 'pizza-redis-cluster.kphgvw.0001.euw2.cache.amazonaws.com',
    partition: 'cache',
  }] }
  : null;

const server = new Hapi.Server(serverOptions);
server.connection({ port: process.env.PORT || 3000 });

function startServer() {
  server.start((err) => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
  });
}

require('./plugins.js').registerPlugins(server, (err) => {
  if (err) throw err;
  require('./routes.js').registerRoutes(server);
  startServer();
});
