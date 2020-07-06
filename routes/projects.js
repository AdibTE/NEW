const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const getUser = require('../middleware/getUser');
const idGenerator = require('../middleware/idGenerator');

// Models
const User = require('../Models/User');
const Project = require('../Models/Project');
const Category = require('../Models/Category');
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
    [ check('category', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
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

        let { title, description, category, star, price, forceTime } = req.body;

        try {
            let _star = await Star.findOne({ starCount: star });
            if (!_star) return res.status(403).json({ msg: 'star غیر مجاز!' });

            let _category = await Category.findOne({ ID: category });
            if (!_category) return res.status(403).json({ msg: 'category غیر مجاز!' });

            let ID = await idGenerator(Project);

            let project = new Project({
                ID,
                title,
                description,
                category: _category,
                star: _star,
                price,
                forceTime,
                employer: req.user
            });
            await project.save();
            return res.json(project);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router GET api/projects
// @desc Get all user projects
// @access Private + Public
router.get('/', getUser, async (req, res) => {
    let projects;
    try {
        if (req.user && req.user.type == 1) {
            projects = await Project.find({ user: req.userObjectId });
        } else {
            projects = await Project.find({}).populate([
                { path: 'category', select: 'ID' },
                { path: 'star' , select: 'starCount'},
                { path: 'status', select: 'step' },
                { path: 'employer', select: 'email' }
            ]);
        }
        res.json(projects);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

module.exports = router;
