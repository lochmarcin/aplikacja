const Sequelize = require('sequelize')
const db = require('../config/database')

const Fcm = db.define('fcms', {
    token: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Fcm