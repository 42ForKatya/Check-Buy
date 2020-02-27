const express = require('express')
const News = require('../models/News')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/news', auth, async(req, res) => {
    try{
        let data = await News.find({})
        console.log(data)
        res.status(200).send({news: data})
    }catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router