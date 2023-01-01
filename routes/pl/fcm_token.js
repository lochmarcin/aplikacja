const express = require('express')
const router = express.Router()
const Fcm = require('../../models/fcm')

router.post("/fcm", async (req, res) => {
    console.log('Rejestrowanie nowego tokena FCM ! ------------------------')
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
                console.log("Dodano nowy FCM token: " + fcm.token);
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
        console.log("Brak FCM tokena")
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

router.get("/deleteAllFcm", async (req, res) => {
    console.log('DELETE ALL FCM TOKENS !!! ------------------------')
    // const fcm_token = req.body.token
    // console.log("fcm_token: " + fcm_token)
        try {
            await Fcm.destroy({
                truncate: true                
            });
            res.sendStatus(200)
        } catch (err) {
            console.log("FCM tokens delete Error: " + err)
            res.sendStatus(300)
            return
        }
    

})


module.exports = router