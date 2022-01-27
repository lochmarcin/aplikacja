var admin = require("firebase-admin");
var serviceAccount = require("../motopres-56f80-firebase-adminsdk-rjc35-1ea0d56603.json");
// const fcms = require('../services/arrayOfFcm')
const Fcm = require('../models/fcm')



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const firebaseNotifi = async (notification) => {

    let tokens
    
    Fcm.findAll({
        raw: true,
        attributes: ['token']
    }).then(fcm=>{
        tokens = fcm.map(function (obj) {
            return obj.token;
          });
        console.log(tokens)


        admin.messaging().sendMulticast({
            tokens: tokens,
            notification: notification,
            android: {
                notification: {
                  icon: 'https://firebasestorage.googleapis.com/v0/b/motopres-9e852.appspot.com/o/ikona.png?alt=media&token=e1466eb4-17d3-4c85-a497-5b8a2377c291',
                  color: '#7e55c3'
                }
              }
        }).then((msg) => {
            console.log(msg)
            return true
    
        }).catch(err => {
            console.log('Error: ' + err)
        })


    }).catch(err => {
        console.log(err)
        return []
    })


    
}

module.exports = firebaseNotifi