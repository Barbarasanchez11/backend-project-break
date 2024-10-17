const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards,getProductCardsById,getPagination} = require('../public/utils/index')
const path=require('path')
const admin = require('firebase-admin')
const auth = admin.auth()

const productController = {

  async showProduct(req, res) {
    const { page = 1, category } = req.query; // si page no existe se establece por defecto 1
    const pages = 5

    try {
        
        const products = await Product.find();
        let filteredProducts = category ? products.filter(product => product.category[0] === category) : products

        
        const totalPages = Math.ceil(filteredProducts.length / pages) 
        const currentPage = Math.min(Math.max(1, page), totalPages) //no puede ser menor a 0, si es 1 o más da page
        //si Math.mat es mayor que totalPages , devolverá totalpages
        
        const start = (currentPage - 1) * pages//va restando para asegurar que empieza desde el inicio
        const paginatedProducts = filteredProducts.slice(start, start + pages)//devuelve un array con 5 por página
        //va a empezar desde start y nos va a dar pages(5 por página)
      
        const html = baseHtml() + getNavBar() + getProductCards(paginatedProducts) + getPagination(currentPage, totalPages, category);
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
},



async logout(req,res){
  res.clearCookie('token')
  res.redirect('/products')
}

}
module.exports= productController