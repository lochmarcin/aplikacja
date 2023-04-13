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
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }    
})

module.exports = Company