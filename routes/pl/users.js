const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const authenticate = require('./../../services/authenticate')
const Users = require('../../models/users')

router.get('/get', (req, res) => {
    console.log('pobieranie użytkowników')

    Users.findAll({
        raw: true,
        attributes: ['id', 'firstname', 'lastname', 'username', 'isViewer', 'isEditor', 'createdAt', 'isAdmin']
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

// Pobieranie imienia nazwiska zalogowanego użytkownika i roli 
router.get('/me', (req, res) => {
    authenticate(req, res)
    console.log("req.user: " + req.user.user_id)

    Users.findOne({
        raw: true,
        attributes: ['firstname', 'isEditor', 'isAdmin'],
        where: {
            id: req.user.user_id
        }
    })
        .then(user => {
            console.log(user)
            res.status(200).send(user)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(200).send({
                'logged': false
            })
        })
})

// Pobieranie imienia nazwiska uzytkownika
router.get('/me/:id', (req, res) => {
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
router.get('/getOne/:id', (req, res) => {
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

// DELETE USER 
router.delete('/delete/:id', (req, res) => {
    console.log("id usera do usunięcia : " + req.params.id)

    Users.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            console.log(user)
            res.status(200).send("Usunięto użytkownika o id uzytkownika: " + req.params.id)
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(400).send("Błąd")
        })
})

// UPDATE USER 
router.put('/update/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const { firstname, lastname, username, password, isEditor, isAdmin } = req.body
    console.log("password: " + password)
    const id = req.params.id
    if (password === '' || password === undefined || password === null) {
        console.log("bez hasła")
        Users.update({
            firstname: firstname,
            lastname: lastname,
            username: username,
            isEditor: isEditor,
            isAdmin: isAdmin
        },
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).send(true)
    }
    else if (password !== '' || password!==null) {
        console.log("Zmiana hasła")
        const hash = await bcrypt.hash(password, 10)
        Users.update({
            firstname: firstname,
            lastname: lastname,
            username: username,
            isEditor: isEditor,
            isAdmin: isAdmin,
            password: hash
        },
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).send(true)
    }
    else {
        res.status(200).send(false)
    }
})

// Change Password 
router.put('/changePassword/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const {Oldpassword, newPassword, newPassword2 } = req.body
    console.log("password: " + password)
    const id = req.params.id


    if (newPassword !== newPassword2) {
        console.log("Two diffrent New Passwords")
        let response = {}
        response.wrongOldPassword=false
        response.TwoDiffrentNewPasswords=true
        response.msg="Wpisane są dwa różne hasła !"
        
        res.status(200).send(response)
    }
    else {
        res.status(200).send(false)
    }
})




module.exports = router
