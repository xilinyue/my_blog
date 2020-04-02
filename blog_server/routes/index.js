var express = require('express');
var router = express.Router();
const svgCaptcha = require('svg-captcha');

//用户注册获取图形验证码
router.get('/register/getCheckSvgCode', function(req, res) {
  //时间的限制
  if(req.session.refisterVCodeTime){
    let t_ = new Date().getTime() - new Date(req.session.refisterVCodeTime).getTime()
    if(t_ <= 60000){
      res.send({
        code: 1,
        msg: '请不要频繁请求验证码！！！',
        data: (60000 - t_)
      })
      return;
    }
  }
  
  //创建图形验证码相关数据
  let svgData = svgCaptcha.create();
  req.session.registerVCode = svgData.text;
  req.session.refisterVCodeTime = new Date();
  if(svgData){
    res.send({
      code: 0,
      msg: '验证码获取成功',
      data: svgData.data
    });
  }else{
    res.send({
      code: 5,
      msg: '服务器错误'
    })
  }
});

//图形验证码校验
router.post('/register/checkVCode',(req,res) => {
  let {vcode} = req.body;
  let registerVCode = req.session.registerVCode;
  if(vcode.toUpperCase() === registerVCode.toUpperCase()) {
    res.send({
      code: 0,
      msg: '校验成功',
      data: true
    })
  }else{
    res.send({
      code: 0,
      msg: '校验失败',
      data: false
    })
  }
});


module.exports = router;
