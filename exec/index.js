require('./db/db');
var express = require('express');
var Users = require('./model/schema');


//创建应用对象
var app = express();
//设置路由
//处理登录逻辑的路由
app.get('/login',function (req,res) {

  //获取用户填写的信息
  var username = req.query.username;
  var pwd = req.query.pwd;

  //去数据库中查找是否有相同用户名
  Users.findOne({username:username},function (err,data) {
    //方法出错了，或者没有找到相同的用户名
    if (!err){

      if(!data){

        res.send('该用户不存在,请重新注册');

      }else if (data.pwd !== pwd){

        res.send('密码不正确，请重新输入')

      } else {
        //方法没有出错并且找到相同用户名
        res.send('登录成功')
      }
    } else{

        console.log(err);
    }
  });


});
//处理注册逻辑的路由
app.get('/regist',function (req,res) {


  //获取用户填写的信息
  var username = req.query.username;
  var pwd = req.query.pwd;
  var rePwd = req.query.rePwd;
  var email = req.query.email;

  //判断密码和确认密码是否一致,这里只判断不一样的时候
  if (pwd !== rePwd){
    //返回响应，错误提示用户
    res.send('两次输入的密码不一致，请重新输入');
    return;
  }

  //正则验证用户填写的信息是否规范
    var usernameReg = /^[A-Za-z0-9_]{5,10}$/  //用户可以输入英文，数字，下划线，长度为5-10位
    var pwdREg = /^[A-Za-z_0-9]{6,18}$/  //可以输入英文，数字，下划线，长度位 6-18位
    var emailReg = /^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/  //@前面可以输入英文，数字，下划线，长度3-10，@后面同理，长度2-5 .要转义

    //验证用户信息是否规范,这里只判断不正确的
  if (!usernameReg.test(username)){
    res.send('用户名不符合规范，请重新输入')
    return;
  }
  if (!pwdREg.test(pwd)){
    res.send('密码不符合规范，请重新输入')
    return;
  }
  if (!emailReg.test(email)){
    res.send('邮箱不符合规范，请重新输入')
    return;
  }

  //去数据库中查找是否有相同用户名
  Users.findOne({username:username,pwd:pwd,email:email},function (err,data) {
    if (!err && !data){
      //方法没出错并且没有找到相同的用户名
      //将用户的信息保存数据库中，注册成功
      Users.create({username:username,pwd:pwd,email:email},function (err) {
        if (!err) res.send('注册成功');
        else console.log(err);
      })

    }else {
      //方法出错了，或者找到了相同的用户名
      res.send('用户已存在，请重新输入')
    }

  })

});

//监听端口号
app.listen(3000,function (err) {
  if (!err){
    console.log('服务器启动成功');
  }else {
    console.log(err)
  }
});