const Sequelize = require('sequelize');

const database = 'pizza_luvrs';
const host = 'pizza-db.c0jpqaayspon.eu-west-2.rds.amazonaws.com';
const username = 'dika';
const password = 'password';
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
