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
        tokens: ['dwHtFwplQN608ACf39LwzF:APA91bG5uvyeGtCYtwGg-32Su4JboJAiY1yomhKfBfP27lKVUwDSxrfHkJuM5hCSTJ4slebB7Cnrp5Ns-VSNU46ZvOsY-w2b3rsZKswO61E9fVMk2BSOT1R-O6O4jzt4l14R9UpeeS1M'],
        notification: notifi,
        android: {
            notification: {
              icon: 'https://firebasestorage.googleapis.com/v0/b/motopres-9e852.appspot.com/o/ikona.png?alt=media&token=e1466eb4-17d3-4c85-a497-5b8a2377c291',
              color: '#7e55c3'
            }
          }
    }).then((msg) => {
        console.log(msg)
    }).catch(err => {
        console.log('Error: ' + err)
    })
}

module.exports = notification