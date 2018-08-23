var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  username:{
    type:String,
    unique:true,
    required:true
  },
  pwd:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  meta:{
    createTime:{
      type:Date,
      default:Date.now()
    },
    updateTime:{
      type:Date,
      default:Date.now()
    }
  }
});

schema.pre('save',function (next) {
  if (!this.isNew){
    this.meta.updateTime = Date.now()
  }
  next();
});

var Users = mongoose.model('Users',schema);

module.exports = Users;