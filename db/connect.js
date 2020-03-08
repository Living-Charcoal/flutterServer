const mongoose = require('mongoose');

mongoose.Promise = Promise; // mongoose自带的promise过期了，然后需要使用v8引擎的promise

// 用户名和密码
mongoose.connect(
    'mongodb://39.106.101.58:27017/auth',
    //'mongodb://root:Fittime1991@dds-2ze111b156e6e3241.mongodb.rds.aliyuncs.com:3717,dds-2ze111b156e6e3242.mongodb.rds.aliyuncs.com:3717/new_node_fittime?replicaSet=mgset-4844033&authSource=admin',
    {
        promiseLibrary: global.Promise
    }
);

const db = mongoose.connection;

db.on('error', error => {
    console.log(`数据库创建失败：${error}`);
});

db.on('open', () => {
    console.log('数据库连接成功 mongodb');
});
