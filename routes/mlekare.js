const express = require('express')
const router = express.Router()
const Mlekara = require('../models/mlekara')

//Sve mlekare
router.get('/', async(req, res) => {
    try {
        const mlekare = await Mlekara.find()        
        res.json(mlekare)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Jedna mlekara
router.get('/:id', getMlekara, (req, res) => {
    res.json(res.mlekara)
})

async function getMlekara(req, res, next){
    let query = {"sifraMlekare":req.params.id}
    
    try{
        mlekara = await Mlekara.find(query)
        if(mlekara[0] == null){
            return res.status(400).json({message: "Nije moguce pronaci mlekaru!"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.mlekara = mlekara[0]
    next()
}

module.exports = router