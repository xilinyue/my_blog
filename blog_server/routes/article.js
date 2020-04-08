const express = require('express');
const articelModel = require('../db/articleModel');
const articelInfoModel = require('../db/articleInfoModel');
const commentModel = require('../db/commentModel');

let router = express.Router();

//获取所有关于文章的信息articleInfo
router.get('/getArticleInfo',(req,res) => {
    articelInfoModel.findOne({},{_id: 0,__v: 0})
        .then(data => {
            res.send({
                code: 0,
                msg: '数据获取成功',
                data
            });
        })
        .catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误',
                data: null
            })
        })
});
//根据浏览量获取8篇热门文章
router.get('/getArticleHot',(req,res) => {
    articelModel.find({},{__v:0},{sort: {pv: -1}, skip: 0, limit: 8})
        .then(data => {
            res.send({
                code: 0,
                msg: '数据获取成功',
                data
            })
        })
        .catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误',
                data: null
            })
        })
});
//分页查询获取数据
/**
 * @params
 * @tag   根据文章标签搜索文章
 * @skip @limit 分页参数
 */
router.get('/getArticleList',(req,res) => {
    let {skip,limit,tag} = req.query;
    limit = parseInt(limit);
    skip = parseInt(skip);
    let options = tag?{tag}:{};
    articelModel.find(options,{__v: 0},{skip,limit,sort: {pv: -1}})    // TODO之后将sort换成date
        .then(data => {
            res.send({
                code: 0,
                msg: '数据获取成功',
                data
            })
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误',
                data: null
            })
        });
});
/*
* 根据_id获取文章信息
* 同时更新文章的阅读量
* */
router.get('/getArticleDetailById',(req,res) => {
    let {id} = req.query;
    if(!id) {
        res.send({
            code: 4,
            msg: '参数必须',
        });
        return false;
    }
    articelModel.findOne({_id: id},{__v: 0}).then(data => {
        if(!data) {
            res.send({
                code: 1,
                msg: '未找到数据'
            });
            return false;
        }
        res.send({
            code: 0,
            msg: '数据获取成功',
            data
        });
        //返回成功的同时更新本条数据的pv阅读量
        articelModel.updateOne({_id: id},{$inc:{pv:1}}).then(docs => {
            console.log(docs);
        })
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        })
    })
});
//延伸阅读
router.get('/getArticleListExtend',(req,res) => {
    let {tag} = req.query;
    articelModel.find({tag},{_id: 1,title: 1},{skip: 1, limit: 2,sort: {pv: -1}})
        .then(docs => {
            if(docs.length > 0){
                res.send({
                    code: 0,
                    msg: '数据获取成功',
                    data: docs
                });
            }else{
                res.send({
                    code: 1,
                    msg: '暂无数据',
                    data: []
                });
            }
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        })
});

//上传用户对文章的评论
router.post('/addArticleCommentById',(req,res) => {
    let {articleId,userId,content} = req.body;
    if(!articleId || !userId || !content){
        res.send({
            code: 4,
            msg: '参数不能为空'
        });
        return false
    }
    articelModel.findOne({_id: articleId}).then(data => {
        if(data){
            commentModel.create({user: userId,content}).then(data => {
                let commentId = data._id;
                //将commentId更新到article中
                articelModel.updateOne({_id: articleId},{$push: {'comment': commentId}})
                    .then(doc => {
                        res.send({
                            code: 0,
                            msg: '评论成功'
                        })
                    }).catch(err => {
                        res.send({
                            code: 5,
                            msg: '服务器错误'
                        })
                    })
            })
        }else{
            res.send({
                code: 1,
                msg: '该条博客不存在'
            })
        }
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    })

});

//上传文章的子评论
router.post('/addArticleSubCommentById',(req,res) => {
    let {commentId,userId,content,atUserName} = req.body;
    if(!commentId || !userId || !content || !atUserName) {
        res.send({
            code: 4,
            msg: '参数不能为空'
        });
        return false;
    }
    //更新数据
    commentModel.update({_id: commentId},{$push: {'children': {user: userId,content,atUserName}}})
        .then(docs => {
            res.send({
                code: 0,
                msg: '评论成功'
            });
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        })
});

//根据文章id获取文章的评论信息
router.get('/getArticleCommentByArticleId',(req,res) => {
    let {articleId,skip,limit} = req.query;
    if(!articleId) {
        res.send({
            code: 4,
            msg: '参数不能为空'
        });
        return false;
    }
    skip = skip || 0;
    limit = limit || 5;
    articelModel.findOne({_id: articleId},{comment: 1})
        .populate({
            path: 'comment',
            populate: [{
                path: 'user',
                select: {_id: 1,username: 1,avatar: 1}
            },{path: 'children.user',select: {_id: 1,username: 1,avatar: 1}}]
        })
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.send({
                    code: 0,
                    msg: '数据不存在',
                    data
                })
            }
        })
});

//根据文章标题和tag搜索文章
router.get('/getSearchListByTitleOrTag',(req,res) => {
    let {keyWords} = req.query;
    let reg = new RegExp(keyWords,'i');
    articelModel.find({$or: [{title: reg}, {tag: reg}]},{_id: 1,title: 1},{skip: 0,limit: 5,sort: {pv: -1}}).then(docs => {
        if(docs.length > 0){
            res.send({
                code: 0,
                msg: '数据获取成功',
                data: docs
            })
        }else{
            res.send({
                code: 1,
                msg: '数据为空',
                data: []
            })
        }
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误',
            data: []
        })
    });
});



module.exports = router;