const Logs = require("./../models/logs")
const moment = require('moment')
const { copyFileSync } = require("fs")

GetDate = () => {
    return moment().format('YYYY-MM-DD')
}

GetTime = () => {
    return moment().format('HH:mm:ss')
}


const type = {
    logowanie: 'logowanie',
    zadania: 'zadania',
    uzytkownik: 'uzytkownik',
    error: 'błąd'
}

// Poprawne logowanie
const LoginLogs = (type = null, who = null, whom = null, did = null, details = null, link = null, info = null) => {
    // let type = 'logowanie'
    let date = GetDate()
    let time = `${GetDate()} ${GetTime()}`

    console.log(date)
    console.log(time)

    if (who) {
        try {
            console.log("Wysyłam: " + time)
            Logs.create({ type, who, did, date, time })
            // .then(logs => {
            //     console.log(logs)
            // })
        } catch (error) {
            console.log("Error at saving Loging logs: " + error)
        }
    }
}

// Błędne hasło podczas logowania 
const WrongPasswordLoginLogs = (who) => {
    let date = GetDate()
    let time = `${GetDate()} ${GetTime()}`

    console.log(date)
    console.log(time)

    if (who) {
        try {
            console.log("Wysyłam: " + time)
            Logs.create({ type: 'logowanie', who, did: 'niepowiodło się: ', date, time, info: 'błędne hasło' })
            // .then(logs => {
            //     console.log(logs)
            // })
        } catch (error) {
            console.log("Error at  WrongPasswordLoginLogs saving Loging logs: " + error)
        }
    }
}
class Log {

    login(success = true || false, who) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        console.log(date)
        console.log(time)

        if (who) {
            try {
                console.log("Wysyłam: " + time)
                Logs.create({ type: 'logowanie', who, success, did: success ? 'powiodło się ' : 'niepowiodło się: ', date, time, info: success ? null :'błędne hasło' })
            } catch (error) {
                console.log("Error at  WrongPasswordLoginLogs saving Loging logs: " + error)
            }
        }
    }
    register(success = true || false, who) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        console.log(date)
        console.log(time)

        if (who) {
            try {
                console.log("Wysyłam: " + time)
                Logs.create({ type: 'logowanie', who, success, did: success ? 'powiodło się ' : 'niepowiodło się: ', date, time, info: success ? null :'błędne hasło' })
            } catch (error) {
                console.log("Error at  WrongPasswordLoginLogs saving Loging logs: " + error)
            }
        }
    }



}
module.exports = Log
