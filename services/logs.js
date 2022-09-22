const Logs = require("./../models/logs")
const moment = require('moment')
const { copyFileSync } = require("fs")
const { stringify } = require("querystring")

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

    // LOGIN  ---  LOGIN  ---  LOGIN  ---  LOGIN  ---  LOGIN  ---  LOGIN  ---  LOGIN  ---  LOGIN  ---  LOGIN
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

    // TODO  ---   TODO  ---   TODO  ---   TODO  ---   TODO  ---   TODO  ---   TODO  ---   TODO


    addTodo(success = true || false, who, condition, company, part, indexx, quantity, price, band_number, note, collect_date, internal_id, deposit, time_morning, fv, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create addTodo log ...")
                let info = `Dodano zadanie przez ${who}, id: ${internal_id}, część: ${part}, do firmy: ${company}, data odbioru: ${collect_date}`

                let details = `condition: ${condition}, company: ${company}, part: ${part}, indexx: ${indexx}, quantity: ${quantity}, price: ${price}, band_number: ${band_number}, note: ${note}, collect_date: ${collect_date}, internal_id: ${internal_id}, deposit: ${deposit}, time_morning: ${time_morning}, fv: ${fv}`

                Logs.create({ type: 'todo', who, success, did: success ? 'dodano zadanie' : "nie dodano zadania", date, time, info, details, link: `OneTodoDetails?id=${id}`, todoId: id })

            } catch (error) {
                console.log("Error at 'addTodo' - LOG saving logs: " + error)
            }
        }

    }

    updateTodo(success = true || false, who, oldTodo = {}, newTodo = {}, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        const info = `${oldTodo.internal_id == newTodo.internal_id ? "" : `Zmieniono: Id wew. - z:${oldTodo.internal_id}, na:${newTodo.internal_id} ; `} ${oldTodo.condition == newTodo.condition ? "" : `Zmieniono: Stan. - z:${oldTodo.condition}, na:${newTodo.condition} ; `} ${oldTodo.time_morning == newTodo.time_morning ? "" : `Zmieniono: Porę dostawy. - z:${oldTodo.time_morning}, na:${newTodo.time_morning} ; `} ${oldTodo.deposit == newTodo.deposit ? "" : `Zmieniono: Kaucję/Magazyn. - z:${oldTodo.deposit}, na:${newTodo.deposit} ; `} ${oldTodo.part == newTodo.part ? "" : `Zmieniono: Część. - z:${oldTodo.part}, na:${newTodo.part} ; `} ${oldTodo.collect_date == newTodo.collect_date ? "" : `Zmieniono: Datę odbioru. - z:${oldTodo.collect_date}, na:${newTodo.collect_date} ; `} ${oldTodo.company == newTodo.company ? "" : `Zmieniono: Firmę. - z:${oldTodo.company}, na:${newTodo.company} ; `} ${oldTodo.indexx == newTodo.indexx ? "" : `Zmieniono: Indeks. - z:${oldTodo.indexx}, na:${newTodo.indexx} ; `} ${oldTodo.band_number == newTodo.band_number ? "" : `Zmieniono: numer opaski. - z:${oldTodo.band_number}, na:${newTodo.band_number} ; `} ${oldTodo.price == newTodo.price ? "" : `Zmieniono: cena. - z:${oldTodo.price}, na:${newTodo.price} ; `} ${oldTodo.note == newTodo.note ? "" : `Zmieniono: Uwagi. - z:${oldTodo.note}, na:${newTodo.internanotel_id} ; `} ${oldTodo.fv == newTodo.fv ? "" : `Zmieniono: FV. - z:${oldTodo.fv}, na:${newTodo.fv} ; `} `

        const details = JSON.stringify(oldTodo) + JSON.stringify(newTodo)


        if (who) {
            try {
                console.log("Create updateTodo log ...")

                Logs.create({ type: 'todo', who, success, did: success ? 'zaaktualizowano zadanie' : "nie zaktualizowano zadania", date, time, info, details, link: `OneTodoDetails?id=${id}`, todoId: id })

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

                Logs.create({ type: success ? 'todo' : 'error', who, success, did: success ? 'wykonał zadanie' : `Błąd przy wykonaniu zadania`, date, time, info, details, link: `OneTodoDetails?id=${id}`, todoId: id })

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

                Logs.create({ type: success ? 'todo' : 'error', who, success, did: success ? 'przywrócił zadanie' : `Błąd przy przywracaniu zadania`, date, time, info, details, link: `OneTodoDetails?id=${id}`, todoId: id })

            } catch (error) {
                console.log("Error at 'restoreTodo' - LOG saving logs: " + error)
            }
        }

    }

    deleteTodo(success = true || false, who, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create deleteTodo log ...")
                let info = success ? `Użytkownik ${who} usunął zadanie o id: ${id}` : `Błąd przy usuwaniu zadania. Użytkownik ${who}, zadanie o id: ${id}`

                let details = ``

                Logs.create({ type: success ? 'todo' : 'error', who, success, did: success ? 'usunął zadanie' : `Błąd przy usuwaniu zadania`, date, time, info, details, link: `OneTodoDetails?id=${id}`, todoId: id })

            } catch (error) {
                console.log("Error at 'deleteTodo' - LOG saving logs: " + error)
            }
        }

    }


    // USER  ---  USER  ---  USER  ---  USER  ---  USER  ---  USER  ---  USER  ---  USER

    //USUWANIE UŻYTKOWANIKA 
    deleteUser(success = true || false, who, whom, name, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create deleteUser log ...")
                let info = success ? `Użytkownik ${who} usunął użytkowanika: ${name}` : `Błąd przy usuwaniu użytkownika. Użytkownik ${who}, użyt. o id: ${id}`

                let details = success ? `Użytkownik ${who} usunął użytkowanika: ${name} - ${whom}, o id: ${id}` : ""

                Logs.create({ type: success ? 'user' : 'error', who, whom, success, did: success ? 'usunął użytkownika' : `Błąd przy usuwaniu użytkownika`, date, time, info, details })

            } catch (error) {
                console.log("Error at 'deleteUser' - LOG saving logs: " + error)
            }
        }

    }
    // ZMIANA HASŁA
    changePassword(success = true || false, who, whom, id) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create changePassword log ...")
                let info = success ? `Użytkownik ${who} zmienił hasło` : `Błąd przy zmianie hasła. - ${whom}`

                let details = success ? `Użytkownik ${who} zmienił hasło, użytkownik o id: ${id}` : ""

                Logs.create({ type: success ? 'user' : 'error', who, whom, success, did: success ? 'zmienił hasło' : `Błąd przy zmienie hasła`, date, time, info, details })

            } catch (error) {
                console.log("Error at 'changePassword' - LOG saving logs: " + error)
            }
        }

    }
    // EDIT DATA by Myself
    editMe(success = true || false, who, whom, id, oldMe, newMe) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create editMe log ...")

                let info = success ? `Użytkownik ${who} zmienił dane: ${oldMe.firstname != newMe.firstname ? `Imie z: ${oldMe.firstname} na: ${newMe.firstname}; ` : ""}${oldMe.lastname != newMe.lastname ? `Nzawisko z: ${oldMe.lastname} na: ${newMe.lastname}; ` : ""} ${oldMe.username != newMe.username ? `Nazwy użytkownika z: ${oldMe.username} na: ${newMe.username}; ` : ""}
                ` : `Błąd przy zmianie hasła. - ${whom}`

                let details = success ? (JSON.stringify(oldMe) + JSON.stringify(newMe)) : ""

                Logs.create({ type: success ? 'user' : 'error', who, whom, success, did: success ? 'zmieniono dane' : `Błąd przy zmienie danych`, date, time, info, details })

            } catch (error) {
                console.log("Error at 'editMe' - LOG saving logs: " + error)
            }
        }

    }

    // EDIT DATA by ADMIN !
    editUser(success = true || false, who, whom, id, oldUser, newUser, password = Boolean) {
        let date = GetDate()
        let time = `${GetDate()} ${GetTime()}`

        if (who) {
            try {
                console.log("Create editUser log ...")

                let info = success ? `Użytkownik ${who} zmienił dane użytkownikowi ${oldUser.firstname} ${oldUser.lastname}: ${oldUser.firstname != newUser.firstname ? `Imie z: ${oldUser.firstname} na: ${newUser.firstname}; ` : ""}${oldUser.lastname != newUser.lastname ? `Nazwisko z: ${oldUser.lastname} na: ${newMe.lastname}; ` : ""} ${oldUser.username != newUser.username ? `Zazwy użytkownika z: ${oldUser.username} na: ${newUser.username}; ` : ""} ${oldUser.isAdmin != newUser.isAdmin ? `Oraz uprawnienia - admina z: ${oldUser.isAdmin} na: ${newUser.isAdmin}; ` : ""} ${oldUser.isEditor != newUser.isEditor ? `dodawania zleceń z: ${oldUser.isEditor} na: ${newUser.isEditor}; ` : ""} ${password ? `oraz hasło zostało zmienione` : "bez zmiany hasła"}
                ` : `Błąd przy danych. - ${whom}`

                let details = success ? (JSON.stringify(oldUser) + JSON.stringify(newUser)) : ""

                Logs.create({ type: success ? 'user' : 'error', who, whom, success, did: success ? 'zmieniono dane' : `Błąd przy zmienie danych`, date, time, info, details })

            } catch (error) {
                console.log("Error at 'editUser' - LOG saving logs: " + error)
            }
        }

    }
}
module.exports = Log
