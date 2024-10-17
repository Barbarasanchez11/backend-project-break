const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards,getProductCardsById,getPagination} = require('../public/utils/index')
const path=require('path')
const admin = require('firebase-admin')
const auth = admin.auth()

const productController = {

  async showProduct(req, res) {
    const { category, page = 1 } = req.query; // Obtén la página desde los parámetros de la consulta
    const limit = 5; // Definimos el límite de productos por página
    const skip = (page - 1) * limit; // Calculamos cuántos productos saltar

    try {
        const query = category ? { 'category.0': category } : {}; // Si hay categoría, agrega filtro
        const products = await Product.find(query).skip(skip).limit(limit); // Obtenemos productos paginados
        const totalProducts = await Product.countDocuments(query); // Contamos el total de productos que coinciden con la consulta

        if (products.length === 0) throw new Error('No se encontraron productos');

        const totalPages = Math.ceil(totalProducts / limit); // Calculamos el total de páginas
        const paginationHtml = getPagination(page, totalPages, category); // Obtenemos los controles de paginación

        const html = baseHtml() + getNavBar() + getProductCards(products) + paginationHtml;
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