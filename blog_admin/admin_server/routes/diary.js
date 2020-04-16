const express = require("express");
const diaryModel = require("../db/diaryModel");
const diaryImageUpload = require("../upload/diaryImage");

let router = express.Router()

/**
 * @api {post} /api/diary/uploadDiaryImage 添加日记图片
 * @apiName UploadDiaryImage
 * @apiGroup Diary
 * @apiDescription 上传日记图片
 *
 * @apiParam {file} file 二进制文件
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功",
 *       "surface": "http://localhost:3001/images/diary/salfsdk.jpg"
 *     }
 */
router.use("/uploadDiaryImage",diaryImageUpload);

/**
 * @api {post} /api/diary/addDiary 添加日记
 * @apiName AddDiary
 * @apiGroup Diary
 * @apiDescription 添加日记
 *
 * @apiParam {string} title 日记标题
 * @apiParam {string} content 日记内容（建议使用html语句）
 * @apiParam {array} imgArr 日记图片数组
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功"
 *     }
 */
router.post("/addDiary",(req,res) => {
    let {title,content,imgArr} = req.body;
    if(!title || !content){
        res.send({
            code: 4,
            msg: '必须参数不能为空'
        });
    }
    diaryModel.create({title,content,imgArr}).then(data => {
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
 * @api {get} /api/diary/getDiaryListLazyed 日记列表
 * @apiName GetDiaryListLazyed
 * @apiGroup Diary
 * @apiDescription 懒加载获取日记列表
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
router.get("/getDiaryListLazyed",(req,res) => {
    let {skip,limit} = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 5;
    diaryModel.find({},{__v: 0,imgArr: 0},{skip,limit},((err,docs) => {
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
 * @api {get} /api/diary/getTotalDiary 日记总数
 * @apiName GetTotalDiary
 * @apiGroup Diary
 * @apiDescription 获取日记总数，用于日记分页
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "total": 10
 *     }
 */
router.get("/getTotalDiary",(req,res) => {
    diaryModel.find({},((err,data) => {
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
 * @api {delete} /api/diary/deleteDiaryById 删除日记
 * @apiName DeleteDiaryById
 * @apiGroup Diary
 * @apiDescription 通过id删除日记
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
router.delete("/deleteDiaryById",(req,res) => {
    let {_id} = req.body;
    diaryModel.deleteOne({_id},((err,data) => {
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