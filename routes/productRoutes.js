const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/productControllers')


//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle. OK
router.get('/products', productController.showProduct)



//Nos lleva a cada producto por la categoria. OK
router.get('/products/Proteinas',productController.showProductByCategory)
router.get('/products/Vitaminas',productController.showProductByCategory)
router.get('/products/Snacks',productController.showProductByCategory)
router.get('/products/NutricionDeportiva',productController.showProductByCategory)
router.get('/products/Otros',productController.showProductByCategory)

// Devuelve el detalle de un producto. OK
router.get('/products/:_id', productController.showProductById)



// Devuelve el detalle de un producto en el dashboard. desde ahi puedo crear producto. OK
router.get('/dashboard/new', productController.showNewProduct)

// Devuelve el formulario para subir un artículo nuevo y puedo crearlo.OK
router.post('/dashboard/new', productController.createProduct)

// Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
//Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard',productController.showDashboard)

//Devuelve el detalle de un producto en el dashboard. OK?me lleva a la ruta de products
router.get('/dashboard/:productId', productController.showDashboardById)

//Actualiza un producto.
router.put('/dashboard/:productId', productController.updateProduct)

// Devuelve el formulario para editar un producto.
router.get('/dashboard/:productId/edit', productController.showEditProduct)

// Elimina un producto.
router.delete('/dashboard/:productId/delete',productController.deleteProduct)
    


module.exports = router