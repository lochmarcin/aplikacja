const Logs = require("./../models/logs")
const moment = require('moment')
const { copyFileSync } = require("fs")

GetDate = () => {
    return moment().format('YYYY-MM-DD')
}

GetTime = () => {
    return moment().format('HH:mm:ss')
}


function LoginLogs(who) {
    let type = 'logowanie'
    let did = 'zalogował się: '
    let date = GetDate()
    let time = GetTime()

    console.log(date)
    console.log(time)

    if (who) {
        try {
            Logs.create({ type, who, did, date, time })
                .then(logs => {
                    console.log(logs)
                })
        } catch (error) {
            console.log("Error at saving Loging logs: " + error)
        }
    }
}
module.exports = LoginLogs