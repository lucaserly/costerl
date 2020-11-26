'use strict';

const model = require('./../model/');
const bcrypt = require('bcrypt');

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
    entry.userId = Number(entry.userId);
    const newEntry = await model.entry.create(entry);
    ctx.body = newEntry;
    ctx.status = 201;

  } catch (error) {
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
  const { email, password } = ctx.request.body;
  const user = await model.user.findAll({
    where: {
      email: email
    }
  });
  try {
    if (user.length === 0) {
      const hash = await bcrypt.hash(password, 10);
      const hashedPW = hash;
      const newUser = await model.user.create({email, password: hashedPW});
      ctx.status = 201;
      ctx.body = newUser;
    } else {
      ctx.status = 400;
      ctx.body = 'User already exists'
    }
  } catch (error) {
    ctx.body = 'Could not create user';
    ctx.status = 400;
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
    if (user.length !== 0) {
      const checkPassword = await bcrypt.compare(password, user[0].dataValues.password);
      if (!checkPassword) throw new Error();
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.body = 'User does not exist';
      ctx.status = 401;
    }

  } catch (error) {
    ctx.body = 'Username or password is incorrect';
    ctx.status = 401;
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const users = await model.user.findAll({
      include: [
        {
          model: model.entry,
          attributes: [
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
            'userId'
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
  console.log('profile ctx.request-->', ctx.request);
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
            'userId'
          ]
      }],
      where: {
        id: id
      }
    });
    console.log('user INSIDE CONTROLLER-->', user);
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = 'User not found';
  }
};
