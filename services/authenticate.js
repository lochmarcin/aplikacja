const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    const token = req.cookies.JWT
    console.log("Token z cookiesów: ")
    console.log(req.cookies)
    if (token == '' || token == null){
        console.log("token ''")
        return res.status(201).json({
            logged: false,
            authenticated: false
        })
    }
    else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("coś się pojebało")
                // return next()

                // return res.status(200).send({
                return res.status(201).send({
                    logged: false
                })
            }
            else {
                req.user = user
                console.log("autchenticate: " + user.username)
                console.log("req.user.id: " + user.user_id)
                // console.log("req.user.lastname: " + user.lastname)

                // return (req.user)
                return next()
            }

        })
    }
}

module.exports = authenticate