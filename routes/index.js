const router = require('koa-router')();
const api = require('./api.js');

// router.get('/', async (ctx, next) => {
//     await ctx.render('index', {
//         title: 'Hello Koa 2!'
//     });
// });

// router.get('/string', async (ctx, next) => {
//     ctx.body = 'koa2 string';
// });

// router.get('/json', async (ctx, next) => {
//     ctx.body = {
//         title: 'koa2 json'
//     };
// });
// 接收所有路径/api的请求
router.use('/api', api.routes(), api.allowedMethods());

module.exports = router;
