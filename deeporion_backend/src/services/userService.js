const User = require('../models/userModel');
const employeeService = require("./employeeService");
const {ROLES} = require("../utils/constant");

exports.getAllUsers = async () => {
    return User.getAllUsers();
};

exports.createUser = async (req, res) => {
    const user = await User.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.isManager ? ROLES.MANAGER : ROLES.EMPLOYEE
    });
    return await employeeService.createEmployee(req, res, user._id);
};

exports.updateUser = async (userId, userData) => {
    return User.updateUser(userId, userData);
};

exports.findUserByEmail = async (email) => {
    return User.findUserByEmail(email);
};
