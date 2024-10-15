const express = require('express')
const dbConnection = require('./config/db')
require('dotenv').config()
const path = require('path')
const admin = require('firebase-admin')
const {serviceAccount} = require('./config/firebase.js')
const cookieParser = require('cookie-parser')
const swaggerUI =require('swagger-ui-express')
const docs = require('./docs/index.js')
const apiRoutes= require('./routes/apiRoutes')

 
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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))
app.use('/api', apiRoutes);

dbConnection()

app.listen(PORT,()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})