const request = require('request');
const mtaHost = 'https://openapi.mta.qq.com/wx/v1';
const eventApi = '/analytics/event';
const crypto = require('crypto');

const getData = (api, params) =>{
    return new Promise((resolve, reject) => {
        request({
            timeout: 10000, // 设置超时
            method: 'GET', //请求方式
            url: api, //url
            qs: params
        },function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};

const mtaData = {
    async eventList (ctx) {
        const params = {
            app_id: '500652346',
            end_time: '2020-03-01',
            start_time: '2020-01-01',
            timestamp:  Math.floor(new Date().getTime() / 1000)
        };
        const api = `${mtaHost}${eventApi}`;
        let secret = '332a300ca5a487417d0f9c9cc051092e';
        Object.entries(params).forEach((ele) => {
            secret+= `&${ele[0]}=${ele[1]}`;
        });
        let obj = crypto.createHash('md5');
        obj.update(secret);
        params.sign = obj.digest('hex');
        let result;
        await getData(api, params).then((res) => {
            result = res;
        }).catch((err)=>{
            console.log(err);
        });
        if(result) {
            ctx.status = 200;
            ctx.body = {
                code: 0,
                message: '获取成功',
                object: JSON.parse(result)
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                code: -1,
                message: '获取失败'
            };
        }
    }
};
module.exports = mtaData;