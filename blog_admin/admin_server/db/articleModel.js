const mongoose = require('mongoose');
const articleInfoModel = require("./articleInfoModel");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
    type: {type: String, required: true},
    title: {type: String, required: true},
    abstract: {type: String, required: true}, //文章概要
    content: {type: String, required: true},
    contentMarkdown: {type: String, required: true},
    date: {type: Date, default: Date.now},
    updateDate: {type: Date,default: Date.now},
    tag: {type: String, required: true},
    surface: {type: String, default: 'http://47.104.155.124:3000/images/defaultSurface.png'},   //存储文章的图片，默认值
    pv: {type: Number, default: 0},
    comment: [
        {type: Schema.Types.ObjectId, ref: 'comment'}
    ]
});

//新增博客时更新articleInfo中的num
articleSchema.pre("save",function(next){
    //保存的时候，更新articleInfo表
    articleInfoModel.findOne({})
      .then(data=>{
        if (data){
          //如果已经存在了data 更新num
          articleInfoModel
            .updateOne({},{$inc:{num:1}})
            .then(d=>{}).catch(e=>{})
        }
      })
    next();
  });

articleSchema.pre('update',(next) => {
    this.updateDate = new Date;
    next();
});

let articleModel = mongoose.model('article',articleSchema);

// //数据造假
// for(let i = 0; i < 100; i++){
//     articleModel.create({
//         type: ['原创','转载'][(Math.random()*2) | 0],
//         title: `第${i}篇文章的标题`,
//         content: ("" + i + i + i + "我是这篇文章的内容，娟娟唯有西林月，不惜清光照竹扉").repeat(10),
//         tag: ['个人日记','HTML5&CSS3','JavaScript', 'Vue&Node', '其他'][(Math.random()*5) | 0]
//     })
// }

module.exports = articleModel;