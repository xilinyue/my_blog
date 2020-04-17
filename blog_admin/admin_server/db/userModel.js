const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String,required: true},
    password: {type: String,required: true},
    //注册时间
    regDate: {type: String, default: new Date().getTime()},
    //头像，注册时默认，后期可以用户自己修改
    avatar: {type: String, default: 'http://47.104.155.124:3000/images/defaultAvatar.jpg'},
    //是否可用  1 可用，0 不可用
    disabled: {type: Boolean,default: false},
    //是否是管理员
    admin: {type: Boolean,default: false}
});

let userModel = mongoose.model('user',userSchema);

module.exports = userModel;