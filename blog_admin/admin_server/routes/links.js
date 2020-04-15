const express = require("express");
const linksModel = require("../db/linksModel");

let router = express.Router()

/**
 * @api {post} /api/links/addLinks 添加友链
 * @apiName AddLinks
 * @apiGroup Links
 * @apiDescription 添加友链
 *
 * @apiParam {string} icon 友链图标
 * @apiParam {string} name 友链名称
 * @apiParam {string} desc 友链描述
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功"
 *     }
 */
router.post("/addLinks",(req,res) => {
    let {icon,name,desc} = req.body;
    if(!icon || !name || !desc){
        res.send({
            code: 4,
            msg: '必须参数不能为空'
        });
    }
    linksModel.create({icon,name,desc}).then(data => {
        res.send({
            code: 0,
            msg: '添加成功'
        });
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    });
});

/**
 * @api {get} /api/links/getLinksListLazyed 友链列表
 * @apiName GetLinksListLazyed
 * @apiGroup Links
 * @apiDescription 懒加载获取友链列表
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
router.get("/getLinksListLazyed",(req,res) => {
    let {skip,limit} = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 5;
    linksModel.find({},{__v: 0},{skip,limit},((err,docs) => {
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
 * @api {get} /api/links/getTotalLinks 友链总数
 * @apiName GetTotalLinks
 * @apiGroup Links
 * @apiDescription 获取友链总数，用于友链分页
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "total": 10
 *     }
 */
router.get("/getTotalLinks",(req,res) => {
    linksModel.find({},((err,data) => {
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
 * @api {delete} /api/links/deleteLinksById 删除友链
 * @apiName DeleteLinksById
 * @apiGroup Links
 * @apiDescription 通过id删除友链
 * 
 * @apiParam {string} _id  _id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "删除成功"
 *     }
 */
router.delete("/deleteLinksById",(req,res) => {
    let {_id} = req.body;
    linksModel.deleteOne({_id},((err,data) => {
        if(err){
            res.send({
                code: 5,
                msg: '服务器错误'
            });
            return false;
        }
        res.send({
            code: 0,
            msg: '删除成功'
        });
    }));
});


module.exports = router;