const express = require('express')
const router = express.Router()
const authenticate = require('./../../services/authenticate')
const Users = require('../../models/users')

router.get('/get', (req,res)=>{
    console.log('pobieranie użytkowników')

    Users.findAll({
        raw: true,
        attributes: ['id','firstname', 'lastname', 'username', 'isViewer', 'isEditor', 'createdAt']
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

// Pobieranie imienia nazwiska uzytkownika
router.get('/me/:id', (req,res)=>{
    console.log("Param: " + req.params.id)


    Users.findOne({
        raw: true,
        attributes: ['firstname', 'lastname'],
        where: {
            id: req.params.id
        }
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

// Pobieranie jednego użytkownika po id
router.get('/getOne/:id', (req,res)=>{
    console.log("Param: " + req.params.id)


    Users.findOne({
        raw: true,
        attributes: ['firstname', 'lastname', 'username', 'isEditor', 'isAdmin'],
        where: {
            id: req.params.id
        }
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
