/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const model = require('../model');

exports.loginUser = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await model.user.findAll({
      where: {
        email,
      },
    });
    const checkPassword = await bcrypt.compare(password, user[0].dataValues.password);
    if (!checkPassword) throw new Error();
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.body = { error, message: 'Username or password is incorrect' };
    ctx.status = 401;
  }
};

exports.registerUser = async (ctx) => {
  const login = ctx.request.body;
  const { email, password } = ctx.request.body;
  const user = await model.user.findAll({
    where: {
      email,
    },
  });
  try {
    if (user.length !== 0) throw new Error();
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    login.password = hash;
    const newUser = await model.user.create(login);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (error) {
    ctx.body = { error, message: 'Could not create user' };
    ctx.status = 400;
  }
};

exports.postExpense = async (ctx) => {
  try {
    const entry = ctx.request.body;
    entry.userId = Number(entry.userId);
    const newEntry = await model.entry.create(entry);
    ctx.body = newEntry;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

exports.deleteExpense = async (ctx) => {
  try {
    const { id } = ctx.params;
    await model.entry.destroy({
      where: {
        id,
      },
    });
    ctx.status = 204;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

exports.getExpenses = async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const user = await model.user.findAll({
      include: [{
        model: model.entry,
        attributes:
          [
            'id',
            'item',
            'category',
            'description',
            'payment',
            'amount',
            'currency',
            'date',
            'createdAt',
            'updatedAt',
            'userId',
          ],
      }],
      where: {
        id,
      },
    });
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error, message: 'User not found' };
    ctx.status = 404;
  }
};
