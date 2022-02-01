const Sequelize = require('sequelize')
const db = require('../config/database')

const File = db.define('file', {
    varsion: {
        type: Sequelize.REAL
    },
    url: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = File