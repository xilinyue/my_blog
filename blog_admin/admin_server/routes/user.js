const express = require("express");
const userModel = require("../db/userModel");

let router = express.Router();

/**
 * @api {get} /api/user/getUserListLazyed 用户列表
 * @apiName GetUserListLazyed
 * @apiGroup User
 * @apiDescription 懒加载获取用户列表
 *
 * @apiParam {number} skip  skip
 * @apiParam {number} limit  limit
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "data": [
 *          {""},{""}
 *          ]
 *     }
 */
router.get("/getUserListLazyed",(req,res) => {
    let {skip,limit} = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 5;
    userModel.find({},{__v: 0, password: 0},{skip,limit},((err,docs) => {
        if(err) {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
            return false;
        }
        res.send({
            code: 0,
            msg: '数据获取成功',
            data: docs
        });
    }));
});

/**
 * @api {get} /api/user/getTotalUser 用户总数
 * @apiName GetTotalUser
 * @apiGroup User
 * @apiDescription 获取用户总数，用于用户分页
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "total": 10
 *     }
 */
router.get("/getTotalUser",(req,res) => {
    userModel.find({},((err,data) => {
        if(err){
            res.send({
                code: 5,
                msg: '服务器错误'
            });
            return false;
        }
        res.send({
            code: 0,
            msg: '数据获取成功',
            total: data.length
        });
    }));
});

/**
 * @api {post} /api/user/updateUserDisabledById 修改用户的disabled属性
 * @apiName UpdateUserDisabledById
 * @apiGroup User
 * @apiDescription 根据用户的id更新用户的disabled属性
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "更新成功"
 *     }
 */
router.post("/updateUserDisabledById",(req,res) => {
    let {_id,disabled} = req.body;
    userModel.updateOne({_id},{disabled}).then(data => {
        res.send({
            code: 0,
            msg: '更新成功'
        });
    }).catch(err=>{
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    });
});

/**
 * @api {post} /api/user/updateUserAdminById 修改用户的admin属性
 * @apiName UpdateUserAdminById
 * @apiGroup User
 * @apiDescription 根据用户的id更新用户的admin属性
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "更新成功"
 *     }
 */
router.post("/updateUserAdminById",(req,res) => {
    let {_id,admin} = req.body;
    userModel.updateOne({_id},{admin}).then(data => {
        res.send({
            code: 0,
            msg: '更新成功'
        });
    }).catch(err=>{
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    });
});

module.exports = router;