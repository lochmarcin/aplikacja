const express = require('express')
const router = express.Router()
const Fcm = require('../../models/fcm')

router.post("/", async (req, res) => {
    console.log('Rejestrowanie nowego tokena FCM')
    const fcm_token = req.body.token
    console.log("fcm_token: " + fcm_token)
    if (fcm_token != undefined) {
        try {
            const [fcm, created] = await Fcm.findOrCreate({
                where: { token: fcm_token },
                defaults: {
                    token: fcm_token
                }
            });
            if (created) {
                console.log("Dodano nowy token: " + fcm.token);
                res.sendStatus(200)
                return

            }
        } catch (err) {
            console.log("Save FCM token Error: " + err)
            res.sendStatus(200)
            return
        }
    }
    else {
        console.log("Brak fcm tokena")
        res.sendStatus(200)
        return
    }

    // await Fcm.findOrCreate({
    //     where: {
    //         token: req.body.token
    //     },
    //     defaults: {
    //         token: req.body.token
    //     }
    // })
    //     .then(fcm => {
    //         console.log(fcm)
    //         console.log("FCM Token - DODANO ")
    //         res.sendStatus(200)
    //     })
    //     .catch(err => {
    //         console.log('Error: ' + err)
    //         res.sendStatus(400)
    //     });

})

module.exports = router