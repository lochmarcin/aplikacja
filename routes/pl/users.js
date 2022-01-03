const express = require('express')
const router = express.Router()
const authenticate = require('./../../services/authenticate')
const Users = require('../../models/users')

router.get('/get', (req,res)=>{
    console.log('pobieranie użytkowników')

    Users.findAll({
    })
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})



module.exports = router
