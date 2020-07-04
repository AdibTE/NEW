const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models
const User = require('../Models/User');
const Contact = require('../Models/Contact');

// @router GET api/contacts
// @desc Get all users contact
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router POST api/contacts
// @desc add new contact
// @access Private
router.post('/', auth, [ check('name', 'Name is required').not().isEmpty() ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let { name, email, phone, type } = req.body;
    try {
        contact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router PUT api/contacts/:id
// @desc Update Contact info
// @access Private
router.put('/:id', auth, async (req, res) => {
    let { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                $set: contactFields
            },
            { new: true }
        );
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', auth,async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await contact.delete();
        res.json({msg:"Contact Deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
