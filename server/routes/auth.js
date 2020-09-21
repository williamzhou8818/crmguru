const expres = require('express');
const router = expres.Router();
const User = require('./../model/user');
const auth = require('./../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');



// GET USER AND Loing user

/**
 * @route  GET api/auth
 * @desc   Get  current logged in user
 * @access Private
 */
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                uuid: req.user.id
            },
            attributes: {
                exclude: ['password']
            }
        })
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

/**
 * @route POST api/auth 
 * @desc Auth user & get token Login
 * @access public 
 */
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({
            where: {
                email: email
            }
        });
        // console.log(use.rdataValues);
        if (!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.dataValues.password);
        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const payload = {
            user: {
                id: user.dataValues.uuid
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }



    //res.send('Login user')
});

module.exports = router;