const express = require('express');
const articelModel = require('../db/articleModel');
const articelInfoModel = require('../db/articleInfoModel');

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
})



module.exports = router;