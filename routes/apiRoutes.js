const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const apiProducts = require('../controllers/apiProductController')


router.post('/products', apiProducts.createProduct)//OK
router.get('/products', apiProducts.showProducts)






module.exports = router