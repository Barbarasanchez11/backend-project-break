const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
    name: {
       type: String,
       trim: true,//elimina los espacios en blanco del inicio y el final
       required: true
    },

    description: {
        type: String,
        trim: true,
        required:true
     },

    image: {
        type: String,
        required:true
    },

    category: {
        type: [String],
        trim: true,
        required: true, 
        enum: ['Proteinas','Vitaminas','Snacks','NutricionDeportiva','Otros']},//sólo se pueden seleccionar los valores listados

    flavour: {
        type: String,
        trim: true,
        required: true,
    },

    size: {
        type: String,
        trim: true,
        required: true, 
        enum: ['250g','500g','1kg','2.5kg','5kg', '90capsulas', '180capsulas',
            'packde12'
        ]},

     price: {
        type: Number,
        trim: true,
        required: true},

    stock: {
            type: Number,
            trim: true,
            required: true, 
            min: [0,"The stock cannot be negative"],//no puede ser menos que cero, si no dará error
            default : 0 //se inicializa desde 0
    }  
},{timestamps: true})

ProductSchema.index({name: 1}) //se indica desde donde tiene que empezar a buscar,

const Product = mongoose.model('Product', ProductSchema) 

module.exports = Product
