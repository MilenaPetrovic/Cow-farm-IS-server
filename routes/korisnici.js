const express = require('express')
const router = express.Router()
const Korisnik = require('../models/korisnik')

//Svi korisnici
router.get('/', async(req, res) => {
    try {
        const korisnici = await Korisnik.find()        
        res.json(korisnici)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Jedan korisnik
router.get('/:id', getKorisnik, (req, res) => {
    res.json(res.korisnik)
})

//Create
router.post('/', async (req, res) => {
    const korisnik = new Korisnik({
        ime: req.body.ime,
        prezime: req.body.prezime,
        datum: req.body.datum
    })

    try{
        const noviKorisnik = await korisnik.save()
        res.status(201).json(noviKorisnik)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update - patch update samo ono sto prosledimo
router.patch('/:id',getKorisnik, async (req, res) => {
    if(req.body.ime != null){
        res.korisnik.ime = req.body.ime
    }
    if(req.body.prezime != null){
        res.korisnik.prezime = req.body.prezime
    }
    if(req.body.datum != null){
        res.korisnik.datum = req.body.datum
    }

    try{
        const izmenjenKorisnik = await res.korisnik.save()
        res.json(izmenjenKorisnik)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete
router.delete('/:id',getKorisnik, async (req, res) => {
    try{
        await res.korisnik.remove()
        res.json({message: "Korisnik je obrisan!"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getKorisnik(req, res, next){
    try{
        korisnik = await Korisnik.findById(req.params.id)
        if(korisnik == null){
            return res.status(400).json({message: "Nije moguce pronaci korisnika!"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.korisnik = korisnik
    next()
}

module.exports = router