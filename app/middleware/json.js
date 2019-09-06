class Message {
  constructor(code = 200, msg, data = null) {
    this.data = data;
    this.msg = msg || '';
    this.code = code || 200;
    this.success = code === 200 || code === 0;
  }
}

module.exports = () => {
  function json(code = 200, msg = '', data = '') {
    this.set('Content-Type', 'application/json');
    this.body = new Message(code, msg, data);
  }
  return async (ctx, next) => {
    ctx.json = json.bind(ctx);
    await next();
  };
};
