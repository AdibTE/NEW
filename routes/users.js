const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// Models
const User = require('../Models/User');

// @router POST api/users
// @desc Register a user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or ore characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'Email already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            user = new User({
                name,
                email,
                password
            });
            await user.save();
            const payLoad = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payLoad, config.get('jwtSecret'),{
                expiresIn: 36000
            },(err,token)=>{
                if(err) throw err;
                res.json({token})
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
