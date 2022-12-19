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

const Log = require('../../services/logs')
const log = new Log


// const fcms = require('../../services/arrayOfFcm')
// var admin = require("firebase-admin");
// var serviceAccount = require("../../motopres-56f80-firebase-adminsdk-rjc35-1ea0d56603.json");




// GET ALL TODOS WITCH DONE IS FALSE ---------- GET ALL TODOS ---------- GET ALL TODOS 
router.get('/get', authenticate, (req, res) => {

    console.log("get all todos")
    Todo.findAll({
        raw: true,
        where: {
            done: false,
            active: true
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
router.get('/getDone', authenticate, (req, res) => {
    console.log("get all DONE todos")
    // authenticate(req, res)

    Todo.findAll({
        raw: true,
        where: {
            done: true,
            active: true
        },
        order: [
            ['collect_date', 'DESC']
        ]
    })
        .then(todo => {
            res.status(200).send(todo)
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
        'title': "2",
        'body': 'Treść powiadomienia 2'
        // 'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/motopres-9e852.appspot.com/o/ikona.png?alt=media&token=e1466eb4-17d3-4c85-a497-5b8a2377c291',
        // 'color': '#7e55c3'
    }
    firebaseNotifi(notification)
    res.sendStatus(200)

})

// Aktualizacja jednego todo po id NA DONE TRUE
router.put("/updateDone/:id", authenticate, async (req, res) => {
    // console.log("Param: " + req.params)
    console.log("Param ID: " + req.params.id)
    // console.log("zalogowany: ", req.user.username)
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
            done: true
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(todos => {
            console.log(todos[0])
            res.status(200).send((todos[0] >= 1) ? { TodoToDone: true } : { TodoToDone: false })


            log.doneTodo((todos[0] = 1) ? true : false, req.user.username, req.params.id, req.body.internal_id)


        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(200).send("ERROR")
            log.doneTodo(false, req.user.username, req.params.id, doneTodo.internal_id)
        })
})

// Aktualizacja jednego todo po id NA DONE FALSE
router.put("/updateNotDone/:id", authenticate, async (req, res) => {
    console.log("Param: " + req.params.id)
    // console.log(req.body)

    const resultWhoLogin = await User.findOne({
        where: {

            id: req.user.user_id
        }
    })
    let whologged = `${resultWhoLogin.dataValues.firstname} ${resultWhoLogin.dataValues.lastname}`

    console.log("kto UPDATE: " + whologged)

    await Todo.update(
        {
            whoRestored: whologged,
            whoDone: null,
            done: false
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(todos => {
            // console.log(todos[0])
            res.status(200).send((todos[0] = 1) ? "looks good" : "sometching is wrong")

            log.restoreTodo((todos[0] = 1) ? true : false, req.user.username, req.params.id, req.body.internal_id)

        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


// Dodanie jednego TODO NOWa częśc - MOBILE
router.post("/addNew", authenticate, (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    console.log(req.body)

    let { users, company, part, indexx, quantity, price, band_number, note, day, month, year, internal_id, deposit, time_morning, fv } = req.body.data
    let done = false
    let condition = "Nowe / używane"
    let active = true

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
        users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done, internal_id, deposit, time_morning, fv, active
    })
        .then(todo => {
            let notifi = {
                'title': "Dodano nowe zadanie",
                'body': `${part} - Data odbioru: ${collect_date}`
            }
            firebaseNotifi(notifi)

            res.sendStatus(200)
            // console.log("Powinoo wysłać")

            log.addTodo(true, req.user.username, condition, company, part, indexx, quantity, price, band_number, note, collect_date, internal_id, deposit, time_morning, fv, todo.dataValues.id)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


// Dodawanie przez przeglądarkę ------------------------------------------------
router.post("/add", authenticate, async (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    console.log("req.user: " + req.user.username)
    console.log(req.body)



    let { company, part, indexx, quantity, price, band_number, note, collect_date, condition, internal_id, deposit, time_morning, fv } = req.body
    let done = false
    let active = true

    try {
        const who = await User.findOne({
            where: {
                username: req.user.username
            }
        })

        const whoAdd = `${who.dataValues.firstname} ${who.dataValues.lastname}`
        console.log("Kto dodał: " + whoAdd)

        const result = await Todo.create({
            company, collect_date, part, indexx, quantity, price, band_number, note, condition, done, whoAdd, internal_id, deposit, time_morning, fv, active
        })
        console.log(result.dataValues)
        res.status(200).json(result.dataValues)

        console.log("Part: " + part + " Data odbioru: " + collect_date)
        let notifi = {
            'title': "Dodano nowe zadanie",
            'body': `${part} - Data odbioru: ${collect_date}`
        }
        firebaseNotifi(notifi)

        log.addTodo(true, req.user.username, condition, company, part, indexx, quantity, price, band_number, note, collect_date, internal_id, deposit, time_morning, fv, result.dataValues.id)

    } catch (err) {
        console.log("Error: " + err)
    }

})


// Dodanie jednego TODO Regenerowana - MOBILE
router.post("/addReg", authenticate, (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    console.log(req.body)

    let { users, company, part, indexx, quantity, price, band_number, note, day, month, year, internal_id, deposit, time_morning, fv } = req.body.data
    let done = false
    let condition = "Regenerowane"
    let active = true
    console.log("Data przed podmiana:")
    console.log(year, month, day)
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
        users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done, internal_id, deposit, time_morning, fv, active
    })
        .then(todo => {
            let notifi = {
                'title': "Dodano nowe zadanie",
                'body': `${part} - Data odbioru: ${collect_date}`
            }
            firebaseNotifi(notifi)
            console.log("Powinoo wysłać")
            res.sendStatus(200)

            log.addTodo(true, req.user.username, condition, company, part, indexx, quantity, price, band_number, note, collect_date, internal_id, deposit, time_morning, fv, todo.dataValues.id)
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
router.put("/updateWeb/:id", authenticate, async (req, res) => {
    console.log(req.body)
    const param = req.params.id
    console.log('Param: ' + param)
    let notification = false

    let { users, company, part, indexx, quantity, price, band_number, note, collect_date, condition, internal_id, deposit, time_morning, fv } = req.body
    let active = true

    console.log("Collect_date: " + collect_date)

    Todo.findOne({
        raw: true,
        where: {
            id: param
        }
    })
        .then(todo => {
            collect_date != todo.collect_date ? notification = !notification : false


            Todo.update({ users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, internal_id, deposit, time_morning, fv, active },
                {
                    where: {
                        id: param
                    }
                })
                .then(update => {
                    console.log(notification)
                    if (notification) {
                        let notifi = {
                            'title': "Zmieniono datę w zadaniu ",
                            'body': `${part} - Nowa data odbioru: ${collect_date}`
                        }
                        firebaseNotifi(notifi)
                    }
                    res.status(200).send((update[0] = 1) ? true : false)

                    console.log(update[0])
                    log.updateTodo(true, req.user.username, todo, req.body, param)

                })
                .catch(err => {
                    console.log('Error: ' + err)
                    // res.status(400).send(false)
                })



        })




})

// Aktualizacja jednego todo po id
router.put("/update/:id", async (req, res) => {
    console.log(req.body)
    const param = req.params.id
    console.log('Param: ' + param)
    let notification = false



    let { users, company, part, indexx, quantity, price, band_number, note, day, month, year, internal_id, deposit, time_morning, fv } = req.body.data
    let active = true
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

    await Todo.findOne({
        raw: true,
        where: {
            id: param
        }
    })
        .then(todo => {
            collect_date != todo.collect_date ? notification = !notification : false
        })


    await Todo.update({ users, company, collect_date, part, indexx, quantity, price, band_number, note, internal_id, deposit, time_morning, fv, active },
        {
            where: {
                id: param
            }
        })
        .then(todos => {
            console.log(notification)
            if (notification) {
                console.log("🚀 ~ file: todo.js ~ line 426 ~ router.put ~ notification", notification)
                let notifi = {
                    'title': "Zmieniono datę w zadaniu ",
                    'body': `${part} - Nowa data odbioru: ${collect_date}`
                }
                firebaseNotifi(notifi)
            }
            res.status(200).send((todos[0] = 1) ? true : false)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })

})

// Usuwanie konkretnego ToDo po id
router.put("/delete/:id", authenticate, async (req, res) => {
    console.log("DELETE TODO")
    const param = req.params.id
    console.log(param)

    await Todo.update({ active: false },
        {
            where: {
                id: param
            }
        })
        .then(todos => {
            res.status(200).send({
                deleted: true
            })
            log.deleteTodo(true, req.user.username, param, req.body.internal_id)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(200).send({
                deleted: false
            })
            log.deleteTodo(false, req.user.username, param, req.body.internal_id)
        })
})


router.use('/', (req, res) => {
    res.send("jessteś  w todo ")
})

module.exports = router