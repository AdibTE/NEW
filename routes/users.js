const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const restrict = require('../middleware/restrict');

// Models
const User = require('../Models/User');
const UserTypes = require('../Models/UserTypes');

// @router POST api/users
// @desc Register a user
// @access Public
// @todo confirm password check
router.post(
	'/',
	[
		check('name', 'این فیلد اجباری می‌باشد').not().isEmpty(),
		check('type', 'این فیلد اجباری می‌باشد').not().isEmpty(),
		check('email', 'لطفا یک آدرس ایمیل معتبر وارد کنید').isEmail(),
		check('password', 'کلمه عبور نباید کمتر از 6 کاراکتر باشد').isLength({ min: 6 }),
		check('confirmPassword', 'این فیلد اجباری می‌باشد').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		let { email, name, type, password, confirmPassword } = req.body;
		try {
			let user = await User.findOne({ email });

			if (type == 0) return res.status(401).json({ msg: 'عدم دسترسی' });
			if (user) return res.status(400).json({ msg: 'این ایمیل قبلا ثبت شده است' });
			if (password != confirmPassword) return res.status(400).json({ msg: 'کلمه عبور با هم مطابقت ندارد' });

			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(password, salt);

			user = new User({
				email,
				type,
				name,
				password
			});
			await user.save();

			const payLoad = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payLoad,
				config.get('jwtSecret'),
				{
					expiresIn: 36000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err);
			res.status(500).send('خطای سرور!');
		}
	}
);

// @router POST api/users/types
// @desc make a user type
// @access Private + Admin
router.post(
	'/types',
	auth,
	restrict,
	[ check('title', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
	[ check('refrence', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { title, refrence } = req.body;
		try {
			let type = await UserTypes.findOne({ refrence });
			if (type) return res.status(400).json({ msg: 'این آیدی قبلا ثبت شده است' });

			type = new UserTypes({
				title,
				refrence
			});
			await type.save();
			return res.json(type);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: 'خطای سرور!' });
		}
	}
);

// @router GET api/users/types
// @desc Get all user types
// @access Public
router.get('/types', async (req, res) => {
	let types = await UserTypes.find({ refrence: { $ne: 0 } });
	try {
		res.json(types);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'خطای سرور!' });
	}
});

module.exports = router;
