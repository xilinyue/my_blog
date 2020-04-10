const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/my_blog',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("数据库连接成功")})
.catch(() => {console.log("数据库连接失败")});

module.exports = mongoose;