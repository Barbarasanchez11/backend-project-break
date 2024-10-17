const {baseHtml,getNavBarDash,getProductCardsDash,formNewProduct, getProductsHtml,getEditDeleteControls,formEditProduct} = require('../public/utils/index')
const Product = require('../models/Product')
const path = require('path')



const authController = {
    async showNewProduct(req,res){
        try {
          const html =  baseHtml() + getNavBarDash() + formNewProduct() 
          res.send(html)
          
         } catch (error) {
          console.error(error)
          res.status(500).json({message : 'Se produjo un error al intentar mostrar el producto'})
         } 
      },
         
      async showDashboard(req,res){
        const {category} = req.query

        try {

          const products = await Product.find();
          const areThereCategories = category ? products.filter(product => product.category[0] === category) : products
          if(!products) throw new Error('No se encontraron productos')

          const html = baseHtml() + getNavBarDash()  + getProductsHtml(areThereCategories)
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
            const standardizedCategory = category.replace(/ /g, '').toLowerCase()

            const createItem = new Product({
             name,
             description,
             image,
             category: [standardizedCategory],
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
         const html = [
          baseHtml(),
          getNavBarDash(),
          getProductCardsDash([products]), 
          getEditDeleteControls(id),
          getPagination()
      ].join('')
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
          const html = baseHtml()+ getNavBarDash() + formEditProduct(req,products) 
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
}

module.exports = authController