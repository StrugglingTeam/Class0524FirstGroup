var mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost:27017/practice', {useNewUrlParser: true})
//监听数据库
mongoose.connection.once('open',function (err) {
    if(!err) console.log('数据库连接成功');
    else console.log(err);
})