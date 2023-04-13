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
router.post("/add", async (req, res) => {
    console.log(req.body)

    let nameCompany = req.body.name_comp

    const [company, created] = await Company.findOrCreate({
        where: {
            name_comp: nameCompany
        }
    })
    if (created) res.status(200).send({ "success": true })
    else res.status(200).send({ "success": false, "message": "Firma już istnieje" })

})

// Get all company 
router.get("/get/:attributes", (req, res) => {
    if (req.params.attributes == 'name_comp') {
        Company.findAll({
            order: [
                ['name_comp', 'ASC']
            ],
            attributes: ['name_comp'],
            raw: true
        })
            .then(company => {
                console.log(company)
                res.status(200).json(company)
            })
    }
    else if(req.params.attributes == 'all'){
        Company.findAll({
            order: [
                ['name_comp', 'ASC']
            ],
            raw: true
        })
            .then(company => {
                console.log(company)
                res.status(200).json(company)
            })
    }
    else{
        res.sendStatus(400)
    }
})



// GET one company
router.get("/getOne/:id", (req, res) => {
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
router.put("/update/:id", async (req, res) => {
    console.log(req.body)
    const param = req.params.id
    console.log("Params: " + param)

    let { name_comp, town, street, number_house, post_code, phone, email } = req.body

    await Company.update({ name_comp, town, street, number_house, post_code, phone, email },
        {
            where: {
                id: param
            }
        })
        .then(company => {
            console.log(company)
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.sendStatus(400)
        })
})

// Delete one Company
router.delete('/delete/:id', async (req, res) => {
    const param = req.params.id
    console.log("Params: " + param)

    await Company.destroy({
        where: {
            id: param
        }
    })
        .then(comapnies => {
            console.log(comapnies)
            res.status(200).send({ 'success': true })
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(200).send({ 'success': false })
        })
})

router.get("/", (req, res) => { console.log("jesteś w company!") })

module.exports = router