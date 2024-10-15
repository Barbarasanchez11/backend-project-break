module.exports = {
    components: {
        schemas: {
            products: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'ObtectId',
                        description: 'product identificacion number',
                        example: '6701611964e00b3394c82ad6'
                    },
                    name: {
                        type: 'String',
                        description: 'name of product',
                        example: 'proteina'
                    },
                    description: {
                        type: 'String',
                        description: 'description of the product',
                        example: 'proteina vegana de chocolate'
                    },
                    Image: {
                        type: 'String',
                        description: 'image of the product',
                        example: 'https://www.bulk.com/media/catalog/product/V/S/VSER_VPPO_CPEA_Main_Image_45c8.jpg?auto=webp&quality=80&crop=false&fit=cover&width=1080&resize-filter=bicubic'
                    },
                    category: {
                        type: 'String',
                        description: 'category of the product',
                        example: 'Proteina'
                    },
                    size: {
                        type: 'String',
                        description: 'size of the product',
                        example: '250g'
                    },
                    price: {
                        type: 'decimal',
                        description: 'price of the product',
                        example: 9.99
                    },
                    stock: {
                        type: 'Number',
                        description: 'stock of the products',
                        example: 100
                    },
                },
            },
        },  newProduct: {
              type: 'object',
              properties: {
                name: {
                    type: 'String',
                    description: 'name of product',
                    example: 'proteina'
                },
                description: {
                    type: 'String',
                    description: 'description of the product',
                    example: 'proteina vegana de chocolate'
                },
                Image: {
                    type: 'String',
                    description: 'image of the product',
                    example: 'https://www.bulk.com/media/catalog/product/V/S/VSER_VPPO_CPEA_Main_Image_45c8.jpg?auto=webp&quality=80&crop=false&fit=cover&width=1080&resize-filter=bicubic'
                },
                category: {
                    type: 'String',
                    description: 'category of the product',
                    example: 'Proteina'
                },
                size: {
                    type: 'String',
                    description: 'size of the product',
                    example: '250g'
                },
                price: {
                    type: 'decimal',
                    description: 'price of the product',
                    example: 9.99
                },
                stock: {
                    type: 'Number',
                    description: 'stock of the products',
                    example: 100
                },
              }
             
        }
    }
}