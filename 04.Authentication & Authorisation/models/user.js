const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/authtestapp");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    age: Number
});

module.exports = mongoose.model("user", userSchema);    