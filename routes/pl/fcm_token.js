const express = require('express')
const router = express.Router()
const Fcm = require('../../models/fcm')

router.post("/", async (req, res) => {
    console.log('Rejestrowanie nowego tokena FCM')

    await Fcm.findOrCreate({ 
        where: { 
            token: req.body.token
        },
        defaults: {
            token: req.body.token
        }
    })
    .then(fcm => {
        console.log(fcm)
        console.log("dodano")
        res.sendStatus(200)
    })
    .catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    });
    
})

module.exports = router