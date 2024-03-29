const Sequelize = require('sequelize')
const db = require('../config/database')

const File = db.define('update', {
    wersja: {
        type: Sequelize.REAL
    },
    url: {
        type: Sequelize.STRING
    },
    actual: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    actual: {
        type: Sequelize.BOOLEAN
    },
    os: {
        type: Sequelize.STRING
    }
})

module.exports = File