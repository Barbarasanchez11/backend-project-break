const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/productControllers')
const path = require('path')
const admin = require('firebase-admin')
const auth= admin.auth()
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/', productController.showProduct)

//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle. OK
router.get('/products', productController.showProduct)



//Nos lleva a cada producto por la categoria. OK
router.get('/products/Proteinas',productController.showProductByCategory)
router.get('/products/Vitaminas',productController.showProductByCategory)
router.get('/products/Snacks',productController.showProductByCategory)
router.get('/products/NutricionDeportiva',productController.showProductByCategory)
router.get('/products/Otros',productController.showProductByCategory)




router.get('/products/:productId', productController.showProductById)

//register
router.get('/register', productController.register)
router.post('/register', productController.registerUser)

//login
router.get('/login', productController.login)
router.post('/login', productController.loginUser)

//logout
router.post( '/logout' ,productController.logout)



// Devuelve el detalle de un producto en el dashboard. desde ahi puedo crear producto. OK
router.get('/dashboard/new',authMiddleware, productController.showNewProduct)

// Devuelve el formulario para subir un artículo nuevo y puedo crearlo.OK
router.post('/dashboard/new',authMiddleware, productController.createProduct)

// Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
//Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.OK
router.get('/dashboard',authMiddleware,productController.showDashboard)



//Devuelve el detalle de un producto en el dashboard. OK
router.get('/dashboard/:productId',authMiddleware, productController.showDashboardById)

//Actualiza un producto.OK
router.put('/dashboard/:productId',authMiddleware ,productController.updateProduct)

// Devuelve el formulario para editar un producto.OK
router.get('/dashboard/:productId/edit', authMiddleware,productController.showEditProduct)

// Elimina un producto.
router.delete('/dashboard/:productId/delete',authMiddleware,productController.deleteProduct)
    


module.exports = router