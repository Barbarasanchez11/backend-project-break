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
        const { _id } = req.params;
        try {                                                                     
            const product = await Product.findById(_id);              
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }

}



module.exports = apiProducts