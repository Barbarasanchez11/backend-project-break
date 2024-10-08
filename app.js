const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const dbConnection = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const path = require('path')



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', productRoutes)

dbConnection()

app.listen(PORT,()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})