const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../Models/User');

module.exports = async function(req, res, next, restriction = null) {
    // Get toket from header
    const token = req.header('x-auth-token');

    
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'لطفا برای ادامه وارد سایت شوید' });
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = await User.findOne({ _id: decoded.user.id });
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ msg: 'Token is not Valid' });
    }
};
