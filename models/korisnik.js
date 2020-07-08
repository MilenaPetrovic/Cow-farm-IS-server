const mongoose = require('mongoose')

const korisnikSchema = new mongoose.Schema({
    ime:{
        type: String,
        required: true
    },
    prezime:{
        type: String,
        required: true
    },
    datum:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('korisniks', korisnikSchema)