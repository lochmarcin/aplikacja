const Sequelize = require('sequelize')
const db = require('../config/database')

const Todo = db.define('todo', {
    users: {
        type: Sequelize.INTEGER
    },
    company: {
        type: Sequelize.STRING
    },
    part: {
        type: Sequelize.STRING
    },
    users: {
        type: Sequelize.STRING
    },
    indexx: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
    band_number: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.STRING
    },
    collect_date: {
        type: Sequelize.DATE
    },
    condition: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Todo