const Product = require('../models/Product')

const apiProducts = {

    async createProduct (req,res) {
        
        try{
            const products = req.body
            const productNew = await Product.create(products)
           
        res.status(201).json(productNew)({mensaje: 'producto añadido con éxito'})
        }catch(error){
        res.status(500).send(error)
        }
    },

    async showProducts (req,res){
       
     try {
        const products = await Product.find()
        return res.json(products)
        
     } catch (error) {
        res.status(500).send(error)
     }

    },

    async showProductById(req,res){
        const {productId} = req.params;
        try {                                                                     
            const product = await Product.findById(productId);              
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async updateById (req,res){
        const {productId} = req.params
        const body = req.body
        console.log(productId); 
        
       
        try {
            const products = await Product.findByIdAndUpdate(productId, {...body}, { new: true })
            
            res.status(200).json(products)
        } catch (error) {
            res.status(500).send(error)
        }
    },

    
  async deleteProduct(req,res){
    const {productId }= req.params
    try {
        const products = await Product.findByIdAndDelete(productId)
        res.send({mensaje: 'Producto eleiminado', products})
        
    } catch (error) {
        res.status(500).send(error)
    }
  }

}



module.exports = apiProducts