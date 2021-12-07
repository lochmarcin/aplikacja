const Sequelize = require('sequelize')
const db = require('../config/database')


// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!

const Company = db.define('companies',{
    name_comp: {
        type: Sequelize.STRING
    },
    town: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    number_house: {
        type: Sequelize.STRING
    },
    post_code: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    done: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = Company