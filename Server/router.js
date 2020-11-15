'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/controller');

router.get('/', controller.routerTester);

router.get('/entries', controller.getAll);
router.post('/entries', controller.postOne);
router.delete('/entries/:id', controller.deleteOne);

router.get('/users', controller.getAllUsers);
router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.get('/users/:id', controller.profile);
// router.get('/logout', controller.logout);

module.exports = router;