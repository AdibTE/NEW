const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../Models/User');
const { json } = require('express');

module.exports = async function(req, res, next) {
    // Get toket from header
    const token = req.header('x-auth-token');
 
    // Check if not token
    if (!token) {
        req.user = null;
    }
    else {
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = await User.findOne({ _id: decoded.user.id }).select('-password');
            req.userObjectId = decoded.user;
        } catch (err) {
            console.log(err)
            req.user = null;
        }
    }
    next();
};
