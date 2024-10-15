const { request } = require("express");
const Product = require("../models/Product");

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
                                $ref: '#/components/schemas/Product'
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
        '/api/products/{_id}': {
            get: {
                tags: {
                    Product: 'Get product by id'
                },
                description: 'Get product by id',
                operationId: 'getProductById',
                parameters: [{
                    name: '_id',
                    in: 'path',
                    schema: {
                        $ref: '#/components/schemas/ProductId'
                    },
                    description: 'Id of a product'
                }],
                responses: {
                    200: {
                        description: 'Product found successfully',
                        content: {
                            'application/json':{
                                schema: {$ref: '#/components/schemas/Products'}
                            },
                        },
                    },
                    500: {
                        description: 'Server error'
                    }
                }
            }
        }
    }
};