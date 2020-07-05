const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Models
const UserTypes = require('../Models/UserTypes');
const Status = require('../Models/Status');
const Star = require('../Models/Star');

// @router POST api/settings/types
// @desc make a user type
// @access Private + Admin
router.post(
    '/types',
    auth,
    [ check('title', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('refrence', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        if (req.user.type != 0) {
            return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
        }

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
            res.status(500).json({ msg: 'خطای سرور!',error:err.message });
        }
    }
);

// @router GET api/settings/types
// @desc Get all user types
// @access Public
router.get('/types', async (req, res) => {
    let types = await UserTypes.find({ refrence: { $ne: 0 } });
    try {
        res.json(types);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!',error:err.message });
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
            res.status(500).json({ msg: 'خطای سرور!',error:err.message });
        }
    }
);

// @router GET api/settings/status
// @desc Get all project status
// @access Private
router.get('/status',auth, async (req, res) => {
    let all = await Status.find({});
    try {
        res.json(all);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!',error:err.message });
    }
});



// @router POST api/settings/stars
// @desc make a status type
// @access Private + Admin
router.post(
    '/stars',
    auth,
    [ check('starCount', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('point', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        if (req.user.type != 0) {
            return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { starCount, point } = req.body;
        try {
            let star = await Star.findOne({ starCount });
            if (star) return res.status(400).json({ msg: 'این آیدی قبلا ثبت شده است' });

            star = new Star({
                starCount,
                point
            });
            await star.save();
            return res.json(star);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ msg: 'خطای سرور!',error:err.message });
        }
    }
);

// @router GET api/settings/stars
// @desc Get all stars
// @access Private
router.get('/stars',auth, async (req, res) => {
    let all = await Star.find({});
    try {
        res.json(all);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!',error:err.message });
    }
});

module.exports = router;