const app = require('../app')
const Product = require('../models/Product')
const{baseHtml} =require('../public/utils/index')
const mongoose = require('mongoose')


afterAll(async () => {
  await mongoose.connection.close();
});
describe('Utilities', () => {
  test('baseHtml devuelve el HTML esperado', () => {
    const expected = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Productos</title>
    <link rel="stylesheet" href="/styles/style.css">
</head>
<body>
    <header>
        
    </header>
</body>
</html>
`;
    expect(baseHtml().trim()).toBe(expected.trim());
  });
})