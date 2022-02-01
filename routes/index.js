const express = require('express')
const router = express.Router()
const cors = require('cors')

const todo = require('./pl/todo')
const company = require('./pl/company')
const login = require('./pl/login')
const uzytkownik = require('./pl/users')
const fcm = require('./pl/fcm_token')
const file = require('./pl/file')




router.use('/todo', todo)
router.use('/company', company)
router.use('/auth', login)
router.use('/users', uzytkownik)
router.use('/fcm', fcm)
router.use('/upload', file)


router.use('/', (req, res)=> res.send("jesteś w indexsach"))

module.exports = router