const express = require('express')
const News = require('../models/News')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/checkout', auth, async(req, res) => {
    try{
        console.log(req.body)
        res.status(200).send({checkout: 'work on it'})
    }catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router