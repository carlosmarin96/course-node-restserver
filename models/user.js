const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is needed']
    },
    email: {
        type: String,
        required: [true, 'The email is needed'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is needed']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema)