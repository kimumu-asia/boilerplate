const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 15
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// user모델에 정보를 저장하기 전에 지정 함수를 실행함
userSchema.pre('save', function( next ){
    var user = this
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {

        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
    // if (user.isModified('password')) {
    // }
})

const User = mongoose.model('User', userSchema)
module.exports = { User }
