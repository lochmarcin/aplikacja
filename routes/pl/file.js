const express = require('express')
const router = express.Router()
const fs = require("fs")
const File = require("../../models/file")
const dirname = require("../../dirname")

const authenticate = require('./../../services/authenticate')


const multer = require("multer")

const maxSize = 1 * 1000 * 1000 * 100;

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    fileName: function (req, file, cb) {
        const formatedName = req.file.originalname.split(' ').join('_')
        const fileName = new Date().toISOString().replace(/:/gi, '-') + '_' + formatedName
        cb(null, file.fieldname + '-' + fileName + ".png")
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


router.post("/addApk", upload.single('apk'), async (req, res) => {
    try {
        fs.access('./uploads', (err) => {
            if (err) {
                fs.mkdirSync('./uploads')
            }
        })
        if (req.file == null) {
            console.log("Brak pliku lub req.file == null")
            return null
        }



        // console.log("Filename: " + fileName)

    } catch (err) {
        console.log(err)
    }
})


// Mobile SEND FILE TO DOWNLOAD
router.get("/download", async (req, res) => {
    
    try {
        const path = await dirname()
        const file = `${path}/uploads/app-release.apk`;
        res.download(file); // Set disposition and send it.
    } catch (err) {
        console.log("Send file ERROR: " + err)
    }
})

module.exports = router