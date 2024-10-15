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
                                $ref: '#/components/schemas/ProductNew'
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Product created successfully' },
                    500: { description: 'Server error' }
                }
            }
        }
    }
};