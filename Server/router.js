'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/controller');

router.get('/', (ctx) => {
  ctx.body = 'Hello Lucas from Router';
});

router.get('/entries', controller.getAll);

module.exports = router;