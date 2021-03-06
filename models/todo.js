const Sequelize = require('sequelize')
const db = require('../config/database')

const Todo = db.define('todo', {
    company: {
        type: Sequelize.STRING
    },
    part: {
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
    condition: {
        type: Sequelize.STRING
    },
    collect_date: {
        type: Sequelize.DATE
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    done: {
        type: Sequelize.BOOLEAN
    },
    whoDone: {
        type: Sequelize.STRING
    },
    whoAdd: {
        type: Sequelize.STRING
    },
    whoRestored: {
        type: Sequelize.STRING
    },
    deposit: {
        type: Sequelize.BOOLEAN
    },
    time_morning: {
        type: Sequelize.BOOLEAN
    },
    internal_id: {
        type: Sequelize.STRING
    },
    fv: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = Todo