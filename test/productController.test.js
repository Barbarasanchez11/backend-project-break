const app = require('../app')
const Product = require('../models/Product')
const{index} =require('../public/utils/index')

describe('GET /products - debe devolver todos los productos', () => {
    it('debe devolver todos los productos', async () => {
      const response = await request(app).get('/products');
      expect(response.statusCode).toBe(200);
      
    });
  });