'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/controller');

router.get('/', controller.routerTester);
router.get('/entries', controller.getAll);
router.post('/entries', controller.postOne);
router.delete('/entries/:id', controller.deleteOne);

module.exports = router;