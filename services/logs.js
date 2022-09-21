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
                Logs.create({ type: 'logowanie', who, success, did: success ? 'powiodło się ' : 'niepowiodło się: ', date, time, info: success ? null : `błędne hasło lub błędny podany użytkownik ${who}` })
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
                Logs.create({ type: 'rejestracja', who, success, did: 'utworzył użytkownika ', whom, date, time, info: `użytkownik ${who} utworzył użytkownika ${firstname} ${lastname} - login: ${username}, o uprawnieniach: Editor-${isEditor}, Admin-${isAdmin} ` })
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


    addTodo(success = true || false, who, condition, company, part, indexx, quantity, price, band_number, note, collect_date, internal_id, deposit, time_morning, fv, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create addTodo log ...")
                let info = `Dodano zadanie przez ${who}, id: ${internal_id}, część: ${part}, do firmy: ${company}, data odbioru: ${collect_date}`

                let details = `condition: ${condition}, company: ${company}, part: ${part}, indexx: ${indexx}, quantity: ${quantity}, price: ${price}, band_number: ${band_number}, note: ${note}, collect_date: ${collect_date}, internal_id: ${internal_id}, deposit: ${deposit}, time_morning: ${time_morning}, fv: ${fv}`

                Logs.create({ type: 'todo', who, success, did: success ? 'dodano zadanie' : "nie dodano zadania", date, time, info, details, link: `OneTodoDetails?id=${id}` })

            } catch (error) {
                console.log("Error at 'addTodo' - LOG saving logs: " + error)
            }
        }

    }

    updateTodo(success = true || false, who, oldTodo = {}, newTodo = {}) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        // console.log(oldTodo)
        // console.log("-----------------------")
        // console.log(newTodo)

        let info = `${oldTodo.internal_id == newTodo.internal_id ? "" : `Zmieniono: Id wew. - z:${oldTodo.internal_id}, na:${newTodo.internal_id} ; `} ${oldTodo.condition == newTodo.condition ? "" : `Zmieniono: Id wew. - z:${oldTodo.condition}, na:${newTodo.condition} ; `} ${oldTodo.time_morning == newTodo.time_morning ? "" : `Zmieniono: Id wew. - z:${oldTodo.time_morning}, na:${newTodo.time_morning} ; `} ${oldTodo.deposit == newTodo.deposit ? "" : `Zmieniono: Id wew. - z:${oldTodo.deposit}, na:${newTodo.deposit} ; `} ${oldTodo.part == newTodo.part ? "" : `Zmieniono: Id wew. - z:${oldTodo.part}, na:${newTodo.part} ; `} ${oldTodo.collect_date == newTodo.collect_date ? "" : `Id wew. - z:${oldTodo.collect_date}, na:${newTodo.collect_date} ; `} ${oldTodo.company == newTodo.company ? "" : `Zmieniono: Id wew. - z:${oldTodo.company}, na:${newTodo.company} ; `} ${oldTodo.indexx == newTodo.indexx ? "" : `Zmieniono: Id wew. - z:${oldTodo.indexx}, na:${newTodo.indexx} ; `} ${oldTodo.band_number == newTodo.band_number ? "" : `Zmieniono: Id wew. - z:${oldTodo.band_number}, na:${newTodo.band_number} ; `} ${oldTodo.price == newTodo.price ? "" : `Zmieniono: Id wew. - z:${oldTodo.price}, na:${newTodo.price} ; `} ${oldTodo.note == newTodo.note ? "" : `Zmieniono: Id wew. - z:${oldTodo.note}, na:${newTodo.internanotel_id} ; `} ${oldTodo.fv == newTodo.fv ? "" : `Zmieniono: Id wew. - z:${oldTodo.fv}, na:${newTodo.fv} ; `} `

        console.log(info)

        if (who) {
            try {
                console.log("Create updateTodo log ...")
                // let info = `Zaktualozowano zadanie przez ${who}, id: ${internal_id}, część: ${part}, do firmy: ${company}, data odbioru: ${collect_date}`

                // let details = `id: ${id}, who:${who}, condition: ${condition}, company: ${company}, part: ${part}, indexx: ${indexx}, quantity: ${quantity}, price: ${price}, band_number: ${band_number}, note: ${note}, collect_date: ${collect_date}, internal_id: ${internal_id}, deposit: ${deposit}, time_morning: ${time_morning}, fv: ${fv}`

                // Logs.create({ type: 'todo', who, success, did: success ? 'zaaktualizowano zadanie' : "nie zaktualizowano zadania", date, time, info, details, link: `OneTodoDetails?id=${id}` })

            } catch (error) {
                console.log("Error at 'addTodo' - LOG saving logs: " + error)
            }
        }

    }

    doneTodo(success = true || false, who, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create doneTodo log ...")
                let info = success ? `Użytkownik ${who} wykonał zadanie o id: ${id}` : `Błąd przy wykonaniu zadania. Użytkownik ${who}, zadanie o id: ${id}`

                let details = ``

                Logs.create({ type: success ? 'todo' : 'error', who, success, did: success ? 'wykonał zadanie' : `Błąd przy wykonaniu zadania`, date, time, info, details, link: `OneTodoDetails?id=${id}` })

            } catch (error) {
                console.log("Error at 'doneTodo' - LOG saving logs: " + error)
            }
        }

    }

    restoreTodo(success = true || false, who, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create doneTodo log ...")
                let info = success ? `Użytkownik ${who} przywrócił zadanie o id: ${id}` : `Błąd przy przywróceniu zadania. Użytkownik ${who}, zadanie o id: ${id}`

                let details = ``

                Logs.create({ type: success ? 'todo' : 'error', who, success, did: success ? 'przywrócił zadanie' : `Błąd przy przywracaniu zadania`, date, time, info, details, link: `OneTodoDetails?id=${id}` })

            } catch (error) {
                console.log("Error at 'restoreTodo' - LOG saving logs: " + error)
            }
        }

    }


}
module.exports = Log
