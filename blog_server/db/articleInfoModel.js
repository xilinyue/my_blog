const mongoose = require('mongoose');

//存储所有文章的总信息
let articleInfoModel = mongoose.model('articleInfo',new mongoose.Schema({
    tags: [String],
    num: {type: Number, required: true}   //所有文章总数量
}));

// articleInfoModel.create({
//     tags: ['个人日记','HTML5&CSS3','JavaScript', 'Vue&Node', '其他'],
//     num: 100
// });

module.exports = articleInfoModel;