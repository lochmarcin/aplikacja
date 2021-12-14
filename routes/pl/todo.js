const express = require('express')
const { route } = require('..')
const router = express.Router()
// const db = require("../../postgres")
const db = require('../../config/database')
const Todo = require('../../models/todo')



// GET ALL TODOS WITCH DONE IS FALSE ---------- GET ALL TODOS ---------- GET ALL TODOS 
router.get('/get', (req, res)=>{
    console.log("get all todos")
    Todo.findAll({
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
        console.log(todo)
        res.status(200).json(todo)
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})

// GET ALL TODOS WITCH DONE IS FALSE ---------- GET ALL TODOS ---------- GET ALL TODOS 
router.get('/getDone', (req, res)=>{
    console.log("get all todos")
    Todo.findAll({
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
        console.log(todo)
        res.status(200).json(todo)
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})



// Aktualizacja jednego todo po id NA DONE TRUE
router.put("/updateDone/:id", async(req,res)=> {
    console.log("Param: " + req.params.id)
    

    await Todo.update({done:"true"},
        {
        where: {
            id: req.params.id
        }
    })
    .then(todos=> {
        console.log(todos[0])
        res.status(200).send((todos[0]=1)? "looks good" : "sometching is wrong")
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})

// Aktualizacja jednego todo po id NA DONE TRUE
router.put("/updateNotDone/:id", async(req,res)=> {
    console.log("Param: " + req.params.id)


    await Todo.update({done:"false"},
        {
        where: {
            id: req.params.id
        }
    })
    .then(todos=> {
        console.log(todos[0])
        res.status(200).send((todos[0]=1)? "looks good" : "sometching is wrong")
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})


// Dodanie jednego TODO 
router.post("/addNew", (req,res)=>{
    console.log("add todo:")
    console.log("----------------------------")
    console.log(req.body)
    
    let {users, company, collect_date, part, indexx, quantity, price, band_number, note} = req.body
    let done = false
    let condition = "nowa/używana"

    Todo.create({users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done
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

// Dodanie jednego TODO 
router.post("/addReg", (req,res)=>{
    console.log("add todo:")
    console.log("----------------------------")
    console.log(req.body)
    
    let {users, company, collect_date, part, indexx, quantity, price, band_number, note} = req.body
    let done = false
    let condition = "regenerowana"

    Todo.create({users, company, collect_date, part, indexx, quantity, price, band_number, note, condition, done
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

// Pobieranie jednego TODO po id
router.get('/getOne/:id', (req,res)=>{
    console.log("get one todos")
    console.log("------------------------------------")
    console.log(req.params.id)
    
    Todo.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(todo=> {
        console.log(todo[0].dataValues)
        res.status(200).send(todo[0].dataValues)
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})


// Aktualizacja jednego todo po id
router.put("/update/:id", async(req,res)=> {
    console.log(req.body)
    const param = req.params.id 
    console.log('Param: ' + param)

    let {users, company, collect_date, part, indexx, quantity, price, band_number, note} = req.body
    
    await Todo.update({users, company, collect_date, part, indexx, quantity, price, band_number, note},
        {
        where: {
            id: param
        }
    })
    .then(todos=> {
        console.log((todos[0]=1)? "looks good" : "sometching is wrong")
        res.status(200).send((todos[0]=1)? "looks good" : "sometching is wrong")
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })

})

// Usuwanie konkretnego ToDo po id
router.delete("/delete/:id", async(req,res)=>{
    const param = req.params.id 
    console.log(param)

    await Todo.destroy({
        where: {
            id: param
        }
    })
    .then(todos=> {
        console.log((todos[0]=1)? "looks good" : "sometching is wrong")
        res.status(200).send((todos[0]=1)? "looks good" : "sometching is wrong")
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})


// SQL 
{
// router.post('/add', async(req,res)=>{
//     console.log('body', req.body)

//     try {
//         const result = await db.query("INSERT INTO todo (users, company, collect_date, part, indexx, quantity, price, band_number, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *", [req.body.user, req.body.company, req.body.collect_date, req.body.part, req.body.index, req.body.quantity, req.body.price, req.body.band_number, req.body.note])
//         console.log(result.rows[0])

//         res.status(200).json({
//             status: "success",
//             todo: result.rows[0],
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })


// router.get('/show', async(req, res)=>{
//     try {
//         const result = await db.query("INSERT INTO todo (users, company, collect_date, part, indexx, quantity, price, band_number, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *", [req.body.user, req.body.company, req.body.collect_date, req.body.part, req.body.index, req.body.quantity, req.body.price, req.body.band_number, req.body.note])
//         console.log(result.rows[0])

//         res.status(200).json({
//             status: "success",
//             todo: result.rows[0]
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })

// router.post('/name', async (req, res)=>{
//     console.log('name')
//     try {
//         const result = await db.query("INSERT INTO name (name) VALUES ($1) returning *",
//         ["dupa"])
//         console.log(result.rows)
//         res.status(200).json({
//             status: "success",
//             name: result.rows
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })
}

router.use('/', (req, res)=>{
    res.send("jessteś  w todo ")
})

module.exports = router