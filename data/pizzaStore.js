const Sequelize = require('sequelize');

const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dialect = 'postgres';

const pgClient = new Sequelize(database, username, password, { dialect, host });

const Pizza = pgClient.define('pizza', {
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING },
  toppings: { type: Sequelize.STRING },
  img: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  created: { type: Sequelize.BIGINT },
});

Pizza.sync().then(() => console.log('Postgres connection ready.'));

module.exports = Pizza;
