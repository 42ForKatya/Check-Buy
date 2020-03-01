const express = require('express')
const Product = require('../models/Product')
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

console.log(path.resolve('./src/public/images'))

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(201).send({ product })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(201).send({ products })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/addToCart', async (req, res) => {
    console.log('Add to cart API called with productId => ', req.body.id);
    res.status(200).send();
})

router.post('/nfcTag', async (req, res) => {
    console.log('Received productId => ', req.body.id);
    
    if(req.body.id) {
        try {
            const product = await Product.findById(req.body.id)
            res.status(201).send({ product })
        } catch (error) {
            res.status(400).send(error)
        }
    } else {
        res.status(201).send()
    }
})

router.post('/products', upload.single('imageFile'), async (req, res) => {
    // Create a new product
    try {
        await Product.create({
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            image: fs.readFileSync(req.file.path).toString('base64')
        })
        res.status(201).send({done: 'ok'})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.delete('/products', async (req, res) => {
    // Remove product
    try {
        await Product.findOneAndRemove({_id: req.query.id});
        res.status(201).send({done: 'ok'})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router