'use strict';

const model = require('./../model/');


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

exports.createUser = (ctx) => {
  try {
    console.log('ctx.request.body-->', ctx.request.body);

  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};