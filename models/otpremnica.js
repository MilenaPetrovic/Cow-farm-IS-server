const mongoose = require('mongoose')

const otpremnicaSchema = new mongoose.Schema({
    brojOtpremnice:{
        type: String,
        required: true
    },
    skladiste:{
        type:String,
        required:true
    },
    datumOtpremnice:{
        type: Date,
        required: true,
        default: Date.now
    },
    vozac:{
        type:String,
        required: true,
    },
    pttMesta:{
        type: String,
        required: true
    },
    sifraZaposlenog:{
        type:String,
        required:true
    },
    sifraMlekare:{
        type:String,
        required:true
    },
    stavke:[
        {
            rb:{
                type:Number,
                required:true
            },
            naziv:{
                type:String,
                required:true
            },
            kolicina:{
                type:Number,
                required:true
            },
            jedinicaMere:{
                type:String,
                required:true
            }

        }
    ]
})

module.exports = mongoose.model('otpremnicas', otpremnicaSchema)