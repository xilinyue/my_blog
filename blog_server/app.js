var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//数据库连接
const mongoose = require('./db/index.js');

var app = express();
//App实例
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置允许跨域访问
app.use((req,res,next) => {
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json;charset=utf-8'
    });
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
    }else{
        next();
    }
});
//子路由
app.use('/api/users', require('./routes/users'));
app.use('/api/article', require('./routes/article'));

module.exports = app;


/**
 * 0  请求成功
 * 4 参数错误
 * 5 服务器错误
*/