const express = require('express')
const router = express.Router()
const db = require('../../config/database')
let User = require('../../models/users')
const cookieParser = require('cookie-parser')

router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({ extended: true }))

router.get('/api/users', authenticate, (req, res) => {
    const users = [{ id: 1, name: 'Adam' }]

    res.send(users)
})

router.post('/loginn', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log("username: " + username)
    console.log("password: " + password)



    try {
        const result = await User.findOne({
            where: {
                username: username
            }
        })
        
        const dbPassword = result.dataValues.password
        console.log(dbPassword)
    } catch (e) {
        res.sendStatus(400)
        console.log(e)
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const result = await User.findOne({
            where: {
                username: username
            }
        })
        
        const dbPassword = result.dataValues.password
        console.log(dbPassword)
    } catch (e) {
        res.sendStatus(400)
        console.log(e)
    }

    const validPassword = await bcrypt.compare(password, dbPassword)

    const accessToken = generateAccessToken({ id: 1 })
    const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 })
    // Save refresh Token in DB

    res.cookie('JWT', accessToken, {
        maxAge: 86400000,
        httpOnly: true,
    })

    res.send({ accessToken, refreshToken })
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

    const accessToken = generateAccessToken({ id: 1 })

    res.send({ accessToken })
})

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 86400 }) // 86400
}

function authenticate(req, res, next) {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    const token = req.cookies.JWT

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}


module.exports = router