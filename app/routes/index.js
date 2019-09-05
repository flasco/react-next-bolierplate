const Router = require('koa-router');

const home = require('./home');
const topic = require('./topic');

const router = Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/topic', topic.routes(), topic.allowedMethods());

module.exports = router;
