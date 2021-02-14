const Router = require('koa-router');

const router = new Router();
const controller = require('./controller/controller');

router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);
router.get('/user/:id', controller.getExpenses);
router.delete('/user/:id', controller.deleteExpense);
router.post('/entries', controller.postExpense);

module.exports = router;
