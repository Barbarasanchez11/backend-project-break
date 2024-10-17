const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards,getProductCardsById} = require('../public/utils/index')
const path=require('path')
const admin = require('firebase-admin')
const auth = admin.auth()



const productController = {

  async showProduct(req, res) {
    const {category} = req.query
   
    
    try {
      const products =  await Product.find() 
      const areThereCategories = category ? products.filter(product => product.category[0] === category) : products
      if(!products) throw new Error('No se encontraron productos')
      const html = baseHtml() + getNavBar() + getProductCards(areThereCategories) 
     
      
      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
    }
  },
  
 async showProductById(req,res){
    
    try{
        const id = req.params.productId
        const products = await Product.findById(id) 
        if(!products) {
            return res.status(404).json('Producto no encontrado')
        }
        const html = baseHtml() + getNavBar() + getProductCardsById([products]) 
        res.send(html)
    }catch (error) {
      res.status(500).json({message : 'Se produjo un error al intentar obtener el producto'})
  }
},

<<<<<<< HEAD
=======


>>>>>>> newChanges
/* Bonus Login*/

async register(req,res){
  res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
},

async registerUser (req,res){
  const { email, password } = req.body;
  try {
      await auth.createUser({ email, password });
      res.redirect('/login');
  } catch (error) {
      console.error(`Error interno: ${error.message}`);
      res.redirect('/register');
  }
},

async login (req,res) {
  res.sendFile(path.join(__dirname, '../public/views', 'login.html'))
},

async loginUser(req,res){
  const {idToken} = req.body
 
  try {
     
      await auth.verifyIdToken(idToken)
      res.cookie('token', idToken, {httpOnly: true, secure: false})
      res.json({success : true})
     
  } catch (error) {
      console.log(`Error ${error}`)
      res.redirect('/register');
  }
},

async logout(req,res){
  res.clearCookie('token')
  res.redirect('/products')
}

}

module.exports = productController;