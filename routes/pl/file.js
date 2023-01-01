const express = require('express')
const router = express.Router()
const fs = require("fs")
const File = require("../../models/file")
const dirname = require("../../dirname")
const path = require('path');
// const http = require("http");
// const dasda = require("./../../uploads")

const authenticate = require('./../../services/authenticate')

let fileName

const multer = require("multer")

const maxSize = 1 * 1000 * 1000 * 100 * 10;

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log("FILE ORGINAL NAME: " + file.originalname)
        const formatedName = file.originalname.split(' ').join('_')
        fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
        // cb(null, `${fileName}.apk`) - Dla produkcji - wymuszanie APK

        cb(null, `${fileName}`)

    }
})

const upload = multer({
    limits: { fileSize: maxSize },
    storage,
    fileFilter: function (req, file, cb) {
        var filetypes = /png|avi|apk/;
        // console.log(file)
        var mimetype = filetypes.test(file.fieldname);
        // var extname = filetypes.test(path.extname(
        //     file.originalname).toLowerCase());
        console.log("mimetype: " + mimetype)
        // console.log("extname: " + extname)

        if (mimetype == false) {
            // console.log("Błąd, akceptowane formaty plików: /apk|avi|png/")
            res.status(200).send("Błąd, akceptowane formaty plików: /apk|avi|png/")
            console.log("Forbidden extension")
            req.fileValidationError = "Forbidden extension";
            return cb(null, false, req.fileValidationError);

            // return cb(null, true);
        }
        // req.filenewname = extname
        cb(null, true);

    }
})


// chceck folder exist  
// router.get("/folder", async (req, res) => {
//     try {
//         fs.access('./uploads', (err) => {
//             if (err) {
//                 console.log("NO folder exist")
//                 fs.mkdirSync('./uploads')
//                 res.status(200).send("NO folder exist")
//             }
//             else {
//                 console.log("folder exist")
//                 res.status(200).send("YES folder exist")
//             }
//         })
//         if (req.file == null) {
//             console.log("Brak pliku lub req.file == null")
//             return null
//         }

//         console.log(req.file)

//     } catch (err) {
//         console.log(err)
//     }
// })


router.post("/addApk", upload.single('apk'), async (req, res) => {

    // https://stackoverflow.com/questions/56464707/how-to-redirect-back-to-a-page-when-wrong-file-type-has-been-uploaded-via-multer

    try {
        fs.access('./../uploads', (err) => {
            if (err) {
                fs.mkdirSync('./../uploads')
            }
        })

        // console.log(req.file.originalname)

        // if (req.fileValidationError) {
        //     console.log("Zły typ plików !")
        //     res.status(200).send("Błąd, akceptowane formaty plików: apk, avi, png")
        // }
        // else if (req.file == null) {
        //     console.log("Brak pliku lub req.file == null")
        //     return null
        // }


        // const formatedName = req.file.originalname.split(' ').join('_')
        // const fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
        console.log("Nazwa Pliku: " + fileName)
        let wersja
        // Sprawdzanie Największej wersji aplikacji
        try {
            File.max('wersja')
                .then(file => {
                    console.log("Najnowsza wersja w bazie to: " + file)
                    wersja = file

                    const url = `${fileName}`;
                    console.log(wersja)
                    wersja += 0.1
                    wersja = wersja.toFixed(1) * 1
                    console.log(wersja)
                    // console.log(typeof(wersja))
                    const actual = false
                    try {

                        File.create({
                            wersja, url, actual, os: req.body.os
                        })
                            .then(file => {
                                file.dataValues['sendStatus'] = "Wysłano - 100"
                                file.dataValues['sendFile'] = true
                                console.log("File: ", file)
                                res.status(200).send(file)
                            })
                    } catch (err) {
                        console.log("Error - Dodawanie wpisu no nowej wersji aplikacji: " + err)
                    }
                })
                .catch(err => {
                    console.log('Error - Sprzwdzanie wersji: ' + err)
                })

        } catch (err) {
            console.log("Send file ERROR: " + err)
        }

        // Wysyłanie info do bazy o nowym uploadzie 
        // try {

        //     // File.create({
        //     //     wersja, url, actual
        //     // })
        //     //     .then(file => {
        //     //         console.log(file)
        //     //         res.status(200).send(file)
        //     //     })
        // } catch (err) {
        //     console.log("Error - Dodawanie wpisu no nowej wersji aplikacji: " + err)
        // }
    } catch (err) {
        console.log("Error - AddAPK: " + err)
    }
    // res.status(200).send("Wysłano - 100")

})


