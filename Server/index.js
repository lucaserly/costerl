'use strict';

const Koa = require('koa');
const app = new Koa();
const PORT = 3002;
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const db = require('./model');


app.use(cors());
app.use(bodyParser());

app.use(router.routes());

(async function bootstrap () {
  await db.sequelize.sync();
  app.listen(PORT, () => {
    console.log(`🍍 Server listening at http://localhost:${PORT} 🍕`);
  });
})();