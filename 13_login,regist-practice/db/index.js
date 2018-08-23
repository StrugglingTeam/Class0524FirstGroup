//引入mongoose模块
var mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://localhost:27017/exec",{useNewUrlParse:true});
//绑定事件监听，监听事件是否连接成功
mongoose.connection.once("open",function (err) {
  if(!err) console.log("数据连接成功了~~");
  else console.log(err);
});


