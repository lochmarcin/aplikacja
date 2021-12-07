const express = require('express')
const router = express.Router()
// const db = require("../../postgres")
const db = require('../../config/database')
const Company = require('../../models/company')

// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!
// NOT ACTUAL !!


// Add one COMPANY
router.post("/add", (req,res) => {
    console.log(req.body)

    let {name_comp, town, street, number_house, post_code, phone, email} = req.body
    
    Company.create({name_comp, town, street, number_house, post_code, phone, email})
    .then(comapny => {
        console.log(comapny)
        res.status(200).json(comapny)
    })
    .catch(err => {
        console.log("Error: " + err)
        res.sendStatus(400)
    })
})

// Get all company 
router.get("/get", (req, res)=>{
    Company.findAll({
        order: [
            ['name_comp', 'ASC']
        ]
    })
    .then(company => {
        console.log(company)
        res.status(200).json(company)
    })
})

// GET one company
router.get("/getOne/:id", (req, res)=>{
    const param = req.params.id
    Company.findOne({
        where: {
            id: param
        }
    })
    .then(comapnies => {
        console.log(comapnies)
        res.status(200).json((comapnies))
    })
    .catch(err => {
        console.log("Error: " + err)
        res.sendStatus(400)
    })
})


// Update one company
router.put("/update/:id", async(req,res) => {
    console.log(req.body)
    const param = req.params.id 
    console.log("Params: " + param)

    let {name_comp, town, street, number_house, post_code, phone, email} = req.body

    await Company.update({name_comp, town, street, number_house, post_code, phone, email},
        {
            where: {
                id: param
            }
        })
    .then(company =>{
        console.log(company)
        res.sendStatus(200)
    })
    .catch(err=>{
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})

// Delete one Company
router.delete('/delete', async(req, res)=>{
    const param = req.params.id 
    console.log("Params: " + param)
    
    await Company.destroy({
        where: {
            id: param
        }
    })
    .then(comapnies=>{
        console.log(comapnies.dataValues)
        res.sendStatus(200)
    })
    .catch(err =>{
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
})

router.get("/", (req, res)=>{console.log("jesteś w company!")})

module.exports = router