const express = require('express')
const router = express.Router()
const authController = require('../controllers/authContorllers')
const authMiddleware = require('../middlewares/authMiddleware')


// Devuelve el detalle de un producto en el dashboard. desde ahi puedo crear producto. OK
router.get('/dashboard/new',authMiddleware, authController.showNewProduct)

// Devuelve el formulario para subir un artículo nuevo y puedo crearlo.OK
router.post('/dashboard/new',authMiddleware,authController.createProduct)

// Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
//Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.OK
router.get('/dashboard',authMiddleware,authController.showDashboard)



//Devuelve el detalle de un producto en el dashboard. OK
router.get('/dashboard/:productId',authMiddleware, authController.showDashboardById)

//Actualiza un producto.OK
router.put('/dashboard/:productId',authMiddleware ,authController.updateProduct)

// Devuelve el formulario para editar un producto.OK
router.get('/dashboard/:productId/edit', authMiddleware,authController.showEditProduct)

// Elimina un producto.
router.delete('/dashboard/:productId/delete',authMiddleware,authController.deleteProduct)
    


module.exports = router

