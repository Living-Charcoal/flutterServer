const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    nickname: String,
    image: String,
    age: Number,
    sex: Number,
    password: String
});
const UserSchema = mongoose.model('user', User);

module.exports = UserSchema;
