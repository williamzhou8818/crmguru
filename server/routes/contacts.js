const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');

const Contact = require('./../model/contact');
const ContactDetail = require('./../model/contact_detail');

const User = require('./../model/user');

const { check, validationResult } = require('express-validator');


/**
 * @route GET api/contacts
 * @desc  Get all users contacts
 * @access Private
 */
router.get('/', auth, async (req, res) => {

    try {
        const contacts = await Contact.findAll({
            where: {
                uuid: req.user.id
            }
        
        });

        res.json(contacts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    // res.send('get all contacts')
});


/**
 * @route POST api/contacts
 * @desc  Add a new contact
 * @access Private
 */
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {

    // add check here 
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({errors: errors.array()});
    }
    // squilra auto create uuid for us
    // req.user.createContact();
    const {name, frist_name, last_name, phone, email} = req.body;
    try {
        const newContact = await Contact.create({
            name: name,
            frist_name: frist_name,
            last_name: last_name,
            phone: phone,
            email: email,
            uuid: req.user.id
        });
        
        //save contactId to ContactDetail table
        await ContactDetail.create({
            contactId: newContact.dataValues.id
        })
        res.json(newContact.dataValues)

    } catch (err) { 
        console.log(err.message);
        res.status(500).send('Server Error');

    }

});

 /**
  * @route PUT ap/contacts/:id
  * @desc  update contact
  * @access Private
  */
router.put('/:id', auth, async (req, res) => {

    const {name, frist_name, last_name, phone, email} = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (frist_name) contactFields.frist_name = frist_name;
    if (last_name) contactFields.last_name = last_name;
    if (phone) contactFields.phone = phone;
    if (email) contactFields.email = email;

    try {
        let contact = await Contact.findOne({ where: {uuid: req.params.id}});
        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        // Make sure user owns contact
        // console.log(contact.dataValues.uuid !== req.user.id)
        if (contact.dataValues.uuid !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }

        let updated =  await Contact.update(contactFields,
        {where:{uuid: req.params.id}})
        
        if (updated) {
            contact = await Contact.findOne({ where: {uuid: req.params.id}});
            res.json(contact);
        } 
        
        

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');

    }


});

/**
 * @route   Delete api/contacts/:id
 * @desc    Update contact
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findOne({ where: {uuid: req.params.id}});
        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        // Make sure user owns contact
        // console.log(contact.dataValues.uuid !== req.user.id)
        if (contact.dataValues.uuid !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }

        let delContact =  await Contact.destroy(
            {where:{uuid: req.params.id}}
        );
        
        if (delContact) {
            // contact = await Contact.findOne({ where: {uuid: req.params.id}});
            res.json({msg: 'Contact Removed'});
        } 
        

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');

    }
});



module.exports = router;

