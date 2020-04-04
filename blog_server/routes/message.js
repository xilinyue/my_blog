const express = require('express');
const messageModel = require('../db/messageModel');

const router = express.Router();

//留言提交
router.post('/addMessage',(req,res) => {
    let {userId,content} = req.body;
    if(!userId || !content) {
        res.send({
            code: 4,
            msg: '必须参数不能为空'
        });
        return false;
    }
    //添加到数据库
    messageModel.create({user:userId,content})
        .then(doc => {
            res.send({
                code: 0,
                msg: '留言成功'
            });
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        });
});

//子留言提交
router.post('/addSubMessage',(req,res) => {
    let {parentId,userId,content,atUserName} = req.body;
    if(!parentId || !userId || !content || !atUserName) {
        res.send({
            code: 4,
            msg: '必须参数不存在'
        });
        return false;
    }
    messageModel.findOne({_id: parentId},(err,data) => {
        if(err) {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
            return  false;
        }
        if(data) {
            messageModel.update({_id: parentId},{$push: {'children': {user: userId,content,atUserName}}})
                .then(docs => {
                    res.send({
                        code: 0,
                        msg: '回复成功'
                    });
                })
        }else{
            res.send({
                code: 1,
                msg: '该条留言已被删除'
            }); 
        }
    })
});

//获取列表
/**
 * @params
 *      skip  0
 *      limit  5
 */
router.get('/getMessageList',(req,res) => {
    let {skip,limit} = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 5;
    messageModel.find({},{__v: 0},{skip,limit,sort: {date: -1}})
        .populate('user',{_id: 1, username: 1,avatar: 1})
        .populate('children.user',{_id: 1, username: 1,avatar: 1})
        .then(docs => {
            if(docs.length > 0){
                res.send({
                    code: 0,
                    msg: '获取数据成功',
                    data: docs
                });
            }else{
                res.send({
                    code: 0,
                    msg: '数据为空'
                });
            }
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        })
});
//获取所有留言的总数
router.get('/getCountMessage',(req,res) => {
    messageModel.find({}).then(docs => {
        res.send({
            code: 0,
            msg: '获取总数成功',
            total: docs.length
        })
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    })
})

module.exports = router;