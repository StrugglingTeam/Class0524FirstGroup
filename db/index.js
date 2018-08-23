var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exec',{useNewUrlParser:true});
mongoose.connection.once('open',function (err) {
  if (!err) console.log('数据连接成功了。');
  else console.log(err);
})