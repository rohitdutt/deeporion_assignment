const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require("../services/userService");
const employeeService = require("../services/employeeService");

exports.register = async (req, res) => {
    try {
        const user = await userService.createUser(req, res);
        const token = jwt.sign({ _id: user._id, role: user.role }, "process.env.JWT_SECRET");
        res.header('Authorization', 'Bearer ' + token).send(user);
    }catch (err) {
        res.status(400).send(err.message);
    }
}

exports.login = async (req, res) => {
    try {
        const user = await userService.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret');
        res.header('Role', user.role);
        res.header('Authorization', 'Bearer ' + token).send('Logged in successfully.');
    } catch (err) {
        res.status(400).send(err.message);
    }
};