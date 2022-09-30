const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../../config/database')

const Logs = require('../../models/logs')
const authenticate = require('./../../services/authenticate')



router.get('/getMyLog', authenticate, (req, res) => {
    console.log("/getMyLog")

    console.log(req.user.username)

    Logs.findAll({
        raw: true,
        where: {
            who: req.user.username
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(logs => {
            // console.log(logs)
            res.status(200).send(logs)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
    
})

router.get('/getHistorytodo/:id', authenticate, (req, res) => {
    console.log("/getHistorytodo")
    console.log("Param: " + req.params.id)


    Logs.findAll({
        raw: true,
        where: {
            todoId: req.params.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(logs => {
            // console.log(logs)
            res.status(200).send(logs)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
    
})


module.exports = router