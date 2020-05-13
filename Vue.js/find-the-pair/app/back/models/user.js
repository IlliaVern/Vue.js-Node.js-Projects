const mongoose = require('mongoose')
const crypto = require('crypto')

const {Schema} = mongoose

const UsersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String, // поле с хэшэм пароля
    salt: String  // поле с ключом
})

//---Функция для формирования хэша пароля---

UsersSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

//---Функция для проверки правильности пароля---

UsersSchema.methods.validPassword = function(password){
    //---Формируем хэш переданого для проверки пароля---
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    //---Проверяем получен такой ли хэш как в базе---
    return this.hash === hash
}

module.exports = mongoose.model('Users', UsersSchema)


