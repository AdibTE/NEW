const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Models
const User = require('../Models/User');
const Project = require('../Models/Project');
const Star = require('../Models/Star');

// @router POST api/projects/create
// @desc making project by employer
// @access Private + Employer
// @todo remove default forceTime
router.post(
    '/create',
    auth,
    [ check('title', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('description', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('star', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('price', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('forceTime', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        if (req.user.type == 2) {
            return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { title, description, star, price , forceTime } = req.body;

        try {
            let CheckStar = await Star.findOne({ starCount: star });
            if (!CheckStar) return res.status(403).json({ msg: 'غیر مجاز!' });

            let project = new Project({
                title,
                description,
                star,
                price,
                forceTime,
                employer: req.user.id
            });
            await project.save();
            return res.json(project);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'خطای سرور!',error:err.message });
        }
    }
);

// @router GET api/users/types
// @desc Get all user types
// @access Public
router.get('/', async (req, res) => {
    let all = await Project.find({});
    try {
        res.json(all);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!',error:err.message });
    }
});

module.exports = router;
