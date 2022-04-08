const express = require('express')
const router = express.Router()
const fs = require("fs")
const File = require("../../models/file")
const dirname = require("../../dirname")
// const http = require("http");
// const dasda = require("./../../uploads")

const authenticate = require('./../../services/authenticate')


const multer = require("multer")

const maxSize = 1 * 1000 * 1000 * 100;

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    fileName: function (req, file, cb) {
        const formatedName = file.originalname.split(' ').join('_')
        const fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
        cb(null, `${fileName}.apk`)
    }

}
)   
const upload = multer({
    storage,
    limits: { fileSize: maxSize }
    // fileFilter: function (req, file, cb) {

    //     // Set the filetypes, it is optional
    //     var filetypes = /jpeg|jpg|png/;
    //     var mimetype = filetypes.test(file.mimetype);

    //     // var extname = filetypes.test(path.extname(
    //     //             file.originalname).toLowerCase());

    //     //     if (mimetype && extname) {
    //     //         return cb(null, true);
    //     //     }

    //     //     cb("Error: File upload only supports the "
    //     //             + "following filetypes - " + filetypes);
    // }
})

// chceck folder exist  
router.get("/folder", async (req, res) => {
    try {
        fs.access('./uploads', (err) => {
            if (err) {
                console.log("NO folder exist")
                fs.mkdirSync('./uploads')
                res.status(200).send("NO folder exist")
            }
            else {
                console.log("folder exist")
                res.status(200).send("YES folder exist")
            }
        })
        if (req.file == null) {
            console.log("Brak pliku lub req.file == null")
            return null
        }

        console.log(req.file)

        // console.log("Filename: " + fileName)

    } catch (err) {
        console.log(err)
    }
})


router.post("/addApk", upload.single('apk'), async (req, res) => {
    try {
        fs.access('./../uploads', (err) => {
            if (err) {
                fs.mkdirSync('./../uploads')
            }
        })
        if (req.file == null) {
            console.log("Brak pliku lub req.file == null")
            return null
        }

        console.log(req.file)

        // console.log("Filename: " + fileName)

    } catch (err) {
        console.log(err)
    }
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
            raw: true
        })
        .then(file=>{
            console.log(file)
            res.status(200).send(file)
        })
    } catch (err) {
        console.log(err)
    }
})

router.use('/', (req, res)=> res.send("jesteś w uploads"))


module.exports = router