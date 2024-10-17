const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards,getProductCardsById,getPagination} = require('../public/utils/index')
const path=require('path')
const admin = require('firebase-admin')
const auth = admin.auth()

const productController = {
  async showProduct(req, res) {
    const { page = 1, category } = req.query; // Si page no existe se establece por defecto 1
    const pages = 5;

    try {
        const query = category ? { category: category } : {}; // Filtra por categoría si se proporciona

        // Obtiene el total de productos que coinciden con la consulta
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / pages);
        const currentPage = Math.min(Math.max(1, page), totalPages); // Asegura que la página actual esté dentro de los límites entre 1 y la longitud

        const skip = (currentPage - 1) * pages; 

        
        const paginatedProducts = await Product.find(query)
            .skip(skip)
            .limit(pages);

        
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