const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards,getProductCardsById,footer} = require('../public/utils/index')
const path=require('path')
const admin = require('firebase-admin')
const auth = admin.auth()



const productController = {

  async showProduct(req, res) {
    try {
      const products = await Product.find();
      if(!products) throw new Error('No se encontraron productos')
      const html = baseHtml() + getNavBar() + getProductCards(products) + footer()
      console.log()
      
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
        const html = baseHtml() + getNavBar() + getProductCardsById([products]) +footer()
        res.send(html)
    }catch (error) {
      res.status(500).json({message : 'Se produjo un error al intentar obtener el producto'})
  }
},

async showProductByCategory(req, res) {
  
  const path = req.path;
  const category = path.split('/products/').join('');

  try {
      const products = await Product.find({ category });
      const html = baseHtml() + getNavBar() + getProductCardsById(products); +footer()
      res.send(html);
  } catch (error) {
      res.status(500).json({ message: 'Se produjo un error al intentar obtener el producto' });
  }
},

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