'use strict';

exports.getAll = async (ctx) => {
  try {
    console.log('ctx-->', ctx);
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
};