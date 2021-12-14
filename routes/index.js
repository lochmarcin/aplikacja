const express = require('express')
const router = express.Router()

const todo = require('./pl/todo')
const company = require('./pl/company')
const login = require('./pl/login')



router.use('/todo', todo)
router.use('/company', company)
router.use('/auth', login)

router.use('/', (req, res)=> res.send("jesteś w indexsach"))

module.exports = router