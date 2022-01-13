const Sequelize = require('sequelize')
const db = require('../config/database')

const Fcm = db.define('fcms', {
    token: {
        type: Sequelize.STRING
    }
})

module.exports = Fcm