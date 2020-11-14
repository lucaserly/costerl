'use strict';

const model = require('./../model/');
const bcrypt = require('bcrypt');


exports.routerTester = (ctx) => {
  try {
    ctx.body = 'Hello Lucas from Router & Controller';
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};

exports.getAll = async (ctx) => {
  try {
    const res = await model.entry.findAll();
    ctx.body = res;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};

exports.postOne = async (ctx) => {
  try {
    const entry = ctx.request.body;
    const newEntry = await model.entry.create(entry);
    ctx.body = entry;
    ctx.status = 201;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};

exports.deleteOne = async (ctx) => {
  try {
    const { id } = ctx.params;
    await model.entry.destroy({
      where: {
        id
      }
    });
    ctx.status = 204;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};

exports.createUser = async (ctx) => {
  const login = ctx.request.body;
  const { email, password } = ctx.request.body;
  const user = await model.user.findAll({
    where: {
      email: email
    }
  });
  if (user.length !== 0) return ctx.throw(409, 'User already exists');
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    login.password = hash;
    const newUser = await model.user.create(login);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (error) {
    console.error(error);
    ctx.status = 400;
    ctx.body = 'Could not create user';
  }
};

exports.login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await model.user.findAll({
      where: {
        email: email
      }
    });
    const checkPassword = await bcrypt.compare(password, user[0].dataValues.password);
    if (!checkPassword) throw new Error();
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 401;
    ctx.body = 'Username or password is incorrect';
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const users = await model.user.findAll({
      include: [
        {
          model: model.entry,
          attributes: [
            'item',
            'category',
            'amount',
            'date'
          ]
        }
      ]
    });
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};

exports.profile = async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const user = await model.user.findAll({
      include: [{
        model: entry,
        attributes:
          [
            'item',
            'category',
            'amount'
          ]
      }]
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = 'User not found';
  }
};

// exports.logout = async (ctx) => {
//   try {

//   } catch (error) {
//     console.error(error);
//   }
// };