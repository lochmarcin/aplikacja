const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const authenticate = require('./../../services/authenticate')
const Users = require('../../models/users')

const Log = require('../../services/logs')
const User = require('../../models/users')
const log = new Log


router.get('/get', authenticate, (req, res) => {
    console.log('pobieranie użytkowników')

    Users.findAll({
        raw: true,
        attributes: ['id', 'firstname', 'lastname', 'username', 'isViewer', 'isEditor', 'createdAt', 'isAdmin'],
        where: {
            active: true
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

// Pobieranie imienia nazwiska zalogowanego użytkownika i roli 
router.get('/me', authenticate, (req, res) => {

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
router.get('/me/:id', authenticate, (req, res) => {
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
router.delete('/delete/:id', authenticate, (req, res) => {
    console.log("id usera do usunięcia : " + req.params.id)

    Users.update({
        active: false
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(user => {

            res.status(200).send("Usunięto użytkownika o id uzytkownika: " + req.params.id)

            Users.findOne({
                raw: true,
                attributes: ['firstname', 'lastname', 'username', 'isEditor', 'isAdmin'],
                where: {
                    id: req.params.id
                }
            }).then(deleteduser => {
                log.deleteUser(true, req.user.username, deleteduser.username, `${deleteduser.firstname} ${deleteduser.lastname}`, req.params.id)
            }).catch(err => {
                console.log('Error: ' + err)
            })
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(400).send("Błąd")
        })
})

// UPDATE USER 
router.put('/updateMe/:id', authenticate, async (req, res) => {
    console.log("/updateMe/:id")
    console.log(req.body)
    console.log(req.params.id)
    const { firstname, lastname, username } = req.body
    const id = req.params.id
    if (firstname !== '' || lastname !== '' || username !== 'null') {
        console.log("bez hasła")

        Users.findOne({
            where: {
                id: id
            }
        }).then(oldMe => {

            Users.update({
                firstname: firstname,
                lastname: lastname,
                username: username
            },
                {
                    where: {
                        id: id
                    }
                }
            ).then(newMe => {
                res.status(200).send(true)
                log.editMe(true, req.user.username, req.user.username, req.params.id, oldMe, req.body)
            })

        })

    }
    else {
        res.status(200).send(false)
    }
})

// UPDATE USER 
router.put('/update/:id', authenticate, async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const { firstname, lastname, username, password, isEditor, isAdmin } = req.body
    console.log("password: " + password)
    const id = req.params.id
    let hash = null
    if (password !== '' || password !== null)
        hash = bcrypt.hash(password, 10)

    User.findOne({
        raw: true,
        where: {
            id: id
        }

    }).then(oldUser => {

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
            log.editUser(true, req.user.username, oldUser.username, id, oldUser, req.body, false)
        }
        else {

        }
        if (password !== '' || password !== null) {
            console.log("Zmiana hasła")

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
            log.editUser(true, req.user.username, oldUser.username, id, oldUser, req.body, true)

        }
        else {
            res.status(200).send(false)
        }
    })


})

// Change Password 
router.put('/changePassword/:id', authenticate, async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const { oldPassword, firstNewPass, secondNewPass } = req.body
    console.log("oldPassword: " + oldPassword)
    console.log("firstNewPass: " + firstNewPass)
    console.log("secondNewPass: " + secondNewPass)

    const id = req.params.id


    if (firstNewPass !== secondNewPass) {
        console.log("Two diffrent New Passwords")
        let response = {}
        response.wrongOldPassword = false
        response.TwoDiffrentNewPasswords = true
        response.msg = "Wpisane są dwa różne hasła !"
        res.status(200).send(response)
    }
    else {

        let dbPassword
        let result
        try {
            result = await Users.findOne({
                where: {
                    id: id
                }
            })
            if (result == null) {
                res.status(200).json({
                    msg: "No user find to change password"
                })
            }
            else {
                console.log("Znaleziono: " + result.username)
                console.log("Hasło z bazy: " + result.password)
                dbPassword = result.password
                console.log(dbPassword)

            }
        } catch (e) {
            console.log("Login Error" + e)
            res.sendStatus(200).json({
                msg: "Error in find user :("
            })
            return 0
        }


        const validPassword = await bcrypt.compare(oldPassword, dbPassword)
        if (validPassword) {
            const hash = await bcrypt.hash(firstNewPass, 10)
            console.log("New Pass Hash: " + hash)
            try {
                result = await Users.update(
                    {
                        password: hash
                    },
                    {
                        where: {
                            id: id
                        }
                    })
                console.log("RESULT from update change password: " + result)
                let response = {}
                response.changedPass = true
                response.msg = "Hasło zostało zmienione"
                res.status(200).send(response)

                log.changePassword(true, req.user.username, req.user.username, id)

            } catch (error) {
                console.log("Error at change pass to db: " + error)
            }
        }
        else {
            console.log("DB Password and received Password is not the same ! ")
            let response = {}
            response.wrongOldPassword = true
            response.msg = "DB Password and received Password is not the same ! "
            res.status(200).send(response)
            log.changePassword(false, req.user.username, req.user.username, id)
        }

    }
})




module.exports = router
