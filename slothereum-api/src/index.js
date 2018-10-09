const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');
const KoaCors = require('@koa/cors');

const app = new Koa();

app.use(KoaCors())

const data = require('./data.js');
const api = require('./api.js')(app, data);

app.use(KoaBodyParser());
app.use(api.routes());
app.use(KoaStatic(__dirname +  '/../frontend', {}));

app.listen(5000);
