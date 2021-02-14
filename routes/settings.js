const express = require('express');
const router = express.Router();
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { uploadDir, upload } = require('../middleware/uploadHelper');
const idGenerator = require('../middleware/idGenerator');

// Models
const UserType = require('../Models/UserType');
const Status = require('../Models/Status');
const Star = require('../Models/Star');
const Category = require('../Models/Category');
const Project = require('../Models/Project');

// @router POST api/settings/types
// @desc make a user type
// @access Private + Admin
router.post(
	'/types',
	auth,
	[ check('title', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
	[ check('ID', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
	async (req, res) => {
		if (req.user.type != 0) {
			return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { title, ID } = req.body;
		try {
			let type = await UserType.findOne({ ID });
			if (type) return res.status(400).json({ msg: 'این آیدی قبلا ثبت شده است' });

			type = new UserType({
				title,
				ID
			});
			await type.save();
			return res.json(type);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: 'خطای سرور!', error: err.message });
		}
	}
);

// @router GET api/settings/types
// @desc Get all user types
// @access Public
router.get('/types', async (req, res) => {
	let types = await UserType.find({ ID: { $ne: 0 } });
	try {
		res.json(types);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'خطای سرور!', error: err.message });
	}
});

// @ID دسته بندی ها
// @router POST api/settings/categories
// @desc make a category
// @access Private + Admin
router.post(
	'/categories',
	auth,
	[ check('title', 'لطفا یک عنوان وارد نمایید').not().isEmpty() ],
	[ check('picture', 'لطفا یک عکس برای دسته‌بندی انتخاب نمایید').not().isEmpty() ],
	async (req, res) => {
		if (req.user.type != 0) {
			return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { title } = req.body;
		let ID = await idGenerator(Category);

		try {
			let cat = await Category.findOne({ title });
			if (cat) return res.status(400).json({ msg: 'این عنوان قبلا ثبت شده است' });

			let picName = upload(req.files.picture, `/categories/`, ID);

			cat = new Category({
				title,
				ID,
				picture: picName
			});
			await cat.save();
			return res.json(cat);
		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: 'خطای سرور!', error: err.message });
		}
	}
);

// @router GET api/settings/categories
// @desc Get all categories
// @access Public
router.get('/categories', async (req, res) => {
	let cats = await Category.find({});
	try {
		res.json(cats);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'خطای سرور!', error: err.message });
	}
});

// @router POST api/settings/status
// @desc make a status type
// @access Private + Admin
router.post(
	'/status',
	auth,
	[ check('title', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
	[ check('step', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
	async (req, res) => {
		if (req.user.type != 0) {
			return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { title, step } = req.body;
		try {
			let state = await Status.findOne({ step });
			if (state) return res.status(400).json({ msg: 'این آیدی قبلا ثبت شده است' });

			state = new Status({
				title,
				step
			});
			await state.save();
			return res.json(state);
		} catch (err) {
			console.log(err.message);
			res.status(500).json({ msg: 'خطای سرور!', error: err.message });
		}
	}
);

// @router GET api/settings/status
// @desc Get all project status
// @access Private
router.get('/status', auth, async (req, res) => {
	let all = await Status.find({});
	try {
		res.json(all);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'خطای سرور!', error: err.message });
	}
});

// @router POST api/settings/star
// @desc make a star
// @access Private + Admin
router.post(
	'/star',
	auth,
	[ check('category', 'دسته بندی اجباری می‌باشد').not().isEmpty() ],
	[ check('starCount', 'تعداد ستاره اجباری می‌باشد').not().isEmpty() ],
	[ check('point', 'امتیاز لازم اجباری می‌باشد').not().isEmpty() ],
	[ check('price', 'قیمت اجباری می‌باشد').not().isEmpty() ],
	async (req, res) => {
		if (req.user.type != 0) {
			return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { category, starCount, point, price } = req.body;
		try {
			let cat = await Category.findOne({ ID: category });
			let star = await Star.findOne({ starCount, category: cat });
			if (star) {
				return res.status(400).json({ msg: 'این ستاره برای این دسته بندی قبلا ثبت شده است' });
			} else {
				let star = new Star({
					starCount,
					point,
					price,
					category: cat
                });
				await star.save();
				return res.json(star);
			}
		} catch (err) {
			console.log(err.message);
			res.status(500).json({ msg: 'خطای سرور!', error: err.message });
		}
	}
);

// @router GET api/settings/stars
// @desc Get all stars
// @access Private
router.get('/stars', auth, async (req, res) => {
	let all = await Star.find({}).populate("category");
	try {
		res.json(all);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'خطای سرور!', error: err.message });
	}
});
// @router GET api/settings/tags
// @desc Get all tags
// @access Private
router.get('/tags', auth, async (req, res) => {
	try {
		let all = await Project.find({}).select('tags');
		// console.log(all);
		let response = [];
		all.forEach((obj) => {
			response.push(obj.tags);
		});
		res.json([].concat.apply([], response));
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'خطای سرور!', error: err.message });
	}
});

module.exports = router;
