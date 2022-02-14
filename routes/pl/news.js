const express = require("express")
const router = express.Router()
const News = require('../../models/news')



router.get('/todos', (req, res) => {
    console.log("get all numbers")

    News.findOne({
        raw: true,
        attributes: ['todos'],
        where: {
            id: 1
        }
    })
        .then(news => {
            res.send(news)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})
router.get('/done_todos', (req, res) => {
    console.log("get all numbers")

    News.findOne({
        raw: true,
        attributes: ['done_todos'],
        where: {
            id: 1
        }
    })
        .then(news => {
            res.send(news)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


module.exports = router