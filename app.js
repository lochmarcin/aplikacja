const express = require('express')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')



require('dotenv').config({ path: '.env' })

const port = 5000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(
    cors({
        origin: "*"
    })
)


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