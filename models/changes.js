const Sequelize = require('sequelize')
const db = require('../config/database')

const Changes = db.define('changes', {
    todos: {
        type: Sequelize.BIGINT
    },
    doneTodos: {
        type: Sequelize.BIGINT
    }
})

module.exports = Changes