const express = require('express');
const articleInfoModel = require('../db/articleInfoModel');

let router = express.Router();

/**
 * @api {post} /api/articleInfo/addTag 添加tag
 * @apiName AddTag
 * @apiGroup ArticleInfo
 * @apiDescription 添加一个自定义的文章标签
 *
 * @apiParam {string} tag is add to articleinfo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功"
 *     }
 */
router.post("/addTag",(req,res) => {
   let {tag} = req.body;
   if (!tag) {
       res.send({
           code: 4,
           msg: '必须参数不能为空'
       });
   }
   articleInfoModel.findOne({}).then(data => {
       let index = data.tags.indexOf(tag) + 1;
       if (index) {
           res.send({
               code: 1,
               msg: '该tag已经存在'
           });
       }else{
           articleInfoModel.updateOne({},{$push: {tags: tag}}).then(data1 => {
               res.send({
                   code: 0,
                   msg: '添加成功'
               });
           });
       }
   }).catch(err => {
       res.send({
           code: 5,
           msg: '服务器错误'
       });
   });
});

/**
 * @api {get} /api/articleInfo/getAlltag 获取所有的tag
 * @apiName GetAllTag
 * @apiGroup ArticleInfo
 * @apiDescription 获取所有博客的tag
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "data": ["HTML","Node.js"]
 *     }
 */
router.get("/getAlltag",(req,res) => {
    articleInfoModel.findOne({},{__v: 0}).then(doc => {
        if(doc){
            res.send({
                code: 0,
                msg: '数据获取成功',
                data: doc.tags
            })
        }
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        })
    });
});

/**
 * @api {get} /api/articleInfo/getArticleTotal 获取博客总条数
 * @apiName GetArticleTotal
 * @apiGroup ArticleInfo
 * @apiDescription 获取博客总条数
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "数据获取成功",
 *       "total": 6
 *     }
 */
router.get("/getArticleTotal",(req,res) => {
    articleInfoModel.findOne({},{__v: 0}).then(doc => {
        if(doc){
            res.send({
                code: 0,
                msg: '数据获取成功',
                total: doc.num
            })
        }
    }).catch(err => {
        res.send({
            code: 5,
            msg: '服务器错误'
        })
    });
});

/**
 * @api {delete} /api/articleInfo/deleteTag 删除tag
 * @apiName DeleteTag
 * @apiGroup ArticleInfo
 * @apiDescription 删除某个tag
 * 
 * @apiParam {string} tag 要删除的tag
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "删除成功"
 *     }
 */
router.delete("/deleteTag",(req,res) => {
    let {tag} = req.body;
    if(!tag){
        res.send({
            code: 4,
            msg: '参数不能为空'
        });
    }
    articleInfoModel.updateOne({},{$pull:{tags:tag}}).then(doc => {
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