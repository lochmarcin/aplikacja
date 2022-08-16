const Sequelize = require('sequelize')
const db = require('../config/database')

const Logs = db.define('logs', {
    type: {
        type: Sequelize.STRING
    },
    info: {
        type: Sequelize.STRING
    },
    who: {
        type: Sequelize.STRING
    },
    whom: {
        type: Sequelize.STRING
    },
    did: {
        type: Sequelize.STRING
    },
    details: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    time: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    createdAt: {
        type: Sequelize.DATE
    },
})

module.exports = Logs