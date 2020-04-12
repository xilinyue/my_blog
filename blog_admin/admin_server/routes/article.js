const express = require("express");
const articleModel = require("../db/articleModel");
const articleInofoModel = require("../db/articleInfoModel");
const articleSurfaceUpload = require("../upload/articleSurface");

let router = express.Router()

/**
 * @api {post} /api/article/uploadSurface 添加博客封面
 * @apiName UploadSurface
 * @apiGroup Article
 * @apiDescription 上传博客封面图片
 *
 * @apiParam {file} file 二进制文件
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功",
 *       "surface": "http://localhost:3001/images/article/surface/salfsdk.jpg"
 *     }
 */
router.use("/uploadSurface",articleSurfaceUpload);

/**
 * @api {post} /api/article/addBlog 新增博客
 * @apiName AddBlog
 * @apiGroup Article
 * @apiDescription 新增博客
 * 
 * @apiParam {string} title 标题
 * @apiParam {string} abstract 概括
 * @apiParam {string} tag 标签
 * @apiParam {string} type 类型
 * @apiParam {string} content 转化为html的内容
 * @apiParam {string} contentMarkdown 未转化的markdown语法
 * @apiParam {string} surface 封面图片
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功"
 *     }
 */
router.post("/addBlog",(req, res) => {
    let {title,abstract,tag,type,content,surface,contentMarkdown} = req.body;
    let data = {};
    data.title = title;
    data.abstract = abstract;
    data.tag = tag;
    data.type = type;
    data.content = content;
    data.contentMarkdown = contentMarkdown;
    if(surface){
        data.surface = surface;
    }
    //这里不进行判空处理
    articleModel.create(data).then(doc => {
        res.send({
            code: 0,
            msg: '添加成功'
        });
    }).catch(err => {
        res.send({
            code: 5,
            msg: '添加失败，服务器错误'
        })
    })
});


/**
 * @api {post} /api/article/updateBlog 编辑博客
 * @apiName UpdateBlog
 * @apiGroup Article
 * @apiDescription 编辑博客
 *
 * @apiParam {string} title 标题
 * @apiParam {string} abstract 概括
 * @apiParam {string} tag 标签
 * @apiParam {string} type 类型
 * @apiParam {string} content 转化为html的内容
 * @apiParam {string} contentMarkdown 未转化的markdown语法
 * @apiParam {string} surface 封面图片
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "更新成功"
 *     }
 */
router.post("/updateBlog",(req, res) => {
    let {_id,title,abstract,tag,type,content,surface,contentMarkdown} = req.body;
    let data = {};
    data.title = title;
    data.abstract = abstract;
    data.tag = tag;
    data.type = type;
    data.content = content;
    data.contentMarkdown = contentMarkdown;
    if(surface){
        data.surface = surface;
    }
    //这里不进行判空处理
    articleModel.updateOne({_id},data).then(doc => {
        res.send({
            code: 0,
            msg: '更新成功'
        });
    }).catch(err => {
        res.send({
            code: 5,
            msg: '添加失败，服务器错误'
        })
    })
});

/**
 * @api {get} /api/article/getBlogById 获取博客信息
 * @apiName GetBlogById
 * @apiGroup Article
 * @apiDescription 通过博客id获取博客详细信息
 *
 * @apiParam {string} _id  博客id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "data": {}
 *     }
 */
router.get("/getBlogById",(req,res) => {
    let {_id} = req.query;
    articleModel.findOne({_id},{__v: 0,comment: 0})
        .then(doc => {
            if(doc){
                res.send({
                    code: 0,
                    msg: '数据获取成功',
                    data: doc
                });
            }else{
                res.send({
                    code: 1,
                    msg: '数据不存在',
                    data: {}
                });
            }
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        });
})


/**
 * @api {get} /api/article/getBlogLazyed 获取博客
 * @apiName GetBlogLazyed
 * @apiGroup Article
 * @apiDescription 懒加载获取博客列表
 *
 * @apiParam {string} skip
 * @apiParam {string} limit
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "data": ""
 *     }
 */
router.get("/getBlogLazyed",(req,res) => {
    let {skip,limit} = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 5;
    articleModel.find({},{__v: 0,comment: 0},{skip,limit,sort: {date: -1}})
        .then(docs => {
            res.send({
                code: 0,
                msg: '数据获取成功',
                data: docs
            });
        }).catch(err => {
            res.send({
                code: 5,
                msg: '服务器错误'
            });
        });
});


/**
 * @api {delete} /api/article/deleteBlogById 删除博客
 * @apiName DeleteBlogById
 * @apiGroup Article
 * @apiDescription 通过博客id删除博客
 *
 * @apiParam {string} _id  博客_id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "删除成功"
 *     }
 */
router.delete("/deleteBlogById",(req,res) => {
   let {_id} = req.body;
   if(!_id){
        res.send({
            code: 4,
            msg: '参数不能为空'
        });
    } 
    articleModel.deleteOne({_id}).then(doc => {
        articleInofoModel.updateOne({},{$inc: {num: -1}}).then(()=> {}).catch(err=>{});
        res.send({
            code: 0,
            msg: '删除成功'
        });
    }).catch(err => {
        console.log(err);
        res.send({
            code: 5,
            msg: '服务器错误'
        });
    });
});

module.exports = router;