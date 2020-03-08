const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('../utils/crypt');

const Users = require('../models/login');

const secret = fs.readFileSync(path.join(__dirname, '../secret.pub')); // jwt设置的secret

console.log(secret);

// 查找用户
const findOne = (query, filter = {}) => {
    return new Promise((resolve, reject) => {
        Users.find(query, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
};

const login = {
    async checkLogin(ctx) {
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            // 信息有误，登录失败
            ctx.status = 400;
            ctx.body = {
                code: -1,
                message: '账号或密码为空!'
            };
            return;
        }

        const result = await Users.findOne({ username });

        if (result) {
            const checkPassword = bcrypt.decrypt(password, result.password); // 解密password

            if (checkPassword) {
                const token = jwt.sign(
                    {
                        username: result.username,
                        _id: result._id
                    },
                    secret, // 公共secret
                    { expiresIn: '24h' } //设置token过期时间
                );

                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    data: {
                        token
                    },
                    message: '登录成功!'
                };
                return;
            }
            ctx.status = 200;
            ctx.body = {
                code: -3,
                message: '用户名和密码不匹配!'
            };
            return;
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -2,
                message: '用户未注册!'
            };
            return;
        }
    }
};
module.exports = login;
