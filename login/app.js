var express = require('express');

/*链接数据库*/
require('./db');

/*引入Users模块*/
var Users = require('./model/Users');

var app = express();
app.get('/login',function(req,res){
    var username = req.query.username;
    var pwd = req.query.pwd;
    /*在数据库中查找是否有相同的username*/
    /*判断username，pwd是否有值，若为空则提示输入账号和密码*/
    if(username.length !== 0 && pwd.length !== 0){
        Users.findOne({username:username}, function(err, data){
            /*判断用户名是否一致，不一致则账号不存在
            * 账号存在时判断账号密码是否正确，一致则输出登陆，否则输出密码有误
            * */
            if(err){
                //res.send(500);
                console.log(err);
            }else if(!data){
                    res.send('用户名不存在...');
                   // res.send(404);
                }else{
                    if(pwd != data.pwd){
                        res.send('密码有误...');
                       // res.send(404);
                    }else{
                        res.send('登陆成功！！！');
                        //res.send(200);
                    }
                }
        });
    }else{
        console.log('请输入账号或密码。。。')
    }
});
app.get('/regist',function(req,res){
    /*
    * 1.获取用户名填写的信息
    * 2.判断密码和确认密码是否一致
    * 3.正则验证用户填写的信息是否规范
    * 4.去数据库中查找是否有相同的用户名
    *   如果有的话，返回注册失败
    * 5.将用户的信息保存数据库中，注册成功
    * */
    var username = req.query.username;
    var pwd = req.query.pwd;
    var rePwd = req.query.rePwd;
    var email = req.query.email;
    /*判断确认密码是否和密码设置的一致*/
    if(pwd !== rePwd){
        res.send('两次输入的密码不一致，请重新输入！！！');
        return;
    }
    /*确定username,pwd,email名是否符合规则-----正则表达式*/
    var usernameReg = /^[A-Za-z_0-9]{5,10}$/;
    var pwdReg = /^[A-Za-z_0-9]{6,18}$/;
    var emailReg = /^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/;

    if(!usernameReg.test(username)){
        res.send('用户名不符合规则');
        return;
    }else if(!pwdReg.test(pwd)){
        res.send('密码不符合规则');
        return;
    }else if(!emailReg.test(email)){
        res.send('邮箱不符合规则');
        return;
    }
    /*判断username与数据库中的username是否有重复*/
    Users.findOne({username: username}, function (err, data) {

        if(!err && !data){
            Users.create({username: username, pwd: pwd, email: email}, function(err){
                if(!err) res.send('注册成功');
                else console.log(err);
            })
        }else{
            res.send('用户名已存在，请重新输入。。。');
        }
    })
});

app.listen(3000,function(err){
    if(!err) console.log('服务器启动成功！！！');
    else console.log(err);
});