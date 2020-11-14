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
    const res = await model.entry.create(entry);
    ctx.body = res;
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

  console.log('ctx.request.body-->', ctx.request.body);
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

  } catch (error) {
    console.error(error);
  }
};

exports.profile = async (ctx) => {
  try {

  } catch (error) {
    console.error(error);
  }
};

exports.logout = async (ctx) => {
  try {

  } catch (error) {
    console.error(error);
  }
};