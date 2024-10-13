const express = require('express')
const dbConnection = require('./config/db')
require('dotenv').config()
const path = require('path')
const admin = require('firebase-admin')
const {serviceAccount} = require('./config/firebase.js')
const cookieParser = require('cookie-parser')

 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const app = express()
const PORT = process.env.PORT || 8080


app.use(express.static(path.join(__dirname, 'public')));     
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


const productRoutes = require('./routes/productRoutes')
app.use('/', productRoutes)

dbConnection()

app.listen(PORT,()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})