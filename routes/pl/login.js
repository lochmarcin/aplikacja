const express = require('express')
const router = express.Router()
const db = require('../../config/database')
let User = require('../../models/users')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('./../../services/authenticate')
const Fcm = require('../../models/fcm')

const Log = require('../../services/logs')
const log = new Log



router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({ extended: true }))

// router.get('/api/users', authenticate, (req, res) => {
//     const users = [{ id: 23213123, name: 'Adam' }]

//     res.send(users)
// })


router.get("/data", authenticate, async (req, res) => {
    // authenticate(req, res),
    console.log(req.user)
    res.status(200).send("chuj")
})

router.get("/me", authenticate, async (req, res) => {

     
    if (req.user == null || req.user == undefined) {
        console.log("Brak zalogowanego uzytkownika")
        res.status(401).send({
            logged: false,
            message: "Unauthorized"
        })
    }
    else {
        console.log("req.user.username: ", req.user)
        let user = req.user
        user.logged = true
        res.status(200).send(user)

        // res.status(200).send(req.user)
    }
})



router.post("/register", authenticate, async (req, res) => {
    const { firstname, lastname, username, password, isEditor, isAdmin } = req.body
    console.log(req.body)


    const hash = await bcrypt.hash(password, 10)
    try {
        const [user, created] = await User.findOrCreate({
            raw: true,
            where: {
                username: username
            },
            defaults: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: hash,
                isEditor: isEditor,
                isAdmin: isAdmin,
                active: true
            }
        })

        if (created == true) {
            console.log("Dodano użytkonik")
            console.log(user.dataValues)
            res.status(200).send(user.dataValues)


            log.register(created, req.user.username, username, username, isEditor, isAdmin, firstname, lastname)

            return
        }
        else {
            res.status(200).json({
                "exists": true
            })
            console.log("Istnieje już taki")
        }
    } catch (err) {
        console.log("Rejestracja error" + err)
        res.sendStatus(200)
    }
})

router.post('/login', async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    // const fcm_token = req.body.token

    console.log("username podane: " + username)
    console.log("Hasło podane: " + password)

    let dbPassword
    let result
    try {
        result = await User.findOne({
            where: {
                username: username
            }
        })
        if (result == null) {
            res.status(200).json({
                isEditor: null,
                token: null
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
        res.sendStatus(200)
        return 0
    }


    const validPassword = await bcrypt.compare(password, dbPassword)
    if (validPassword) {

        const accessToken = jwt.sign(
            {
                user_id: result.dataValues.id,
                username: result.dataValues.username
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '30d'
            })

        const refreshToken = jwt.sign({ user_id: result.dataValues.id, username: result.dataValues.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 })


        // Save refresh Token in DB
        try {
            await User.update({
                refreshToken: refreshToken
            },
                {
                    where: {
                        username: username
                    }
                })
        } catch (e) {
            console.log("login Error: " + e)
            res.sendStatus(200)
        }

        res.cookie('JWT', accessToken, {
            maxAge: 86400000,
            httpOnly: true,
            // ZMIEŃ na lokalu secure: true; sameSite: 'None',
            secure: true,
            sameSite: 'None'
        })

        console.log("Wysłałem tokena: " + accessToken)
        // res.setHeader('Acces-Control-Allow-Origin','*')

        log.login(true, result.username)

        res.status(200).json({
            firstname: result.dataValues.firstname,
            isAdmin: result.dataValues.isAdmin,
            isEditor: result.dataValues.isEditor,
            token: accessToken
        })
        console.log("Zalogowano!")
        // next()
    }
    else {

        log.login(false, username)
        
        res.status(200).json({
            isEditor: null,
            token: null
        })
    }


})

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.token

    if (!refreshToken) {
        return res.status(401)
    }

    // TODO: Check if refreshToken exists in DB

    const validToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    if (!validToken) {
        return res.status(403)
    }

    const accessToken = jwt.sign(
        {
            user_id: result.dataValues.id,
            username: result.dataValues.username
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '30d'
        })

    res.send({ accessToken })
})

router.delete("/logout", authenticate, async (req, res) => {

    res.cookie('JWT', "", {
        httpOnly: true,
        //Odkomentuj poniższe dwie linijki na lokalu 
        secure: true,
        sameSite: 'None'
    });
    res.clearCookie('JWT')
    res.cookie('JWT', null)
    console.log("WYLOGOWANIE !!!")
    console.log("logout: ", req.cookies)
    console.log("req.user:", req.user)


    log.logout(true, req.user.username)

    res.status(200).json({
        logged: false,
        message: "Logged out successfully"
    })


})


module.exports = router