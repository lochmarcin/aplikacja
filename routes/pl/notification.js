const Fcm = require('../../models/fcm')
var admin = require("firebase-admin");

let tokens =[]
const notification = async (notifi) => {
    console.log(notifi)

    const token = await Fcm.findAll({
        raw: true,
        attributes: ['token']
    })
    // console.log(token[0].token)

    tokens.push(token[0].token) 
    console.log(tokens)

    admin.messaging().sendMulticast({
        tokens: tokens,
        notification: notifi,
        android: {
            notification: {
              icon: 'https://firebasestorage.googleapis.com/v0/b/motopres-9e852.appspot.com/o/ikona.png?alt=media&token=e1466eb4-17d3-4c85-a497-5b8a2377c291',
              color: '#7e55c3'
            }
          }
    }).then((msg) => {
        res.sendStatus(200)

        console.log(msg)
    }).catch(err => {
        console.log('Error: ' + err)
        res.sendStatus(400)
    })
}

module.exports = notification