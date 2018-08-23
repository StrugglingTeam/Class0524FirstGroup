     //此模块用来创建模型对象
   //引入mogoose模块
   var mongoose = require('mongoose');
     //获取schema
     var Schema =mongoose.Schema;
     //创建约束对象
     var stuSchema = new Schema({
         username: {
             type: String,
             unique: true,
             required: true
         },
         pwd: {
             type: String,
             required: true
         },
         email: {
             type: String,
             required: true
         },
         meta: {
             createTime: {
                 type: Date,
                 default: Date.now()
             },
             updateTime: {
                 type: Date,
                 default: Date.now()
             }
         }
     });
     stuSchema.pre('save', function (next) {
         if (!this.isNew) this.meta.updateTime = Date.now();
         next();
     });
     //创建模型对象
     var Studes=mongoose.model('Studes',stuSchema);

     //暴露出去
     module.exports=Studes;
