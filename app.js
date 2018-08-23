var express = require('express')
//连接数据库
require('./database/database')

//引入模型对象
var admins = require('./model/admin')


var app = express()
// 绑定路由
//登录
//1.获取用户信息

 app.get('/login',function (req,res) {


     var usernameL = req.query.username;
     var pwdL = req.query.pwd;
     var rePwdL = req.query.rePwd;
     var emailL = req.query.email;


     admins.findOne({username:usernameL,pwd:pwdL},function (err,data) {
         if(!err && data){
             res.send('登录成功')
             return
         }else{
             res.send('用户名或密码错误')
             return
         }
     })

 })
//注册路由
// 1. 获取用户填写的信息
// 2. 判断密码和确认密码是否一致
// 3. 正则验证用户填写的信息是否规范
// 4. 去数据库中查找是否有相同用户名，
//         如果有的话，返回注册失败
// 5. 将用户的信息保存数据库中，注册成功
app.get('/regist',function (req,res) {

    // 1. 获取用户填写的信息
    var username = req.query.username;
    var pwd = req.query.pwd;
    var rePwd = req.query.rePwd;
    var email = req.query.email;
    // 2. 判断密码和确认密码是否一致
    if(pwd !== rePwd){
        res.send('两次输入密码不一致，请重新输入。。。')
        return;
    }
    // 3. 正则验证用户填写的信息是否规范
    var usernameReg = /^[A-Za-z_0-9]{5,10}$/     //用户可以输入英文、数字、下划线，长度为5-10位
    var pwdReg = /^[A-Za-z_0-9]{6,18}$/     //可以输入英文、数字、下划线，长度为6-18位
    var emailReg = /^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/

    if(!usernameReg.test(username)){
        res.send('用户名格式不对，请重新输入。。。')
        return;
    }else if(!pwdReg.test(pwd)){
        res.send('密码格式不对，请重新输入。。。')
        return;
    }else if(!emailReg.test(email)){
        res.send('邮箱格式不对，请重新输入。。。')
        return;

    }

    // 4. 去数据库中查找是否有相同用户名，
//         如果有的话，返回注册失败
    admins.findOne({username:username},function (err,data) {
         //方法没错，并且没有重复的名字就新建一个文档
        if(!err && !data){
            admins.create({
                username:username,
                pwd:pwd,
                email:email
            })
            if (!err) {
                res.send('注册成功~');
            }else{
                console.log(err);
            }
        }else{
            //有重复的名字或方法不对
            res.send('用户名已存在。。。')


        }
    })



})
//监听端口
app.listen(5000,function (err) {
    if(!err) console.log('服务器连接成功')
    else console.log(err);
})