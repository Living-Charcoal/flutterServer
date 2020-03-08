// 解析token信息
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const secret = fs.readFileSync(path.join(__dirname, '../secret.pub')); // jwt设置的secret

const tokenInfo = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        });
    });
};

module.exports = tokenInfo;
