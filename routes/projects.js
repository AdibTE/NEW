const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');

// middlewares
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
// @step 100
// @todo remove default forceTime + attachment handling
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

        let { title, description, category, starsNeed, price, forceTime, attachments } = req.body;

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
            user.projects.push(project.id);
            await user.save();

            await project.save();
            return res.json(project);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router POST api/projects/pay
// @desc pay the project price cost
// @access Private
// @step 150
router.post('/:id/pay', auth, async (req, res) => {
    try {
        let project = await Project.findOne({ ID: req.params.id }).populate('employer');
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        if (req.user.id !== project.employer.id) {
            return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
        }

        if (project.status >= 150) {
            return res.status(403).json({ msg: 'شما قبلا پرداخت کرده اید!' });
        }

        let user = await User.findById(req.user.id);
        if(user.balance && user.balance >= project.price){
            await user.update({ balance: user.balance - project.price });
        } else {
            return res.status(402).json({msg:"موجودی حساب شما کافی نمی‌باشد!"})
        }

        await project.update({ status: 150 });
        return res.send(await Project.findOne({ ID: req.params.id }));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router POST api/projects/:id/add
// @desc adding project by applicant
// @access Private
// @step 200
router.post('/:id/add', auth, async (req, res) => {
    if (req.user.type != 2) {
        return res.status(403).json({ msg: 'شما کارجو نیستید!' });
    }

    let project = await Project.findOne({ ID: req.params.id });
    if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });

    if (project.bannedApplicants) {
        for (const key of project.bannedApplicants) {
            if (req.userObjectId.id == key)
                return res.status(403).json({ msg: 'کارفرما شما را برای این پروژه مسدود کرده است.' });
        }
    }

    if (starHandler(req.user.points) < project.starsNeed) {
        return res.status(403).json({ msg: 'شما ستاره لازم برای ثبت این پروژه را ندارید.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (project.status >= 200) {
            return res.status(403).json({ msg: 'این پروژه از قبل ثبت شده است!' });
        }
        if (project.status < 150) {
            return res.status(402).json({ msg: 'شما هنوز نمی‌توانید پروژه را ثبت کنید!' });
        }
        await project.update({ status: 200, applicant: req.user.id });
        return res.json(await Project.findOne({ ID: req.params.id }));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router POST api/projects/:id/apply
// @desc project applying
// @access Private
// @step 250
router.post(
    '/:id/apply',
    auth,
    [ check('applyFile', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    [ check('applyFilePreview', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        let project = await Project.findOne({ ID: req.params.id }).populate('applicant');
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        if (req.user.id != project.applicant.id) {
            return res.status(403).json({ msg: 'این پروژه توسط کارجوی دیگری ثبت شده است!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { applyFile, applyFilePreview } = req.body;

        try {
            if (project.status >= 250) {
                return res.status(403).json({ msg: 'شما قبلا ارسال کرده اید.!' });
            }
            if (project.status < 200) {
                return res.status(403).json({ msg: 'شما هنوز به این مرحله نرسیدید!' });
            }
            await project.update({ applyFile, applyFilePreview, status: 250 });
            return res.json(await Project.findOne({ ID: req.params.id }).select('-applyFile'));
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router POST api/projects/:id/applyConfirm
// @desc project confirming apply
// @access Private
// @step 300
router.post('/:id/applyConfirm', auth, async (req, res) => {
    let project = await Project.findOne({ ID: req.params.id }).populate('employer');
    if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
    if (req.user.id !== project.employer.id) {
        return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
    }

    try {
        if (project.status >= 300) {
            return res.status(403).json({ msg: 'شما قبلا پیشنمایش را تایید کردید.!' });
        }
        if (project.status < 250) {
            return res.status(403).json({ msg: 'شما هنوز به این مرحله نرسیدید!' });
        }

        let user = await User.findById(req.userObjectId.id);
        let newPoint = user.points + config.get('pointsPerChange');
        await user.update({ points: newPoint });

        await project.update({ status: 300 });
        return res.json(await Project.findOne({ ID: req.params.id }).select('-applyFile'));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router POST api/projects/:id/applyReject
// @desc project rejecting apply
// @access Private
// @step 300 ( to: 200 )
router.post(
    '/:id/applyReject',
    auth,
    [ check('applyFeedBack', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        let project = await Project.findOne({ ID: req.params.id }).populate('employer');
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        if (req.user.id !== project.employer.id) {
            return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { applyFeedBack } = req.body;

        try {
            if (project.status >= 350) {
                return res.status(403).json({ msg: 'شما قبلا پیشنمایش را تایید کردید.!' });
            }
            if (project.status < 250) {
                return res.status(403).json({ msg: 'شما هنوز به این مرحله نرسیدید!' });
            }

            let user = await User.findById(req.userObjectId.id);
            let newPoint = user.points - config.get('pointsPerChange') / 5;
            newPoint = newPoint < 0 ? 0 : newPoint;
            await user.update({ points: newPoint });

            await project.update({ status: 200, applyFeedBack });

            return res.json(await Project.findOne({ ID: req.params.id }).select('-applyFile'));
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router POST api/projects/:id/aprove
// @desc project aproving by employer(can see applyFile)
// @access Private
// @step 350
// @todo cost money to wallet
router.post('/:id/aprove', auth, async (req, res) => {
    let project = await Project.findOne({ ID: req.params.id }).populate('employer');
    if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
    if (req.user.id !== project.employer.id) {
        return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
    }

    try {
        if (project.status >= 350) {
            return res.status(403).json({ msg: 'شما قبلا پرداخت کرده اید!' });
        }
        if (project.status < 300) {
            return res.status(403).json({ msg: 'شما هنوز به این مرحله نرسیدید!' });
        }

        await project.update({ status: 350 });
        return res.json(await Project.findOne({ ID: req.params.id }));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router POST api/projects/:id/isSatisfied
// @desc project aproving by employer(can see applyFile)
// @access Private
// @step 400
router.post(
    '/:id/isSatisfied',
    auth,
    [ check('isSatisfied', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        let project = await Project.findOne({ ID: req.params.id }).populate('employer');
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        if (req.user.id !== project.employer.id) {
            return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { isSatisfied } = req.body;

        try {
            if (!(project.status == 350 || project.status == 400)) {
                return res.status(403).json({ msg: 'شما هنوز به این مرحله نرسیدید!' });
            }

            let user = await User.findById(req.userObjectId.id);
            if (isSatisfied) {
                var newPoint = user.points + config.get('pointsPerChange');
                await project.update({ status: 400 });
            } else {
                var newPoint = user.points - config.get('pointsPerChange');
                newPoint = newPoint < 0 ? 0 : newPoint;
                await project.update({ status: 350 });
            }

            await user.update({ points: newPoint });
            return res.json(await Project.findOne({ ID: req.params.id }));
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router POST api/projects/:id/isSatisfied
// @desc project aproving by employer(can see applyFile)
// @access Private
// @step 400
router.post(
    '/:id/isSatisfied',
    auth,
    [ check('isSatisfied', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        let project = await Project.findOne({ ID: req.params.id }).populate('employer');
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        if (req.user.id !== project.employer.id) {
            return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { isSatisfied } = req.body;

        try {
            if (project.status != 350) {
                return res.status(403).json({ msg: 'شما هنوز به این مرحله نرسیدید!' });
            }

            let user = await User.findById(req.userObjectId.id);
            let newPoint = isSatisfied
                ? user.points + config.get('pointsPerChange')
                : user.points - config.get('pointsPerChange');
            newPoint = newPoint < 0 ? 0 : newPoint;
            await user.update({ points: newPoint });

            await project.update({ status: 400 });
            return res.json(await Project.findOne({ ID: req.params.id }));
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
        }
    }
);

// @router POST api/projects/:id/cancel
// @desc canceling apply from an apasdasd
// @access Private
// @step any (to: -1)
router.post(
    '/:id/cancel',
    auth,
    [ check('applyFeedBack', 'این فیلد اجباری می‌باشد').not().isEmpty() ],
    async (req, res) => {
        let project = await Project.findOne({ ID: req.params.id }).populate('employer');
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        if (req.user.id !== project.employer.id) {
            return res.status(403).json({ msg: 'شما کارفرمای این پروژه نیستید!' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { applyFeedBack } = req.body;

        try {
            let user = await User.findById(req.userObjectId.id);
            let newPoint = user.points - config.get('pointsPerChange');
            newPoint = newPoint < 0 ? 0 : newPoint;
            await user.update({ points: newPoint });

            project.bannedApplicants.push(project.applicant);
            await project.save();

            let newStatus = project.status >= 150 ? 150 : -1;

            await project.update({
                status: newStatus,
                applyFeedBack,
                applicant: null,
                applyFile: null,
                applyFilePreview: null
            });
            return res.json(await Project.findOne({ ID: req.params.id }));
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
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
                return res.json(projects);
            }
            if (req.user.type == 2) {
                projects = await Project.find({
                    status: { $eq: 150 },
                    starsNeed: { $lte: starHandler(req.user.points) }
                }).populate([ { path: 'employer', select: 'email' } ]);
                return res.json(projects);
            } else {
                projects = await Project.find({});
                return res.json(projects);
            }
        } else {
            projects = await Project.find({ status: { $gte: 150 } }).populate([
                { path: 'employer', select: 'email' }
            ]);
            return res.json(projects);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router GET api/projects/:id/status
// @desc Get project status
// @access Public
// @todo admin check 250
router.get('/:id/status', auth, async (req, res) => {
    let project = await Project.findOne({ ID: req.params.id }).populate([
        { path: 'employer', select: '-password' },
        { path: 'applicant', select: '-password' }
    ]);
    let filterdProject = await Project.findOne({ ID: req.params.id })
        .populate([ { path: 'employer', select: '-password' }, { path: 'applicant', select: '-password' } ])
        .select('-applyFile');

    if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });

    try {
        let isEmployer = project.employer && req.userObjectId.id == project.employer.id ? true : false;
        let isApplicant = project.applicant && req.userObjectId.id == project.applicant.id ? true : false;
        let isAdmin = req.user.id == 0 ? true : false;

        if (isEmployer || isApplicant || isAdmin) {
            if (project.status < 250 || project.status >= 350) {
                return res.json(project);
            } else if (project.status == 250 || project.status == 300) {
                if (isEmployer) return res.json(filterdProject);
                if (isAdmin || isApplicant) return res.json(project);
            }
        } else {
            return res.status(403).json({ msg: 'شما کارجو یا کارفرمای این پروژه نیستید!' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

// @router GET api/projects/:id
// @desc Get single projects
// @access Public
router.get('/:id', async (req, res) => {
    try {
        let projects = await Project.findOne({ ID: req.params.id }).populate([ { path: 'employer', select: 'email' } ]);
        if (!project) return res.status(404).json({ msg: 'این صفحه هنوز وجود ندارد!' });
        return res.json(projects);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'خطای سرور!', error: err.message });
    }
});

module.exports = router;
