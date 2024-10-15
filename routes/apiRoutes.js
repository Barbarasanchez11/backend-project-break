const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const apiProducts = require('../controllers/apiProductController')


router.post('/products', apiProducts.createProduct)//OK
router.get('/products', apiProducts.showProducts)//OK
router.get('/products/:productId', apiProducts.showProductById)//OK?
router.put('/products/edit/:productId', apiProducts.updateById)//Ok
router.delete('/products/delete/:productId', apiProducts.deleteProduct)







module.exports = router