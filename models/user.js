const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        function (value) {
            console.log(value)
            if (value.length < 6) {
                throw new Error('Password must be of length 6');
            }
        }
    }
})

UserSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });

    if (!user)
        return {
            "error": "User not found"
        }
    if (!(user.password === password))
        return {
            "error": "Something does not match"
        };

    return user;

}


const User = mongoose.model('User', UserSchema);
module.exports = User;