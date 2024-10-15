const { request } = require("express");
const Product = require("../models/Product");
const { put } = require("../routes/apiRoutes");

module.exports = {
    paths: {
        '/api/products': {
            post: {
                tags: {
                    Product: 'Create a product'
                },
                description: 'Create a new product',
                operationId: 'createProduct',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Products'
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Product created successfully' },
                    500: { description: 'Server error' }
                }
            }
        },
        '/api/products': {
            get: {
                tags: {
                    Product: 'Get all products'
                },
                description: 'Get all products',
                operationId: 'getProducts',
                parameters: [],
                requestBody: {},
                responses: {
                    200: {
                        description: 'List of products'
                    },
                    500: {
                        description: 'Server error'
                    }
                }
            }
        },
        '/api/products/edit/{productId}': {
            put: {
                tags: {
                    Product: 'Edit product'
                },
                description: 'Edit product',
                operationId: 'editProductById',
                parameters: [{
                    name: 'productId',
                    in: 'path',
                    description: 'product to be update'
                   
                }],
                requestBody: {
                    content: {
                        'application/json':{
                            schema: {$ref: '#/components/schemas/ProductId'}
                        },
                        example: {
                            
                                "_id": "670ea2d6c890cf4325bf8812",
                                "name": "proteina",
                                "description": "proteina vegana de chocolate",
                                "category": "Proteinas",
                                "flavour": "Chocolate",
                                "size": "250g",
                                "price": 9.99,
                                "stock": 100
                              
                        }
                    },
                },
                
                responses: {
                    200: {
                        description: 'Product found successfully',
                    },
                    500: {
                        description: 'Server error'
                    }
                }
            }
        },
        '/api/products/delete/{productId}': {
            delete:{
                tags: {
                    Products: 'Delete product'
                },
                description: 'Delete product',
                operationId: 'deleteProductById',
                parameters: [{
                    name: 'productId',
                    in: 'path',
                    description: 'product to be delete'
                   
                }],
                requestBody: {
                    content: {
                        'application/json':{
                            schema: {$ref: '#/components/schemas/ProductDelete'}
                        },
                        example: {
                            
                                "_id": "670ea2d6c890cf4325bf8812",
                                "name": "proteina",
                                "description": "proteina vegana de chocolate",
                                "category": "Proteinas",
                                "flavour": "Chocolate",
                                "size": "250g",
                                "price": 9.99,
                                "stock": 100
                              
                        }
                    },
                },
                
                responses: {
                    200: {
                        description: 'Product found successfully',
                    },
                    500: {
                        description: 'Server error'
                    }
                }
            }
        }
    }
};