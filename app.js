var express=require('express');

require('./db');

var Users=require('./model/Users');

var app=express();

app.get('/login',function (req,res) {
  var username=req.query.username;
  var pwd=req.query.pwd;
  
  Users.findOne({username:username},function (err,data) {
    if(!err && data && data.pwd===pwd){
      res.send('恭喜您登录成功~~~');
    }else{
      res.send('用户名或密码错误~~~');
    }
  })
})

app.get('/regist',function (req,res) {

  var username=req.query.username;
  var pwd=req.query.pwd;
  var rePwd=req.query.rePwd;
  var email=req.query.email;

  if(pwd !== rePwd){
    res.send('两次输入的密码不一致，请重新输入~~');
    return;
  }

  var userNameReg=/^[A-Za-z_0-9]{5,10}$/
  var pwdReg=/^[A-Za-z_0-9]{6,18}$/
  var emailReg=/^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/

  if(!userNameReg.test(username)){
    res.send('用户名不符合规范，可以输入英文、数字、下划线，长度为5-10位');
    return;
  }else if(!pwdReg.test(pwd)){
    res.send('密码不符合规范，可以输入英文、数字、下划线，长度为6-18位');
    return;
  }else if(!emailReg.test(email)){
    res.send('邮箱不符合规范');
    return;
  }

  Users.findOne({username:username},function (err,data) {
    if(!err && !data){
      Users.create({username:username,pwd:pwd,email:email},function (err) {
        if(!err) res.send('注册成功');
        else console.log(err);
      })
    }else {
      res.send('用户名已存在，请重新输入~');
    }
  })
})

app.listen(4000, function (err) {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})
