var express = require('express');
require('./db/index');
var users = require('./model/users')
var app = express();
app.get('/login',function (req,res) {

  var username = req.query.username;
  var pwd = req.query.pwd;


  users.findOne({username: username}, function (err, data) {
    if (!err && data && data.pwd === pwd) {
      res.send('恭喜您登录成功~~~');
    } else {
      res.send('用户名或密码错误~~~');
    }
  })
})
app.get('/regist',function (req,res) {
  //1.获取用户填写的信息。
  var username = req.query.username;
  var pwd = req.query.pwd;
  var repwd = req.query.repwd;
  var email = req.query.email;

  //2.判断密码和确认密码是否一致。
  if (pwd !== repwd){
    //返回响应，错误提示给用户
    res.send('两次密码输入不一致，请重新输入。');
    return
  }
  //3.正则验证用户填写的信息是否规范。
  //用户可以输入英文，数字，下划线，长度为五到十位。
  var usernameReg = /^[A-Za-z_0-9]{5,10}$/
  //密码可以输入英文，数字，下划线尝到为六到十八位。
  var pwdReg = /^[A-Za-z_0-9]{6,18}$/
  //邮箱可以输入英文，数字，三到十位，下划线，@符号，英文，数字，二到五位。
  var emailReg = /^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/
  if (!usernameReg.test(username)){
    //返回响应，错误提示给用户
    res.send('用户名不符合规范，可以输入英文，数字，下划线，长度为五到十位');
    return;
  }else if(!pwdReg.test(pwd)){
    //返回响应，错误提示给用户
    res.send('密码不符合规范，可以输入英文，数字，下划线尝到为六到十八位');
    return;
  } else if(!emailReg.test(email)) {
    //返回响应，错误提示给用户
    res.send('邮箱不符合规范');
    return;
  }
  //4.取数据库中查找是否有相同的用户名。
  users.findOne({username:username},function (err,data) {
    if (!err && !data) {
      //5.将用户的信息保存数据库中，注册成功。
      users.create({username:username,pwd:pwd,email:email},function (err) {
        if (!err) res.send('注册成功');
        else console.log(err);
      })
    }else{
      res.send('用户名已存在，请重新输入');
    }
  })

})



app.listen(3000,function (err) {
  if (!err)console.log('服务器启动成功了！');
  else console.log(err);
})