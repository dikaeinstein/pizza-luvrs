'use strict';

const _ = require('lodash'),
  Pizza = require('../models/pizza'),
  ImageStore = require('../lib/imageStore'),
  PizzaStore = require('./pizzaStore');

function createPizza (name, toppings, img, username, callback) {
  ImageStore.saveImage(name.replace(/ /g, '-'), img, async (err, imgUrl) => {
    if (err) throw err;

    let pizza = new Pizza(name, toppings, imgUrl, username);
    try {
      const newPizza = await PizzaStore.create(serializeToppings(pizza));
      callback(null, newPizza);
    } catch (e) {
      callback(e);
    }
  });
}

// for mocks that don't need pizza images saved
async function importPizza (name, toppings, imgUrl, username) {
  let pizza = new Pizza(name, toppings, imgUrl, username);
  try {
    await PizzaStore.create(serializeToppings(pizza));
  } catch (e) {
    console.error(e);
  }
}

async function getPizzaForUser (username, callback) {
  const userPizzas = await PizzaStore.findAll({ where: username });
  callback(null, userPizzas);
}

async function getRecentPizzas (callback) {
  try {
    const userPizzas = await PizzaStore.findAll({
      order: [['created', 'DESC']],
      limit: 4,
    });
    callback(null, userPizzas);
  } catch (e) {
    callback(e);
  }
}

async function getPizza (pizzaId, callback) {
  try {
    const pizza = await PizzaStore.findOne({ where: { id: pizzaId }});
    if (!pizza) {
      callback('Pizza not found!');
      return;
    }
    callback(null, deSerializeToppings(pizza));
  } catch (e) {
    callback(e);
  }
}

function serializeToppings(pizza) {
  return Object.assign(pizza, { toppings: JSON.stringify(pizza.toppings) });
}

function deSerializeToppings(pizza) {
  return Object.assign(pizza, { toppings: JSON.parse(pizza.toppings) });
}

function deSerializePizzas (pizzas) {
  return pizzas.map(pizza => deSerializeToppings(pizza));
}

module.exports.createPizza = createPizza;
module.exports.importPizza = importPizza;
module.exports.getPizzaForUser = getPizzaForUser;
module.exports.getPizza = getPizza;
module.exports.getRecentPizzas = getRecentPizzas;
