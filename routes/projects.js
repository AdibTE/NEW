const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const getUser = require('../middleware/getUser');
const idGenerator = require('../middleware/idGenerator');
const starHandler = require('../middleware/starHandler');

// Models
const User = require('../Models/User');
const Project = require('../Models/Project');
const Category = require('../Models/Category');
const Star = require('../Models/Star');

// @router POST api/projects/create
// @desc making project by employer
// @access Private
// @todo remove default forceTime
router.post(
    '/create',
    auth,
    [ check('title', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('description', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('category', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('starsNeed', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
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

        let { title, description, category, starsNeed, price, forceTime } = req.body;

        try {
            let _star = await Star.findOne({ starCount: starsNeed });
            if (!_star) return res.status(403).json({ msg: 'star غیر مجاز!' });

            let _category = await Category.findOne({ ID: category });
            if (!_category) return res.status(403).json({ msg: 'category غیر مجاز!' });
            let ID = await idGenerator(Project);

            let project = new Project({
                ID,
                title,
                description,
                category: _category.ID,
                starsNeed,
                price,
                forceTime,
                employer: req.user
            });
            let user = await User.findOne({ _id: req.user.id });
            user.projects.push(req.user.id);
            await user.save();
            await project.save();
            return res.json(project);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router POST api/projects/add/:id
// @desc adding project by applicant
// @access Private
router.post(
    '/add/:id',
    auth,
    [ check('auditionText', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        if (!req.user.type == 2) {
            return res.status(403).json({ msg: 'شما کارجو نیستید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { auditionText } = req.body;

        try {
            let project = await Project.findOne({ ID: req.params.id });
            if(project.status == 200){
                return res.status(403).json({ msg: 'شما قبلا ارسال کرده اید.!' });
            }
            project.update({ auditionText, status: 200 })
            // await project.save(); { auditionText, status: 200 }
            return res.json(await Project.findOne({ ID: req.params.id }));
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
    var projects;
    try {
        if (req.user) {
            if (req.user.type == 1) {
                projects = await Project.find({ user: req.userObjectId }).populate([
                    { path: 'employer', select: 'email' }
                ]);
            } else if (req.user.type == 2) {
                for (let i = 5; i >= 0; i--) {
                    if (starHandler(req.user.points) >= i) {
                        item = await Project.find({ starsNeed: starHandler(req.user.points) }).populate([
                            { path: 'employer', select: 'email' }
                        ]);
                        projects = [];
                        projects.push(item);
                    }
                }
            }
        } else {
            projects = await Project.find({}).populate([ { path: 'employer', select: 'email' } ]);
        }
        res.json(projects);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router GET api/projects/:id
// @desc Get single projects
// @access Public
router.get('/:id', async (req, res) => {
    try {
        let projects = await Project.findOne({ ID: req.params.id }).populate([ { path: 'employer', select: 'email' } ]);
        res.json(projects);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

module.exports = router;
