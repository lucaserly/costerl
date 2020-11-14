'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/controller');
const authMiddleware = require('./middlewares/auth');

router.get('/', controller.routerTester);
router.get('/entries', controller.getAll);
router.post('/entries', controller.postOne);
router.delete('/entries/:id', controller.deleteOne);

router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.get('/me', controller.profile);
router.get('/me', controller.logout);

module.exports = router;