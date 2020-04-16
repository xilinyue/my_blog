var express = require('express');
var router = express.Router();

const userModel =  require('../db/userModel');
const visitorModel =  require('../db/visitorModel');
const cryptoUtil = require("../util/cryptoUtil");

//用户注册
router.post('/addUser',(req,res) => {
    let {username,password,vCode} = req.body;
    //判断参数是否都存在
    if(!username || !password || !vCode) {
        res.send({
            code: 1,
            msg: '必须参数不存在'
        });
        return;
    }
    //判断验证码是否正确
    if(vCode.toUpperCase() !== req.session.registerVCode.toUpperCase()) {
        res.send({
            code: 1,
            msg: '验证码错误'
        })
        return;
    };
    //再次校验用户
    if(
        !/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(username) ||
        !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(password)
    ){
        res.send({
            code: 1,
            msg: '用户名或者密码不符合规则'
        });
        return;
    }

    //验证用户名是否已存在
    userModel.find({username}).then(doc => {
        //用户名已存在
        if(doc.length > 0) {
            res.send({
                code: 1,
                msg: '用户名已存在'
            });
            return;
        }
        //用户名不存在，进行用户注册
        password = cryptoUtil.encodePassword(password);
        userModel.create({
            username,password
        }).then(doc => {
            res.send({
                code: 0,
                msg: '注册成功'
            });
        }).catch(err => {
            res.send({
                code: 5,
                msg: '注册失败，服务器错误'
            });
        })
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        })
    })

});
//用户登录
router.post('/login',(req,res) => {
    let {username,password} = req.body;
    //判断参数是否都存在
    if(!username || !password) {
        res.send({
            code: 1,
            msg: '必须参数不存在'
        });
        return;
    }
    userModel.findOne({username},{__v:0})
        .then(doc => {
            if(!doc) {
                res.send({
                    code: 1,
                    msg: '用户不存在'
                });
                return;
            }
            if(cryptoUtil.encodePassword(password) === doc.password){
                req.session.userInfo = doc;
                res.send({
                    code: 0,
                    msg: '登录成功'
                });
                //将用户信息存到有课表中
                //首先判断该游客是否已存在，存在就将信息删除再存入新的，不存在就直接存入
                visitorModel.findOne({username: username}).then(doc1 => {
                    if(doc1) {
                        //存在先删除
                        visitorModel.deleteMany({username}).then().catch(err => {

                        })
                    }
                    //存入信息
                    visitorModel.create({username: username,avatar: doc.avatar})
                })
            }else{
                res.send({
                    code: 1,
                    msg: '密码错误'
                });
            }
        }).catch(e => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        })
});
//用户退出登录
router.post('/logout',(req,res) => {
    let userInfo = req.session.userInfo;
    if(!userInfo) {
        res.send({
            code: 1,
            msg: '用户为登录'
        });
        return false;
    }else{
        delete req.session.userInfo;
        res.send({
            code: 0,
            msg: '退出登录成功'
        });
    }
});
//判断用户是否登录
router.get('/ifLogin',(req,res) => {
    let loginUser = req.session.userInfo;
    if(!loginUser) {
        res.send({
            code: 0,
            msg: '未登录',
            ifLogin: false
        });
        return;
    }
    let userInfo = {
        _id: loginUser._id,
        username: loginUser.username,
        avatar: loginUser.avatar
    };
    res.send({
        code: 0,
        msg: '用户已登录',
        ifLogin: true,
        data: userInfo
    });
});

//获取游客信息
router.get('/getVisitorList',(req,res) => {
    visitorModel.find({},{__v: 0},{skip: 0,limit: 12,sort: {date: -1}}).then(doc => {
        res.send({
            code: 0,
            msg: '数据获取成功',
            data: doc
        });
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误',
            data: []
        })
    });
});


module.exports = router;
