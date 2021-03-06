// autoBuild.js
const http = require('http');
const spawn = require('child_process').spawn;
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/', secret: 'whk' }); // 在代码仓库的 Webhooks 选项处配置

http.createServer(function(req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404;
        res.end('no such location');
    });
}).listen(7777);

handler.on('error', function(err) {
    console.error('Error:', err.message);
});

// 监听 push 事件
handler.on('push', function(event) {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    rumCommand('sh', ['./update.sh'], function(txt) {
        // 执行 autoBuild.sh 脚本文件
        console.log(txt);
    });
});

// 执行脚本
function rumCommand(cmd, args, callback) {
    const child = spawn(cmd, args);
    let response = '';
    child.stdout.on('data', function(buffer) {
        response += buffer.toString();
    });
    child.stdout.on('end', function() {
        callback(response);
    });
}
