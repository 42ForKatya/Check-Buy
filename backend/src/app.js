const express = require('express')
const port = 3000
const userRouter = require('./routers/user')
const newsRouter = require('./routers/news')
const productRouter = require('./routers/product')
const checkoutRouter = require('./routers/checkout')
require('./db/db')
const News = require('./models/News')
const User = require('./models/User')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser= require('body-parser')
const fs = require('fs');

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(newsRouter)
app.use(productRouter)
app.use(checkoutRouter)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, async () => {
    // Create admin
    let admin = await User.findOne({isAdmin: true})
    if(!admin) {
        const user = new User({
            name: 'admin',
            email: 'admin@email.com',
            password: 'admin',
            isAdmin: true
        })
        user.save()
    }
    
    // Populate seed data
    News.remove({});
    
    mongoose.connection.dropCollection('news',() => {
        let admin = {};
        
        let newsData = [
            {
                title: 'breaking news# 1',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_1.jpg').toString('base64')
            },
            {
                title: 'some news',
                description: 'When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_2.png').toString('base64')
            },
            {
                title: 'lorem ipsum news',
                description: 'Also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_3.jpg').toString('base64')
            },
            {
                title: 'good news',
                description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_4.jpg').toString('base64')
            },
            {
                title: 'Random news',
                description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_5.jpg').toString('base64')
            },
            {
                title: 'Fruits to eat',
                description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_6.jpg').toString('base64')
            },
            {
                title: 'My news',
                description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_7.jpg').toString('base64')
            },{
                title: 'Headlines: news',
                description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: fs.readFileSync(__dirname + '/public/images/img_8.png').toString('base64')
            }
        ];
    
        for(let i in newsData) {
            const news = new News(newsData[i])
            news.save();
        }
    
        console.log(`Server running on port ${port}`)
    })
    
})