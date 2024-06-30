const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {ROLES} = require("../utils/constant");

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send('Access token is missing.');
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send('Looks like you don\'t have access token from the server.');
        }
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('You provided invalid token.');
    }
};

