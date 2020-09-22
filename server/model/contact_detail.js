// contact has one contact detail table 
// one to one relateion ship
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const  ContactDetail = sequelize.define('contact_detail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    notes: {
        type: Sequelize.STRING
    },
    lead: {
        type: Sequelize.STRING
    }  
});


module.exports = ContactDetail;