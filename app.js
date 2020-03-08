const Koa = require('koa');
const app = new Koa();
// const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const fs = require('fs');
const path = require('path');

const index = require('./routes/index');

const env = process.env.NODE_ENV || 'development';

// 处理静态资源
const serve = require('koa-static');

// 连接数据库
require('./db/connect');

// 检验token
const jwt = require('koa-jwt');
// jwt设置的secret  fs读取文件的时候读相对路径经常会找不到 借助path
const secret = fs.readFileSync(path.join(__dirname, './secret.pub'));

// error handler
onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
);
app.use(json());
app.use(logger());

// logger
if (env === 'development') {
    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
}

// 错误处理
// error
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status === 401) {
            // 捕获token不合法
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            // 处理 异常 error
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                code: err.statusCode || err.status || 500,
                message: err.message
            };
            ctx.app.emit('error', err, ctx);
        }
    }
});

// routes
app.use(
    jwt({
        secret
    }).unless({
        path: [
            // 设置login、register接口，可以不需要认证访问
            /^\/api\/login/,
            /^\/api\/register/,
            /^((?!\/api).)*$/ // 只设置接口的验证
        ]
    })
);
app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

app.use(serve(__dirname + '/dist', { extensions: ['html'] }));

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
