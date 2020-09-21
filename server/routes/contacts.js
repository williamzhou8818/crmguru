const express = require('express');
const router = express.Router();


/**
 * @route GET api/contacts
 * @desc  Get all users contacts
 * @access Private
 */
router.get('/', (req, res) => {
    res.send('get all contacts')
});


/**
 * @route POST api/contacts
 * @desc  Add a new contact
 * @access Private
 */
router.post('/', (req, res) => {
    res.send('Add contact');
});

 /**
  * @route PUT ap/contacts/:id
  * @desc  update contact
  * @access Private
  */
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

/**
 * @route   Delete api/contacts/:id
 * @desc    Update contact
 * @access  Private
 */
router.delete('/:id', (req, res) => {
    res.send('Update contact');
});



module.exports = router;

