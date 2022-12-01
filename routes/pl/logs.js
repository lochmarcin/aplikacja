const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../../config/database')
const moment = require('moment')

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Logs = require('../../models/logs')
const authenticate = require('./../../services/authenticate')


// GET ALL USER LOGS
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

// GET USER LOGS FROM DATE TO DATE
router.post('/getMyLog', authenticate, (req, res) => {
// router.post('/getMyLog', (req, res) => {
    console.log("/getMyLog")
    console.log(req.body)

    // console.log(req.user.username)
    // const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    // console.log(sevenDaysAgo)
    Logs.findAll({
        raw: true,
        where: {
            who: req.user.username,
            // who: 'marcin',
            createdAt: { [Op.and]: [{ [Op.gte]: req.body.startDate }, { [Op.lte]: req.body.endDate }] }
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
//GET All logs to one todo
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