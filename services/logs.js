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

class Log {

    // LOGIN LOG
    login(success = true || false, who) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        console.log(date)
        console.log(time)

        if (who) {
            try {
                console.log("Wysyłam: " + time)
                Logs.create({ type: 'logowanie', who, success, did: success ? 'powiodło się ' : 'niepowiodło się: ', date, time, info: success ? null :`błędne hasło lub błędny podany użytkownik ${who}` })
            } catch (error) {
                console.log("Error at 'login' - LOG saving logs: " + error)
            }
        }
    }

    // REJESTRACJA LOG 
    register(success = true || false, who, whom, username, isEditor, isAdmin, firstname, lastname) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        console.log(date)
        console.log(time)

        if (who) {
            try {
                console.log("Wysyłam: " + time)
                Logs.create({ type: 'rejestracja', who ,  success, did: 'utworzył użytkownika ', whom, date, time, info: `użytkownik ${who} utworzył użytkownika ${firstname} ${lastname} - login: ${username}, o uprawnieniach: Editor-${isEditor}, Admin-${isAdmin} ` })
            } catch (error) {
                console.log("Error at 'register' - LOG saving logs: " + error)
            }
        }
    }


    // LOGOUT LOG
    logout(success = true || false, who) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        // console.log(date)
        // console.log(time)

        if (who) {
            try {
                console.log("Wysyłam: " + time)
                Logs.create({ type: 'logowanie', who, success, did: success ? 'wylogował się ' : null, date, time })
            } catch (error) {
                console.log("Error at 'logout' - LOG saving logs: " + error)
            }
        }
    }



}
module.exports = Log
