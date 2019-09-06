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

  server.use(middleware); //中间件加载
  server.use(routes.routes(), routes.allowedMethods()); // 自定义路由加载

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    await next();
  });

  server.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
});
