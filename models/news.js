const Sequelize = require('sequelize')
const db = require('../config/database')

const News = db.define('news', {
    todos: {
        type: Sequelize.INTEGER
    },
    done_todos: {
        type: Sequelize.INTEGER
    }
})

module.exports = News