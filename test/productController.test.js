const app = require('../app')
const Product = require('../models/Product')
const{baseHtml,getNavBar} =require('../public/utils/index')
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
  test('getNavBar devuelve la barra de navegación correcta', () => {
    const expectedNavBar = `
<nav>
  <ul>
    <li><a href="/products">Productos</a></li>
    <li><a href='/?category=Proteinas'>Proteinas</a></li>
    <li><a href='/?category=Vitaminas'>Vitaminas</a></li>
    <li><a href='/?category=Snacks'>Snacks</a></li>
    <li><a href='/?category=NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/?category=Otros'>Otros</a></li>
    <li><a href='/login'>Login</a></li>
  </ul>
</nav>
`;
    expect(getNavBar().trim()).toBe(expectedNavBar.trim());
  });
})