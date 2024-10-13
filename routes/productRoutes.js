const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/productControllers')
const path = require('path')
const admin = require('firebase-admin')
const auth= admin.auth()


router.get('/', productController.showProduct)

//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle. OK
router.get('/products', productController.showProduct)

//Nos lleva a cada producto por la categoria. OK
router.get('/products/Proteinas',productController.showProductByCategory)
router.get('/products/Vitaminas',productController.showProductByCategory)
router.get('/products/Snacks',productController.showProductByCategory)
router.get('/products/NutricionDeportiva',productController.showProductByCategory)
router.get('/products/Otros',productController.showProductByCategory)



// Devuelve el detalle de un producto. OK
router.get('/products/:productId', productController.showProductById)

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        await auth.createUser({ email, password });
        res.redirect('/login');
    } catch (error) {
        console.error(`Error interno: ${error.message}`);
        res.redirect('/register');
    }
});
    


router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'login.html'))
})

router.post('/login', async(req,res) => {
    const {idToken} = req.body
   
    try {
       
        await auth.verifyIdToken(idToken)
        res.cookie('token', idToken, {httpOnly: true, secure: false})
        res.json({success : true})
       
    } catch (error) {
        console.log(`Error ${error}`)
        res.json({ success: false });
    }
})
/*router.post( '/logout' ,(req,res)=> {
    req.session.destroy();
    res.redirect('/products');
    console.log('has cerrado sesion')
})*/

// Devuelve el detalle de un producto en el dashboard. desde ahi puedo crear producto. OK
router.get('/dashboard/new', productController.showNewProduct)

// Devuelve el formulario para subir un artículo nuevo y puedo crearlo.OK
router.post('/dashboard/new', productController.createProduct)

// Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. 
//Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.OK
router.get('/dashboard',productController.showDashboard)



//Devuelve el detalle de un producto en el dashboard. OK
router.get('/dashboard/:productId', productController.showDashboardById)

//Actualiza un producto.OK
router.put('/dashboard/:productId', productController.updateProduct)

// Devuelve el formulario para editar un producto.OK
router.get('/dashboard/:productId/edit', productController.showEditProduct)

// Elimina un producto.
router.delete('/dashboard/:productId/delete',productController.deleteProduct)
    


module.exports = router