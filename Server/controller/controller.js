'use strict';

const model = require('./../model/');

exports.getAll = async (ctx) => {
  try {
    console.log('ctx-->', ctx);
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