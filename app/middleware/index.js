const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
// const logger = require('./logger');
const json = require('./json');

module.exports = compose([
  bodyParser(), //当接受post请求之时将获取的参数放置在 request.body 里面。
  // logger(),
  json(),
]);
