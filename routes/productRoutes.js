const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/productControllers')



router.get('/products', productController.showProduct)
router.get('/productById/:_id/', productController.showProductById)

router.get('/products/Proteinas',productController.showProductByCategory)
router.get('/products/Vitaminas',productController.showProductByCategory)
router.get('/products/Snacks',productController.showProductByCategory)
router.get('/products/NutricionDeportiva',productController.showProductByCategory)
router.get('/products/Otros',productController.showProductByCategory)

router.get('/dashboard/new', productController.showNewProduct)
router.get('/dashboard',productController.showDashboard)
router.post('/dashboard/new', productController.createProduct)
router.get('/dashboard/:productId', productController.showDashboardById)
router.put('/dashboard/:productId', productController.updateProduct)
router.get('/dashboard/:productId/edit', productController.showEditProduct)
router.delete('/dashboard/:productId/delete',productController.deleteProduct)
    


module.exports = router