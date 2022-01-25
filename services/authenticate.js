const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    const token = req.cookies.JWT
    console.log("Token z cookiesów: ")
    console.log(req.cookies)
    if (token == null)
        console.log("token null")
    else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("coś się pojebało")
                return res.status(200).send({
                    logged: false
                })
            }

            req.user = user
            console.log("autchenticate: " + user.username)
            console.log("req.user.id: " + user.user_id)
            // console.log("req.user.lastname: " + user.lastname)

            return (req.user)

        })
    }
}

module.exports = authenticate