//上传接口
const express = require("express");
let router = express.Router();

const multer = require('multer');
const path = require("path");
const userModel = require('../db/userModel')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/images/upload/avatar'));
    },
    filename: function (req, file, cb) {
  
      let fileName = "";
      if (req.session.userInfo) {
        fileName = req.session.userInfo._id + file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
      }else{
        fileName = file.fieldname + '-' + Date.now() +file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
      }
  
      cb(null, fileName);
    }
  });
  
  let upload = multer({ storage }).single('file');

//上传头像
router.post('/avatar',(req,res) => {
    upload(req, res, function (err) {
        //发生错误
        if (err instanceof multer.MulterError) {
          res.sendStatus(500);
        } else if (err) {
          res.sendStatus(500);
        }else{
          //一切都好
          //更新用户表
          if (!req.session.userInfo){
            res.sendStatus(500);
            return;
          }
          userModel.updateOne(
            {_id: req.session.userInfo._id},
            {avatar:"http://localhost:3000/images/upload/avatar/"+req.file.filename}
          ).then(data=>{
            //需要更新session存储的数据
            req.session.userInfo.avatar = "http://localhost:3000/images/upload/avatar/"+req.file.filename;
            res.send("OK");
          }).catch(()=>{
            res.sendStatus(500);
          });
        }
      })
});

module.exports = router;