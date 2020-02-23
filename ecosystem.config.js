module.exports = {
    apps: [
        {
            name: 'serverDev',
            script: './bin/www',
            instances: 1,
            exec_mode: 'cluster',
            ignore_watch: ['node_modules'],
            max_memory_restart: '1024M',
            output: './log/out.log',
            error: './log/error.log',
            log: './log/combined.outerr.log',
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            env: {
                NODE_ENV: 'development',
                PORT: 3000,
                MONGODB_URI:
                    'mongodb://root:Fittime1991@dds-2ze111b156e6e3241.mongodb.rds.aliyuncs.com:3717,dds-2ze111b156e6e3242.mongodb.rds.aliyuncs.com:3717/new_node_fittime?replicaSet=mgset-4844033&authSource=admin',
                MYSQL_URL: '172.31.100.171'
            }
        },
        {
            name: 'serverTest',
            script: './bin/www',
            instances: -2,
            exec_mode: 'cluster',
            max_memory_restart: '1024M',
            output: './log/out.log',
            error: './log/error.log',
            log: './log/combined.outerr.log',
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            env: {
                NODE_ENV: 'test',
                PORT: 3001
            }
        },
        {
            name: 'serverProd',
            script: './bin/www',
            instances: 0,
            exec_mode: 'cluster',
            max_memory_restart: '1024M',
            output: './log/out.log',
            error: './log/error.log',
            log: './log/combined.outerr.log',
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            env: {
                NODE_ENV: 'production',
                PORT: 3002,
                MONGODB_URI:
                    'mongodb://root:Fittime1991@dds-2ze111b156e6e3241.mongodb.rds.aliyuncs.com:3717,dds-2ze111b156e6e3242.mongodb.rds.aliyuncs.com:3717/new_node_fittime?replicaSet=mgset-4844033&authSource=admin',
                MYSQL_URL: '172.31.100.171'
            }
        }
    ]

    // deploy : {
    //   production : {
    //     user : 'node',
    //     host : '212.83.163.1',
    //     ref  : 'origin/master',
    //     repo : 'git@github.com:repo.git',
    //     path : '/var/www/production',
    //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    //   }
    // }
};
