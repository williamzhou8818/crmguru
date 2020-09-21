const express = require('express');
const app = express();

const sequelize = require('./utils/database');

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


//call Sequielie sync a model and create a table
sequelize.sync().then(result => {
    // console.log(result);
    app.listen(PORT, () => console.log(`CRM server started on port ${PORT}`));
})
.catch(err => {
    console.log(err);
})