// Mobile SEND FILE TO DOWNLOAD
router.post("/check", async (req, res) => {
    console.log("version: " + req.body.version)
    console.log("OS: " + req.body.os)

    try {

        await File.max('wersja', 
        {
            where: {
                os: req.body.os
            }
        })
            .then(file => {
                console.log(file)
                req.body.version == file ? console.log(true) : console.log(false)
                // if (req.body.version == file) {
                if (file <= req.body.version) {
                    res.status(200).send({
                        update: false
                    })
                }
                else {
                    res.status(200).send({
                        update: true
                    })
                }
            })
            .catch(err => {
                console.log('Error: ' + err)
                res.sendStatus(200)
            })

        // const path = await dirname()
        // const file = `${path}/uploads/app-release.apk`;
        // res.download(file); // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})

// Mobile SEND FILE TO DOWNLOAD
// router.get("/download", async (req, res) => {
//     console.log("Download FILE ")
//     try {
//         const path = await dirname()
//         const file = `${path}/uploads/2022-05-11T11-20-24.906Z_MArcin_Łoch123_#_@.avi`;
//         res.status(200).download(file)
//         // Set disposition and send it.
//     } catch (err) {
//         console.log("Send file ERROR: " + err)
//     }
// })

router.put("/updateActualFile/:id", async (req, res) => {
    console.log("Param: " + req.params.id)
    const id = req.params.id

    try {
        const result = await File.update(
            { actual: false },
            {
                where: {
                    actual: true
                }
            }
        );
    } catch (err) {
        console.log("Error at change file to active=false: " + err)
    }

    try {
        const result = await File.update(
            { actual: true },
            {
                where: {
                    id: id
                }
            }
        )
        console.log(result)
        res.status(200).send(result)
    } catch (err) {
        console.log("Error on /updateActualFile/:id = " + err)
    }
})

//Download Main apk 
router.post("/download", async (req, res) => {
    // console.log("Param: " + req.params.id)
    console.log("OS: " + req.body.os)
    console.log("Download FILE ")
    try {
        const path = await dirname()

        File.findOne({
            raw: true,
            where: {
                os: req.body.os,
                actual: true
            }
        })
            .then(todo => {
                console.log(todo.url)
                const file = `${path}/uploads/${todo.url}`;
                res.status(200).download(file)
            })
            .catch(err => {
                console.log('Error: ' + err)
                res.sendStatus(400)
            })

        // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})



//Download Main apk 
router.get("/downloadAndroid", async (req, res) => {
    console.log("Param: " + req.params.id)
    console.log("Download FILE ")
    try {
        const path = await dirname()

        File.findOne({
            raw: true,
            where: {
                os: 'android',
                actual: true
            }
        })
            .then(todo => {
                console.log(todo.url)
                const file = `${path}/uploads/${todo.url}`;
                res.status(200).download(file)
            })
            .catch(err => {
                console.log('Error: ' + err)
                res.sendStatus(400)
            })

        // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})

//Download Main apk 
router.get("/downloadApple", async (req, res) => {
    console.log("Param: " + req.params.id)
    console.log("Download FILE ")
    try {
        const path = await dirname()

        File.findOne({
            raw: true,
            where: {
                os: 'ios',
                actual: true
            }
        })
            .then(todo => {
                console.log(todo.url)
                const file = `${path}/uploads/${todo.url}`;
                res.status(200).download(file)
            })
            .catch(err => {
                console.log('Error: ' + err)
                res.sendStatus(400)
            })

        // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})

// Delete file 
router.delete("/deleteFile/:id", async (req, res) => {
    console.log("DELETE FILE ")
    console.log("Param: " + req.params.id)

    try {
        const path = await dirname()

        File.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(file => {
                console.log("File Deleted ")
                res.status(200).send("file deleted")
            })
            .catch(err => {
                console.log('Error: ' + err)
                res.sendStatus(400)
            })

        // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})


// DOWNLOAD file from web - sendApkFile
router.get("/download/:id", async (req, res) => {
    console.log("Param: " + req.params.id)
    console.log("Download FILE ")
    try {
        const path = await dirname()

        File.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        })
            .then(file => {
                console.log(file.url)
                const download_file = `${path}/uploads/${file.url}`;
                res.status(200).download(download_file)
            })
            .catch(err => {
                console.log('Error: ' + err)
                res.sendStatus(400)
            })

        // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})

// GET all files 
router.get("/getFiles", async (req, res) => {
    console.log("Get all files")

    try {
        File.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        })
            .then(file => {
                console.log(file)
                res.status(200).send(file)
            })
    } catch (err) {
        console.log(err)
    }
})

router.use('/', (req, res) => res.send("jesteś w uploads"))


module.exports = router