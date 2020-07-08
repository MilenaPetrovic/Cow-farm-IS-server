require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser:true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())
app.use(cors())

const korisniciRouter = require('./routes/korisnici')
app.use('/korisnici', korisniciRouter)

const pasosiRouter = require('./routes/pasosi')
app.use('/pasosi', pasosiRouter)

app.listen(4500, ()=> console.log('Server started...'))