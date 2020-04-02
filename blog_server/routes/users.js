var express = require('express');
var router = express.Router();

const userModel =  require('../db/userModel');

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
        console.log(doc)
        if(doc.length > 0) {
            res.send({
                code: 1,
                msg: '用户名已存在'
            });
            return;
        }
        //用户名不存在，进行用户注册
        userModel.create({
            username,password
        }).then(doc => {
            console.log(doc);
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
            if(password === doc.password){
                req.session.userInfo = doc;
                res.send({
                    code: 0,
                    msg: '登录成功'
                });
            }
        }).catch(e => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        })
})


module.exports = router;
