const express = require('express')
const router = express.Router()
const fs = require("fs")
const File = require("../../models/file")
const dirname = require("../../dirname")
const path = require('path');
// const http = require("http");
// const dasda = require("./../../uploads")

const authenticate = require('./../../services/authenticate')


const multer = require("multer")

const maxSize = 1 * 1000 * 1000 * 100;

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const formatedName = file.originalname.split(' ').join('_')
        const fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
        // cb(null, `${fileName}.apk`) - Dla produkcji - wymuszanie APK

        cb(null, `${fileName}`)

    }
})

const upload = multer({
    limits: { fileSize: maxSize },
    storage,
    fileFilter: function (req, file, cb) {
        var filetypes = /apk|avi|png/;
        var mimetype = filetypes.test(file.mimetype);
        // var extname = filetypes.test(path.extname(
        //     file.originalname).toLowerCase());
        console.log("mimetype: " + mimetype)
        // console.log("extname: " + extname)

        if (mimetype == false) {
            // console.log("Błąd, akceptowane formaty plików: /apk|avi|png/")
            // res.status(200).send("Błąd, akceptowane formaty plików: /apk|avi|png/")
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

        if (req.fileValidationError) {
            console.log("Zły typ plików !")
            res.status(200).send("Błąd, akceptowane formaty plików: apk, avi, png")
        }
        else if (req.file == null) {
            console.log("Brak pliku lub req.file == null")
            return null
        }


        const formatedName = req.file.originalname.split(' ').join('_')
        const fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
        console.log("Nazwa Pliku: " + fileName)
        let wersja
        // Sprawdzanie Największej wersji aplikacji
        try {
            File.max('wersja')
                .then(file => {
                    console.log("Najnowsza wersja w bazie to: " + file)
                    wersja = file

                    const url = `/uploads/${fileName}`;
                    console.log(wersja)
                    wersja += 0.1
                    wersja = wersja.toFixed(1) * 1
                    console.log(wersja)
                    // console.log(typeof(wersja))
                    const actual = false
                    try {
            
                            File.create({
                                wersja, url, actual
                            })
                                .then(file => {
                                    file.dataValues['sendStatus']="Wysłano - 100"
                                    file.dataValues['sendFile']=true
                                    console.log("File: " , file)
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
    try {

        File.max('wersja')
            .then(file => {
                console.log(file)
                req.body.version == file ? console.log(true) : console.log(false)

                // if (req.body.version == file) {
                if (req.body.version == 100) {
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
router.get("/download", async (req, res) => {
    console.log("Download FILE ")
    try {
        const path = await dirname()
        const file = `${path}/uploads/motopres.apk`;
        res.status(200).download(file)
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