var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//数据库连接
const mongoose = require('./db/index.js');

//session
const session = require('express-session');
const sessionMongo = require("connect-mongo")(session);

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session的使用
app.use(session({
    secret: "myBlog",  //密钥，一个字符串，用于加密，可以随便写
    cookie: {maxAge: 30*60*1000},  //给前端设置的cookie的有效时长，单位毫秒
    rolling: true,  //每次用户和后端交互时，刷新cookie的有效期
    resave: false,  //是否每次重新存储session
    saveUninitialized: false,  //初始化
    //将session存储到数据库中
    store: new sessionMongo({
        url: "mongodb://localhost:27017/my_blog"
    })
}));

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
app.use('/api/article',require('./routes/article'));  //文章相关路由
app.use('/api/articleInfo',require('./routes/articleInfo')); //文章信息相关路由
app.use('/api/user',require('./routes/user')); //用户信息相关路由
app.use('/api/message',require('./routes/message')); //留言信息相关路由
app.use('/api/links',require('./routes/links')); //友链信息相关路由
app.use('/api/diary',require('./routes/diary')); //日记信息相关路由
app.use('/api/login',require('./routes/login')); //登陆

module.exports = app;
