const express = require('express')
const router = express.Router()
const db = require('../../config/database')
let User = require('../../models/users')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({ extended: true }))

router.get('/api/users', authenticate, (req, res) => {
    const users = [{ id: 23213123, name: 'Adam' }]

    res.send(users)
})


router.get("/me", async (req, res) => {
    authenticate(req, res)
    if (req.user.username == null) {
        console.log("Brak zalogowanego uzytkownika")
        res.send(500).send("Brak zalogowanego uzytkownika")
    }
    else {
        console.log("req.user: " + req.user.username)
    }

})



router.post("/register", async (req, res) => {
    const { firstname, lastname, username, password } = req.body
    console.log(req.body)

    const hash = await bcrypt.hash(password, 10)
    try {
        const result = await User.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hash
        })

        res.status(200).send("Użytkownik dodany!")
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


// router.post('/loginn', async (req, res) => {
//     const username = req.body.username
//     const password = req.body.password
//     console.log("username: " + username)
//     console.log("password: " + password)



//     try {
//         const result = await User.findOne({
//             where: {
//                 username: username
//             }
//         })

//         const dbPassword = result.dataValues.password

//         const validPassword = await bcrypt.compare(password, result.dataValues.password)

//         console.log(validPassword)
//     } catch (e) {
//         res.sendStatus(400)
//         console.log(e)
//     }
// })

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    console.log("Hasło podane: " + password)
    let dbPassword
    let result
    try {
        result = await User.findOne({
            where: {
                username: username
            }
        })
        if (result == null)
            res.status(500).send("Błędne dane logowania!")


        console.log("Hasło z bazy: " + result.dataValues.password)
        dbPassword = result.dataValues.password
        console.log(dbPassword)
    } catch (e) {
        res.sendStatus(400)
        console.log(e)
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
            res.sendStatus(400)
        }

        res.cookie('JWT', accessToken, {
            maxAge: 86400000,
            httpOnly: true,
        })
        res.status(200).json({
            token: accessToken})
        console.log("Zalogowano!")

    }
    else {
        res.send("Błędne dane logowania!")
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

// function generateAccessToken(payload) {
//     return jwt.sign(user_id: result.dataValues.id, username: result.dataValues.username, process.env.TOKEN_SECRET, { expiresIn: 86400 }) // 86400
// }

// function authenticate(req, res, next) {
//     // const authHeader = req.headers['authorization']
//     // const token = authHeader && authHeader.split(' ')[1]
//     const token = req.cookies.JWT

//     if (token === null) return res.sendStatus(401)

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)

//         req.user = user
//         next()
//     })
// }

function authenticate(req, res, next) {

    const token = req.cookies.JWT

    if (token === null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403)

        req.user = user
        console.log("autchenticate: " + user.username)
        return (req.user)

    })
}

router.delete("/logout", async (req, res) => {
    res.cookie('JWT', null);

    console.log(req.user)
    res.status(200).json({
        message: "Logged out successfully"
    })
})


module.exports = router