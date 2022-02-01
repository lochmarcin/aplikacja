const express = require('express')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const axios = require('axios')
const path = require('path');


require('dotenv').config({ path: '.env' })

const port = 5000

const app = express()

app.use(bodyParser.json({limit:'100mb'}))
app.use(bodyParser.urlencoded({extended: true, limit:'100mb'}))
app.use(cookieParser())

app.use(
    cors({
        // origin: "*",
        credentials: true,
        'Access-Control-Allow-Origin': "*",

        // 'Access-Control-Allow-Origin': ["http://tebuty.pl","http://motopres.tebuty.pl","http://localhost:3000","http://127.0.0.1:3000","http://192.168.1.143:8081"],
        // origin: ["http://tebuty.pl","http://motopres.tebuty.pl","http://localhost:3000","http://127.0.0.1:3000","http://192.168.1.143:8081"],
        origin: true
    })
)


express.static(path.join(__dirname, '/uploads'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","http://192.168.1.143:8081", "http://127.0.0.1:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Database 
const db = require('./config/database')
// Database check connection    
db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))
    



app.use('/', routes)

app.listen(port,()=>{
    console.log("serwer działa na porcie " + port)
})