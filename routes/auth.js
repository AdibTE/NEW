const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// Models
const User = require('../Models/User');

// @router Get api/auth
// @desc Get logged in user
// @access Private
router.get('/',auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err){
        console.error(err.message);
        res.status(500).json({ msg: 'خطای سرور!',error:err.message });
    }
});

// @router Post api/auth
// @desc Auth user & get token
// @access Public
router.post(
    '/',
    [ check('email', 'لطفا یک ایمیل معتبر وارد کنید').isEmail(), check('password', 'کلمه عبور را وارد نمایید').exists() ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {email , password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user) return res.status(400).json({msg:'این ایمیل پیدا نشد!'});
            
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg:'رمز عبور وارد شده اشتباه است!'})

            const payLoad = {
                user:{
                    id: user.id
                }
            };

            // jwt.sign(payLoad,config.get('jwtSecret'),{expiresIn:360000},...
            jwt.sign(payLoad,config.get('jwtSecret'),(err,token)=>{
                if(err) throw err;
                res.json({token})
            })
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'خطای سرور!',error:err.message });
        }
    }
);

module.exports = router;
