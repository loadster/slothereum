const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');

const app = new Koa();
const data = require('./data.js');
const api = require('./api.js')(app, data);

app.use(KoaBodyParser());
app.use(api.routes());
app.use(KoaStatic('static', {}));

app.listen(3000);
