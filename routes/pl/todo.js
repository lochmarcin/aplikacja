const express = require('express')
// const { router } = require('..')
const router = express.Router()
// const fetch = require('node-fetch')
const axios = require('axios')
// const db = require("../../postgres")
const db = require('../../config/database')
const firebaseNotifi = require('../../services/firebaseNotifi')

// import fetch from "node-fetch";

const Todo = require('../../models/todo')
const User = require('../../models/users')
const Fcm = require('../../models/fcm')

const authenticate = require('./../../services/authenticate')


// const fcms = require('../../services/arrayOfFcm')
// var admin = require("firebase-admin");
// var serviceAccount = require("../../motopres-56f80-firebase-adminsdk-rjc35-1ea0d56603.json");




// GET ALL TODOS WITCH DONE IS FALSE ---------- GET ALL TODOS ---------- GET ALL TODOS 
router.get('/get', (req, res) => {
    authenticate(req, res)

    console.log("get all todos")
    Todo.findAll({
        raw: true,
        where: {
            done: false
        },
        order: [
            ['collect_date', 'ASC']
        ]
    })
        .then(todo => {
            res.send(todo)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})

// GET ALL TODOS WITCH DONE IS FALSE ---------- GET ALL TODOS ---------- GET ALL TODOS 
router.get('/getDone', (req, res) => {
    console.log("get all todos")
    Todo.findAll({
        raw: true,
        where: {
            done: true
        },
        order: [
            ['collect_date', 'DESC']
        ]
    })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})



// Powiadomienia NOTIFICATION  ----- NOTIFICATION  ----- NOTIFICATION  ----- NOTIFICATION  
router.post('/notification', async (req, res) => {
    console.log("Powiadomienia ")

    let notification = {
        'title': "Tytul",
        'body': 'Treść powiadomienia'
        // 'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/motopres-9e852.appspot.com/o/ikona.png?alt=media&token=e1466eb4-17d3-4c85-a497-5b8a2377c291',
        // 'color': '#7e55c3'
    }
    firebaseNotifi(notification)
    res.sendStatus(200)
   
})

// Aktualizacja jednego todo po id NA DONE TRUE
router.put("/updateDone/:id", async (req, res) => {
    console.log("Param: " + req.params.id)
    authenticate(req, res)

    const result = await User.findAll({
        where: {
            username: req.user.username
        }
    })
    let firstname = result[0].dataValues.firstname
    let lastname = result[0].dataValues.lastname
    let fullname = firstname.concat(" ", lastname)
    console.log(fullname)


    await Todo.update(
        {
            whoDone: fullname,
            done: "true"
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(todos => {
            console.log(todos[0])
            res.status(200).send((todos[0] = 1) ? "looks good" : "sometching is wrong")
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})

// Aktualizacja jednego todo po id NA DONE FALSE
router.put("/updateNotDone/:id", async (req, res) => {
    console.log("Param: " + req.params.id)


    await Todo.update(
        {
            whoDone: null,
            done: "false"
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(todos => {
            // console.log(todos[0])
            res.status(200).send((todos[0] = 1) ? "looks good" : "sometching is wrong")
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


// Dodanie jednego TODO NOWa częśc
router.post("/addNew", (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    console.log(req.body)

    let { users, company, part, indexx, quantity, price, band_number, note, day, month, year } = req.body
    let done = false
    let condition = "Nowe / używane"

    //otrzymywane dane jako liczby
    month = month + ""
    day = day + ""
    if (month.length == 1)
        month = `0${month}`

    if (day.length == 1)
        day = `0${day}`

    let collect_date = `${year}-${month}-${day}`
    console.log("Collect_date: " + collect_date)

    Todo.create({
        users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done
    })
        .then(todo => {
            let notifi = {
                'title': "Dodano nowe zadanie",
                'body': `${part} - Data odbioru: ${collect_date}`
            }
            firebaseNotifi(notifi)

            console.log("Powinoo wysłać")
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


// Dodawanie przez przeglądarkę ------------------------------------------------
router.post("/add", async (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    authenticate(req, res)
    console.log("req.user: " + req.user.username)
    // console.log(req.body)

    

    let { company, part, indexx, quantity, price, band_number, note, collect_date, condition } = req.body
    let done = false

    try {
        const who = await User.findOne({
            where: {
                username: req.user.username
            }
        })

        const whoAdd = `${who.dataValues.firstname} ${who.dataValues.lastname}`
        console.log("Kto dodał: " + whoAdd)

        const result = await Todo.create({
            company, collect_date, part, indexx, quantity, price, band_number, note, condition, done, whoAdd
        })
        console.log(result.dataValues)
        res.status(200).json(result.dataValues)

        console.log("Part: " + part +" Data odbioru: " + collect_date)
        let notifi = {
            'title': "Dodano nowe zadanie",
            'body': `${part} - Data odbioru: ${collect_date}`
        }
        firebaseNotifi(notifi)
    } catch (err) {
        console.log("Error: " + err)
    }

})


// Dodanie jednego TODO Regenerowana 
router.post("/addReg", (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    console.log(req.body)

    let { users, company, part, indexx, quantity, price, band_number, note, day, month, year } = req.body
    let done = false
    let condition = "Regenerowane"

    //otrzymywane dane jako liczby
    month = month + ""
    day = day + ""
    if (month.length == 1)
        month = `0${month}`

    if (day.length == 1)
        day = `0${day}`

    let collect_date = `${year}-${month}-${day}`
    console.log("Collect_date: " + collect_date)
    Todo.create({
        users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done
    })
        .then(todo => {
            let notifi = {
                'title': "Dodano nowe zadanie",
                'body': `${part} - Data odbioru: ${collect_date}`
            }
            firebaseNotifi(notifi)
            console.log("Powinoo wysłać")
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})

router.get('/getOne/:id', (req, res) => {
    console.log("get one todos")
    console.log("--------------------------------------------------------------------------")
    console.log(req.params.id)

    Todo.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    })
        .then(todo => {
            console.log(todo)

            let dates = `${todo.collect_date}`
            dates = dates.split('-')
            console.log(dates)
            todo.day = dates[2]
            todo.month = dates[1]
            todo.year = dates[0]

            // console.log(todo[0].dataValues)
            res.status(200).json(todo)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


// Aktualizacja jednego todo po id WEB
router.put("/updateWeb/:id", async (req, res) => {
    console.log(req.body)
    const param = req.params.id
    console.log('Param: ' + param)


    let { users, company, part, indexx, quantity, price, band_number, note, collect_date, condition } = req.body

    console.log("Collect_date: " + collect_date)

    await Todo.update({ users, company, collect_date, part, indexx, quantity, price, band_number, note, condition },
        {
            where: {
                id: param
            }
        })
        .then(todos => {
            console.log()
            // console.log((todos[0] = 1) ? true : false)
            res.status(200).send((todos[0] = 1) ? true : false)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(400).send(false)
        })

})

// Aktualizacja jednego todo po id
router.put("/update/:id", async (req, res) => {
    console.log(req.body)
    const param = req.params.id
    console.log('Param: ' + param)


    let { users, company, part, indexx, quantity, price, band_number, note, day, month, year } = req.body

    let check_day_length = day.toString().length
    let check_month_length = month.toString().length

    if (check_day_length == 1) {
        day = '0' + day
    }
    if (check_month_length == 1) {
        month = '0' + month
    }

    let collect_date = `${year}-${month}-${day}`
    console.log("Collect_date: " + collect_date)

    await Todo.update({ users, company, collect_date, part, indexx, quantity, price, band_number, note },
        {
            where: {
                id: param
            }
        })
        .then(todos => {
            console.log((todos[0] = 1) ? "looks good" : "sometching is wrong")
            res.status(200).send((todos[0] = 1) ? "looks good" : "sometching is wrong")
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })

})

// Usuwanie konkretnego ToDo po id
router.delete("/delete/:id", async (req, res) => {
    const param = req.params.id
    console.log(param)

    await Todo.destroy({
        where: {
            id: param
        }
    })
        .then(todos => {
            res.status(200).send({
                deleted:true
            })
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(200).send({
                deleted:false
            })
        })
})


router.use('/', (req, res) => {
    res.send("jessteś  w todo ")
})

module.exports = router