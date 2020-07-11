const mongoose = require('mongoose')

const mlekaraSchema = new mongoose.Schema({
    sifraMlekare:{
        type: String,
        required: true
    },
    nazivMlekare:{
        type: String,
        required: true
    },
    pib:{
        type: String,
        required: true
    },
    maticniBroj:{
        type: String,
        required: true
    },
    pttMesta:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('mlekaras', mlekaraSchema)