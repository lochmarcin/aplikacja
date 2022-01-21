const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('user', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    isEditor: {
        type: Sequelize.BOOLEAN
    },
    isViewer: {
        type: Sequelize.BOOLEAN
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    accessToken: {
        type: Sequelize.STRING
    },
    refreshToken: {
        type: Sequelize.STRING
    }
})

module.exports = User