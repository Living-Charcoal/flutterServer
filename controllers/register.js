const Users = require('../models/register');
const bcrypt = require('../utils/crypt'); // 加密

// 查找用户
const findOne = (query, filter = {}) => {
    return new Promise((resolve, reject) => {
        Users.find(query, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
};
// 写入用户
const insert = query => {
    return new Promise((resolve, reject) => {
        Users.create(query, (err, info) => {
            if (err) {
                console.log(err);
                reject();
                return;
            }
            resolve(info);
        });
    });
};

const register = {
    async registerFun(ctx) {
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            // 信息有误, 参数不全
            ctx.status = 400;
            ctx.body = {
                code: -1,
                message: '账号或密码为空!'
            };
            return;
        }
        // 根据用户名 查询用户
        const result = await findOne({ username });
        console.log(result);
        if (result && result.length) {
            ctx.status = 200;
            ctx.body = {
                code: -2,
                message: '账号已存在!'
            };
        } else {
            const encryptPassword = bcrypt.encrypt(password); // 加密密码
            const insertResult = await insert({ username, password: encryptPassword });
            ctx.status = 200;
            ctx.body = {
                code: 0,
                message: '注册成功!'
            };
        }
    }
};
module.exports = register;
