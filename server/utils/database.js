const Sequelize = require('sequelize');
const config = require('config');

const host = config.get('mysqlEndPoint');

const sequelize = new Sequelize('crmguru_db', 'root', 'zhouli1118', {
    dialect:'mysql',
    host: host,
    port: 3306
});

module.exports = sequelize;