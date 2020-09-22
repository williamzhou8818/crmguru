const express = require('express');
const app = express();

const sequelize = require('./utils/database');

const User = require('./model/user');
const Contact = require('./model/contact');
const ContactDetail = require('./model/contact_detail');

const PORT = process.env.PORT || 5000;


/**
 * Init Middleware
 */
app.use(express.json({extended: true}));


/**
 * Route and endpoints
 */

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the CRM GURU API'})
});

//Define Routers
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/contacts', require('./routes/contacts'));

// Setup relation one to many
User.hasMany(Contact,{
    foreignKey: 'user_id',
    constraints: false,
    as: 'user'
});
Contact.belongsTo(User, {
    foreignKey: 'uuid',
    constraints: false,
    as: 'user'
});
Contact.hasOne(ContactDetail);
ContactDetail.belongsTo(Contact, {
    foreignKey:'contactId', as:'Contact'
});

//call Sequielie sync a model and create a table
//{force: true}
sequelize.sync().then(result => {
    // console.log(result);
    app.listen(PORT, () => console.log(`CRM server started on port ${PORT}`));
})
.catch(err => {
    console.log(err);
})



