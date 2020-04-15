const express = require("express");
const messageModel = require("../db/messageModel");
let router = express.Router();

/**
 * @api {get} /api/message/getMessageListLazyed 留言列表
 * @apiName GetMessageListLazyed
 * @apiGroup Message
 * @apiDescription 懒加载获取留言列表
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
router.get("/getMessageListLazyed",(req,res) => {
    let {skip,limit} = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 5;
    messageModel.find({},{_id: 1,date: 1,content: 1},{skip,limit},((err,docs) => {
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
 * @api {get} /api/message/getTotalMessage 留言总数
 * @apiName GetTotalMessage
 * @apiGroup Message
 * @apiDescription 获取留言总数，用于留言管理分页
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "total": 10
 *     }
 */
router.get("/getTotalMessage",(req,res) => {
    messageModel.find({},((err,data) => {
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
 * @api {delete} /api/message/deleteMessageById 删除留言
 * @apiName DeleteMessageById
 * @apiGroup Message
 * @apiDescription 根据留言id删除留言
 *
 * @apiParam {string} _id  留言id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据删除成功"
 *     }
 */
router.delete("/deleteMessageById",(req,res) => {
    let {_id} = req.body;
    messageModel.deleteOne({_id}).then(data => {
        res.send({
            code: 0,
            msg: '数据删除成功'
        });
    }).catch(err=>{
        res.send({
            code: 5,
            msg: '服务器错误',
        });
    });
});

module.exports = router;