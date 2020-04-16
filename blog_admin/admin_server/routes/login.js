const express = require("express");
const userModel = require("../db/userModel");
const cryptoUtil = require("../util/cryptoUtil");

let router = express.Router();

/**
 * @api {post} /api/login/userLogin 管理员登录
 * @apiName UserLogin
 * @apiGroup Login
 * @apiDescription 管理员登录
 * 
 * @apiParam {string} username  用户名
 * @apiParam {string} password  密码
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "登陆成功",
 *       "data": {
 *              _id: 'sdafsdfs',
 *              username: 'admin'
 *          }
 *     }
 */
router.post("/userLogin",(req,res) => {
    let {username,password} = req.body;
    if(!username || !password) {
        res.send({
            code: 4,
            msg: '用户名和密码必须'
        });
        return false;
    }
    //验证用户名是否存在
    userModel.findOne({username}).then(data => {
        //用户名存在
        if(data){
            //判断用户是否有管理员权限
            if(data.admin){
                //判断密码是否正确
                if(cryptoUtil.encodePassword(password) === data.password){
                    req.session.userInfo = {
                        _id: data._id,
                        username: username,
                        avatar: data.avatar
                    };
                    res.send({
                        code: 0,
                        msg: '登录成功',
                        data: {
                            _id: data._id,
                            username: username,
                            avatar: data.avatar
                        }
                    });
                }else{
                    res.send({
                        code: 1,
                        msg: '密码错误'
                    });
                }
            }else{
                //没有管理员权限
                res.send({
                    code: 1,
                    msg: '该用户没有管理员权限'
                });
            }
        }else{
            //用户名不存在
            res.send({
                code: 1,
                msg: '用户名不存在'
            });
        }
    }).catch(err => {
        console.log(err);
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    })
});


/**
 * @api {get} /api/login/ifUserLogin 判断是否登录
 * @apiName IfUserLogin
 * @apiGroup Login
 * @apiDescription 判断是否已经登录
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "已登录",
 *       "data": {
 *              _id: 'sdafsdfs',
 *              username: 'admin'
 *          }
 *     }
 */
router.get("/ifUserLogin",(req,res) => {
    let userInfo = req.session.userInfo;
    if(userInfo) {
        res.send({
            code: 0,
            msg: '已登录',
            data: userInfo
        });
    }else{
        res.send({
            code: 1,
            msg: '未登录'
        });
    }
});

/**
 * @api {post} /api/login/userLogout 用户退出登录
 * @apiName UserLogout
 * @apiGroup Login
 * @apiDescription 用户退出登录
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "退出登录成功",
 *      }
 */
router.post('/userLogout',(req,res) => {
    let userInfo = req.session.userInfo;
    if(!userInfo) {
        res.send({
            code: 1,
            msg: '用户未登录'
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


module.exports = router;