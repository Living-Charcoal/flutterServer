const router = require('koa-router')();

const login = require('../controllers/login'); // 登录
const register = require('../controllers/register'); // 注册

const routers = router
    .get('/test', async ctx => {
        ctx.status = 200;
        ctx.body = {
            succ: false,
            message: '请求到接口'
        };
    })
    .post('/login', login.checkLogin) // 登录
    .post('/register', register.registerFun); // 注册

module.exports = routers;
