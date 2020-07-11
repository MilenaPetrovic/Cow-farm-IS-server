const express = require('express')
const router = express.Router()
const Pasos = require('../models/pasos')

//Svi pasosi
router.get('/', async(req, res) => {
    try {
        const pasosi = await Pasos.find()        
        res.json(pasosi)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Jedan pasos
router.get('/:id', getPasos, (req, res) => {
    res.json(res.pasos)
})

//Create
router.post('/', async (req, res) => {
    const pasos = new Pasos({
        brojPasosa: req.body.brojPasosa,
        datumIzdavanja: req.body.datumIzdavanja,
        idZivotinje: req.body.idZivotinje
    })

    try{
        const noviPasos = await pasos.save()
        res.status(201).json(noviPasos)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update - patch update samo ono sto prosledimo
router.patch('/:id',getPasos, async (req, res) => {
    if(req.body.brojPasosa != null){
        res.pasos.brojPasosa = req.body.brojPasosa
    }
    if(req.body.datumIzdavanja != null){
        res.pasos.datumIzdavanja = req.body.datumIzdavanja
    }
    if(req.body.idZivotinje != null){
        res.pasos.idZivotinje = req.body.idZivotinje
    }
    try{
        const izmenjenPasos = await res.pasos.save()
        res.json(izmenjenPasos)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete
router.delete('/:id',getPasos, async (req, res) => {
    try{
        await res.pasos.remove()
        res.json({message: "Pasos je obrisan!"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getPasos(req, res, next){
    let query = {"brojPasosa":req.params.id}
    
    try{
        pasos = await Pasos.find(query)
        if(pasos[0] == null){
            return res.status(400).json({message: "Nije moguce pronaci pasos!"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.pasos = pasos[0]
    next()
}

module.exports = router