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
    accessToken: {
        type: Sequelize.STRING
    },
    refreshToken: {
        type: Sequelize.STRING
    }
})

module.exports = User