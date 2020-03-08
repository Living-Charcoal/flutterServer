const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    //_id: Schema.Types.ObjectId,
    username: String,
    nickname: String,
    image: String,
    age: Number,
    sex: Number,
    password: String
});
const Users = mongoose.model('users', User);

module.exports = Users;
