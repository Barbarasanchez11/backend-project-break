module.exports = {
    components: {
        schemas: {
            Products: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: 'product identification number',
                        example: '6701611964e00b3394c82ad6'
                    },
                    name: {
                        type: 'string',
                        description: 'name of product',
                        example: 'proteina'
                    },
                    description: {
                        type: 'string',
                        description: 'description of the product',
                        example: 'proteina vegana de chocolate'
                    },
                   
                    category: {
                        type: 'string',
                        description: 'category of the product',
                        example: 'Proteinas'
                    },
                    flavour: {
                        type: 'string',
                        description: 'Flavour of product',
                        example: 'Chocolate'
                    },

                    size: {
                        type: 'string',
                        description: 'size of the product',
                        example: '250g'
                    },
                    price: {
                        type: 'number',
                        description: 'price of the product',
                        example: 9.99
                    },
                    stock: {
                        type: 'number',
                        description: 'stock of the products',
                        example: 100
                    },
                },
            },
            ProductNew:{
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'name of product',
                        example: 'proteina'
                    },
                    description: {
                        type: 'string',
                        description: 'description of the product',
                        example: 'proteina vegana de chocolate'
                    },
                   
                    category: {
                        type: 'string',
                        description: 'category of the product',
                        example: 'Proteinas'
                    },
                    flavour: {
                        type: 'string',
                        description: 'Flavour of product',
                        example: 'Chocolate'
                    },
                    size: {
                        type: 'string',
                        description: 'size of the product',
                        example: '250g'
                    },
                    price: {
                        type: 'number',
                        description: 'price of the product',
                        example: 9.99
                    },
                    stock: {
                        type: 'number',
                        description: 'stock of the products',
                        example: 100
                    },
                }
            },
            ProductId: {
                type: 'object',
                properties: {
                   
                    name: {
                        type: 'string',
                        description: 'name of product',
                        example: 'proteina'
                    },
                    description: {
                        type: 'string',
                        description: 'description of the product',
                        example: 'proteina vegana de chocolate'
                    },
                   
                    category: {
                        type: 'string',
                        description: 'category of the product',
                        example: 'Proteinas'
                    },
                    flavour: {
                        type: 'string',
                        description: 'Flavour of product',
                        example: 'Chocolate'
                    },

                    size: {
                        type: 'string',
                        description: 'size of the product',
                        example: '250g'
                    },
                    price: {
                        type: 'number',
                        description: 'price of the product',
                        example: 10
                    },
                    stock: {
                        type: 'number',
                        description: 'stock of the products',
                        example: 100
                    },
                   
                }
            },
            ProductDelete: {
                type: 'object',
                properties: {
                   
                    name: {
                        type: 'string',
                        description: 'name of product',
                        example: 'proteina'
                    },
                    description: {
                        type: 'string',
                        description: 'description of the product',
                        example: 'proteina vegana de chocolate'
                    },
                   
                    category: {
                        type: 'string',
                        description: 'category of the product',
                        example: 'Proteinas'
                    },
                    flavour: {
                        type: 'string',
                        description: 'Flavour of product',
                        example: 'Chocolate'
                    },

                    size: {
                        type: 'string',
                        description: 'size of the product',
                        example: '250g'
                    },
                    price: {
                        type: 'number',
                        description: 'price of the product',
                        example: 10
                    },
                    stock: {
                        type: 'number',
                        description: 'stock of the products',
                        example: 100
                    },
                },
            ProductCategory: {
                type: 'object',
                properties:{
                    type: 'string',
                    description: 'Product category',
                    example: 'Proteinas'
                }
            }
        },  
    },
             
 }
}
