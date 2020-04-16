const express = require("express");
const diaryModel = require("../db/diaryModel");

let router = express.Router();

//获取所有日记
router.get("/getDiaryList",(req,res) => {
    diaryModel.find({},{_v: 0},{sort: {date: -1}}).then(docs => {
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