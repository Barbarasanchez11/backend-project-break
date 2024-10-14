const Product = require('../models/Product')
const {baseHtml, getNavBar, getProductCards, getProductCardsById,getNavBarDash,getNavBarDashInd,getProductCardsDash,formNewProduct, formEditProduct,deleteProd} = require('../public/utils/index')
const firebase = require('../config/firebase')
const path=require('path')
const admin = require('firebase-admin')
const auth = admin.auth();


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
    const category = path.split('/products/').join('')
   
   //const fromDashboard = req.session.fromDashboard || false;
    try{
        const products = [await Product.findOne({category})]
        //let cardsCategories = req.session.user ? getProductCards(products,true) : getProductCards(products, false)
        const html = baseHtml() +  getNavBar() + getProductCards(products) 
        // `<a href='${fromDashboard ? '/dashboard' : '/products'}'>Volver</a>`
        
        
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
          <img src='${product.image}' alt='${product.name}/>
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
      res.redirect('/dashboard');
     
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
   const html = baseHtml() + getNavBarDash() + getProductCardsDash([products]) +
   `<a href='/dashboard/${id}/edit'>Editar</a>` +  `<button id="delete-button">Borrar</button>
   <script>
       document.getElementById('delete-button').addEventListener('click', async () => {
           const productId = '${id}';
           const response = await fetch(\`/dashboard/\${productId}/delete\`, {
               method: 'DELETE',
               headers: {
                   'Content-Type': 'application/json'
               }
           });
           const dataResponse = await response.json();
           if (dataResponse.success) {
               window.location.href = '/dashboard';
           } else {
               alert(dataResponse.message);
           }
       });
   </script>`;

   res.send(html)
  } catch (error) {
      console.error(error)
      res.status(500).json({message : 'Se produjo un error al intentar obtener el producto'})
      
  }
},

async showEditProduct(req,res){
  try {
    const productId =req.params.productId  
    const products = await Product.findById(productId)  
    if(!products) {
     return res.status(404).json({message: 'El producto con ese Id no existe'})
    }
    const html = baseHtml()+ getNavBarDashInd() + formEditProduct(req,products)
    res.send(html)
    
} catch (error) {
    console.log(error)
    res.status(500).json({message : 'Se produjo un error al intentar cargar el formulario'})
}
},

async updateProduct(req,res){
  try {
    const id = req.params.productId;
    const body = req.body;
    
    const products= await Product.findByIdAndUpdate(id, body, { new: true });
    if (!products) {
      return res.status(404).send({ message: 'Producto no encontrado' })
    } 
    res.json({ success: true });
} catch (error) {
    console.error(error)
    res.status(500).json({message : 'Se produjo un error intentando actualizar el producto'})
}
},



async deleteProduct(req, res) {
  
  const productId = req.params.productId;
  console.log(productId)

  try {
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message:'Producto no encontrado' });
      }
      
          await Product.findByIdAndDelete(productId);
          res.status(200).json({ success: 'Producto eliminado correctamente' }); 
      
      
      
  } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Se produjo un error al intentar borrar el producto' });
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




