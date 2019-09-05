const Router = require('koa-router');

const router = Router();

router.get('/', async ctx => {
  const currentTime = new Date().toDateString();
  await ctx.render('/topic', {
    currentTime,
  });
});

module.exports = router;
