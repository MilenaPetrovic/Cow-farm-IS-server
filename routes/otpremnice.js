const express = require('express')
const router = express.Router()
const Otpremnica = require('../models/otpremnica')

//Sve otpremnice
router.get('/', async(req, res) => {
    try {
        const otpremnice = await Otpremnica.find()        
        res.json(otpremnice)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Jedna otpremnica
router.get('/:id', getOtpremnica, (req, res) => {
    res.json(res.otpremnica)
})

//Create
router.post('/', async (req, res) => {
    const otpremnica = new Otpremnica({
        brojOtpremnice: req.body.brojOtpremnice,
        datumOtpremnice: req.body.datumOtpremnice,
        skladiste: req.body.skladiste,
        voazc: req.body.vozac,
        pttMesta: req.body.pttMesta,
        sifraMlekare: req.body.sifraMlekare,
        sifraZaposlenog: req.body.sifraZaposlenog,
        stavke: req.body.stavke
    })

    try{
        const novaOtpremnica = await otpremnica.save()
        res.status(201).json(novaOtpremnica)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update - patch update samo ono sto prosledimo
router.patch('/:id',getOtpremnica, async (req, res) => {
    if(req.body.brojOtpremnice != null){
        res.otpremnica.brojOtpremnice = req.body.brojOtpremnice
    }
    if(req.body.datumOtpremnice != null){
        res.otpremnica.datumOtpremnice = req.body.datumOtpremnice
    }
    if(req.body.skladiste != null){
        res.otpremnica.skladiste = req.body.skladiste
    }
    if(req.body.vozac != null){
        res.otpremnica.vozac = req.body.vozac
    }
    if(req.body.pttMesta != null){
        res.otpremnica.pttMesta = req.body.pttMesta
    }
    if(req.body.sifraMlekare != null){
        res.otpremnica.sifraMlekare = req.body.sifraMlekare
    }
    if(req.body.sifraZaposlenog != null){
        res.otpremnica.sifraZaposlenog = req.body.sifraZaposlenog
    }
    try{
        const izmenjenaOtpremnica = await res.otpremnica.save()
        res.json(izmenjenaOtpremnica)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete
router.delete('/:id',getOtpremnica, async (req, res) => {
    try{
        await res.otpremnica.remove()
        res.json({message: "Otpremnica je obrisana!"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getOtpremnica(req, res, next){
    let query = {"brojOtpremnice":req.params.id}
    
    try{
        otpremnica = await Otpremnica.find(query)
        if(otpremnica[0] == null){
            return res.status(400).json({message: "Nije moguce pronaci otpremnicu!"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.otpremnica = otpremnica[0]
    next()
}

module.exports = router