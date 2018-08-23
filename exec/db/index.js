//引入mongoose模块
var mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://localhost:27017/master',{useNewUrlParser:true});
//绑定事件监听，监听数据库是否链接成功
mongoose.connection.once('open',function (err) {
  if(!err) console.log('数据库链接成功');
  else console.log(err);
})
