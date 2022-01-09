const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    const token = req.cookies.JWT
    console.log("Token z cookiesów: ")
    console.log(req.cookies)
    if (token === null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err){
            console.log("coś się pojebało")
            return res.sendStatus(403)
        }

        req.user = user
        console.log("autchenticate: " + user.username)
        return (req.user)

    })
}

module.exports = authenticate