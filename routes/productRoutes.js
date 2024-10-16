const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/productControllers')
const admin = require('firebase-admin')
const auth = admin.auth()



router.get('/', productController.showProduct)

//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle. OK
router.get('/products', productController.showProduct)

router.get('/products/:productId', productController.showProductById)

//register
router.get('/register', productController.register)
router.post('/register', productController.registerUser)

//login
router.get('/login', productController.login)
router.post('/login', productController.loginUser)

//logout
router.post( '/logout' ,productController.logout)


module.exports = router