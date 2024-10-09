const Product = require('../models/Product')
const {baseHtml, getNavBar,getNavBarDash, getProductCards, formNewProduct, formEditProduct,deleteProduct} = require('../public/utils/index')
const path=require('path')

const productController = {
  async showProduct(req,res) {
    try {
      const products = await Product.find();
      if(!products) throw new Error('No se encontraron productos')
      const productCards = getProductCards(products);
      const html = baseHtml() + getNavBar() + productCards
      
     
      res.send(html);
      ;    
    } catch (error) {
      console.error(error)
        res.status(500).send('Error fetching products')      
    }
  },


 async showProductById(req,res){
    
    try{
        const id = req.params._id
        const products = await Product.findById(id) 
       
        if(!products) {
            return res.status(404).json('Product not found')
        }
        const html = baseHtml() + getNavBar() + getProductCards([products])
        res.send(html)
    }catch (error) {
      res.status(500).json({message : 'An error occurred while trying to get the product.'})
  }
},

async showProductByCategory(req,res){
    const path = req.path   
    const category = path.split('/products/').join('')//se divide en ['', 'Proteinas']con join se convierte en Proteinas 
    
    try{
        const products = [await Product.findOne({category})]
        const html = baseHtml() + getNavBar() + getProductCards(products)
        //console.log(html)
        
        res.send(html)
    }catch(error){
        res.status(500).json({message : 'An error occurred while trying to get the product.'})
    }
    
},
async showNewProduct(req,res){
  try {
    const html =  baseHtml() + getNavBar() + formNewProduct()
    res.send(html)
   } catch (error) {
    console.error(error)
    res.status(500).json({message : 'entra.'})
   } 
},

async showDashboard(req,res){
  try {

    const products = await Product.find();
    if(!products) throw new Error('No se encontraron productos')
    const productCards = getProductCards(products);
    const html = baseHtml() + getNavBar() + productCards 
    
    
    res.send(html);
    ; 
    } catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener los productos') 
    }
    
},

async createProduct(req,res){
  try{
      const {name, description, image, category, flavour, size, price, stock} = req.body 
      const createItem = new Product({
       name,
       description,
       image,
       category,
       flavour,
       size,
       price,
       stock
      })
      await createItem.save()//guardamos el prod. en la BBDD
      res.status(201).json(createItem)
      res.redirect(`/dashboard/products/${product._id}`)
  } 
  catch(error){
    console.error(error)
      res.status(500).json({message : 'An error occurred while trying to create the product.'})

      
  }
},

async showDashboardById(req,res) {
  try {
   const productId =req.params.productId   
   const products = await Product.findById(productId)
   if(!products) {
      return res.status(404).json({message: 'The product with that ID does not exist'})
   }
   res.status(200).json(products)
  } catch (error) {
      console.error(error)
      res.status(500).json({message : 'An error occurred while fetching the product'})
      
  }
},

async showEditProduct(req,res){
  try {
    const productId =req.params.productId 
    
    const products = await Product.findById(productId)
    const html = formEditProduct(products)
    console.log(html)
    if(!products) {
     return res.status(404).json({message: 'The product with that ID does not exist'})
    }
   
    res.send(html)
    
} catch (error) {
    console.log(error)
    res.status(500).json({message : 'An error occurred while loading the form'})
}
},



async updateProduct(req,res){
  try {
    
    const id = req.params.productId;
    const body = req.body;
    const products= await Product.findByIdAndUpdate(id, body, { new: true });
   
    if(product)
        res.status(200).json('Product update successfully')
    if (!products) {
      return res.status(404).send({ message: 'Product not found' })}
    res.send(html)
} catch (error) {
    console.error(error)
    res.status(500).json({message : 'An error occurred while updating the product.'})
}

},

async deleteProduct(req, res) {
  const { confirm } = req.query; 
  const productId = req.params.productId;

  try {
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      if (confirm === 'true') {
          await Product.findByIdAndDelete(productId);
          return res.redirect('/dashboard');
      }

      const html = deleteProduct();
      res.send(html);
  } catch (error) {
      console.error(error); // Para ayudar a depurar posibles problemas
      res.status(500).json({ message: 'Error occurred while attempting to delete the product' });
  }
}
}




module.exports = productController;




