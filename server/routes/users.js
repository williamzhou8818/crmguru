const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./../model/user');
const { check, validationResult } = require('express-validator');


const router = express.Router();

// Permoants user resgisition
/**
 *  @route  POST api/users
 *  @desc   Register a user
 *  @access Public
 */
router.post('/', [ 
        // email must be an email
        check('email', 
              'Please include a valid email').isEmail(),
        // password must be at least 6 chars long
        check('password', 
              'Please enter a password with 6 or more charcters').isLength({min: 6}),
        // username must be at leat 3 chars long
        check('username', 
            'Please add user name wiht 3 or more charcters').isLength({min: 3}),
        check('phone', 'Please add phone number').not().isEmpty()
    ], 
    async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {username, email, password, phone, agreement} = req.body;

        try {
            let user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                return res.status(400).json({msg: 'User already exists'})
            } else {
                user = {
                    uuid: uuidv4(),
                    username,
                    email,
                    password,
                    phone,
                    agreement
                }

                //hash password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                // create a new user
                const newUser = await User.create(user);

                // console.log(newUser.dataValues)
                // // res.json(newUser.dataValues);

                const payload = {
                    user: {
                        id: newUser.dataValues.uuid
                    }
                }
                jwt.sign(payload, config.get('jwtSecret'), {
                    expiresIn: 3600
                }, (err, token) => {
                    if (err) throw err;
                    res.json({token});
                });
                
            }

           

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

       // res.send('passed');
});


module.exports = router;
