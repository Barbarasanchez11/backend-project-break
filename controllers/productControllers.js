const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards, getProductCardsById,getNavBarDash,getNavBarDashInd,getProductCardsDash,formNewProduct, formEditProduct,deleteProd} = require('../public/utils/index')
const path=require('path')

const productController = {

  async showProduct(req, res) {
    try {
      const products = await Product.find();
      if(!products) throw new Error('No se encontraron productos')
      const html = baseHtml() + getNavBar() + getProductCards(products); 
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
        const html = baseHtml() + getNavBar() + getProductCardsById([products])
        res.send(html)
    }catch (error) {
      res.status(500).json({message : 'Se produjo un error al intentar obtener el producto'})
  }
},

async showProductByCategory(req,res){
    const path = req.path   
    const category = path.split('/products/').join('')//se divide en ['', 'Proteinas']con join se convierte en Proteinas 
    console.log(category)
    try{
        const products = [await Product.findOne({category})]
        const html = baseHtml() + getNavBar() + getProductCards(products) + `<a href='/products'>Volver</a>`
        
        
        res.send(html)
    }catch(error){
        res.status(500).json({message : 'Se produjo un error al intentar obtener el producto'})
    }
    
},
async showNewProduct(req,res){
  try {
    const html =  baseHtml() + getNavBar() + formNewProduct()
    res.send(html)
   } catch (error) {
    console.error(error)
    res.status(500).json({message : 'Se produjo un error al intentar mostrar el producto'})
   } 
},

async showDashboard(req,res){
  try {

    const products = await Product.find();
    if(!products) throw new Error('No se encontraron productos')
      let productHtml = products.map(product => `
        <div>
          <h2>${product.name}</h2>
          <img src='${product.image}' alt='${product.name}' style='width:100px;height:auto;' />
          <a href='/dashboard/${product._id}'>Ver</a>
        </div>
      `).join('');
    const html = baseHtml() + getNavBarDash()  + productHtml
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
      
  } 
  catch(error){
    console.error(error)
      res.status(500).json({message : 'Se produjo un error al intentar crear el producto'})

      
  }
},

async showDashboardById(req,res) {
  try {
   const id = req.params.productId
   const products = await Product.findById(id)
   if(!products) {
      return res.status(404).json({message: 'El producto con ese Id no existe'})
   }
   const html = baseHtml() + getNavBarDashInd() + getProductCardsDash([products]) +
   `<a href='/dashboard/${id}/edit'>Editar</a>` + `<a href='/dashboard/${id}/delete'>Borrar</a>`

   res.send(html)
  } catch (error) {
      console.error(error)
      res.status(500).json({message : 'Se produjo un error al intentar obtener el producto'})
      
  }
},

async updateProduct(req,res){
  try {
    const id = req.params.productId;
    const body = req.body;
    console.log(body)
    const products= await Product.findByIdAndUpdate(id, body, { new: true });
    if (!products) {
      return res.status(404).send({ message: 'Producto no encontrado' })
    } res.status(200).send({ message: 'Producto actualizado correctamente', product: products }); 
     
} catch (error) {
    console.error(error)
    res.status(500).json({message : 'Se produjo un error intentando actualizar el producto'})
}
},

async showEditProduct(req,res){
  try {
    const productId =req.params.productId  
    const products = await Product.findById(productId)  
    if(!products) {
     return res.status(404).json({message: 'The product with that ID does not exist'})
    }
    const html = baseHtml()+ getNavBarDashInd() + formEditProduct(req,products)
    res.send(html)
    
} catch (error) {
    console.log(error)
    res.status(500).json({message : 'Se produjo un error al intentar cargar el formulario'})
}
},

async deleteProduct(req, res) {
  const { confirm } = req.query; 
  const productId = req.params.productId;

  try {
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message:'Producto no encontrado' });
      }
      if (confirm === 'true') {
          await Product.findByIdAndDelete(productId);
          return res.redirect('/dashboard');
      }

      const html = baseHtml()+ getNavBarDashInd() + deleteProd(product)
      res.send(html);
  } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Se produjo un error al intentar borrar el producto' });
  }
}
}



module.exports = productController;




