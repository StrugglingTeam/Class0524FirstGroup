var mongoose = require('mongoose')
//模式对象
var Schema = mongoose.Schema
//约束对象
var adminSchema = new Schema({
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
})
//更新
adminSchema.pre('save', function (next) {
    if (!this.isNew) this.meta.updateTime = Date.now();
    next();
})

//模型对象
var admins = mongoose.model('admins',adminSchema)

//暴露模型对象
module.exports = admins