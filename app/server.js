const Koa = require('koa');
const next = require('next');

const routes = require('./routes');
const middleware = require('./middleware');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3006;
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('building...');

app.prepare().then(() => {
  const server = new Koa();

  server.use(async (ctx, next) => {
    // 挂载 render function
    ctx.render = async (pages, params) => await app.render(ctx.req, ctx.res, pages, params);
    await next();
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  routes.get('*', async ctx => {
    // 避免 next 默认根据 page 生成的路由生效, 这里是兜底函数
    if (!ctx.req.url.includes('/_next')) ctx.req.url = '==';
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(middleware); //中间件加载
  server.use(routes.routes(), routes.allowedMethods()); // 自定义路由加载

  server.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
});
