const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {ROLES} = require("../utils/constant");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ROLES.EMPLOYEE, ROLES.MANAGER],
        default: ROLES.MANAGER
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

exports.getAllUsers = async () => {
    return User.find();
};

exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return newUser.save();
};

exports.updateUser = async (userId, userData) => {
    return User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.findUserByEmail = async (email) => {
    return User.findOne({ email });
};
