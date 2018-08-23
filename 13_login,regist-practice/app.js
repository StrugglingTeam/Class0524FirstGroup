//引入express模块
var express = require("express");
//连接数据库
require("./db");
//引入Users模块
var Users = require("./model/Users");

//创建应用对象
var app = express();

//设置路由

  //登录逻辑的路由
app.get("/login",function (req,res) {
  /*1.判断登录名是否存在，不存在返回响应
  * 2.用户名存在，密码不对，返回响应
  * 3.用户名存在，密码正确，登录成功
  */

//获取登录界面的用户名，用户密码
  var username = req.query.username;
  var pwd = req.query.pwd;

//去数据库中查找是否有相同用户名
  Users.findOne({username:username},function (err,data) {
    //方法出错了，或者没有找到相同的用户名
    if (!err){

      if(!data){

        res.send('该用户不存在,请重新注册');

      }else if (data.pwd !== pwd){

        res.send('密码不正确，请重新输入密码')

      } else {
        //方法没有出错并且找到相同用户名
        res.send('登录成功')
      }
    } else{
      console.log(err);
    }
  });
});




  //注册逻辑的路由
app.get("/regist",function (req,res) {
  /*
  * 1.获取用户填写的信息
  * 2.判断密码和确认密码是否一致
  * 3.利用正则验证填写的信息是否规范
  * 4.去数据库中查找是否有相同的用户名，若有，返回注册失败
  * 5.保存用户信息到数据库中，注册成功
  */

  //1. 获取用户填写的信息
  var username = req.query.username;
  var pwd = req.query.pwd;
  var rePwd = req.query.rePwd;
  var email = req.query.email;

//2.判断密码和确认密码是否一致
  if(pwd !== rePwd){
    res.send("两次输入的密码不一致，请重新输入");
    return;
  }

//3.利用正则验证填写的信息是否规范
  var usernameReg = /^[A-Za-z_0-9]{6,10}$/; //用户名可以是英文数字下划线，长度为 6--8
  var pwdReg = /^[A-Za-z_0-9]{6,10}$/;    //用户名可以是英文数字下划线，长度为 6--10
  var emailReg = /^[0-9]{6,10}@[A-Za-z]{2,5}\.com$/;  //邮箱是数字[6,10] @ 字母[2,5] .com

  if(!usernameReg.test(username)){
    res.send("用户名违法，请输入英文，数字，下划线，长度为 6-8 位");
    return;
  } else if(!pwdReg.test(pwd)){
    res.send("用户密码违法，请输入英文，数字，下划线，长度为 6-10 位");
    return;
  } else if(!emailReg.test(email)){
    res.send("邮箱违法，请输入数字 6-10 位 @ 字母 2-5 位 .com");
    return;
  }

// 4.去数据库中查找是否有相同的用户名，若有，返回注册失败
  Users.findOne({username: username},function (err,data) {
    if(!err && !data){
    //  没出错并且数据库中没有相同的用户名
    //  5.保存用户信息到数据库中，注册成功
      Users.create({username: username, pwd: pwd, email: email},function (err) {
        if(!err) res.send("注册成功了");

        else console.log(err);
      })
    } else {
    //  方法出错了或者找到相同的用户名
      res.send("用户名已存在，请重新输入");
    }
  });
});

//监听端口号
app.listen(3000,function (err) {
  if(!err) console.log("服务器启动成功了");
  else console.log(err);
});

