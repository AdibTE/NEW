const User = require('../Models/User');

module.exports = async function(req, res, next) {
    let user = await User.findOne({ _id: req.user.id });
    if (user.type == 0) {
        next();
    } else {
        return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
    }
};
