const express = require("express");
const linksModel = require("../db/linksModel");

let router = express.Router();

//获取所有友链
router.get("/getLinksList",(req,res) => {
    linksModel.find({},{_v: 0},{sort: {date: -1}}).then(docs => {
        res.send({
            code: 0,
            msg: '数据获取成功',
            data: docs
        })
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    });
});

module.exports = router;