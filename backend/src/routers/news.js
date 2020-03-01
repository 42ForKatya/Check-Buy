const express = require('express')
const News = require('../models/News')
const auth = require('../middleware/auth')
const multer  = require('multer')
const path = require('path')
const fs = require('fs')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/uploads/`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase())
    }
});
var upload = multer({ storage: storage });

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

router.post('/news', upload.single('imageFile'), async (req, res) => {
    // Create a new news
    try {
        await News.create({
            title: req.body.title,
            description: req.body.description,
            image: fs.readFileSync(req.file.path).toString('base64')
        })
        res.status(201).send({done: 'ok'})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.delete('/news', async (req, res) => {
    // Remove news
    try {
        await News.findOneAndRemove({_id: req.query.id});
        res.status(201).send({done: 'ok'})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router