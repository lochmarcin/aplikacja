const express = require('express')
// const { router } = require('..')
const router = express.Router()
// const db = require("../../postgres")
const db = require('../../config/database')

const Todo = require('../../models/todo')
const User = require('../../models/users')

const authenticate = require('./../../services/authenticate')


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
            //todo = JSON.stringify(todo)
            // console.log(todo[0].dataValues.price)
            // console.log('cookie created successfully');

            // console.log(todo)
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
            ['collect_date', 'ASC']
        ]
    })
        .then(todo => {
            //todo = JSON.stringify(todo)
            // console.log(todo[0].dataValues.price)
            // console.log(todo)
            res.status(200).json(todo)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})



// router.get("/dupa", async (req, res) => {
//     authenticate(req, res)
//     // console.log("req.user: " + req.user.id)

//     const result = await User.findAll({
//         where: {
//             username: req.user.username
//         }
//     })
//     let firstname = result[0].dataValues.firstname
//     let lastname = result[0].dataValues.lastname
//     let fullname = firstname.concat(" ", lastname)
//     console.log(fullname)

// })

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
    let condition = "nowa/używana"

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
            console.log("Powinoo wysłać")
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})
router.post("/add", async (req, res) => {
    console.log("add todo:")
    console.log("----------------------------")
    // console.log(req.body)

    let { users, company, part, indexx, quantity, price, band_number, note, collect_date, condition } = req.body
    let done = false

    try {
        const result = await Todo.create({
            users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done
        })
        console.log(result.dataValues)
        res.status(200).json(result.dataValues)
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
    let condition = "regenerowana"

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
            console.log((todos[0] = 1) ? "looks good" : "sometching is wrong")
            res.status(200).send((todos[0] = 1) ? "looks good" : "sometching is wrong")
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})


router.use('/', (req, res) => {
    res.send("jessteś  w todo ")
})

module.exports = router