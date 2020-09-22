const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const  Contact = sequelize.define('contact', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    frist_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // userId: {
    //     type: Sequelize.STRING
    // },
    uuid: {
        type: Sequelize.STRING
    }
    
});

module.exports = Contact;