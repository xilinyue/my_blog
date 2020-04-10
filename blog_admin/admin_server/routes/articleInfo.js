const express = require('express');
const articleInfoModel = require('../db/articleInfoModel');

let router = express.Router();

/**
 * @api {post} /api/articleInfo/addTag 添加tag
 * @apiName AddTag
 * @apiGroup ArticleInfo
 * @apiDescription 添加一个自定义的文章标签
 *
 * @apiParam {tag} tag is add to articleinfo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "添加成功"
 *     }
 *
 */
router.post('/addTag',(req,res) => {
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

module.exports = router;